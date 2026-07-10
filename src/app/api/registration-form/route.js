import { connectDB } from "@/lib/db";
import RegistrationForm from "@/models/RegistrationForm";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ensureDefaultForms } from "@/lib/defaultForms";
import { ok, fail, handleError } from "@/lib/apiResponse";

// Public: ?slug=olympiad -> one active form; ?all=1 (admin) -> every form; default -> active list (chooser)
export async function GET(req) {
  try {
    await ensureDefaultForms();
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const all = searchParams.get("all");

    if (all) {
      const { error } = await requireAuth(["admin", "super_admin"]);
      if (error) return error;
      const forms = await RegistrationForm.find().sort({ order: 1 }).lean();
      return ok({ forms });
    }
    if (slug) {
      const form = await RegistrationForm.findOne({ slug, isActive: true }).lean();
      if (!form) return fail("Form not found", 404);
      return ok({ form });
    }
    const forms = await RegistrationForm.find({ isActive: true })
      .select("slug title subtitle order")
      .sort({ order: 1 }).lean();
    return ok({ forms });
  } catch (err) { return handleError(err); }
}

// Admin: upsert a form (by _id or slug)
export async function POST(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const body = sanitize(await req.json());
    if (!body.slug || !body.title || !Array.isArray(body.steps))
      return fail("slug, title and steps are required", 422);

    const query = body._id ? { _id: body._id } : { slug: body.slug };
    const form = await RegistrationForm.findOneAndUpdate(
      query,
      { $set: { ...body, _id: undefined } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return ok({ form }, "Saved");
  } catch (err) { return handleError(err); }
}

export async function DELETE(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await req.json();
    await RegistrationForm.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
