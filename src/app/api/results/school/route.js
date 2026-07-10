import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import { requireAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET(req) {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const school = user.role === "school" ? user.school : searchParams.get("school");
    const q = searchParams.get("q") || "";
    const cls = searchParams.get("class");
    const filter = { school };
    if (cls) filter.class = cls;
    if (q) filter.$or = [{ studentName: new RegExp(q, "i") }, { studentCode: new RegExp(q, "i") }];
    const items = await Result.find(filter).sort({ rank: 1, percentage: -1 }).limit(1000).lean();
    return ok({ items, total: items.length });
  } catch (err) { return handleError(err); }
}
