import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { ok, fail, handleError } from "@/lib/apiResponse";

async function guard(user, id) {
  const student = await Student.findById(id);
  if (!student) return { student: null, err: fail("Not found", 404) };
  if (user.role === "school" && student.school.toString() !== user.school)
    return { student: null, err: fail("Forbidden", 403) };
  return { student, err: null };
}

export async function PATCH(req, { params }) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const { student, err } = await guard(user, id);
    if (err) return err;
    const body = sanitize(await req.json());
    Object.assign(student, body);
    await student.save();
    return ok({ student }, "Updated");
  } catch (err) { return handleError(err); }
}

export async function DELETE(_req, { params }) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const { student, err } = await guard(user, id);
    if (err) return err;
    if (student.image?.publicId) await deleteFromCloudinary(student.image.publicId);
    await student.deleteOne();
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
