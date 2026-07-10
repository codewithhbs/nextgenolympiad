import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function POST(req) {
  try {
    await connectDB();
    const { email, token, password } = await req.json();
    if (!password || password.length < 6) return fail("Password must be at least 6 characters", 422);
    const user = await User.findOne({ email }).select("+resetToken.token +resetToken.expiresAt");
    if (!user || !user.resetToken?.token || user.resetToken.token !== token)
      return fail("Invalid or expired reset link", 400);
    if (new Date() > new Date(user.resetToken.expiresAt)) return fail("Reset link expired", 400);
    user.password = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    user.refreshTokens = [];
    await user.save();
    return ok({}, "Password reset. Please log in.");
  } catch (err) { return handleError(err); }
}
