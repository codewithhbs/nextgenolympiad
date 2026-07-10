import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/jwt";
import { accessCookie, refreshCookie } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function POST() {
  try {
    const store = await cookies();
    const rt = store.get("refresh_token")?.value;
    if (!rt) return fail("No refresh token", 401);
    let decoded;
    try { decoded = verifyRefreshToken(rt); } catch { return fail("Invalid refresh token", 401); }
    await connectDB();
    const user = await User.findById(decoded.id).select("+refreshTokens").populate("school");
    if (!user || !user.refreshTokens?.includes(rt)) return fail("Session expired", 401);
    const payload = { id: user._id.toString(), role: user.role, name: user.name, email: user.email, school: user.school?._id?.toString() || null };
    const access = signAccessToken(payload);
    const newRefresh = signRefreshToken({ id: payload.id });
    user.refreshTokens = [...user.refreshTokens.filter((t) => t !== rt).slice(-4), newRefresh];
    await user.save();
    store.set(accessCookie(access));
    store.set(refreshCookie(newRefresh));
    return ok({ user: payload }, "Refreshed");
  } catch (err) { return handleError(err); }
}
