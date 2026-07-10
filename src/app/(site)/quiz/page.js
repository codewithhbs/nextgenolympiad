import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Calendar, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Olympiads & Quizzes • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Explore NextGen Olympiad for Classes I–X and Wonder Kids for Bal Vatika I–III. Subjects, eligibility, exam pattern, rewards and how to register.",
    keywords: ["nextgen olympiad", "wonder kids", "bal vatika olympiad", "olympiad subjects", "olympiad exam pattern"],
    path: "/quiz",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

const programs = [
  {
    name: "NextGen Olympiad",
    forWhom: "Classes I – X",
    color: "saffron",
    subjects: ["English", "Mathematics", "Computational Thinking", "EVS", "STEM"],
    points: ["Two-level examination", "Concept + application focus", "Certificate for every participant", "Merit ranks & medals"],
  },
  {
    name: "Wonder Kids — Bal Vatika",
    forWhom: "Bal Vatika I – III",
    color: "grape",
    subjects: ["English", "Mathematics", "EVS", "Hindi", "Drawing"],
    points: ["Play-based, joyful format", "Age-appropriate questions", "Participation certificate", "Little-champion awards"],
  },
];

const pattern = [
  { icon: BookOpen, title: "Format", text: "Objective, multiple-choice questions tailored to each class level." },
  { icon: Calendar, title: "Schedule", text: "Conducted at your school on the scheduled olympiad day for session 2026-27." },
  { icon: Award, title: "Rewards", text: "Certificates for all, plus medals & trophies for top rank-holders." },
];

export default function QuizPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative bg-ink py-20 text-white">
        <div className="blob left-[-6rem] top-[-4rem] h-72 w-72 bg-saffron/30" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-saffron">Session 2026-27</span>
            <h1 className="text-4xl font-extrabold md:text-5xl">Olympiads built to make thinking fun</h1>
            <p className="mt-4 max-w-lg text-white/80">
              From Bal Vatika to Class X, our olympiads reward curiosity, reasoning and real understanding — not memorisation.
            </p>
            <div className="mt-7 flex gap-3">
              <Link href="/register"><Button size="lg">Register your school</Button></Link>
              <Link href="/results"><Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:border-saffron">Check results</Button></Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-card">
            <Image src="/brand/poster.png" alt="NextGen Olympiad 2026-27" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((p) => (
            <div key={p.name} className="rounded-3xl bg-white p-8 shadow-card">
              <span className={`inline-block rounded-full bg-${p.color}-soft px-3 py-1 text-xs font-bold text-${p.color}`}>{p.forWhom}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-ink">{p.name}</h3>
              <div className="mt-4">
                <div className="text-sm font-semibold text-ink-soft">Subjects</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.subjects.map((s) => (
                    <span key={s} className="rounded-full bg-cream px-3 py-1 text-sm font-semibold text-ink">{s}</span>
                  ))}
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-ink">Exam pattern & rewards</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pattern.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-7 text-center shadow-card">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-soft text-saffron">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/register"><Button size="lg">Get started — register now</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
