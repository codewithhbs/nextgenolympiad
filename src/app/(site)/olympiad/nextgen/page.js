import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calculator, Cpu, Leaf, FlaskConical, Target, LineChart, ShieldCheck, CheckCircle2, Sparkles, Star, ArrowRight, GraduationCap, Trophy } from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "NextGen Olympiad",
  description: "NextGen Olympiad for Classes I–X — English, Maths, Computational Thinking, EVS and STEM. Application-based assessment with a 360° progress analysis.",
};

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes ng-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ng-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes ng-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes ng-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes ng-spin{to{transform:rotate(360deg)}}
@keyframes ng-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes ng-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes ng-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes ng-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes ng-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes ng-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.ng-float{animation:ng-float 3.2s ease-in-out infinite}
.ng-wiggle{animation:ng-wiggle 2.4s ease-in-out infinite}
.ng-beat{animation:ng-beat 1.6s ease-in-out infinite}
.ng-pop{animation:ng-pop 1.8s ease-in-out infinite}
.ng-spin{animation:ng-spin 8s linear infinite}
.ng-spin-slow{animation:ng-spin 34s linear infinite}
.ng-glow{animation:ng-glow 2s ease-in-out infinite}
.ng-shine{background-size:200% 100%;animation:ng-shine 3.5s linear infinite}
.ng-blob{animation:ng-blob 10s ease-in-out infinite}
.ng-rise{animation:ng-rise .7s ease-out both}
.ng-nudge{animation:ng-nudge 1.2s ease-in-out infinite}
.ng-card:hover .ng-sweep{animation:ng-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="ng-"]{animation:none!important}}
`;

const SUBJECTS = [
  { icon: BookOpen, name: "English", text: "Comprehension, grammar and expression tested through real usage.", href: "/olympiad/subjects/english" },
  { icon: Calculator, name: "Mathematics", text: "Concept application over rote formula recall.", href: "/olympiad/subjects/maths" },
  { icon: Cpu, name: "Computational Thinking", text: "Logic, patterns, algorithms — the literacy of the next decade.", href: "/olympiad/subjects/computational-thinking" },
  { icon: Leaf, name: "EVS", text: "Environment and everyday science awareness." },
  { icon: FlaskConical, name: "S T E M", text: "Science, technology, engineering and maths, integrated.", href: "/olympiad/subjects/stem" },
];

const GAIN = [
  { icon: Target, title: "Benchmark, Not Rank", text: "Students compete against their own self, not against lakhs of others. Self-growth is the metric." },
  { icon: LineChart, title: "360° Progress Analysis", text: "Detailed reports show what they know, where the gaps are and how they are growing at topic, school and national level." },
  { icon: ShieldCheck, title: "All Boards, One Standard", text: "Aligned across boards for Classes I–X with 9+ subjects on offer." },
  { icon: CheckCircle2, title: "Application-Based Testing", text: "Students use what they've learned instead of just recalling it — the way real-world success works." },
];

const SUBJECT_ANIMS = ["ng-pop", "ng-wiggle", "ng-spin", "ng-float", "ng-beat"];
const GAIN_ANIMS = ["ng-beat", "ng-pop", "ng-wiggle", "ng-float"];

export default function NextGenOlympiadPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(160deg,#fff7ed_0%,#ffffff_45%,#eef2ff_100%)]">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
          <div>
            <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-brand">Classes I – X</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">NextGen <span className="text-brand">Olympiad</span></h1>
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate">
              A national education Olympiad with more than a decade of experience, excellence and popularity —
              built to discover a learner&apos;s true potential, not just their rank.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["9+ Subjects", "All Boards", "360° Progress Analysis"].map((t) => (
                <span key={t} className="rounded-full bg-gold-soft px-4 py-1.5 text-sm font-extrabold text-gold-ink">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apply"><Button size="lg">Register School</Button></Link>
              <Link href="/awards"><Button variant="outline" size="lg">Awards &amp; Certification</Button></Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image src="/brand/logo-new.jpeg" alt="NextGen Olympiad" fill className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ============ WHAT WE ASSESS ============ */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#fdf2f8_0%,#ffffff_30%,#ffffff_70%,#eff6ff_100%)] px-4 py-20 sm:px-6 lg:px-10 xl:px-14">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ng-blob absolute -left-24 top-10 h-80 w-80 bg-rose-300/30 blur-3xl" />
          <div className="ng-blob absolute -right-24 bottom-10 h-80 w-80 bg-blue-300/30 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px]">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 via-white to-rose-100 px-4 py-2 ring-1 ring-amber-300">
              <Sparkles className="ng-glow h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-xs">Subjects</span>
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              What We{" "}
              <span className="ng-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Assess</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-xl sm:leading-9">
              Application-based assessment tests where students use what they have learned — not just recall it.
            </p>
            <CrestDivider className="mt-6" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((s, i) => {
              const badgeMap = {
                english: "Aa",
                math: "123",
                maths: "123",
                mathematics: "123",
                science: "H₂O",
                evs: "🌱",
                "social science": "🌍",
                sst: "🌍",
                hindi: "अआ",
                gk: "?!",
                computer: "</>",
                art: "🎨",
                music: "♪",
              };
              const key = s.name.toLowerCase();
              const badge = badgeMap[key] || s.name.slice(0, 2).toUpperCase();

              const palette = [
                { grad: "linear-gradient(135deg,#f43f5e 0%,#fb923c 100%)", soft: "bg-rose-50", ring: "ring-rose-200", text: "text-rose-600", glow: "rgba(244,63,94,.5)" },
                { grad: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", soft: "bg-violet-50", ring: "ring-violet-200", text: "text-violet-600", glow: "rgba(139,92,246,.5)" },
                { grad: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", soft: "bg-blue-50", ring: "ring-blue-200", text: "text-blue-600", glow: "rgba(14,165,233,.5)" },
                { grad: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", soft: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-600", glow: "rgba(16,185,129,.5)" },
                { grad: "linear-gradient(135deg,#f59e0b 0%,#fbbf24 100%)", soft: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-600", glow: "rgba(245,158,11,.5)" },
                { grad: "linear-gradient(135deg,#6366f1 0%,#0ea5e9 100%)", soft: "bg-indigo-50", ring: "ring-indigo-200", text: "text-indigo-600", glow: "rgba(99,102,241,.5)" },
              ];
              const c = palette[i % palette.length];
              const Icon = s.icon;
              const anim = SUBJECT_ANIMS[i % SUBJECT_ANIMS.length];

              const card = (
                <div
                  className="ng-card ng-rise group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2"
                  style={{ boxShadow: `0 25px 55px -35px ${c.glow}`, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundImage: c.grad }} />
                    <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full ${c.soft} transition-transform duration-500 group-hover:scale-150`} />
                    <div className="ng-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                  </div>

                  <div className="relative flex items-center justify-between">
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${c.soft} ${c.ring} font-display text-xl font-black ring-2 ${c.text} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105`}
                    >
                      {badge}
                    </div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg" style={{ backgroundImage: c.grad }}>
                      <Icon className={`h-6 w-6 ${anim}`} strokeWidth={1.8} style={{ animationDelay: `${i * 0.25}s` }} />
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{s.name}</h3>
                  <span className="relative mt-3 block h-1 w-10 rounded-full transition-all group-hover:w-20" style={{ backgroundImage: c.grad }} />
                  <p className="relative mt-3 flex-1 text-base font-medium leading-relaxed text-slate-600">{s.text}</p>

                  {s.href && (
                    <span className={`relative mt-6 inline-flex items-center gap-2 text-sm font-bold ${c.text} transition group-hover:gap-3 sm:text-base`}>
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              );
              return s.href ? (
                <Link key={s.name} href={s.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div key={s.name} className="h-full">{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BENCHMARK / GAINS ============ */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(160deg,#eef2ff_0%,#fff7ed_50%,#f0fdf4_100%)] py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ng-blob absolute -right-24 top-0 h-80 w-80 bg-violet-300/30 blur-3xl" />
          <div className="ng-blob absolute -left-24 bottom-0 h-80 w-80 bg-amber-300/30 blur-3xl" />
          <Star className="ng-pop absolute left-[8%] top-16 h-4 w-4 fill-violet-400 text-violet-400" />
          <Star className="ng-float absolute right-[10%] bottom-20 h-4 w-4 fill-amber-400 text-amber-400" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Ranking Ends the Conversation.{" "}
              <span className="ng-shine block bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent sm:inline">
                Benchmark Starts It.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600 sm:text-xl sm:leading-9">
              The vision is to help students understand themselves better as learners — not to feel superior or inferior.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {GAIN.map((g, i) => {
              const palette = [
                "linear-gradient(135deg,#d6006e 0%,#ff3d3d 55%,#ff8a3d 100%)",
                "linear-gradient(135deg,#0057d9 0%,#00a3c4 55%,#00c98d 100%)",
                "linear-gradient(135deg,#5b21b6 0%,#7c3aed 55%,#4f46e5 100%)",
                "linear-gradient(135deg,#c2410c 0%,#ea580c 55%,#f59e0b 100%)",
              ];
              const grad = palette[i % palette.length];
              const Icon = g.icon;
              const anim = GAIN_ANIMS[i % GAIN_ANIMS.length];

              return (
                <div
                  key={g.title}
                  className="ng-card ng-rise group relative overflow-hidden rounded-[2rem] p-8 shadow-[0_35px_80px_-45px_rgba(15,23,42,.9)] transition duration-300 hover:-translate-y-2 sm:p-10"
                  style={{ backgroundImage: grad, animationDelay: `${i * 0.12}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="ng-blob absolute -right-10 -top-14 h-48 w-48 bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                    <div className="absolute -bottom-10 -left-10 h-36 w-36 rotate-12 rounded-[2rem] bg-black/10 blur-xl" />
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="ng-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
                      <span className="absolute inset-0 animate-ping rounded-2xl bg-white/25" style={{ animationDuration: "2.8s", animationDelay: `${i * 0.3}s` }} />
                      <span className="relative grid h-full w-full place-items-center rounded-2xl bg-white/25 text-white ring-1 ring-white/40 backdrop-blur">
                        <Icon className={`h-8 w-8 ${anim}`} strokeWidth={1.8} />
                      </span>
                    </span>
                    <span className="font-display text-6xl font-black leading-none text-white/30 sm:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <h3 className="font-display text-2xl font-extrabold text-white drop-shadow-sm sm:text-3xl">{g.title}</h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-white/95 sm:text-lg">{g.text}</p>
                  </div>

                  <div className="relative mt-7 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    <span className="h-1.5 w-6 rounded-full bg-white/90 transition-all group-hover:w-12" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/apply">
              <Button size="lg" className="gap-2">Register Your School <ArrowRight className="ng-nudge h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}