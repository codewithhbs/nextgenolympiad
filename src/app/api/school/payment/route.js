import { connectDB } from "@/lib/db";
import School from "@/models/School";
import Settings from "@/models/Settings";
import { requireAuth } from "@/lib/auth";
import { sanitize } from "@/lib/sanitize";
import { ok, fail, handleError } from "@/lib/apiResponse";

// School: own payment status + bank/UPI details.  Admin: list all school payments.
export async function GET(req) {
  try {
    const { user, error } = await requireAuth(["school", "admin", "super_admin"]);
    if (error) return error;
    await connectDB();

    if (user.role === "school") {
      const school = await School.findById(user.school).select("registrationFee amountPaid paymentStatus paymentRef paymentMethod name code").lean();
      if (!school) return fail("School not found", 404);
      const settings = await Settings.findOne({ key: "global" }).select("payment").lean();
      return ok({ school, payment: settings?.payment || {} });
    }

    // admin list
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const filter = {};
    if (status) filter.paymentStatus = status;
    const schools = await School.find(filter)
      .select("name code email registrationFee amountPaid paymentStatus paymentRef paymentMethod paidAt registrationSlug createdAt")
      .sort({ updatedAt: -1 }).lean();
    return ok({ schools });
  } catch (err) { return handleError(err); }
}

// School: submit a payment reference (marks as submitted, pending verification)
export async function POST(req) {
  try {
    const { user, error } = await requireAuth(["school"]);
    if (error) return error;
    await connectDB();
    const { ref, method, amount } = sanitize(await req.json());
    if (!ref) return fail("Enter the payment reference / transaction ID", 422);
    const school = await School.findByIdAndUpdate(
      user.school,
      { paymentRef: ref, paymentMethod: method || "", amountPaid: Number(amount) || 0, paymentStatus: "submitted" },
      { new: true }
    ).select("paymentStatus paymentRef").lean();
    return ok({ school }, "Payment details submitted. Our team will verify and confirm.");
  } catch (err) { return handleError(err); }
}

// Admin: set fee / verify payment
export async function PATCH(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id, registrationFee, paymentStatus, amountPaid } = sanitize(await req.json());
    const update = {};
    if (registrationFee != null) update.registrationFee = Number(registrationFee);
    if (amountPaid != null) update.amountPaid = Number(amountPaid);
    if (paymentStatus) { update.paymentStatus = paymentStatus; if (paymentStatus === "paid") update.paidAt = new Date(); }
    const school = await School.findByIdAndUpdate(id, update, { new: true }).lean();
    return ok({ school }, "Updated");
  } catch (err) { return handleError(err); }
}
