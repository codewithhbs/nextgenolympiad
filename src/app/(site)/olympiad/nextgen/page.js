import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calculator, Cpu, Leaf, FlaskConical, Target, LineChart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "NextGen Olympiad",
  description: "NextGen Olympiad for Classes I–X — English, Maths, Computational Thinking, EVS and STEM. Application-based assessment with a 360° progress analysis.",
};

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

export default function NextGenOlympiadPage() {
  return (
    <>
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

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fdf2f8_0%,#ffffff_30%,#ffffff_70%,#eff6ff_100%)] px-4 py-16 md:px-6">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">What We Assess</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate">
              Application-based assessment tests where students use what they have learned — not just recall it.
            </p>
            <CrestDivider className="mt-6" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                { bg: "bg-rose-50", ring: "ring-rose-200", text: "text-rose-600", dot: "bg-rose-500" },
                { bg: "bg-violet-50", ring: "ring-violet-200", text: "text-violet-600", dot: "bg-violet-500" },
                { bg: "bg-sky-50", ring: "ring-sky-200", text: "text-sky-600", dot: "bg-sky-500" },
                { bg: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-600", dot: "bg-emerald-500" },
                { bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-600", dot: "bg-amber-500" },
                { bg: "bg-indigo-50", ring: "ring-indigo-200", text: "text-indigo-600", dot: "bg-indigo-500" },
              ];
              const c = palette[i % palette.length];

              const card = (
                <div className="group relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${c.bg} ${c.ring} ring-2 font-display text-xl font-black ${c.text} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105`}
                    >
                      {badge}
                    </div>
                    <span className={`h-2.5 w-2.5 rounded-full ${c.dot} opacity-70`} />
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-base font-medium leading-relaxed text-slate">{s.text}</p>

                  {s.href && (
                    <span className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${c.text} transition group-hover:gap-2`}>
                      Explore <span aria-hidden>→</span>
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

      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#eef2ff_0%,#fff7ed_50%,#f0fdf4_100%)] py-16">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">
              Ranking Ends the Conversation. Benchmark Starts It.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-slate">
              The vision is to help students understand themselves better as learners — not to feel superior or inferior.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {GAIN.map((g, i) => {
              const palette = [
                "bg-[linear-gradient(135deg,#d6006e_0%,#ff3d3d_55%,#ff8a3d_100%)]",
                "bg-[linear-gradient(135deg,#0057d9_0%,#00a3c4_55%,#00c98d_100%)]",
                "bg-[linear-gradient(135deg,#5b21b6_0%,#7c3aed_55%,#4f46e5_100%)]",
                "bg-[linear-gradient(135deg,#c2410c_0%,#ea580c_55%,#f59e0b_100%)]",
              ];
              const grad = palette[i % palette.length];

              return (
                <div
                  key={g.title}
                  className={`group relative overflow-hidden rounded-[2rem] ${grad} p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft`}
                >
                  <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rotate-12 rounded-[2rem] bg-black/10 blur-xl" />

                  <span className="relative font-display text-6xl font-black leading-none text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative mt-4">
                    <h3 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">{g.title}</h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white/95">{g.text}</p>
                  </div>

                  <div className="relative mt-6 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    <span className="h-1.5 w-6 rounded-full bg-white/90" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/apply">
              <Button size="lg">Register Your School</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}