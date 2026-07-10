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
