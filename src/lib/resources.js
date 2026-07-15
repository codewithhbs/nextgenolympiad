
const API = process.env.NEXT_PUBLIC_SITE_URL;

const DEMO = {
  "sample-papers": [
    { id: "sp1", title: "Class 6 Mathematics Sample Paper 2026", class: "Class 6", subject: "Mathematics", year: 2026, size: "2.4 MB", updatedAt: "2026-07-13", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class6-maths-2026.pdf" },
    { id: "sp2", title: "Class 6 Science Sample Paper 2026", class: "Class 6", subject: "Science", year: 2026, size: "3.1 MB", updatedAt: "2026-07-10", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class6-science-2026.pdf" },
    { id: "sp3", title: "Class 7 English Sample Paper 2026", class: "Class 7", subject: "English", year: 2026, size: "2.7 MB", updatedAt: "2026-07-08", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class7-english-2026.pdf" },
    { id: "sp4", title: "Class 8 Mathematics Sample Paper 2025", class: "Class 8", subject: "Mathematics", year: 2025, size: "2.9 MB", updatedAt: "2026-06-20", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class8-maths-2025.pdf" },
    { id: "sp5", title: "Class 9 EVS Sample Paper 2026", class: "Class 9", subject: "EVS", year: 2026, size: "1.8 MB", updatedAt: "2026-06-15", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class9-evs-2026.pdf" },
    { id: "sp6", title: "Class 10 STEM Sample Paper 2026", class: "Class 10", subject: "STEM", year: 2026, size: "3.4 MB", updatedAt: "2026-06-10", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class10-stem-2026.pdf" },
    { id: "sp7", title: "Class 7 Mathematics Sample Paper 2026", class: "Class 7", subject: "Mathematics", year: 2026, size: "2.5 MB", updatedAt: "2026-05-28", desc: "Practice paper based on latest exam pattern with detailed solutions.", url: "/pdfs/sample/class7-maths-2026.pdf" },
  ],
  "mock-tests": [
    { id: "mt1", title: "Class 6 Mathematics Mock Test 2026", class: "Class 6", subject: "Mathematics", year: 2026, size: "1.9 MB", updatedAt: "2026-07-12", desc: "Full-length timed mock test with answer key.", url: "/pdfs/mock/class6-maths-2026.pdf" },
    { id: "mt2", title: "Class 8 Science Mock Test 2026", class: "Class 8", subject: "Science", year: 2026, size: "2.2 MB", updatedAt: "2026-07-05", desc: "Full-length timed mock test with answer key.", url: "/pdfs/mock/class8-science-2026.pdf" },
    { id: "mt3", title: "Class 9 English Mock Test 2026", class: "Class 9", subject: "English", year: 2026, size: "2.0 MB", updatedAt: "2026-06-30", desc: "Full-length timed mock test with answer key.", url: "/pdfs/mock/class9-english-2026.pdf" },
    { id: "mt4", title: "Class 10 STEM Mock Test 2026", class: "Class 10", subject: "STEM", year: 2026, size: "2.6 MB", updatedAt: "2026-06-18", desc: "Full-length timed mock test with answer key.", url: "/pdfs/mock/class10-stem-2026.pdf" },
  ],
  "syllabus": [
    { id: "sy1", title: "Class 6 Olympiad Syllabus 2026", class: "Class 6", subject: "All Subjects", year: 2026, size: "0.9 MB", updatedAt: "2026-07-01", desc: "Class-wise syllabus and marking scheme, mapped topic by topic.", url: "/pdfs/syllabus/class6-2026.pdf" },
    { id: "sy2", title: "Class 8 Olympiad Syllabus 2026", class: "Class 8", subject: "All Subjects", year: 2026, size: "1.0 MB", updatedAt: "2026-06-25", desc: "Class-wise syllabus and marking scheme, mapped topic by topic.", url: "/pdfs/syllabus/class8-2026.pdf" },
    { id: "sy3", title: "Class 10 Olympiad Syllabus 2026", class: "Class 10", subject: "All Subjects", year: 2026, size: "1.1 MB", updatedAt: "2026-06-14", desc: "Class-wise syllabus and marking scheme, mapped topic by topic.", url: "/pdfs/syllabus/class10-2026.pdf" },
  ],
  "previous-year-papers": [
    { id: "py1", title: "Class 6 Mathematics Previous Year Paper 2025", class: "Class 6", subject: "Mathematics", year: 2025, size: "2.3 MB", updatedAt: "2026-01-10", desc: "Actual past paper with fully worked solutions.", url: "/pdfs/pyq/class6-maths-2025.pdf" },
    { id: "py2", title: "Class 7 Science Previous Year Paper 2024", class: "Class 7", subject: "Science", year: 2024, size: "2.5 MB", updatedAt: "2025-12-15", desc: "Actual past paper with fully worked solutions.", url: "/pdfs/pyq/class7-science-2024.pdf" },
    { id: "py3", title: "Class 9 English Previous Year Paper 2024", class: "Class 9", subject: "English", year: 2024, size: "2.1 MB", updatedAt: "2025-11-20", desc: "Actual past paper with fully worked solutions.", url: "/pdfs/pyq/class9-english-2024.pdf" },
    { id: "py4", title: "Class 10 STEM Previous Year Paper 2023", class: "Class 10", subject: "STEM", year: 2023, size: "3.0 MB", updatedAt: "2025-10-05", desc: "Actual past paper with fully worked solutions.", url: "/pdfs/pyq/class10-stem-2023.pdf" },
  ],
};

export async function getResources(type) {
  if (API) {
    try {
      const res = await fetch(`${API}/resources?type=${type}`, { next: { revalidate: 300 } });
      if (res.ok) {
        const json = await res.json();
        return json.data ?? json ?? [];
      }
    } catch (e) {
      console.error("getResources failed:", e);
    }
  }
  return DEMO[type] ?? [];
}

export const CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

export function deriveFacets(items) {
  const subjects = [...new Set(items.map((i) => i.subject).filter(Boolean))].sort();
  const years = [...new Set(items.map((i) => String(i.year)).filter(Boolean))].sort((a, b) => b - a);
  const classes = [...new Set(items.map((i) => i.class).filter(Boolean))].sort(
    (a, b) => (parseInt(a.replace(/\D/g, "")) || 0) - (parseInt(b.replace(/\D/g, "")) || 0)
  );
  return { subjects, years, classes };
}