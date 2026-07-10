import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { ok, handleError } from "@/lib/apiResponse";
import { genToken } from "@/lib/otp";
import { sendMail, mailTemplates } from "@/lib/mailer";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export async function POST(req) {
  try {
    rateLimit(clientKey(req, "forgot"), { max: 5 });
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      const token = genToken();
      user.resetToken = { token, expiresAt: new Date(Date.now() + 30 * 60 * 1000) };
      await user.save();
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
      sendMail({ to: email, subject: "Reset your password", html: mailTemplates.reset(user.name, link) }).catch(() => {});
    }
    return ok({}, "If the email exists, a reset link has been sent.");
  } catch (err) { return handleError(err); }
}
