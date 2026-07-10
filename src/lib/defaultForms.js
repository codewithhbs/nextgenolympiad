import { connectDB } from "@/lib/db";
import RegistrationForm from "@/models/RegistrationForm";

const MOBILE = { pattern: "^[0-9+\\-\\s]{8,15}$", patternMsg: "Enter a valid phone number" };
const PIN = { pattern: "^[0-9]{6}$", patternMsg: "Enter a valid 6-digit PIN code" };

const affiliationOpts = ["CBSE", "ICSE", "State Board", "IB", "British", "American", "Other"].map((v) => ({ label: v, value: v }));

// Lean, single-step school registration. Coordinator, Accounts, students
// (class-wise) and payment are handled from the school dashboard after login.
function schoolStep() {
  return {
    key: "school",
    title: "School Details",
    description: "A few quick details to register your school. You can add students and complete payment from your dashboard after login.",
    fields: [
      { name: "_noteA", label: "Contact Details", type: "note", hint: "The email and mobile provided will be used for login, materials, schedules, results and awards.", colSpan: 2 },
      { name: "schoolCode", label: "NextGen School Code", type: "text", hint: "Leave blank if not known", colSpan: 1 },
      { name: "schoolName", label: "School Name", type: "text", required: true, colSpan: 1 },
      { name: "address", label: "School Address", type: "textarea", required: true, colSpan: 2 },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "pincode", label: "PIN Code", type: "tel", required: true, validation: PIN },
      { name: "country", label: "Country", type: "radio", required: true, options: [{ label: "India", value: "India" }, { label: "Abroad", value: "Abroad" }] },
      { name: "countryName", label: "Name of the Country", type: "text", showIf: { field: "country", equals: "Abroad" } },
      { name: "schoolMobile", label: "School Mobile No.", type: "tel", required: true, validation: MOBILE },
      { name: "email", label: "E-mail (login ID)", type: "email", required: true },
      { name: "website", label: "Website", type: "url", placeholder: "www." },
      { name: "_noteLogin", label: "Create your login", type: "note", hint: "Set a password now. After registering you'll log in to add students and complete payment.", colSpan: 2 },
      { name: "password", label: "Password", type: "password", required: true, validation: { minLength: 6 }, hint: "Minimum 6 characters" },
      { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, validation: { minLength: 6 } },
      { name: "affiliation", label: "School Affiliation", type: "radio", required: true, options: affiliationOpts, colSpan: 2 },
      { name: "affiliationOther", label: "Please mention affiliation", type: "text", showIf: { field: "affiliation", equals: "Other" }, colSpan: 2 },
      { name: "principalName", label: "Principal's Name", type: "text", required: true },
      { name: "principalMobile", label: "Principal's Mobile", type: "tel", required: true, validation: MOBILE },
      { name: "declaration", label: "I confirm the information provided is true and correct.", type: "checkbox", required: true, colSpan: 2 },
    ],
  };
}

export const FORM_VERSION = 3; // bump when the default forms below change

export const DEFAULT_FORMS = [
  {
    slug: "olympiad",
    title: "NextGen Olympiad — School Registration",
    subtitle: "Classes I to X · English · Computational Thinking · Maths · STEM / EVS",
    order: 1,
    isActive: true,
    formVersion: FORM_VERSION,
    successMessage: "<p>Registration received. Log in to your dashboard to add students and complete payment.</p>",
    steps: [schoolStep()],
  },
  {
    slug: "wonderkids",
    title: "Wonder Kids Olympiad — School Registration",
    subtitle: "Bal Vatika I, II & III · English · Mathematics · EVS · Drawing",
    order: 2,
    isActive: true,
    formVersion: FORM_VERSION,
    successMessage: "<p>Registration received. Log in to your dashboard to add students and complete payment.</p>",
    steps: [schoolStep()],
  },
];

/**
 * Ensure the two managed default forms exist AND are up to date.
 * - missing slug  -> insert
 * - older version -> refresh steps/title/etc (keeps isActive), so old DB forms
 *   pick up the lean steps + password login fields without a manual re-seed.
 * Custom admin-built forms (other slugs) are never touched.
 */
export async function ensureDefaultForms() {
  await connectDB();
  for (const def of DEFAULT_FORMS) {
    const existing = await RegistrationForm.findOne({ slug: def.slug });
    if (!existing) { await RegistrationForm.create(def); continue; }
    if ((existing.formVersion || 0) < FORM_VERSION) {
      existing.title = def.title;
      existing.subtitle = def.subtitle;
      existing.successMessage = def.successMessage;
      existing.steps = def.steps;
      existing.formVersion = FORM_VERSION;
      await existing.save();
    }
  }
}
