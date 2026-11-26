import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { fail, ok, handleError } from "@/lib/apiResponse";

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { ids } = await req.json();
    if (!Array.isArray(ids) || !ids.length) return fail("No ids provided", 422);
    const res = await Result.deleteMany({ _id: { $in: ids } });
    await AuditLog.create({
      user: user.id, action: "results_delete", entity: "Result",
      meta: { deleted: res.deletedCount },
    }).catch(() => {});
    return ok({ deleted: res.deletedCount }, `${res.deletedCount} deleted`);
  } catch (err) { return handleError(err); }
}
