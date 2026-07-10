import { connectDB } from "@/lib/db";
import Faq from "@/models/Faq";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    await connectDB();
    const items = await Faq.find({ isActive: true }).sort({ order: 1 }).lean();
    return ok({ items });
  } catch (err) { return handleError(err); }
}
export async function POST(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const body = sanitize(await req.json());
    if (body._id) {
      const item = await Faq.findByIdAndUpdate(body._id, body, { new: true });
      return ok({ item }, "Updated");
    }
    const item = await Faq.create(body);
    return ok({ item }, "Created", 201);
  } catch (err) { return handleError(err); }
}
export async function DELETE(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await req.json();
    await Faq.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
