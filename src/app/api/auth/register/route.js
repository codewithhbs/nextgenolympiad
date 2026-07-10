import { connectDB } from "@/lib/db";
import User from "@/models/User";
import School from "@/models/School";
import Notification from "@/models/Notification";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validate";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { genOtp } from "@/lib/otp";
import { sendMail, mailTemplates } from "@/lib/mailer";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export async function POST(req) {
  try {
    const rl = rateLimit(clientKey(req, "register"), { max: 8 });
    if (!rl.ok) return fail("Too many attempts. Try later.", 429);
    await connectDB();
    const body = sanitize(await req.json());
    const data = registerSchema.parse(body);

    const exists = await User.findOne({ email: data.email });
    if (exists) return fail("Email already registered", 409);

    const school = await School.create({
      name: data.schoolName, email: data.email, phone: data.phone,
      contactPerson: data.name, city: data.city, state: data.state, address: data.address,
      status: "pending",
    });

    const hash = await bcrypt.hash(data.password, 12);
    const code = genOtp();
    const user = await User.create({
      name: data.name, email: data.email, phone: data.phone, password: hash,
      role: "school", school: school._id,
      otp: { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });
    school.user = user._id;
    await school.save();

    await Notification.create({ title: "New school registration", message: `${school.name} registered and awaits approval.`, type: "approval" });
    sendMail({ to: data.email, subject: "Verify your email — NextGen Olympiad", html: mailTemplates.otp(data.name, code) }).catch(() => {});
    return ok({ email: data.email }, "Registered. OTP sent to email.", 201);
  } catch (err) { return handleError(err); }
}
