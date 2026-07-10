import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    await connectDB();
    const items = await Announcement.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
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
      const item = await Announcement.findByIdAndUpdate(body._id, body, { new: true });
      return ok({ item }, "Updated");
    }
    const item = await Announcement.create(body);
    return ok({ item }, "Created", 201);
  } catch (err) { return handleError(err); }
}

export async function DELETE(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await req.json();
    await Announcement.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
