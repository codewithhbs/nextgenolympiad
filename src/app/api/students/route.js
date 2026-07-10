import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
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
    if (q) filter.$or = [{ name: new RegExp(q, "i") }, { studentCode: new RegExp(q, "i") }];
    const items = await Student.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    return ok({ items, total: items.length });
  } catch (err) { return handleError(err); }
}

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["school", "admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const body = sanitize(await req.json());
    const data = studentSchema.parse(body);
    const school = user.role === "school" ? user.school : body.school;
    if (!school) return fail("School is required", 422);
    const student = await Student.create({ ...data, school });
    return ok({ student }, "Student added", 201);
  } catch (err) { return handleError(err); }
}
