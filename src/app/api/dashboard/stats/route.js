import { connectDB } from "@/lib/db";
import School from "@/models/School";
import Student from "@/models/Student";
import Result from "@/models/Result";
import Contact from "@/models/Contact";
import { requireAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/apiResponse";

export async function GET() {
  try {
    const { user, error } = await requireAuth();
    if (error) return error;
    await connectDB();

    if (user.role === "school") {
      const [students, results] = await Promise.all([
        Student.countDocuments({ school: user.school }),
        Result.countDocuments({ school: user.school }),
      ]);
      return ok({ stats: { students, results } });
    }

    const [schools, pending, students, results, queries] = await Promise.all([
      School.countDocuments(), School.countDocuments({ status: "pending" }),
      Student.countDocuments(), Result.countDocuments(), Contact.countDocuments({ status: "new" }),
    ]);
    return ok({ stats: { schools, pending, students, results, queries } });
  } catch (err) { return handleError(err); }
}
