import { requireAuth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import Media from "@/models/Media";
import { ok, fail, handleError } from "@/lib/apiResponse";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["school", "admin", "super_admin"]);
    if (error) return error;
    const form = await req.formData();
    const file = form.get("file");
    const folder = form.get("folder") || "nextgen";
    if (!file || typeof file === "string") return fail("No file provided", 422);
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) return fail("Unsupported file type", 415);
    if (file.size > 10 * 1024 * 1024) return fail("Max 10MB", 413);

    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await uploadToCloudinary(buffer, folder);
    await connectDB();
    await Media.create({
      url: res.secure_url, publicId: res.public_id, folder,
      format: res.format, bytes: res.bytes, width: res.width, height: res.height, uploadedBy: user.id,
    });
    return ok({ url: res.secure_url, publicId: res.public_id }, "Uploaded");
  } catch (err) { return handleError(err); }
}
