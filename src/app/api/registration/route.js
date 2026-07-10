import * as XLSX from "xlsx";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import RegistrationForm from "@/models/RegistrationForm";
import Registration from "@/models/Registration";
import School from "@/models/School";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { requireAuth, accessCookie, refreshCookie } from "@/lib/auth";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { sanitize } from "@/lib/sanitize";
import { validateStep, computeTotals } from "@/lib/formEngine";
import { ok, fail, handleError } from "@/lib/apiResponse";

// Public: submit registration -> creates a School + login (User) + auto sign-in
export async function POST(req) {
  try {
    await connectDB();
    const body = sanitize(await req.json());
    const { formSlug, data } = body;
    if (!formSlug || !data || typeof data !== "object") return fail("Invalid submission", 422);

    const form = await RegistrationForm.findOne({ slug: formSlug, isActive: true }).lean();
    if (!form) return fail("Registration form not found", 404);

    // Validate every step
    const errors = {};
    for (const step of form.steps) Object.assign(errors, validateStep(step, data));
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (Object.keys(errors).length) return fail("Please correct the highlighted fields", 422, errors);

    const email = String(data.email || "").toLowerCase().trim();
    const password = data.password;
    if (!email || !password) return fail("Email and password are required to create your login", 422);

    // Never persist raw passwords
    const safeData = { ...data };
    delete safeData.password;
    delete safeData.confirmPassword;

    const existing = await User.findOne({ email });
    if (existing) return fail("This email is already registered. Please log in instead.", 409, { email: "Already registered — log in" });

    // Create the school (approved so they can log in immediately to pay)
    const school = await School.create({
      name: data.schoolName,
      email,
      phone: data.schoolMobile || data.principalMobile || "",
      contactPerson: data.principalName || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      pincode: data.pincode || "",
      board: data.affiliationOther || data.affiliation || "",
      status: "approved",
      paymentStatus: "pending",
      registrationSlug: formSlug,
      registrationData: safeData,
    });

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: data.principalName || data.schoolName,
      email,
      phone: data.schoolMobile || data.principalMobile || "",
      password: hash,
      role: "school",
      school: school._id,
      isEmailVerified: true,
    });
    school.user = user._id;
    await school.save();

    // Audit record in the registrations collection
    await Registration.create({
      formSlug, formTitle: form.title, school: school._id, user: user._id,
      schoolName: data.schoolName, email, phone: school.phone,
      totalStudents: computeTotals(form, data).totalStudents, totalAmount: 0, data: safeData, status: "pending",
    });

    await Notification.create({ title: "New school registration", message: `${school.name} registered via ${form.title}.`, type: "approval" }).catch(() => {});

    // Auto sign-in
    const payload = { id: user._id.toString(), role: "school", name: user.name, email, school: school._id.toString() };
    const access = signAccessToken(payload);
    const refresh = signRefreshToken({ id: payload.id });
    user.refreshTokens = [refresh];
    user.lastLogin = new Date();
    await user.save();
    const store = await cookies();
    store.set(accessCookie(access));
    store.set(refreshCookie(refresh));

    return ok({ user: payload, successMessage: form.successMessage, loggedIn: true }, "Registration complete", 201);
  } catch (err) { return handleError(err); }
}

// Admin: list submissions or export xlsx
export async function GET(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const status = searchParams.get("status");
    const exp = searchParams.get("export");
    const filter = {};
    if (slug) filter.formSlug = slug;
    if (status) filter.status = status;

    const items = await Registration.find(filter).sort({ createdAt: -1 }).lean();

    if (exp === "xlsx") {
      const rows = items.map((r) => ({
        School: r.schoolName, Form: r.formTitle, Email: r.email, Phone: r.phone,
        Status: r.status, SubmittedAt: new Date(r.createdAt).toLocaleString("en-IN"),
        City: r.data?.city || "", State: r.data?.state || "", Affiliation: r.data?.affiliation || "",
        Principal: r.data?.principalName || "",
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registrations");
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      return new Response(buf, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="registrations-${Date.now()}.xlsx"`,
        },
      });
    }
    return ok({ items });
  } catch (err) { return handleError(err); }
}

export async function PATCH(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id, status, notes } = sanitize(await req.json());
    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;
    const item = await Registration.findByIdAndUpdate(id, update, { new: true });
    return ok({ item }, "Updated");
  } catch (err) { return handleError(err); }
}

export async function DELETE(req) {
  try {
    const { error } = await requireAuth(["admin", "super_admin"]);
    if (error) return error;
    await connectDB();
    const { id } = await req.json();
    await Registration.findByIdAndDelete(id);
    return ok({}, "Deleted");
  } catch (err) { return handleError(err); }
}
