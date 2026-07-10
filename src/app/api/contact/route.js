import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { requireAuth } from "@/lib/auth";
import { contactSchema } from "@/lib/validate";
import { sanitize } from "@/lib/sanitize";
import { ok, handleError } from "@/lib/apiResponse";
import { sendMail } from "@/lib/mailer";
import { getSettings } from "@/lib/seo";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export async function POST(req) {
  try {
    const rl = rateLimit(clientKey(req, "contact"), { max: 6 });
    if (!rl.ok) return ok({}, "Thanks! We'll get back to you.");
    await connectDB();
    const data = contactSchema.parse(sanitize(await req.json()));
    const entry = await Contact.create(data);
    const settings = await getSettings();
    if (settings?.contact?.email)
      sendMail({ to: settings.contact.email, subject: `New enquiry: ${data.subject || "Contact form"}`,
        html: `<p><b>${data.name}</b> (${data.email}, ${data.phone || "-"})</p><p>${data.message}</p>` }).catch(() => {});
    return ok({ id: entry._id }, "Message sent. We'll reply soon!", 201);
  } catch (err) { return handleError(err); }
}

export async function GET(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const filter = status ? { status } : {};
    const items = await Contact.find(filter).sort({ createdAt: -1 }).limit(300).lean();
    return ok({ items });
  } catch (err) { return handleError(err); }
}
