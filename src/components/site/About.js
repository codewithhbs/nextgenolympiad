import Link from "next/link";
import Image from "next/image";
import {
  Landmark, ArrowRight, GraduationCap, BookOpen, Library, XCircle, CheckCircle2,
  TrendingUp, Sparkles, ShieldCheck, Clock, Target,
} from "lucide-react";

/* ================= animation css (server-safe) ================= */
const ANIM_CSS = `
@keyframes ab-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ab-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes ab-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes ab-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.08)}60%{transform:translateY(0) scale(.95)}}
@keyframes ab-spin{to{transform:rotate(360deg)}}
@keyframes ab-flip{0%,100%{transform:perspective(200px) rotateY(0)}50%{transform:perspective(200px) rotateY(180deg)}}
@keyframes ab-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes ab-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes ab-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes ab-bar{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
@keyframes ab-draw{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}
@keyframes ab-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
.ab-float{animation:ab-float 3s ease-in-out infinite}
.ab-wiggle{animation:ab-wiggle 2.4s ease-in-out infinite;transform-origin:50% 60%}
.ab-beat{animation:ab-beat 1.6s ease-in-out infinite}
.ab-pop{animation:ab-pop 1.8s ease-in-out infinite}
.ab-spin{animation:ab-spin 8s linear infinite}
.ab-flip{animation:ab-flip 3s ease-in-out infinite}
.ab-glow{animation:ab-glow 2s ease-in-out infinite}
.ab-shine{background-size:200% 100%;animation:ab-shine 3.5s linear infinite}
.ab-blob{animation:ab-blob 10s ease-in-out infinite}
.ab-bar{transform-origin:bottom;animation:ab-bar 1.4s ease-in-out infinite alternate}
.ab-draw{stroke-dasharray:320;animation:ab-draw 2.2s ease-out forwards}
.ab-nudge{animation:ab-nudge 1.2s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){[class*="ab-"]{animation:none!important}}
`;

