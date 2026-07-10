import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { requireAuth } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { sendMail, mailTemplates } from "@/lib/mailer";

export async function PATCH(req, { params }) {
  try {
    const { user, error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const { status, reply } = await req.json();
    const entry = await Contact.findById(id);
    if (!entry) return fail("Not found", 404);
    if (status) entry.status = status;
    if (reply) {
      entry.reply = { message: reply, repliedAt: new Date(), repliedBy: user.id };
      entry.status = "replied";
      sendMail({ to: entry.email, subject: "Re: your enquiry — NextGen Olympiad", html: mailTemplates.contactReply(entry.name, reply) }).catch(() => {});
    }
    await entry.save();
    return ok({ entry }, "Updated");
  } catch (err) { return handleError(err); }
}

export async function DELETE(_req, { params }) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    await Contact.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
