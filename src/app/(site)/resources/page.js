import Link from "next/link";
import { FileText, FileStack, PencilRuler, BookMarked, ListChecks, ClipboardCheck, Download, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Badge, Button, CrestDivider } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";
import GuidesResources from "@/components/site/Guidesresources";
import Image from "next/image";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch { }
  return buildMetadata({
    title: `Study Resources • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Sample papers, previous-year questions, worksheets and preparation guides for the NextGen Olympiad, plus how-to guides for OMR and registration.",
    path: "/resources",
    siteName: s.siteName,
  });
}
const MATERIALS = [
  { icon: FileText, title: "Sample Papers", text: "Real exam-pattern papers so students know exactly what to expect.", img: "/materials/sample-papers.jpg", href: "/resources/sample-papers" },
  { icon: ClipboardCheck, title: "Mock Tests", text: "Timed online mocks that build speed, accuracy and exam confidence.", img: "/materials/mock-tests.jpg", href: "/resources/mock-tests" },
  { icon: BookOpen, title: "Syllabus & Blueprint", text: "Class-wise syllabus and marking scheme, mapped topic by topic.", img: "/materials/syllabus.jpg", href: "/resources/syllabus" },
  { icon: Layers, title: "Previous Year Papers", text: "A decade of past papers with solutions for focused revision.", img: "/materials/pyq.jpg", href: "/resources/previous-year-papers" },
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
      <section className="relative overflow-hidden bg-navy-deep py-14 text-white md:py-20">
        {/* doodles */}
        <span className="pointer-events-none absolute left-1/2 top-8 select-none text-5xl font-bold text-white/10">?</span>
        <span className="pointer-events-none absolute right-[42%] top-24 select-none text-3xl text-gold/30">✦</span>
        <span className="pointer-events-none absolute bottom-16 right-8 select-none text-4xl text-gold/20">✧</span>
        <span className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
        <span className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Study Resources
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.12] md:text-5xl">
              Everything to prepare
              <br />
              with <span className="text-brand">confidence</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              Olympiad preparation material and clear how-to guides — so students and coordinators are never unsure about the process.
            </p>

            {/* quick links */}
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Exam Guides",
                  icon: (
                    <path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm11-2v5h5" />
                  ),
                },
                {
                  label: "Sample Papers",
                  icon: <path d="M8 3h8l4 4v14H4V3h4Zm0 8h8M8 15h5" />,
                },
                {
                  label: "How-to Videos",
                  icon: (
                    <>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M10 9.5v5l4-2.5-4-2.5Z" />
                    </>
                  ),
                },
                {
                  label: "Syllabus",
                  icon: <path d="M12 6.5A5.5 5.5 0 0 0 4 5v13a5.5 5.5 0 0 1 8 1.5A5.5 5.5 0 0 1 20 18V5a5.5 5.5 0 0 0-8 1.5Zm0 0V20" />,
                },
              ].map((q) => (
                <button
                  key={q.label}
                  type="button"
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur transition hover:border-gold/40 hover:bg-white/10"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold">
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {q.icon}
                    </svg>
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-white/80">{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white/5">
              <Image
                src="/brand/happykid.jpg"
                alt="Student preparing for Olympiad"
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-deep/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 right-2 w-52 rounded-2xl bg-white p-4 text-navy-deep shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)] md:-right-6">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-gold">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m12 3 2.5 5.5L20 9.5l-4 3.8 1 5.7-5-2.8-5 2.8 1-5.7-4-3.8 5.5-1L12 3Z" />
                </svg>
              </span>
              <p className="mt-3 text-sm font-extrabold leading-snug">Practice Today, Excel Tomorrow</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">Small steps every day lead to big achievements.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Materials */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <Badge tone="gold">Preparation Material</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Practice like it's exam day</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate">
            Everything a student needs to walk in prepared — sample papers, mock tests and topic-wise practice.
          </p>
          <CrestDivider className="mt-6" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIALS.map((m) => (
            <Link
            href={m.href}
              key={m.title}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-soft"
            >
              
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={m.img}
                  alt={m.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-navy shadow-md backdrop-blur">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="absolute inset-x-4 bottom-3 font-display text-lg font-bold text-white drop-shadow">
                  {m.title}
                </h3>
              </div>
            
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate">{m.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-gold-ink transition group-hover:gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/50 p-5 text-center text-sm text-gold-ink">
          Registered schools receive preparation material through their school dashboard. Not registered yet?{" "}
          <Link href="/apply" className="font-bold underline">Register your school</Link>.
        </div>
      </section>
      <GuidesResources
        slides={[
          {
            tag: "OMR Guide",
            title: "How to Fill an OMR Sheet Correctly",
            description:
              "Master the correct OMR filling process with step-by-step guidance and avoid common mistakes that can affect your evaluation.",
            image:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
          {
            tag: "Practice",
            title: "Practice Like It's Exam Day",
            description:
              "Boost your confidence with real exam-style practice papers and experience the Olympiad environment before the actual test.",
            image:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
          {
            tag: "Registration",
            title: "How to Register for the Olympiad",
            description:
              "Learn the complete registration process for students and schools with an easy step-by-step walkthrough.",
            image:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
          {
            tag: "Answer Sheet",
            title: "How to Write the Answer Sheet",
            description:
              "Understand the correct method of marking answers, writing details, and submitting your answer sheet accurately.",
            image:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
          {
            tag: "Preparation",
            title: "Smart Tips to Score Higher",
            description:
              "Discover effective preparation strategies, time management techniques, and expert tips to maximize your Olympiad performance.",
            image:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail:
              "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
        ]}
        videos={[
          { title: "How to Fill OMR Sheet", description: "Step-by-step guide...", icon: "doc", thumbnail: "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008403/nextgen/media/njwuy8i0kslnerbloa65.jpg", videoUrl: "https://www.youtube.com/watch?v=pLV5lh55KFg" },
          { title: "How to Fill Answer Sheet", description: "Learn how to write...", icon: "pen", thumbnail: "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008471/nextgen/media/mvopsdhma4qgctyxajia.jpg", videoUrl: "..." },
          { title: "Educational Tour Guide", description: "Explore exciting trips...", icon: "plane", thumbnail: "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008512/nextgen/media/npt38nxwa6sdyjtvti7k.jpg", videoUrl: "..." },
          { title: "How to Enroll", description: "Complete process...", icon: "ticket", thumbnail: "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008609/nextgen/media/zlrkxrbudzqbbjgaxwwv.jpg", videoUrl: "..." },
        ]}
      />
      {/* How-to guides */}
      <section className="bg-parchment py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
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
      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-navy-deep px-6 py-10 md:px-12 md:py-12">
          {/* decor */}
          <span className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
          <span className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
          <svg className="pointer-events-none absolute right-1/3 top-6 h-20 w-20 text-white/5" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 6 }).map((__, c) => <circle key={`${r}-${c}`} cx={6 + c * 16} cy={6 + r * 16} r="1.8" />)
            )}
          </svg>

          <div className="relative flex flex-col items-center gap-10 md:flex-row md:justify-between">
            {/* text + buttons */}
            <div className="text-center md:text-left">
              <h2 className="font-display capitalize text-3xl font-extrabold text-white md:text-4xl">
                Have the brochure <span className="text-brand">handy</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70 md:mx-0">
                The full brochure covers subjects, dates, awards and scholarships for 2026–27.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link href="/brand/brochure.pdf" target="_blank">
                  <Button variant="gold" size="lg" className="gap-2">
                    <Download className="h-4 w-4" /> Download Brochure
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Ask a question
                  </Button>
                </Link>
              </div>
            </div>

            {/* brochure visual */}
            <div className="relative flex shrink-0 items-end gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
                  <path d="M16 5h3v2a3 3 0 0 1-3 3M8 5H5v2a3 3 0 0 0 3 3" />
                  <path d="M12 11v4M9 19h6M10 15h4l1 4H9l1-4Z" />
                </svg>
              </span>

              <div className="relative h-44 w-32 rotate-[-6deg] overflow-hidden rounded-xl bg-white/10 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)] md:h-52 md:w-40">
                <Image src="/brand/poster.png" alt="" fill className="object-cover" sizes="160px" />
              </div>

              <div className="relative -ml-14 h-52 w-36 rotate-[4deg] overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/20 md:h-60 md:w-44">
                <Image src="/brand/poster.png" alt="Olympiad brochure cover" fill className="object-cover" sizes="176px" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
