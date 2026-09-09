import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calculator, Cpu, Leaf, FlaskConical, Target, LineChart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "NextGen Olympiad",
  description: "NextGen Olympiad for Classes I–X — English, Maths, Computational Thinking, EVS and STEM. Application-based assessment with a 360° progress analysis.",
};

const SUBJECTS = [
  { icon: BookOpen, name: "English", text: "Comprehension, grammar and expression tested through real usage." },
  { icon: Calculator, name: "Mathematics", text: "Concept application over rote formula recall." },
  { icon: Cpu, name: "Computational Thinking", text: "Logic, patterns, algorithms — the literacy of the next decade." },
  { icon: Leaf, name: "EVS", text: "Environment and everyday science awareness." },
  { icon: FlaskConical, name: "S T E M", text: "Science, technology, engineering and maths, integrated." },
];

const GAIN = [
  { icon: Target, title: "Benchmark, not rank", text: "Students compete against their own self, not against lakhs of others. Self-growth is the metric." },
  { icon: LineChart, title: "360° progress analysis", text: "Detailed reports show what they know, where the gaps are and how they are growing at topic, school and national level." },
  { icon: ShieldCheck, title: "All boards, one standard", text: "Aligned across boards for Classes I–X with 9+ subjects on offer." },
  { icon: CheckCircle2, title: "Application-based testing", text: "Students use what they've learned instead of just recalling it — the way real-world success works." },
];

export default function NextGenOlympiadPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
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
          {/* <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image src="/brand/poster.png" alt="NextGen Olympiad" fill className="object-contain drop-shadow-2xl" />
          </div> */}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <Badge tone="gold">Subjects</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">What we assess</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate">
            Application-based assessment tests where students use what they have learned — not just recall it.
          </p>
          <CrestDivider className="mt-6" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => (
            <div key={s.name} className="rounded-3xl border border-line bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-gold hover:shadow-soft">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{s.name}</h3>
              <p className="mt-2 text-base font-medium leading-relaxed text-slate">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <Badge tone="gold">Our Forte</Badge>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">Ranking ends the conversation. Benchmark starts it.</h2>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-slate">
              The vision is to help students understand themselves better as learners — not to feel superior or inferior.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {GAIN.map((g) => (
              <div key={g.title} className="flex gap-5 rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                  <g.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">{g.title}</h3>
                  <p className="mt-2 text-base font-medium leading-relaxed text-slate">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/apply"><Button size="lg">Register Your School</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
