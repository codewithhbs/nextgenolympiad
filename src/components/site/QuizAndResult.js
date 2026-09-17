import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, Palette, ArrowRight, BookOpen, Cog, Calculator, Atom, Leaf,
  Languages, Sparkles, Star, CalendarDays, Smile,
} from "lucide-react";
import ResultLookup from "@/components/site/ResultLookup";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes qr-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes qr-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes qr-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes qr-spin{to{transform:rotate(360deg)}}
@keyframes qr-cap{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-6px) rotate(-12deg)}60%{transform:translateY(0) rotate(8deg)}}
@keyframes qr-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes qr-shine{0%{transform:translateX(-120%) skewX(-20deg)}60%,100%{transform:translateX(320%) skewX(-20deg)}}
@keyframes qr-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes qr-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes qr-orbit{to{transform:rotate(360deg)}}
@keyframes qr-shine-text{0%{background-position:-200% 0}100%{background-position:200% 0}}
.qr-float{animation:qr-float 3.2s ease-in-out infinite}
.qr-wiggle{animation:qr-wiggle 2.4s ease-in-out infinite;transform-origin:50% 60%}
.qr-pop{animation:qr-pop 1.8s ease-in-out infinite}
.qr-spin{animation:qr-spin 6s linear infinite}
.qr-cap{animation:qr-cap 2.4s ease-in-out infinite}
.qr-glow{animation:qr-glow 2s ease-in-out infinite}
.qr-blob{animation:qr-blob 10s ease-in-out infinite}
.qr-nudge{animation:qr-nudge 1.2s ease-in-out infinite}
.qr-orbit{animation:qr-orbit 22s linear infinite}
.qr-orbit-rev{animation:qr-orbit 22s linear infinite reverse}
.qr-shine-text{background-size:200% 100%;animation:qr-shine-text 3.5s linear infinite}
.qr-card:hover .qr-sweep{animation:qr-shine 1.1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="qr-"]{animation:none!important}}
`;

/* ================= data ================= */
const PROGRAMS = [
  {
    key: "nextgen",
    icon: GraduationCap,
    iconAnim: "qr-cap",
    eyebrow: "Classes I – X",
    title: "NextGen Olympiad",
    text: "Conducted offline on multiple dates, with detailed reports for every learner.",
    href: "/olympiad/nextgen",
    image: "/brand/books.png",
    bg: "from-slate via-indigo-950 to-blue-900",
    blobA: "bg-blue-500/30",
    blobB: "bg-amber-400/20",
    iconGrad: "from-amber-400 to-orange-500",
    accent: "from-amber-300 via-orange-400 to-amber-300",
    btn: "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-amber-500/40",
    meta: { icon: CalendarDays, text: "Multiple exam dates" },
    subjects: [
      { label: "English", icon: BookOpen, anim: "qr-pop" },
      { label: "Computational Thinking", icon: Cog, anim: "qr-spin" },
      { label: "Mathematics", icon: Calculator, anim: "qr-wiggle" },
      { label: "STEM / EVS", icon: Atom, anim: "qr-spin" },
    ],
  },
  {
    key: "wonder",
    icon: Palette,
    iconAnim: "qr-wiggle",
    eyebrow: "Bal Vatika I – III",
    title: "Wonder Kids Olympiad",
    text: "Joyful, age-appropriate assessments designed for early learners.",
    href: "/olympiad/wonder-kids",
    image: "/brand/grilstudent.png",
    bg: "from-orange-500 via-rose-500 to-fuchsia-600",
    blobA: "bg-yellow-300/40",
    blobB: "bg-fuchsia-300/30",
    iconGrad: "from-slate to-indigo-900",
    accent: "from-white via-yellow-200 to-white",
    btn: "bg-slate text-white shadow-slate",
    meta: { icon: Smile, text: "Fun-first for little ones" },
    subjects: [
      { label: "English", icon: BookOpen, anim: "qr-pop" },
      { label: "Mathematics", icon: Calculator, anim: "qr-wiggle" },
      { label: "EVS", icon: Leaf, anim: "qr-float" },
      // { label: "Hindi", icon: Languages, anim: "qr-pop" },
      { label: "Drawing", icon: Palette, anim: "qr-wiggle" },
    ],
  },
];

/* ================= section ================= */
const QuizAndResult = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white py-16 md:py-24">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* bg decor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="qr-blob absolute -left-24 top-10 h-80 w-80 bg-blue-200/40 blur-3xl" />
        <div className="qr-blob absolute -right-24 bottom-10 h-80 w-80 bg-orange-200/50 blur-3xl" />
        <Star className="qr-pop absolute left-[6%] top-8 h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="qr-pop absolute right-[8%] top-12 h-3 w-3 fill-rose-400 text-rose-400" style={{ animationDelay: ".8s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 via-white to-rose-100 px-4 py-2 ring-1 ring-amber-300 shadow-[0_10px_30px_-15px_rgba(240,180,41,0.9)]">
            <Sparkles className="qr-glow h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-xs">Our Programs</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Pick the right{" "}
            <span className="qr-shine-text bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Olympiad</span>
          </h2>
        </div>

        {/* PROGRAM CARDS */}
        <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-2 lg:gap-8">
          {PROGRAMS.map((p) => (
            <div
              key={p.key}
              className={`qr-card group relative isolate overflow-hidden rounded-[2.2rem] bg-gradient-to-br ${p.bg} p-6 text-white shadow-[0_35px_80px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1.5 sm:p-9`}
            >
              {/* decor */}
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
                <div className={`qr-blob absolute -right-16 -top-16 h-64 w-64 blur-2xl ${p.blobA}`} />
                <div className={`qr-blob absolute -bottom-20 -left-16 h-56 w-56 blur-2xl ${p.blobB}`} />
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                {/* orbit rings behind image */}
                <div className="qr-orbit absolute -bottom-24 -right-24 h-80 w-80 rounded-full border-2 border-dashed border-white/20 sm:h-96 sm:w-96">
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,.9)]" />
                </div>
                <div className="qr-orbit-rev absolute -bottom-12 -right-12 h-56 w-56 rounded-full border border-white/15 sm:h-72 sm:w-72">
                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
                </div>
                {/* hover light sweep */}
                <div className="qr-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* image */}
              <div className="qr-float pointer-events-none absolute bottom-0 right-0 h-36 w-32 sm:h-52 sm:w-48 md:h-60 md:w-56 xl:h-72 xl:w-64">
                <Image src={p.image} alt="" fill sizes="(min-width:1280px) 256px, 200px" className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" priority />
              </div>

              {/* content */}
              <div className="relative z-10 max-w-[64%] sm:max-w-[60%]">
                <div className="flex items-center gap-3">
                  <span className="relative inline-grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                    <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.iconGrad} opacity-50 animate-ping`} style={{ animationDuration: "2.6s" }} />
                    <span className={`relative grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br ${p.iconGrad} ring-4 ring-white/20 shadow-lg`}>
                      <p.icon className={`h-7 w-7 ${p.iconAnim}`} strokeWidth={1.8} />
                    </span>
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest ring-1 ring-white/25 backdrop-blur">
                    {p.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black leading-tight sm:text-3xl xl:text-4xl">{p.title}</h3>
                <span className={`qr-shine-text mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r ${p.accent} transition-all group-hover:w-28`} />

                <p className="mt-4 text-sm leading-6 text-white/85 sm:text-base">{p.text}</p>

                {/* subjects */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.subjects.map((s, i) => (
                    <li key={s.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-3 text-xs font-semibold ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 sm:text-sm">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                        <s.icon className={`h-3.5 w-3.5 ${s.anim}`} style={{ animationDelay: `${i * 0.25}s` }} />
                      </span>
                      {s.label}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/75 sm:text-sm">
                  <p.meta.icon className="qr-pop h-4 w-4" />
                  {p.meta.text}
                </div>

                <Link
                  href={p.href}
                  className={`mt-6 inline-flex items-center gap-3 rounded-full py-2.5 pl-5 pr-2 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 sm:mt-7 sm:text-base ${p.btn}`}
                >
                  View details
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/25">
                    <ArrowRight className="qr-nudge h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizAndResult;