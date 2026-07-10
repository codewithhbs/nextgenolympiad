import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { otpSchema } from "@/lib/validate";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function POST(req) {
  try {
    await connectDB();
    const { email, code } = otpSchema.parse(sanitize(await req.json()));
    const user = await User.findOne({ email }).select("+otp.code +otp.expiresAt");
    if (!user) return fail("User not found", 404);
    if (user.isEmailVerified) return ok({}, "Already verified");
    if (!user.otp?.code || user.otp.code !== code) return fail("Invalid OTP", 400);
    if (new Date() > new Date(user.otp.expiresAt)) return fail("OTP expired", 400);
    user.isEmailVerified = true;
    user.otp = undefined;
    await user.save();
    return ok({}, "Email verified. Await admin approval to log in.");
  } catch (err) { return handleError(err); }
}
