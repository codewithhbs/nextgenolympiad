"use client";
import Image from "next/image";
import {
  Brain, Target, Trophy, Award, Sparkles, Star, Send, Wheat,
  BookOpen, Cog, Calculator, Leaf, Atom, Palette, Languages,
} from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes wn-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes wn-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes wn-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes wn-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.08)}60%{transform:translateY(0) scale(.95)}}
@keyframes wn-spin{to{transform:rotate(360deg)}}
@keyframes wn-swing{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}
@keyframes wn-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes wn-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes wn-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes wn-plane{0%{transform:translate(0,0) rotate(-12deg)}50%{transform:translate(14px,-10px) rotate(-4deg)}100%{transform:translate(0,0) rotate(-12deg)}}
@keyframes wn-marquee{to{transform:translateX(-50%)}}
@keyframes wn-wave{0%,100%{transform:translateX(0) rotate(var(--r))}50%{transform:translateX(18px) rotate(var(--r))}}
@keyframes wn-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.wn-float{animation:wn-float 3s ease-in-out infinite}
.wn-wiggle{animation:wn-wiggle 2.4s ease-in-out infinite;transform-origin:50% 60%}
.wn-beat{animation:wn-beat 1.6s ease-in-out infinite}
.wn-pop{animation:wn-pop 1.8s ease-in-out infinite}
.wn-spin{animation:wn-spin 6s linear infinite}
.wn-swing{animation:wn-swing 2.2s ease-in-out infinite;transform-origin:50% 0}
.wn-glow{animation:wn-glow 2s ease-in-out infinite}
.wn-shine{background-size:200% 100%;animation:wn-shine 3.5s linear infinite}
.wn-blob{animation:wn-blob 10s ease-in-out infinite}
.wn-plane{animation:wn-plane 4s ease-in-out infinite}
.wn-marquee{animation:wn-marquee 30s linear infinite}
.wn-marquee-wrap:hover .wn-marquee{animation-play-state:paused}
.wn-wave{animation:wn-wave 6s ease-in-out infinite}
.wn-rise{animation:wn-rise .8s ease-out both}
@media (prefers-reduced-motion:reduce){[class*="wn-"]{animation:none!important}}
`;

/* ================= data ================= */
const CARDS = [
  {
    n: "01", icon: Brain, anim: "wn-beat", title: "Conceptual Understanding",
    text: "Age-appropriate questions that build genuine clarity and application over rote.",
    grad: "from-red-500 to-indigo-600", soft: "from-blue-50", txt: "from-red-600 to-indigo-600", glow: "rgba(59,130,246,0.55)",
  },
  {
    n: "02", icon: Target, anim: "wn-pop", title: "Healthy Competition",
    text: "A confidence-building platform that celebrates effort at every level.",
    grad: "from-emerald-500 to-green-600", soft: "from-emerald-50", txt: "from-emerald-600 to-green-600", glow: "rgba(16,185,129,0.55)",
  },
  {
    n: "03", icon: Trophy, anim: "wn-wiggle", title: "Rewards & Recognition",
    text: "Medals, certificates and special prizes for meritorious performers.",
    grad: "from-amber-400 to-orange-500", soft: "from-amber-50", txt: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.55)",
  },
  {
    n: "04", icon: Award, anim: "wn-swing", title: "National-Level Ranking",
    text: "School, zonal and national recognition backed by a decade of trust.",
    grad: "from-violet-500 to-fuchsia-600", soft: "from-violet-50", txt: "from-violet-600 to-fuchsia-600", glow: "rgba(139,92,246,0.55)",
  },
];

const SUBJECTS = [
  { icon: BookOpen, label: "English", anim: "wn-pop", grad: "from-red-500 to-indigo-500" },
  { icon: Cog, label: "Computational Thinking", anim: "wn-spin", grad: "from-emerald-500 to-teal-500" },
  { icon: Calculator, label: "Mathematics", anim: "wn-wiggle", grad: "from-amber-400 to-orange-500" },
  { icon: Leaf, label: "EVS", anim: "wn-swing", grad: "from-green-500 to-lime-500" },
  { icon: Atom, label: "STEM", anim: "wn-spin", grad: "from-red-500 to-rose-500" },
];

const WONDER = [
  { label: "English", icon: BookOpen },
  { label: "Mathematics", icon: Calculator },
  { label: "EVS", icon: Leaf },
  { label: "Drawing", icon: Palette },
  // { label: "Hindi", icon: Languages },
];

/* ================= helpers ================= */
function AnimIcon({ icon: Icon, anim, grad, size = "lg", ping = true, delay = 0 }) {
  const box = { sm: "h-9 w-9", lg: "h-20 w-20" }[size];
  const ico = { sm: "h-4 w-4", lg: "h-10 w-10" }[size];
  return (
    <span className={`relative inline-grid shrink-0 place-items-center rounded-full ${box}`}>
      {ping && <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${grad} opacity-40 animate-ping`} style={{ animationDuration: "2.6s" }} />}
      <span className={`relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br ${grad} text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)] ring-4 ring-white`}>
        <Icon className={`${ico} ${anim}`} strokeWidth={1.9} style={{ animationDelay: `${delay}s` }} />
      </span>
    </span>
  );
}

