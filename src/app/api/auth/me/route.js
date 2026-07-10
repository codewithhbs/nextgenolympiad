import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return fail("Unauthorized", 401);
    await connectDB();
    const user = await User.findById(session.id).populate("school").lean();
    if (!user) return fail("Not found", 404);
    delete user.password;
    return ok({ user });
  } catch (err) { return handleError(err); }
}
