import { connectDB } from "@/lib/db";
import Student, { ensureStudentIndexes } from "@/models/Student";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { studentSchema } from "@/lib/validate";
import { ok, fail, handleError } from "@/lib/apiResponse";

function scopeSchool(user, searchParams) {
  if (user.role === "school") return user.school;
  return searchParams.get("school") || null;
}

export async function GET(req) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const school = scopeSchool(user, searchParams);
    const q = searchParams.get("q") || "";
    const filter = {};
    if (school) filter.school = school;
    const subject = searchParams.get("subject") || "";
    const cls = searchParams.get("class") || "";
    if (subject) filter.subject = subject.toUpperCase();
    if (cls) filter.class = cls;
    if (q) {
      const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [{ name: new RegExp(safe, "i") }, { studentCode: new RegExp(safe, "i") }, { barcode: new RegExp(safe, "i") }];
    }
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") || "25", 10) || 25));
    const [items, total, subjects] = await Promise.all([
      Student.find(filter)
        .collation({ locale: "en", numericOrdering: true })
        .sort({ class: 1, section: 1, studentCode: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Student.countDocuments(filter),
      school ? Student.distinct("subject", { school }).then((a) => a.filter(Boolean).sort()) : Promise.resolve([]),
    ]);
    return ok({ items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)), subjects });
  } catch (err) { return handleError(err); }
}

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["school", "admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    await ensureStudentIndexes();
    const body = sanitize(await req.json());
    const data = studentSchema.parse(body);
    const school = user.role === "school" ? user.school : body.school;
    if (!school) return fail("School is required", 422);
    const student = await Student.create({ ...data, subject: (data.subject || "").toUpperCase().trim(), school });
    return ok({ student }, "Student added", 201);
  } catch (err) { return handleError(err); }
}
