import * as XLSX from "xlsx";

// ---------------- Results import ----------------
// Supports both formats:
// 1) Per-subject sheet: CANDIDATE ID | CANDIDATE NAME | CLASS | SECTION | SUBJECT | SCHOOL | Total | Percentage
// 2) Multi-subject sheet: StudentCode | StudentName | Class | Section | English | Maths | ... | Total | Max | Rank
const R_ALIASES = {
  studentCode: ["studentcode", "candidateid", "candidatecode", "enrollmentno", "enrolmentno", "enrollmentnumber", "rollno", "regno", "admitcardno", "id"],
  studentName: ["studentname", "candidatename", "sname", "name", "student", "candidate"],
  class: ["class", "std", "grade"],
  section: ["section", "sec"],
  subject: ["subject", "subjectname"],
  total: ["total", "marks", "totalmarks", "score", "marksobtained", "obtained"],
  max: ["max", "maxmarks", "outof", "fullmarks", "totalmax"],
  percentage: ["percentage", "percent", "per"],
  rank: ["rank", "schoolrank", "position"],
  session: ["session", "year"],
};
// columns never treated as subject marks
const R_IGNORE = new Set([
  ...Object.values(R_ALIASES).flat(),
  "school", "schoolname", "city", "state", "barcode", "medal", "grade", "remarks", "result", "srno", "sno", "slno", "sr", "dob", "gender", "mobile", "parentname", "fathername",
]);

const rNorm = (k) => String(k).toLowerCase().replace(/[^a-z0-9]/g, "");
const rClean = (v) => (v === null || v === undefined ? "" : typeof v === "number" ? String(v) : String(v).replace(/\s+/g, " ").trim());
const toNum = (v) => { const s = rClean(v); if (s === "") return null; const n = Number(s.replace(/%$/, "")); return Number.isNaN(n) ? null : n; };

export function medalFor(percentage) {
  if (percentage >= 85) return "gold";
  if (percentage >= 80) return "silver";
  if (percentage >= 75) return "bronze";
  return "none";
}

export function summarize(subjects) {
  const totalMarks = subjects.reduce((s, x) => s + (Number(x.marks) || 0), 0);
  const maxMarks = subjects.reduce((s, x) => s + (Number(x.maxMarks) || 0), 0);
  const percentage = maxMarks ? Math.round((totalMarks / maxMarks) * 10000) / 100 : 0;
  return { totalMarks, maxMarks, percentage, medal: medalFor(percentage) };
}

export function parseResultsExcel(buffer) {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  const errors = [];
  const parsed = [];

  rows.forEach((raw, i) => {
    const line = i + 2;
    const row = {};
    Object.keys(raw).forEach((k) => (row[rNorm(k)] = raw[k]));
    const pick = (f) => { for (const a of R_ALIASES[f]) if (row[a] !== undefined && rClean(row[a]) !== "") return row[a]; return ""; };

    const studentCode = rClean(pick("studentCode")).toUpperCase();
    const studentName = rClean(pick("studentName")).toUpperCase();
    if (!studentCode && !studentName) return; // blank row
    if (!studentCode) return errors.push({ line, error: `Missing Candidate ID / StudentCode (${studentName})` });
    if (!studentName) return errors.push({ line, error: `Missing Candidate Name (${studentCode})` });

    const subjectName = rClean(pick("subject")).toUpperCase();
    const total = toNum(pick("total"));
    const maxGiven = toNum(pick("max"));
    const pctGiven = toNum(pick("percentage"));
    const rank = toNum(pick("rank")) || 0;

    let subjects = [];
    let mode = "multi";
    if (subjectName) {
      // per-subject format: Total = marks of that subject
      mode = "single";
      if (total === null) return errors.push({ line, error: `Missing Total for ${studentCode}` });
      let maxMarks = maxGiven;
      if (!maxMarks) maxMarks = pctGiven && total ? Math.round((total * 100) / pctGiven) : 100;
      subjects = [{ subject: subjectName, marks: total, maxMarks }];
    } else {
      Object.keys(raw).forEach((orig) => {
        const key = rNorm(orig);
        if (!key || R_IGNORE.has(key) || key.startsWith("empty")) return;
        const n = toNum(raw[orig]);
        if (n === null) return;
        subjects.push({ subject: String(orig).trim().toUpperCase(), marks: n, maxMarks: 100 });
      });
      if (maxGiven && subjects.length) {
        const each = maxGiven / subjects.length;
        subjects = subjects.map((s) => ({ ...s, maxMarks: each }));
      }
      if (!subjects.length && total !== null) subjects = [{ subject: "TOTAL", marks: total, maxMarks: maxGiven || 100 }];
      if (!subjects.length) return errors.push({ line, error: `No marks found for ${studentCode}` });
    }

    const sum = summarize(subjects);
    if (mode === "multi" && total !== null) sum.totalMarks = total;
    if (mode === "multi" && maxGiven) sum.maxMarks = maxGiven;
    if (mode === "multi") {
      sum.percentage = sum.maxMarks ? Math.round((sum.totalMarks / sum.maxMarks) * 10000) / 100 : 0;
      sum.medal = medalFor(sum.percentage);
    }
    if (sum.maxMarks && sum.totalMarks > sum.maxMarks) return errors.push({ line, error: `Total (${sum.totalMarks}) exceeds Max (${sum.maxMarks}) for ${studentCode}` });

    parsed.push({
      line, mode, studentCode, studentName,
      class: rClean(pick("class")).toUpperCase(),
      section: rClean(pick("section")).toUpperCase(),
      subjects, ...sum, rank,
      session: rClean(pick("session")) || "2026-27",
    });
  });

  const seen = new Set();
  const unique = [];
  parsed.forEach((p) => {
    const key = `${p.studentCode}|${p.mode === "single" ? p.subjects[0].subject : "*"}`;
    if (seen.has(key)) return errors.push({ line: p.line, error: `Duplicate ${p.studentCode} in file` });
    seen.add(key);
    unique.push(p);
  });

  return { parsed: unique, errors };
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