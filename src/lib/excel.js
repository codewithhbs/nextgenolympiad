import * as XLSX from "xlsx";

// Expected columns (case-insensitive):
// StudentCode, StudentName, Class, Section, Subject scores as "English","Maths"... , Total, Max, Rank
const KNOWN = ["studentcode", "studentname", "class", "section", "total", "max", "maxmarks", "rank", "session"];

export function parseResultsExcel(buffer) {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  const errors = [];
  const parsed = [];

  rows.forEach((raw, i) => {
    const row = {};
    Object.keys(raw).forEach((k) => (row[k.toString().trim().toLowerCase()] = raw[k]));
    const line = i + 2;

    const studentCode = String(row.studentcode || row["student code"] || "").trim().toUpperCase();
    const studentName = String(row.studentname || row["student name"] || "").trim();
    if (!studentCode) return errors.push({ line, error: "Missing StudentCode" });
    if (!studentName) return errors.push({ line, error: "Missing StudentName" });

    const subjects = [];
    Object.keys(row).forEach((key) => {
      const norm = key.replace(/\s+/g, "");
      if (KNOWN.includes(norm) || key.startsWith("student")) return;
      const val = row[key];
      if (val === "" || val == null) return;
      const marks = Number(val);
      if (!Number.isNaN(marks)) subjects.push({ subject: key, marks, maxMarks: Number(row.max || row.maxmarks || 100) });
    });

    const total = Number(row.total || subjects.reduce((s, x) => s + x.marks, 0)) || 0;
    const maxMarks = Number(row.max || row.maxmarks || subjects.reduce((s, x) => s + (x.maxMarks || 0), 0)) || 0;
    const rank = Number(row.rank || 0) || 0;
    if (maxMarks && total > maxMarks) errors.push({ line, error: `Total (${total}) exceeds Max (${maxMarks})` });

    const percentage = maxMarks ? Math.round((total / maxMarks) * 10000) / 100 : 0;
    let medal = "none";
    if (percentage >= 85) medal = "gold";
    else if (percentage >= 80) medal = "silver";
    else if (percentage >= 75) medal = "bronze";

    parsed.push({
      studentCode, studentName,
      class: String(row.class || "").trim(),
      section: String(row.section || "").trim(),
      subjects, totalMarks: total, maxMarks, percentage, rank, medal,
      session: String(row.session || "2026-27"),
    });
  });

  // duplicate detection within file
  const seen = new Set();
  parsed.forEach((p, i) => {
    if (seen.has(p.studentCode)) errors.push({ line: i + 2, error: `Duplicate StudentCode in file: ${p.studentCode}` });
    seen.add(p.studentCode);
  });

  return { parsed, errors };
}

// ---------------- Students bulk import ----------------
// Demo format: SNAME | CLASS | SECTION | SUBJECT | SCHOOL | CITY | STATE | ENROLLMENT NO | BARCODE
export const STUDENT_TEMPLATE_HEADERS = ["SNAME", "CLASS", "SECTION", "SUBJECT", "SCHOOL", "CITY", "STATE", "ENROLLMENT NO", "BARCODE"];

const STUDENT_ALIASES = {
  name: ["sname", "studentname", "name", "student"],
  class: ["class", "std", "grade"],
  section: ["section", "sec"],
  subject: ["subject", "subjectname"],
  schoolName: ["school", "schoolname"],
  city: ["city"],
  state: ["state"],
  studentCode: ["enrollmentno", "enrolmentno", "enrollmentnumber", "enrollment", "studentcode", "rollno", "regno"],
  barcode: ["barcode"],
  parentName: ["parentname", "fathername", "parent"],
  mobile: ["mobile", "phone", "mobileno"],
};

const normKey = (k) => String(k).toLowerCase().replace(/[^a-z0-9]/g, "");
const clean = (v) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  return String(v).replace(/\s+/g, " ").trim();
};

export function parseStudentsExcel(buffer) {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  const errors = [];
  const parsed = [];

  rows.forEach((raw, i) => {
    const line = i + 2;
    const byKey = {};
    Object.keys(raw).forEach((k) => (byKey[normKey(k)] = raw[k]));
    const pick = (field) => {
      for (const a of STUDENT_ALIASES[field]) if (byKey[a] !== undefined && clean(byKey[a]) !== "") return clean(byKey[a]);
      return "";
    };

    const r = {
      name: pick("name").toUpperCase(),
      class: pick("class"),
      section: pick("section").toUpperCase(),
      subject: pick("subject").toUpperCase(),
      schoolName: pick("schoolName"),
      city: pick("city"),
      state: pick("state"),
      studentCode: pick("studentCode").toUpperCase(),
      barcode: pick("barcode"),
      parentName: pick("parentName"),
      mobile: pick("mobile"),
    };

    // skip fully blank rows silently
    if (!r.name && !r.studentCode && !r.class) return;
    if (!r.name) return errors.push({ line, error: "Missing SNAME" });
    if (!r.studentCode) return errors.push({ line, error: `Missing ENROLLMENT NO (${r.name})` });
    if (!r.class) return errors.push({ line, error: `Missing CLASS (${r.name})` });

    parsed.push({ ...r, line });
  });

  const seen = new Set();
  const unique = [];
  parsed.forEach((p) => {
    const key = `${p.studentCode}|${p.subject}`;
    if (seen.has(key)) return errors.push({ line: p.line, error: `Duplicate ENROLLMENT NO ${p.studentCode}${p.subject ? ` for ${p.subject}` : ""} in file` });
    seen.add(key);
    unique.push(p);
  });

  return { parsed: unique, errors, totalRows: rows.length };
}
