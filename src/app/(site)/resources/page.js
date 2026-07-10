import Link from "next/link";
import { FileText, FileStack, PencilRuler, BookMarked, ListChecks, ClipboardCheck, Download, ArrowRight } from "lucide-react";
import { Badge, Button, CrestDivider } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Study Resources • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Sample papers, previous-year questions, worksheets and preparation guides for the NextGen Olympiad, plus how-to guides for OMR and registration.",
    path: "/resources",
    siteName: s.siteName,
  });
}

const MATERIALS = [
  { icon: FileText, title: "Sample Papers", text: "Subject-wise sample papers modelled on the actual Olympiad pattern, from English to STEM." },
  { icon: FileStack, title: "Previous-Year Papers", text: "Past question papers so students know exactly what to expect on exam day." },
  { icon: PencilRuler, title: "Worksheets", text: "Topic-level practice worksheets that build application skills, not rote recall." },
  { icon: BookMarked, title: "Preparation Guides", text: "Concept summaries and study guides aligned to each class and subject." },
];

const OMR_STEPS = [
  "Use a blue or black ball pen only — never pencil or gel pen.",
  "Write your name, class and roll number clearly in the boxes provided.",
  "Fill the correct bubble completely and darkly; do not tick or cross.",
  "Mark only one answer per question — multiple marks are treated as wrong.",
  "Do not fold, tear or make stray marks on the OMR sheet.",
];

const REG_STEPS = [
  "Click Register School and choose your programme (Olympiad I–X or Wonder Kids).",
  "Complete Section A — school and coordinator contact details.",
  "Pick one exam date per subject in Section B (this cannot be changed later).",
  "Enter class-wise student counts in Section C; totals calculate automatically.",
  "Add payment details in Section D, accept the declaration and submit.",
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="bg-navy-deep py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">Study Resources</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold md:text-5xl">Everything to prepare with confidence</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">Olympiad preparation material and clear how-to guides — so students and coordinators are never unsure about the process.</p>
        </div>
      </section>

      {/* Materials */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <Badge tone="gold">Preparation Material</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Practice like it's exam day</h2>
          <CrestDivider className="mt-6" />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIALS.map((m) => (
            <div key={m.title} className="rounded-3xl border border-line bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold"><m.icon className="h-6 w-6" /></div>
              <h3 className="font-display text-lg font-bold text-navy">{m.title}</h3>
              <p className="mt-2 text-sm text-slate">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/50 p-5 text-center text-sm text-gold-ink">
          Registered schools receive preparation material through their school dashboard. Not registered yet?{" "}
          <Link href="/apply" className="font-bold underline">Register your school</Link>.
        </div>
      </section>

      {/* How-to guides */}
      <section className="bg-parchment py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
            <div className="mb-4 inline-flex items-center gap-2 text-gold-dark"><ListChecks className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">How to fill an OMR sheet</span></div>
            <ol className="space-y-3">
              {OMR_STEPS.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{i + 1}</span>
                  <span className="text-sm text-slate">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
            <div className="mb-4 inline-flex items-center gap-2 text-gold-dark"><ClipboardCheck className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-wide">How to register your school</span></div>
            <ol className="space-y-3">
              {REG_STEPS.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">{i + 1}</span>
                  <span className="text-sm text-slate">{s}</span>
                </li>
              ))}
            </ol>
            <Link href="/apply" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-dark hover:underline">Start registration <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-extrabold text-navy">Have the brochure handy</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate">The full brochure covers subjects, dates, awards and scholarships for 2026–27.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/brochure.pdf" target="_blank"><Button variant="gold" size="lg" className="gap-2"><Download className="h-4 w-4" /> Download Brochure</Button></Link>
          <Link href="/contact"><Button variant="outline" size="lg">Ask a question</Button></Link>
        </div>
      </section>
    </div>
  );
}
