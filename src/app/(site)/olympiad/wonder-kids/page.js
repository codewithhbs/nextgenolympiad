import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Calculator, Leaf, Palette, Baby, Sprout, BookOpenText, Lightbulb, Heart,
  Sparkles, Star, ArrowRight, Award,
} from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "Wonder Kids Olympiad",
  description:
    "Wonder Kids Olympiad from NextGen — for Balvatika I, II & III. English, Mathematics, EVS and Drawing, aligned with NEP 2020 and ECCE.",
};

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes wk-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes wk-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes wk-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}45%{transform:scale(1.12)}}
@keyframes wk-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes wk-spin{to{transform:rotate(360deg)}}
@keyframes wk-grow{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.12) rotate(5deg)}}
@keyframes wk-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes wk-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes wk-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes wk-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes wk-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes wk-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.wk-float{animation:wk-float 3.2s ease-in-out infinite}
.wk-wiggle{animation:wk-wiggle 2.4s ease-in-out infinite}
.wk-beat{animation:wk-beat 1.6s ease-in-out infinite}
.wk-pop{animation:wk-pop 1.8s ease-in-out infinite}
.wk-spin-slow{animation:wk-spin 34s linear infinite}
.wk-grow{animation:wk-grow 2.6s ease-in-out infinite}
.wk-glow{animation:wk-glow 2s ease-in-out infinite}
.wk-shine{background-size:200% 100%;animation:wk-shine 3.5s linear infinite}
.wk-blob{animation:wk-blob 10s ease-in-out infinite}
.wk-rise{animation:wk-rise .7s ease-out both}
.wk-nudge{animation:wk-nudge 1.2s ease-in-out infinite}
.wk-card:hover .wk-sweep{animation:wk-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="wk-"]{animation:none!important}}
`;

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
  { title: "Cognitive Development", text: "Playful reasoning and pattern recognition built for a 4–6 year old mind." },
  { title: "Socio-Emotional Growth", text: "Confidence and curiosity nurtured through a pressure-free assessment." },
  { title: "Foundation for Life", text: "A strong early base that supports every year of learning that follows." },
];

const SUBJECT_ANIMS = ["wk-pop", "wk-wiggle", "wk-float", "wk-beat"];
const WK_PILLAR_ANIMS = ["wk-grow", "wk-wiggle", "wk-pop", "wk-glow", "wk-beat"];

export default function WonderKidsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden border-b border-line"
        style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#ffffff 45%,#eff6ff 100%)" }}
      >
        <div className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2 md:px-6">
          <div className="text-center md:text-left">
            <span className="inline-flex rounded-full bg-gold-soft px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-ink sm:text-sm">
              Balvatika I, II &amp; III
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
            <Image src="/brand/logo-new.jpeg" alt="Wonder Kids Olympiad" fill className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ============ NEP INTRO ============ */}
      <section
        className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 xl:px-14"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="wk-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 -rotate-2 rounded-[2.2rem] bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 sm:translate-x-6 sm:translate-y-6" aria-hidden />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] bg-white p-2.5 shadow-[0_30px_80px_-35px_rgba(216,31,38,.6)] ring-1 ring-black/5">
              <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                <Image src="/brand/happykid.jpg" alt="Early learner" fill className="object-cover" />
              </div>
            </div>
            <div className="wk-float absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-right-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-lime-400 text-white">
                <Sprout className="wk-grow h-5 w-5" />
              </span>
              <p className="text-sm font-extrabold text-slate-900">Foundational Stage</p>
            </div>
          </div>

          <div>
            <Badge tone="gold">NEP 2020 · ECCE</Badge>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Built for the{" "}
              <span className="wk-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Foundational Stage</span>
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-slate-600 sm:text-lg sm:leading-9">
              India&apos;s early education landscape is undergoing a significant transformation with the National Education
              Policy 2020, which recognises Early Childhood Care and Education as the foundational stage of a child&apos;s
              learning journey. It emphasises nurturing cognitive, socio-emotional, physical and social development during
              these formative years.
            </p>
            <p className="mt-4 text-base font-medium leading-8 text-slate-600 sm:text-lg sm:leading-9">
              Wonder Kids Olympiad turns that policy into practice — a joyful, age-appropriate assessment that celebrates
              every child&apos;s effort.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SUBJECTS + PILLARS ============ */}
      <section
        className="relative w-full overflow-hidden py-16 sm:py-20"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="wk-blob absolute -left-24 top-0 h-80 w-80 bg-violet-300/25 blur-3xl" />
          <div className="wk-blob absolute -right-24 bottom-0 h-80 w-80 bg-emerald-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-amber-300 backdrop-blur">
              <Sparkles className="wk-glow h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-xs">What they attempt</span>
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              <span className="wk-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Subjects</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {SUBJECTS.map((s, i) => {
              const badgeMap = { english: "Aa", mathematics: "123", evs: "🌱", drawing: "🎨" };
              const badge = badgeMap[s.name.toLowerCase()] || s.name.slice(0, 2).toUpperCase();
              const gradients = [
                "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)",
                "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)",
                "linear-gradient(135deg,#10b981 0%,#facc15 100%)",
                "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)",
              ];
              const grad = gradients[i % gradients.length];
              const Icon = s.icon;
              const anim = SUBJECT_ANIMS[i % SUBJECT_ANIMS.length];

              return (
                <div
                  key={s.name}
                  className="wk-card wk-rise group relative overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-[0_25px_55px_-35px_rgba(15,23,42,.6)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 sm:p-8"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundImage: grad }} />
                    <div className="wk-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                  </div>

                  <div
                    className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl font-display text-lg font-black text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem] sm:text-2xl"
                    style={{ backgroundImage: grad }}
                  >
                    {badge}
                  </div>

                  <span
                    className="relative mx-auto -mt-4 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-black/5"
                    style={{ transform: "translateX(28px)" }}
                  >
                    <Icon className={`h-4 w-4 ${anim}`} style={{ animationDelay: `${i * 0.25}s` }} />
                  </span>

                  <h3 className="relative mt-3 font-display text-lg font-extrabold leading-tight text-slate-900 sm:mt-4 sm:text-xl">
                    {s.name}
                  </h3>
                  <span className="relative mx-auto mt-3 block h-1 w-8 rounded-full transition-all group-hover:w-16" style={{ backgroundImage: grad }} />
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const gradients = [
                "linear-gradient(135deg,#d6006e 0%,#ff8a3d 100%)",
                "linear-gradient(135deg,#0057d9 0%,#00c98d 100%)",
                "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
              ];
              const grad = gradients[i % gradients.length];
              return (
                <div
                  key={p.title}
                  className="wk-card wk-rise group relative overflow-hidden rounded-[2rem] p-8 shadow-[0_35px_80px_-45px_rgba(15,23,42,.9)] transition duration-300 hover:-translate-y-2"
                  style={{ backgroundImage: grad, animationDelay: `${i * 0.12}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="wk-blob absolute -right-8 -top-12 h-40 w-40 bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="wk-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>

                  <span className="relative font-display text-6xl font-black leading-none text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">{p.title}</h3>
                  <p className="relative mt-3 text-base font-medium leading-relaxed text-white/90 sm:text-lg">{p.text}</p>
                  <span className="relative mt-6 block h-1 w-10 rounded-full bg-white/80 transition-all group-hover:w-20" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY WONDER KIDS — 5 pillars ============ */}
      <section
        className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 xl:px-14"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fff7ed 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="wk-blob absolute -right-24 top-0 h-80 w-80 bg-rose-300/25 blur-3xl" />
          <div className="wk-blob absolute -left-24 bottom-0 h-80 w-80 bg-blue-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px]">
          <div className="text-center">
            <Badge tone="gold" className="rounded-xl px-5 py-2 text-base sm:text-lg">Why Wonder Kids</Badge>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Learning that fits{" "}
              <span className="wk-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">little minds</span>
            </h2>
            <CrestDivider className="mt-6" />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {WK_PILLARS.map((p, i) => {
              const anim = WK_PILLAR_ANIMS[i % WK_PILLAR_ANIMS.length];
              return (
                <div
                  key={p.title}
                  className="wk-card wk-rise group flex flex-col rounded-[2rem] border-2 bg-white p-6 text-center shadow-[0_25px_55px_-35px_rgba(15,23,42,.5)] transition duration-300 hover:-translate-y-2"
                  style={{ borderColor: p.soft, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative mx-auto h-20 w-20">
                    <svg className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]" viewBox="0 0 100 100" fill="none" aria-hidden>
                      <circle cx="50" cy="50" r="46" stroke={p.color} strokeOpacity=".45" strokeWidth="2.5" strokeDasharray="40 18" strokeLinecap="round" />
                    </svg>
                    <span
                      className="absolute inset-2 grid place-items-center rounded-full transition duration-300 group-hover:scale-110"
                      style={{ backgroundColor: p.soft, color: p.color }}
                    >
                      <p.icon className={`h-8 w-8 ${anim}`} strokeWidth={2} style={{ animationDelay: `${i * 0.3}s` }} />
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-extrabold leading-snug sm:text-xl" style={{ color: p.color }}>
                    {p.title}
                  </h3>

                  <div className="mx-auto mt-3 h-px w-3/4 border-t border-dotted" style={{ borderColor: p.color }} />

                  <ul className="mt-4 space-y-3 text-left">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm font-medium leading-snug text-slate-600 sm:text-[15px]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* certificate banner */}
          <div
            className="relative mt-14 flex flex-col items-center gap-5 overflow-hidden rounded-[2.2rem] p-8 text-center text-white shadow-[0_40px_90px_-45px_rgba(76,29,149,.9)] sm:p-10 lg:flex-row lg:text-left"
            style={{ backgroundImage: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 60%,#7c3aed 100%)" }}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="wk-blob absolute -right-12 -top-12 h-48 w-48 bg-amber-400/30 blur-2xl" />
              <div className="wk-blob absolute -bottom-16 -left-10 h-48 w-48 bg-rose-400/20 blur-2xl" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <Star className="wk-pop absolute right-[30%] bottom-6 hidden h-4 w-4 fill-amber-300 text-amber-300 sm:block" />
            </div>

            <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
              <span className="absolute inset-0 animate-ping rounded-2xl bg-amber-300/30" style={{ animationDuration: "2.8s" }} />
              <span className="relative grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-violet-900">
                <Baby className="wk-pop h-9 w-9" />
              </span>
            </span>

            <div className="relative lg:flex-1">
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl xl:text-4xl">Every Wonder Kid gets a certificate</h3>
              <p className="mt-3 text-base font-semibold text-white/90 sm:text-lg">
                Participation is celebrated. Progress is reported. Nobody is ranked against lakhs of others.
              </p>
            </div>

            <Link href="/awards" className="relative shrink-0">
              <Button variant="gold" className="gap-2">See Awards &amp; Certification <ArrowRight className="wk-nudge h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}