import { connectDB } from "@/lib/db";
import Student, { ensureStudentIndexes } from "@/models/Student";
import School from "@/models/School";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { parseStudentsExcel } from "@/lib/excel";
import { ok, fail, handleError } from "@/lib/apiResponse";

export const runtime = "nodejs";

const MAX_ROWS = 5000;

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["school", "admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    await ensureStudentIndexes();

    const form = await req.formData();
    const file = form.get("file");
    const dryRun = form.get("dryRun") === "true";
    const schoolId = user.role === "school" ? user.school : form.get("school");

    if (!file || typeof file === "string") return fail("Excel file is required", 422);
    if (!/\.(xlsx|xls|csv)$/i.test(file.name || "")) return fail("Only .xlsx, .xls or .csv files allowed", 422);
    if (!schoolId) return fail("Select a school first", 422);

    const school = await School.findById(schoolId).select("name code");
    if (!school) return fail("School not found", 404);

    const buffer = Buffer.from(await file.arrayBuffer());
    const { parsed, errors, totalRows } = parseStudentsExcel(buffer);
    if (!parsed.length) return fail("No valid student rows found in file", 422, errors);
    if (parsed.length > MAX_ROWS) return fail(`Max ${MAX_ROWS} rows per upload`, 422);

    // Warn (not block) if SCHOOL column doesn't match selected school
    const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const mismatch = [...new Set(parsed.filter((p) => p.schoolName && norm(p.schoolName) !== norm(school.name)).map((p) => p.schoolName))];
    const warnings = mismatch.length ? [`SCHOOL column (${mismatch.join(", ")}) differs from selected school "${school.name}". Rows will be added to "${school.name}".`] : [];

    const existing = await Student.find({
      school: schoolId,
      studentCode: { $in: parsed.map((p) => p.studentCode) },
    }).select("studentCode subject").lean();
    const existSet = new Set(existing.map((e) => `${e.studentCode}|${e.subject || ""}`));
    const withStatus = parsed.map((p) => ({ ...p, status: existSet.has(`${p.studentCode}|${p.subject}`) ? "update" : "new" }));

    if (dryRun) {
      return ok({
        preview: withStatus.slice(0, 50),
        count: parsed.length,
        newCount: withStatus.filter((p) => p.status === "new").length,
        updateCount: withStatus.filter((p) => p.status === "update").length,
        totalRows, errors, warnings, school: { name: school.name, code: school.code },
      }, "Validation preview");
    }

    const ops = parsed.map(({ line, schoolName, ...r }) => {
      const $set = { name: r.name, class: r.class, section: r.section, city: r.city, state: r.state, barcode: r.barcode };
      if (r.parentName) $set.parentName = r.parentName;
      if (r.mobile) $set.mobile = r.mobile;
      return {
        updateOne: {
          filter: { school: schoolId, studentCode: r.studentCode, subject: r.subject },
          update: { $set, $setOnInsert: { school: schoolId, studentCode: r.studentCode, subject: r.subject } },
          upsert: true,
        },
      };
    });

    const res = await Student.bulkWrite(ops, { ordered: false });
    const inserted = res.upsertedCount || 0;
    const updated = res.matchedCount || 0;

    await AuditLog.create({
      user: user.id, action: "students_bulk_upload", entity: "Student", entityId: schoolId,
      meta: { inserted, updated, file: file.name, errors: errors.length },
    }).catch(() => {});

    return ok({ inserted, updated, errors, warnings }, `${inserted} added, ${updated} updated`);
  } catch (err) { return handleError(err); }
}