/* ================= helpers ================= */
function Star4({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function AnimIcon({ icon: Icon, anim = "ab-float", grad = "from-red-500 to-rose-500", size = "md", ping = true, round = false }) {
  const r = round ? "rounded-full" : { sm: "rounded-xl", md: "rounded-2xl", lg: "rounded-3xl" }[size];
  const box = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-16 w-16" }[size];
  const ico = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-8 w-8" }[size];
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${box} ${r}`}>
      {ping && <span className={`absolute inset-0 ${r} bg-gradient-to-br ${grad} opacity-40 animate-ping`} style={{ animationDuration: "2.6s" }} />}
      <span className={`relative grid h-full w-full place-items-center ${r} bg-gradient-to-br ${grad} text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)] ring-4 ring-white`}>
        <Icon className={`${ico} ${anim}`} strokeWidth={1.8} />
      </span>
    </span>
  );
}

/* ================= data ================= */
const MINI_STATS = [
  { a: "I–X", b: "Classes", icon: GraduationCap, anim: "ab-float", grad: "from-pink-500 to-orange-400" },
  { a: "9+", b: "Subjects", icon: BookOpen, anim: "ab-flip", grad: "from-red-500 to-cyan-400" },
  { a: "All", b: "Boards", icon: Library, anim: "ab-pop", grad: "from-emerald-500 to-lime-400" },
];

const PILLARS = [
  { t: "Registered trust", icon: ShieldCheck, anim: "ab-pop", grad: "from-red-500 to-rose-500", bg: "bg-rose-50 ring-rose-100" },
  { t: "10+ years experience", icon: Clock, anim: "ab-spin", grad: "from-amber-400 to-orange-500", bg: "bg-amber-50 ring-amber-100" },
  { t: "Personal benchmark", icon: Target, anim: "ab-beat", grad: "from-violet-500 to-fuchsia-500", bg: "bg-violet-50 ring-violet-100" },
];

/* ================= section ================= */
export default function About() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24" style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#fdf2f8 50%,#eff6ff 100%)" }}>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* bg decor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ab-blob absolute -right-24 top-1/4 h-96 w-96 bg-amber-300/30 blur-3xl" />
        <div className="ab-blob absolute -left-24 bottom-0 h-80 w-80 bg-rose-300/30 blur-3xl" />
        <div className="ab-blob absolute left-1/2 top-0 h-64 w-64 bg-sky-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }}
        />
        <Star4 className="ab-pop absolute left-[5%] top-[10%] h-5 w-5 text-amber-400" />
        <Star4 className="ab-float absolute right-[6%] top-[8%] h-4 w-4 text-rose-400" />
        <Star4 className="ab-pop absolute left-[48%] bottom-[6%] h-4 w-4 text-sky-400" style={{ animationDelay: ".6s" }} />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10 xl:px-14">
        {/* ============ TEXT ============ */}
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,0.8)] ring-1 ring-rose-100 backdrop-blur">
            <AnimIcon icon={Landmark} anim="ab-pop" grad="from-red-600 to-rose-500" size="sm" ping={false} round />
            <span className="text-xs font-extrabold uppercase text-red-600 sm:text-3xl">About the Foundation</span>
            <Sparkles className="ab-glow h-4 w-4 text-amber-500" />
          </span>

          <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-4xl xl:text-5xl">
            Ranking Ends the Conversation.
            <br />
            <span className="relative inline-block">
              <span className="ab-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Benchmark</span>
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path className="ab-draw" d="M2 9 C80 2, 200 2, 298 8" stroke="#f0b429" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Starts It.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate sm:text-base sm:leading-8 lg:mx-0">
            NextGen Olympiad Foundation is a <span className="font-semibold text-navy">registered educational trust</span> with more than a decade of experience in national education olympiads. We recognise excellence — but our real focus is helping every learner understand themselves better.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate sm:text-base sm:leading-8 lg:mx-0">
            Instead of pitting a child against lakhs of others, we create a personal benchmark: students compete against their own best self, guided by detailed reports that show what they know, where the gaps are, and how they&apos;re growing.
          </p>

          {/* pillars */}
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2.5 lg:mx-0 lg:justify-start">
            {PILLARS.map(({ t, icon, anim, grad, bg }) => (
              <li key={t} className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 ring-1 transition hover:scale-105 ${bg}`}>
                <AnimIcon icon={icon} anim={anim} grad={grad} size="sm" ping={false} round />
                <span className="text-sm font-semibold text-neutral-800">{t}</span>
              </li>
            ))}
          </ul>

          {/* mini stats */}
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-3 sm:gap-4 lg:mx-0">
            {MINI_STATS.map(({ a, b, icon: Icon, anim, grad }, i) => (
              <div
                key={b}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-4 text-center text-white shadow-[0_20px_45px_-25px_rgba(0,0,0,0.6)] transition hover:-translate-y-1.5 sm:p-5`}
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 transition group-hover:scale-150" />
                <div className="absolute -bottom-8 -left-4 h-16 w-16 rounded-full bg-white/10" />
                <div className="relative mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white/25 ring-1 ring-white/40 backdrop-blur">
                  <Icon className={`h-6 w-6 ${anim}`} style={{ animationDelay: `${i * 0.3}s` }} />
                </div>
                <div className="relative mt-3 font-display text-2xl font-extrabold sm:text-3xl">{a}</div>
                <div className="relative mt-0.5 text-[11px] font-bold uppercase tracking-widest text-white/90">{b}</div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-rose-500 py-3 pl-6 pr-2 font-bold text-white shadow-lg shadow-rose-400/40 transition hover:-translate-y-0.5 hover:shadow-rose-500/50"
          >
            Explore Our Journey
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-navy">
              <ArrowRight className="ab-nudge h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* ============ VISUAL ============ */}
        <div className="animate-fade-up relative mx-auto w-full max-w-[660px]">
          {/* back gradient card */}
          <div className="absolute inset-0 -rotate-2 translate-x-3 translate-y-4 rounded-[2.2rem] bg-gradient-to-br from-pink-500 via-orange-400 to-amber-300 sm:translate-x-5 sm:translate-y-6" aria-hidden />
          <div className="ab-float absolute -right-4 -top-5 hidden h-24 w-24 rounded-3xl border-2 border-dashed border-sky-400 sm:block" aria-hidden />

          <div className="relative overflow-hidden rounded-[2.2rem] bg-white p-2.5 shadow-[0_30px_80px_-35px_rgba(216,31,38,0.6)] ring-1 ring-black/5">
            <Image
              src="/brand/about-scene.png"
              alt="Teacher guiding students through NextGen Olympiad activities"
              width={1200}
              height={900}
              priority
              className="h-auto w-full rounded-[1.8rem] object-contain"
            />
          </div>

          {/* floating: ranking vs benchmark */}
          <div className="ab-float absolute -left-3 top-8 w-44 rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-left-8 sm:w-52">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 line-through decoration-red-400">
              <XCircle className="ab-wiggle h-4 w-4 text-neutral-400" /> Ranking
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm font-extrabold text-red-600">
              <CheckCircle2 className="ab-beat h-4 w-4 text-emerald-500" /> Benchmark
            </div>
          </div>

          {/* floating: growth chart */}
          <div className="ab-float absolute -bottom-6 -right-3 w-48 rounded-2xl bg-gradient-to-br from-navy to-navy-deep p-4 text-white shadow-2xl ring-1 ring-white/10 sm:-right-8 sm:w-56" style={{ animationDelay: "1s", backgroundColor: "#1e1b4b" }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Your growth</span>
              <TrendingUp className="ab-pop h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 flex h-14 items-end gap-1.5" aria-hidden>
              {[35, 50, 45, 65, 80, 100].map((h, i) => (
                <span key={i} className="ab-bar w-full rounded-t-md bg-gradient-to-t from-amber-400 to-rose-400" style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <p className="mt-2 text-xs font-semibold text-white/80">Compete with your own best self</p>
          </div>

          {/* floating: report badge */}
          <div className="ab-float absolute -right-2 top-1/3 hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-2 text-white shadow-lg shadow-fuchsia-400/40 md:flex" style={{ animationDelay: ".5s" }}>
            <Sparkles className="ab-glow h-4 w-4 text-amber-300" />
            <span className="whitespace-nowrap text-xs font-bold">Detailed reports</span>
          </div>
        </div>
      </div>
    </section>
  );
}