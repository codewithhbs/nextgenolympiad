import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import { ok, fail, handleError } from "@/lib/apiResponse";
import { rateLimit, clientKey } from "@/lib/rateLimit";

// Public: look up a single published result by student code
export async function GET(req) {
  try {
    const rl = rateLimit(clientKey(req, "lookup"), { max: 30 });
    if (!rl.ok) return fail("Too many requests", 429);
    await connectDB();
    const { searchParams } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim().toUpperCase();
    if (!code) return fail("Student code required", 422);
    const result = await Result.findOne({ studentCode: code })
      .select("studentName studentCode class section totalMarks maxMarks percentage rank medal olympiad session")
      .lean();
    if (!result) return fail("No result found", 404);
    return ok({ result });
  } catch (err) { return handleError(err); }
}
