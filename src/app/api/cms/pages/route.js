import { connectDB } from "@/lib/db";
import Page from "@/models/Page";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const nav = searchParams.get("nav");
    const filter = {};
    if (nav === "true") { filter.showInNav = true; filter.isPublished = true; }
    const items = await Page.find(filter).sort({ navOrder: 1, createdAt: -1 }).lean();
    return ok({ items });
  } catch (err) { return handleError(err); }
}

export async function POST(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const body = sanitize(await req.json());
    const page = await Page.create(body);
    return ok({ page }, "Page created", 201);
  } catch (err) { return handleError(err); }
}
