"use client";
import Image from "next/image";
import {
  Brain, Target, Trophy, Award, Sparkles, Star, Send, Wheat,
  BookOpen, Cog, Calculator, Leaf, Atom,
} from "lucide-react";

const CARDS = [
  {
    n: "01", icon: Brain, title: "Conceptual Understanding",
    text: "Age-appropriate questions that build genuine clarity and application over rote.",
    ring: "bg-blue-50 text-blue-600", bar: "bg-blue-500", tab: "bg-blue-600",
    tint: "from-blue-50/70", edge: "border-blue-100",
  },
  {
    n: "02", icon: Target, title: "Healthy Competition",
    text: "A confidence-building platform that celebrates effort at every level.",
    ring: "bg-green-50 text-green-700", bar: "bg-green-600", tab: "bg-green-600",
    tint: "from-green-50/70", edge: "border-green-100",
  },
  {
    n: "03", icon: Trophy, title: "Rewards & Recognition",
    text: "Medals, certificates and special prizes for meritorious performers.",
    ring: "bg-amber-50 text-amber-500", bar: "bg-amber-500", tab: "bg-amber-500",
    tint: "from-amber-50/70", edge: "border-amber-100",
  },
  {
    n: "04", icon: Award, title: "National-Level Ranking",
    text: "School, zonal and national recognition backed by a decade of trust.",
    ring: "bg-purple-50 text-purple-600", bar: "bg-purple-500", tab: "bg-purple-600",
    tint: "from-purple-50/70", edge: "border-purple-100",
  },
];

const SUBJECTS = [
  { icon: BookOpen, label: "English", c: "text-blue-600" },
  { icon: Cog, label: "Computational Thinking", c: "text-green-600" },
  { icon: Calculator, label: "Mathematics", c: "text-amber-500" },
  { icon: Leaf, label: "EVS", c: "text-green-700" },
  { icon: Atom, label: "STEM", c: "text-red-500" },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 md:py-24">
      {/* floating decor */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <Star className="absolute left-[22%] top-16 h-4 w-4 fill-amber-400 text-amber-400 opacity-70" />
        <Star className="absolute right-[24%] top-12 h-3 w-3 fill-amber-400 text-amber-400 opacity-70" />
        <Sparkles className="absolute left-1/2 top-40 h-4 w-4 -translate-x-1/2 text-amber-400 opacity-70" />
        <Send className="absolute right-[16%] top-24 hidden h-7 w-7 -rotate-12 text-blue-200 sm:block" />
        <div className="absolute right-6 top-40 hidden grid-cols-6 gap-1.5 opacity-40 lg:grid">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          ))}
        </div>
        {/* corner waves */}
        <div className="absolute -bottom-10 -left-10 h-40 w-72 rotate-6 rounded-[50%] bg-blue-600/90" />
        <div className="absolute -bottom-16 -left-4 h-40 w-80 rotate-6 rounded-[50%] bg-amber-400/90" />
        <div className="absolute -bottom-14 -right-10 h-40 w-80 -rotate-6 rounded-[50%] bg-red-500/90" />
        <div className="absolute -bottom-20 -right-4 h-40 w-72 -rotate-6 rounded-[50%] bg-amber-400/90" />
      </div>

      {/* medal + trophy */}
      <Image
        src="/why-nextgen/medal.png" alt="Medal" width={226} height={290} priority
        className="pointer-events-none absolute left-2 top-2 z-10 h-20 w-auto drop-shadow-md sm:left-6 sm:h-28 lg:h-40"
      />
      <Image
        src="/why-nextgen/trophy.png" alt="Trophy" width={328} height={335}
        className="pointer-events-none absolute right-1 top-24 z-10 h-24 w-auto drop-shadow-md sm:right-4 sm:top-28 sm:h-32 lg:top-32 lg:h-44"
      />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            Why NextGen
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Built for <span className="text-red-600">Young Minds</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            Every element of the NextGen Olympiad is designed to help students grow,
            compete and excel with confidence.
          </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400 sm:w-24" />
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400 sm:w-24" />
          </div>
        </div>

        {/* cards */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {CARDS.map((c) => (
            <div
              key={c.n}
              className={`group relative overflow-hidden rounded-2xl border ${c.edge} bg-gradient-to-b ${c.tint} to-white p-6 pb-8 text-center shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.25)]`}
            >
              <div className={`mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full ${c.ring} transition group-hover:scale-105`}>
                <c.icon className="h-8 w-8" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold leading-snug text-slate-900">{c.title}</h3>
              <span className={`mx-auto mt-3 block h-1 w-8 rounded-full ${c.bar}`} />
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{c.text}</p>

              {/* numbered corner tab */}
              <span className={`absolute bottom-0 left-0 flex h-9 w-12 items-center justify-center rounded-tr-xl ${c.tab} text-sm font-bold text-white`}>
                {c.n}
              </span>
            </div>
          ))}
        </div>

        {/* subjects strip */}
        <div className="mt-10 rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.15)] backdrop-blur sm:mt-14 sm:p-8">
          <div className="flex items-center justify-center gap-3">
            <Wheat className="h-6 w-6 -scale-x-100 text-amber-500" />
            <span className="text-center text-xs font-extrabold uppercase tracking-[0.18em] text-slate-700 sm:text-sm">
              Olympiad Subjects <span className="text-amber-500">·</span> Classes I–X
            </span>
            <Wheat className="h-6 w-6 text-amber-500" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {SUBJECTS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:shadow"
              >
                <s.icon className={`h-4 w-4 ${s.c}`} strokeWidth={2} />
                {s.label}
              </span>
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-slate-500 sm:text-sm">
            <span className="font-semibold text-slate-700">Wonder Kids (Bal Vatika I–III):</span>{" "}
            English · Mathematics · EVS · Drawing · Hindi
          </p>
        </div>
      </div>
    </section>
  );
}