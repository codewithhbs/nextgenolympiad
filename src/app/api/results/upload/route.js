import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import School from "@/models/School";
import Student from "@/models/Student";
import Notification from "@/models/Notification";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { parseResultsExcel, summarize } from "@/lib/excel";
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
      const { line, mode, ...data } = r;
      const filter = { school: schoolId, studentCode: data.studentCode, session: data.session };
      const existing = await Result.findOne(filter).lean();

      let subjects = data.subjects;
      let summary = { totalMarks: data.totalMarks, maxMarks: data.maxMarks, percentage: data.percentage, medal: data.medal };
      if (mode === "single" && existing?.subjects?.length) {
        // merge: replace this subject, keep other subjects already uploaded
        const incoming = data.subjects[0];
        subjects = [...existing.subjects.filter((x) => String(x.subject).toUpperCase() !== incoming.subject), incoming];
        summary = summarize(subjects);
      }

      const student =
        (await Student.findOne({ school: schoolId, studentCode: data.studentCode, subject: data.subjects[0]?.subject || "" }).select("_id")) ||
        (await Student.findOne({ school: schoolId, studentCode: data.studentCode }).select("_id"));

      const doc = {
        ...data, ...summary, subjects,
        rank: data.rank || existing?.rank || 0,
        school: schoolId, student: student?._id || existing?.student || null,
        uploadedBy: user.id, batch, olympiad: "NextGen Olympiad",
      };
      await Result.updateOne(filter, { $set: doc }, { upsert: true });
      if (existing) updated++; else inserted++;
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