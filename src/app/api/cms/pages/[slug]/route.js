import { connectDB } from "@/lib/db";
import Page from "@/models/Page";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";

export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const page = await Page.findOne({ slug }).lean();
    if (!page) return fail("Page not found", 404);
    return ok({ page });
  } catch (err) { return handleError(err); }
}

export async function PATCH(req, { params }) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { slug } = await params;
    const body = sanitize(await req.json());
    const page = await Page.findOneAndUpdate({ slug }, body, { new: true, upsert: true });
    return ok({ page }, "Page saved");
  } catch (err) { return handleError(err); }
}

export async function DELETE(_req, { params }) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { slug } = await params;
    await Page.findOneAndDelete({ slug });
    return ok({}, "Page deleted");
  } catch (err) { return handleError(err); }
}
