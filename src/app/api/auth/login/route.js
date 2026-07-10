import { connectDB } from "@/lib/db";
import User from "@/models/User";
import School from "@/models/School";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validate";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { accessCookie, refreshCookie } from "@/lib/auth";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const rl = rateLimit(clientKey(req, "login"), { max: 10 });
    if (!rl.ok) return fail("Too many login attempts. Try later.", 429);
    await connectDB();
    const { email, password } = loginSchema.parse(sanitize(await req.json()));

    const user = await User.findOne({ email }).select("+password +refreshTokens").populate("school");
    if (!user) return fail("Invalid credentials", 401);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return fail("Invalid credentials", 401);
    if (!user.isActive) return fail("Account disabled. Contact admin.", 403);
    if (!user.isEmailVerified) return fail("Please verify your email first.", 403, { needOtp: true });

    if (user.role === "school") {
      const school = user.school || (await School.findById(user.school));
      if (!school || school.status !== "approved")
        return fail("Your school is awaiting admin approval.", 403, { pending: true });
    }

    const payload = { id: user._id.toString(), role: user.role, name: user.name, email: user.email, school: user.school?._id?.toString() || null };
    const access = signAccessToken(payload);
    const refresh = signRefreshToken({ id: payload.id });
    user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refresh];
    user.lastLogin = new Date();
    await user.save();

    const store = await cookies();
    store.set(accessCookie(access));
    store.set(refreshCookie(refresh));
    return ok({ user: payload }, "Logged in");
  } catch (err) { return handleError(err); }
}
