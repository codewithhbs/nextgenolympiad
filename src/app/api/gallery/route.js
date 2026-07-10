import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    return ok({ items });
  } catch (err) { return handleError(err); }
}
export async function POST(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const item = await Gallery.create(sanitize(await req.json()));
    return ok({ item }, "Added", 201);
  } catch (err) { return handleError(err); }
}
export async function DELETE(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await req.json();
    const item = await Gallery.findById(id);
    if (item?.image?.publicId) await deleteFromCloudinary(item.image.publicId);
    await Gallery.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
