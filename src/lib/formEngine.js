// Pure helpers shared by the public form UI and the server-side validator.

export const isNote = (f) => f.type === "note";

export function isVisible(field, data) {
  if (!field.showIf?.field) return true;
  return String(data?.[field.showIf.field] ?? "") === String(field.showIf.equals ?? "");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// returns error string or "" if ok
export function validateField(field, value, data) {
  if (isNote(field) || !isVisible(field, data)) return "";
  const v = value;
  const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

  if (field.type === "richtext") {
    if (field.required && (!v || !String(v).replace(/<[^>]*>/g, "").trim())) return "This field is required";
    return "";
  }

  if (field.required) {
    if (field.type === "checkbox" && v !== true) return "This is required";
    if (field.type === "subjectDates") {
      const subs = field.opts?.subjects || [];
      const miss = subs.some((s) => !v || !v[s.name]);
      if (miss) return "Select a date for every subject";
      return "";
    }
    if (field.type === "classMatrix") {
      const total = matrixTotal(v);
      if (!total) return "Enter at least one student";
      return "";
    }
    if (empty) return "This field is required";
  }
  if (empty) return "";

  if (field.type === "email" && !EMAIL_RE.test(String(v))) return "Enter a valid email";
  const val = field.validation || {};
  if (field.type === "number") {
    const n = Number(v);
    if (Number.isNaN(n)) return "Enter a number";
    if (val.min != null && n < val.min) return `Minimum ${val.min}`;
    if (val.max != null && n > val.max) return `Maximum ${val.max}`;
  }
  if (typeof v === "string") {
    if (val.minLength && v.length < val.minLength) return `At least ${val.minLength} characters`;
    if (val.maxLength && v.length > val.maxLength) return `At most ${val.maxLength} characters`;
    if (val.pattern) {
      try { if (!new RegExp(val.pattern).test(v)) return val.patternMsg || "Invalid format"; } catch {}
    }
  }
  return "";
}

export function validateStep(step, data) {
  const errors = {};
  for (const f of step.fields) {
    const e = validateField(f, data[f.name], data);
    if (e) errors[f.name] = e;
  }
  return errors;
}

export function matrixTotal(matrix) {
  if (!matrix || typeof matrix !== "object") return 0;
  let t = 0;
  for (const row of Object.values(matrix))
    for (const val of Object.values(row || {})) t += Number(val) || 0;
  return t;
}

export function computeTotals(form, data) {
  let totalStudents = 0;
  for (const step of form.steps || [])
    for (const f of step.fields || [])
      if (f.type === "classMatrix") totalStudents += matrixTotal(data[f.name]);
  const totalAmount = Number(data.totalAmount) || 0;
  return { totalStudents, totalAmount };
}
