import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    await connectDB();
    let s = await Settings.findOne({ key: "global" }).lean();
    if (!s) s = (await Settings.create({ key: "global" })).toObject();
    return ok({ settings: s });
  } catch (err) { return handleError(err); }
}

export async function PATCH(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const body = sanitize(await req.json());
    delete body.key;
    const settings = await Settings.findOneAndUpdate({ key: "global" }, body, { new: true, upsert: true });
    return ok({ settings }, "Settings saved");
  } catch (err) { return handleError(err); }
}
