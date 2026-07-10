import { connectDB } from "@/lib/db";
import School from "@/models/School";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function GET(_req, { params }) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const school = await School.findById(id).lean();
    if (!school) return fail("School not found", 404);
    if (user.role === "school" && user.school !== id) return fail("Forbidden", 403);
    return ok({ school });
  } catch (err) { return handleError(err); }
}

export async function PATCH(req, { params }) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { id } = await params;
    if (user.role === "school" && user.school !== id) return fail("Forbidden", 403);
    const body = sanitize(await req.json());
    // schools cannot self-change status
    if (user.role === "school") delete body.status;
    const school = await School.findByIdAndUpdate(id, body, { new: true });
    return ok({ school }, "Updated");
  } catch (err) { return handleError(err); }
}

export async function DELETE(_req, { params }) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    await School.findByIdAndDelete(id);
    await User.deleteMany({ school: id });
    return ok({}, "School deleted");
  } catch (err) { return handleError(err); }
}
