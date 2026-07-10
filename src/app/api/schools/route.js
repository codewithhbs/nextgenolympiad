import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { requireAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const filter = {};
    if (status) filter.status = status;
    if (q) filter.$or = [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }, { code: new RegExp(q, "i") }];
    const [items, total] = await Promise.all([
      School.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      School.countDocuments(filter),
    ]);
    return ok({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { return handleError(err); }
}