/* ================= section ================= */
export default function Features() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/40 pt-14 pb-32 sm:pt-20 sm:pb-40 md:pt-24 md:pb-44">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ bg decor ============ */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <div className="wn-blob absolute -left-32 top-10 h-96 w-96 bg-blue-200/40 blur-3xl" />
        <div className="wn-blob absolute -right-32 top-1/3 h-96 w-96 bg-amber-200/50 blur-3xl" />
        <div className="wn-blob absolute left-1/3 bottom-24 h-72 w-72 bg-violet-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "linear-gradient(to bottom, black, transparent 70%)" }}
        />

        <Star className="wn-pop absolute left-[22%] top-16 h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="wn-pop absolute right-[26%] top-12 h-3 w-3 fill-amber-400 text-amber-400" style={{ animationDelay: ".7s" }} />
        <Star className="wn-float absolute left-[8%] top-[45%] h-3 w-3 fill-rose-400 text-rose-400" />
        <Star className="wn-pop absolute right-[6%] top-[62%] h-4 w-4 fill-violet-400 text-violet-400" style={{ animationDelay: "1.2s" }} />
        <Send className="wn-plane absolute right-[16%] top-24 hidden h-8 w-8 text-blue-300 sm:block" />

        {/* animated corner waves */}
        <div className="wn-wave absolute -bottom-10 -left-10 h-40 w-80 rounded-[50%] bg-gradient-to-r from-blue-600 to-indigo-500" style={{ "--r": "6deg" }} />
        <div className="wn-wave absolute -bottom-16 -left-4 h-40 w-96 rounded-[50%] bg-gradient-to-r from-amber-400 to-yellow-300" style={{ "--r": "6deg", animationDelay: "1s" }} />
        <div className="wn-wave absolute -bottom-14 -right-10 h-40 w-96 rounded-[50%] bg-gradient-to-l from-red-600 to-rose-500" style={{ "--r": "-6deg", animationDelay: ".5s" }} />
        <div className="wn-wave absolute -bottom-20 -right-4 h-40 w-80 rounded-[50%] bg-gradient-to-l from-amber-400 to-yellow-300" style={{ "--r": "-6deg", animationDelay: "1.5s" }} />
      </div>

      {/* medal + trophy */}
      <div className="wn-swing pointer-events-none absolute left-2 top-0 z-10 sm:left-6">
        <Image src="/why-nextgen/medal.png" alt="" aria-hidden width={226} height={290} priority className="h-20 w-auto drop-shadow-[0_15px_25px_rgba(240,180,41,0.45)] sm:h-28 lg:h-40" />
      </div>
      <div className="wn-float pointer-events-none absolute right-1 top-24 z-10 sm:right-4 sm:top-28 lg:top-32">
        <Image src="/why-nextgen/trophy.png" alt="" aria-hidden width={328} height={335} className="h-24 w-auto drop-shadow-[0_18px_30px_rgba(240,180,41,0.5)] sm:h-32 lg:h-44" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* ============ header ============ */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-rose-400/40 sm:text-sm">
            <Sparkles className="wn-glow h-4 w-4 text-amber-300" />
            Why NextGen
            <Sparkles className="wn-glow h-4 w-4 text-amber-300" style={{ animationDelay: "1s" }} />
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Built for{" "}
            <span className="wn-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Young Minds</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-500 sm:text-base">
            Every element of the NextGen Olympiad is designed to help students grow, compete and excel with confidence.
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400 sm:w-24" />
            <Sparkles className="wn-spin h-4 w-4 text-amber-400" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400 sm:w-24" />
          </div>
        </div>

        {/* ============ cards ============ */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <div
              key={c.n}
              className={`wn-rise group relative overflow-hidden rounded-[2rem] bg-gradient-to-b ${c.soft} to-white px-6 pb-10 pt-10 text-center ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 ${i % 2 ? "lg:translate-y-6 lg:hover:translate-y-4" : ""}`}
              style={{ animationDelay: `${i * 0.12}s`, boxShadow: `0 25px 55px -35px ${c.glow}` }}
            >
              {/* hover fill */}
              <div className={`absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br ${c.grad} transition-transform duration-500 group-hover:scale-y-100`} />
              {/* top bar */}
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${c.grad}`} />
              {/* big number */}
              <span className="absolute right-5 top-3 text-6xl font-extrabold text-slate-100 transition group-hover:text-white/15">{c.n}</span>
              {/* bubble */}
              <div className={`absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br ${c.grad} opacity-10 transition group-hover:opacity-0`} />

              <div className="relative">
                <div className="relative mx-auto h-28 w-28">
                  <svg className="wn-spin absolute inset-0 h-full w-full" style={{ animationDuration: "14s" }} viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.8" strokeDasharray="44 20" strokeLinecap="round" className="text-amber-400 transition group-hover:text-white/70" />
                  </svg>
                  <div className="absolute inset-4 grid place-items-center">
                    <AnimIcon icon={c.icon} anim={c.anim} grad={c.grad} delay={i * 0.2} />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-white">{c.title}</h3>
                <span className={`mx-auto mt-3 block h-1 w-10 rounded-full bg-gradient-to-r ${c.grad} transition-all group-hover:w-20 group-hover:bg-none group-hover:bg-white`} />
                <p className="mt-4 text-sm leading-relaxed text-slate-500 transition group-hover:text-white/90">{c.text}</p>
              </div>

              {/* corner tab */}
              <span className={`absolute bottom-0 left-0 flex h-10 w-14 items-center justify-center rounded-tr-2xl bg-gradient-to-br ${c.grad} text-sm font-extrabold text-white transition group-hover:bg-none group-hover:bg-white/20`}>
                {c.n}
              </span>
            </div>
          ))}
        </div>

        {/* ============ subjects ============ */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate via-indigo-950 to-slate p-6 shadow-[0_35px_80px_-40px_rgba(30,27,75,0.9)] ring-1 ring-white/10 sm:mt-20 sm:p-10">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="wn-blob absolute -left-16 -top-16 h-56 w-56 bg-blue-500/25 blur-2xl" />
            <div className="wn-blob absolute -bottom-20 -right-10 h-64 w-64 bg-amber-400/20 blur-2xl" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          </div>

          <div className="relative flex items-center justify-center gap-3">
            <Wheat className="wn-swing h-6 w-6 -scale-x-100 text-amber-400" />
            <span className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white sm:text-sm">
              Olympiad Subjects <span className="text-amber-400">·</span> Classes I–X
            </span>
            <Wheat className="wn-swing h-6 w-6 text-amber-400" style={{ animationDelay: ".5s" }} />
          </div>

          {/* subject cards */}
          <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {SUBJECTS.map((s, i) => (
              <div
                key={s.label}
                className={`group flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1.5 hover:bg-white/10 ${i === SUBJECTS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <AnimIcon icon={s.icon} anim={s.anim} grad={s.grad} size="lg" ping={false} delay={i * 0.25} />
                <span className="text-sm font-bold text-white">{s.label}</span>
              </div>
            ))}
          </div>

          {/* wonder kids marquee */}
          <div className="relative mt-8 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 p-[2px]">
            <div className="flex flex-col items-center gap-3 rounded-[14px] bg-slate-900/90 px-4 py-4 sm:flex-row sm:gap-5">
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-extrabold text-slate-900">
                <Star className="wn-spin h-3.5 w-3.5 fill-slate-900" />
                Wonder Kids Olympiad · Bal Vatika I-II–III
              </span>
              <div className="wn-marquee-wrap relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="wn-marquee flex w-max gap-3">
                  {[...WONDER, ...WONDER, ...WONDER, ...WONDER].map((w, i) => (
                    <span key={i} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15">
                      <w.icon className="h-4 w-4 text-amber-300" />
                      {w.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}