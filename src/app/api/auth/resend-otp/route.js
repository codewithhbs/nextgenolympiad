import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { genOtp } from "@/lib/otp";
import { sendMail, mailTemplates } from "@/lib/mailer";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export async function POST(req) {
  try {
    const rl = rateLimit(clientKey(req, "otp"), { max: 5 });
    if (!rl.ok) return fail("Too many requests", 429);
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) return fail("User not found", 404);
    if (user.isEmailVerified) return ok({}, "Already verified");
    const code = genOtp();
    user.otp = { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
    await user.save();
    sendMail({ to: email, subject: "Your new OTP — NextGen Olympiad", html: mailTemplates.otp(user.name, code) }).catch(() => {});
    return ok({}, "New OTP sent");
  } catch (err) { return handleError(err); }
}
