import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import School from "@/models/School";
import Student from "@/models/Student";
import Notification from "@/models/Notification";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { parseResultsExcel } from "@/lib/excel";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { sendMail, mailTemplates } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();

    const form = await req.formData();
    const file = form.get("file");
    const schoolId = form.get("school");
    const dryRun = form.get("dryRun") === "true";
    if (!file || typeof file === "string") return fail("Excel file is required", 422);
    if (!schoolId) return fail("Select a school", 422);

    const school = await School.findById(schoolId);
    if (!school) return fail("School not found", 404);

    const buffer = Buffer.from(await file.arrayBuffer());
    const { parsed, errors } = parseResultsExcel(buffer);
    if (!parsed.length) return fail("No valid rows found", 422, errors);

    if (dryRun) return ok({ preview: parsed, errors, count: parsed.length }, "Validation preview");

    const batch = `BATCH-${Date.now()}`;
    let inserted = 0, updated = 0;
    for (const r of parsed) {
      const student = await Student.findOne({ school: schoolId, studentCode: r.studentCode }).select("_id");
      const doc = {
        ...r, school: schoolId, student: student?._id || null,
        uploadedBy: user.id, batch, olympiad: "NextGen Olympiad",
      };
      const res = await Result.updateOne(
        { school: schoolId, studentCode: r.studentCode, session: r.session },
        { $set: doc }, { upsert: true }
      );
      if (res.upsertedCount) inserted++; else updated++;
    }

    await Notification.create({
      school: schoolId, user: school.user, type: "result",
      title: "Results published", message: `${parsed.length} result(s) added to your dashboard.`, link: "/school/results",
    });
    if (school.email) sendMail({ to: school.email, subject: "Results published — NextGen Olympiad", html: mailTemplates.resultUploaded(school.name, parsed.length) }).catch(() => {});
    await AuditLog.create({ user: user.id, action: "results_upload", entity: "Result", entityId: schoolId, meta: { inserted, updated, batch } });

    return ok({ inserted, updated, errors, batch }, "Results uploaded");
  } catch (err) { return handleError(err); }
}
