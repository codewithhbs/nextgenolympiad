import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";
import { requireAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const filter = user.role === "school" ? { $or: [{ school: user.school }, { user: user.id }] } : {};
    const items = await Notification.find(filter).sort({ createdAt: -1 }).limit(50).lean();
    const unread = items.filter((n) => !n.isRead).length;
    return ok({ items, unread });
  } catch (err) { return handleError(err); }
}
export async function PATCH() {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();
    const filter = user.role === "school" ? { $or: [{ school: user.school }, { user: user.id }] } : {};
    await Notification.updateMany(filter, { isRead: true });
    return ok({}, "Marked read");
  } catch (err) { return handleError(err); }
}
