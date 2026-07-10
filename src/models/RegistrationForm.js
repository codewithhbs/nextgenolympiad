import mongoose from "mongoose";

/**
 * Fully dynamic, admin-manageable multi-step registration form.
 * A form has ordered steps; each step has ordered fields.
 * Field types supported by the client engine:
 *  text | email | tel | number | url | textarea | select | radio | checkbox
 *  note        -> informational block (label = heading, hint = body)
 *  subjectDates-> Section B: pick one exam date per subject (opts.subjects[])
 *  classMatrix -> Section C: class rows x subject columns numeric grid (opts.rows[], opts.cols[])
 * Conditional display: field.showIf = { field: "<name>", equals: "<value>" }
 * Validation: required, min, max, minLength, maxLength, pattern (regex string), patternMsg
 */
const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    placeholder: String,
    hint: String,
    required: { type: Boolean, default: false },
    colSpan: { type: Number, default: 1 }, // 1 or 2 (of a 2-col grid)
    options: [{ label: String, value: String }],
    showIf: {
      field: String,
      equals: String,
    },
    validation: {
      min: Number,
      max: Number,
      minLength: Number,
      maxLength: Number,
      pattern: String,
      patternMsg: String,
    },
    // subjectDates / classMatrix config
    opts: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    fields: [fieldSchema],
  },
  { _id: false }
);

const registrationFormSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    subtitle: String,
    isActive: { type: Boolean, default: true, index: true },
    formVersion: { type: Number, default: 1 },
    order: { type: Number, default: 0 },
    successMessage: { type: String, default: "Registration submitted successfully. Our team will contact you shortly." },
    steps: [stepSchema],
  },
  { timestamps: true }
);

export default mongoose.models.RegistrationForm || mongoose.model("RegistrationForm", registrationFormSchema);
