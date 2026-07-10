import { connectDB } from "@/lib/db";
import School from "@/models/School";
import User from "@/models/User";
import Notification from "@/models/Notification";
import AuditLog from "@/models/AuditLog";
import { requireAuth } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { sendMail, mailTemplates } from "@/lib/mailer";

export async function POST(req, { params }) {
  try {
    const { user, error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const { action, reason } = await req.json(); // "approve" | "reject" | "suspend"
    const school = await School.findById(id).populate("user");
    if (!school) return fail("School not found", 404);

    if (action === "approve") {
      school.status = "approved";
      school.approvedBy = user.id;
      school.approvedAt = new Date();
      await Notification.create({ school: school._id, user: school.user?._id, title: "School approved", message: "You can now log in.", type: "approval" });
      if (school.user?.email) sendMail({ to: school.user.email, subject: "Your school is approved 🎉", html: mailTemplates.approved(school.name) }).catch(() => {});
    } else if (action === "reject") {
      school.status = "rejected";
      school.rejectionReason = reason;
      if (school.user?.email) sendMail({ to: school.user.email, subject: "Registration update", html: mailTemplates.rejected(school.name, reason) }).catch(() => {});
    } else if (action === "suspend") {
      school.status = "suspended";
      await User.updateMany({ school: id }, { isActive: false });
    } else return fail("Invalid action", 400);

    await school.save();
    await AuditLog.create({ user: user.id, action: `school_${action}`, entity: "School", entityId: id, meta: { reason } });
    return ok({ school }, `School ${action}d`);
  } catch (err) { return handleError(err); }
}
