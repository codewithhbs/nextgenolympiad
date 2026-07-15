import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Calculator, Leaf, Palette, Baby, Sparkles, HeartHandshake,
  Brain, Sprout, BookOpenText, Lightbulb, Heart,
} from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "Wonder Kids Olympiad",
  description:
    "Wonder Kids Olympiad from NextGen — for Bal Vatika I, II & III. English, Mathematics, EVS and Drawing, aligned with NEP 2020 and ECCE.",
};

const SUBJECTS = [
  { icon: BookOpen, name: "English" },
  { icon: Calculator, name: "Mathematics" },
  { icon: Leaf, name: "EVS" },
  { icon: Palette, name: "Drawing" },
];

const WK_PILLARS = [
  {
    title: "NEP 2020 Aligned", icon: Sprout, color: "#16a34a", soft: "#dcfce7",
    points: ["Supports Early Childhood Care & Education (ECCE)", "Focuses on the foundational years of learning", "Encourages cognitive, emotional, physical and social development"],
  },
  {
    title: "Activity & Play Based Learning", icon: Palette, color: "#ea580c", soft: "#ffedd5",
    points: ["Learning through activities and joyful discovery", "Builds curiosity and creativity", "Makes learning enjoyable and engaging"],
  },
  {
    title: "Strong Foundation", icon: BookOpenText, color: "#2563eb", soft: "#dbeafe",
    points: ["Literacy", "Numeracy", "Critical Thinking", "Holistic Development"],
  },
  {
    title: "Designed for Early Learners", icon: Lightbulb, color: "#7c3aed", soft: "#ede9fe",
    points: ["Encourages age-appropriate learning", "Develops observation and analytical reasoning", "Introduces structured thinking and problem-solving"],
  },
  {
    title: "Learning with Care", icon: Heart, color: "#e11d48", soft: "#ffe4e6",
    points: ["Guided by dedicated teachers", "Builds confidence and love for learning", "Prepares children for future academic success"],
  },
];

const PILLARS = [
  { icon: Brain, title: "Cognitive development", text: "Playful reasoning and pattern recognition built for a 4–6 year old mind." },
  { icon: HeartHandshake, title: "Socio-emotional growth", text: "Confidence and curiosity nurtured through a pressure-free assessment." },
  { icon: Sparkles, title: "Foundation for life", text: "A strong early base that supports every year of learning that follows." },
];

export default function WonderKidsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2 md:px-6">
          <div className="text-center md:text-left">
            <span className="inline-flex rounded-full bg-gold-soft px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-ink sm:text-sm">
              Bal Vatika I, II &amp; III
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Wonder Kids <span className="text-brand">Olympiad</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate md:mx-0 md:text-lg">
              From NextGen — designed especially for early learners to build a strong foundation for lifelong learning and success.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link href="/apply"><Button size="lg">Register School</Button></Link>
              <Link href="/awards"><Button variant="outline" size="lg">Awards &amp; Certification</Button></Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md">
            <Image src="/brand/wonderkids.png" alt="Wonder Kids Olympiad" fill className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* NEP INTRO */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line shadow-card">
            <Image src="/brand/happykid.jpg" alt="Early learner" fill className="object-cover" />
          </div>
          <div>
            <Badge tone="gold">NEP 2020 · ECCE</Badge>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">Built for the foundational stage</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate md:text-lg">
              India&apos;s early education landscape is undergoing a significant transformation with the National Education
              Policy 2020, which recognises Early Childhood Care and Education as the foundational stage of a child&apos;s
              learning journey. It emphasises nurturing cognitive, socio-emotional, physical and social development during
              these formative years.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate md:text-lg">
              Wonder Kids Olympiad turns that policy into practice — a joyful, age-appropriate assessment that celebrates
              every child&apos;s effort.
            </p>
          </div>
        </div>
      </section>

      {/* SUBJECTS + PILLARS */}
      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <Badge tone="gold" className="px-5 py-2 text-base sm:text-lg rounded-xl">Subjects</Badge>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl md:text-4xl">Four gentle subjects</h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {SUBJECTS.map((s) => (
              <div key={s.name} className="rounded-3xl border border-line bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:border-gold sm:p-7">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand sm:h-16 sm:w-16">
                  <s.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mt-3 sm:mt-4 sm:text-sm md:text-md font-display font-extrabold text-ink leading-tight">
                  {s.name}
                </h3>             
                 </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{p.title}</h3>
                <p className="mt-2 text-base font-medium leading-relaxed text-slate">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WONDER KIDS — 5 pillars */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16 md:px-6">
        <div className="text-center">
          <Badge tone="gold" className="px-5 py-2 text-base sm:text-lg rounded-xl">Why Wonder Kids</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">Learning that fits little minds</h2>
          <CrestDivider className="mt-6" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WK_PILLARS.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col rounded-3xl border bg-white p-6 text-center shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              style={{ borderColor: p.soft }}
            >
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full transition group-hover:scale-105"
                style={{ backgroundColor: p.soft, color: p.color }}
              >
                <p.icon className="h-8 w-8" strokeWidth={2} />
              </div>

              <h3 className="mt-5 font-display text-lg font-extrabold leading-snug" style={{ color: p.color }}>
                {p.title}
              </h3>

              <div className="mx-auto mt-3 h-px w-3/4 border-t border-dotted" style={{ borderColor: p.color }} />

              <ul className="mt-4 space-y-3 text-left">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm font-medium leading-snug text-slate">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* certificate banner */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-brand-deep p-7 text-center text-white shadow-soft sm:p-8 md:flex-row md:text-left">
          <Baby className="h-10 w-10 shrink-0 text-gold" />
          <div className="md:flex-1">
            <h3 className="font-display text-2xl font-extrabold">Every Wonder Kid gets a certificate</h3>
            <p className="mt-2 text-base font-semibold text-white/90 sm:text-lg">
              Participation is celebrated. Progress is reported. Nobody is ranked against lakhs of others.
            </p>
          </div>
          <Link href="/awards" className="shrink-0"><Button variant="gold">See Awards &amp; Certification</Button></Link>
        </div>
      </section>
    </>
  );
}