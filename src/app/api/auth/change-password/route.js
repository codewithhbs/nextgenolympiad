import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function POST(req) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { currentPassword, newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) return fail("New password too short", 422);
    const dbUser = await User.findById(user.id).select("+password");
    const match = await bcrypt.compare(currentPassword || "", dbUser.password);
    if (!match) return fail("Current password is incorrect", 400);
    dbUser.password = await bcrypt.hash(newPassword, 12);
    await dbUser.save();
    return ok({}, "Password changed");
  } catch (err) { return handleError(err); }
}
