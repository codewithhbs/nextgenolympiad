import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { fail, ok, handleError } from "@/lib/apiResponse";

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { ids } = await req.json();
    if (!Array.isArray(ids) || !ids.length) return fail("No ids provided", 422);
    const docs = await Student.find({ _id: { $in: ids } }).select("image").lean();
    await Promise.all(docs.filter((d) => d.image?.publicId).map((d) => deleteFromCloudinary(d.image.publicId).catch(() => {})));
    const res = await Student.deleteMany({ _id: { $in: ids } });
    await AuditLog.create({
      user: user.id, action: "students_delete", entity: "Student",
      meta: { deleted: res.deletedCount },
    }).catch(() => {});
    return ok({ deleted: res.deletedCount }, `${res.deletedCount} deleted`);
  } catch (err) { return handleError(err); }
}
