import Link from "next/link";
import Image from "next/image";
import { Award, Medal, Trophy, FileBadge, GraduationCap, HeartHandshake, BarChart3, Star } from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "Awards & Certification",
  description:
    "NextGen Olympiad awards — gold, silver and bronze medals, certificates of merit, trophies, Student Progress Report and scholarships for meritorious students.",
};

const MEDALS = [
  {
    icon: Trophy,
    tone: "gold",
    title: "Gold Medal of Distinction",
    band: "85% and above",
    text: "Certificate of Distinction with the Gold Medal for class toppers scoring 85% and above.",
  },
  {
    icon: Medal,
    tone: "silver",
    title: "Silver Medal of Excellence",
    band: "80% – 84.99%",
    text: "Awarded to students scoring between 80% and 84.99% in their Olympiad paper.",
  },
  {
    icon: Medal,
    tone: "bronze",
    title: "Bronze Medal of Excellence",
    band: "75% – 79.99%",
    text: "Awarded to students scoring between 75% and 79.99% in their Olympiad paper.",
  },
];

const EVERY = [
  { icon: FileBadge, title: "Certificate of Participation", text: "Every single participant receives a certificate — effort is always recognised." },
  { icon: BarChart3, title: "Student Progress Report (SPR)", text: "A detailed 360° report showing what the child knows, where the gaps are, and how they are growing at topic, school and national level." },
  { icon: Star, title: "School-level Merit", text: "1st, 2nd and 3rd position holders receive Medals and Certificates of Merit at the school level." },
  { icon: Award, title: "Trophies & Cash Prizes", text: "High performers are awarded Certificates of Merit, Medals, Trophies and Cash Prizes as per the Olympiad award policy." },
];

const SCHOLARSHIPS = [
  {
    icon: HeartHandshake,
    title: "Girl Child Scholarship (GCS)",
    amount: "₹5,000 × 100 students",
    text: "A special initiative to empower young girls through education. One-time scholarships of ₹5,000 each are awarded to 100 deserving and academically meritorious girl students from economically weaker sections across India.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence Scholarship Award",
    amount: "₹5,000 × 100 students",
    text: "100 deserving students are awarded a one-time scholarship of ₹5,000 each — a source of motivation that inspires learners to strive for greater academic success.",
  },
];

const TONES = {
  gold: "bg-gold text-brand-deep",
  silver: "bg-slate text-white",
  bronze: "bg-gold-dark text-white",
};

export default function AwardsPage() {
  return (
    <>
      {/* HERO */}
{/* HERO */}
<section className="relative overflow-hidden border-b border-line bg-white">
  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

  {/* medal + trophy */}
  <Image
    src="/why-nextgen/medal.png" alt="Medal" width={226} height={290} priority
    className="pointer-events-none absolute left-1 top-2 z-10 h-20 w-auto drop-shadow-md sm:left-6 sm:h-28 lg:left-12 lg:h-40"
  />
  <Image
    src="/why-nextgen/trophy.png" alt="Trophy" width={328} height={335}
    className="pointer-events-none absolute right-0 top-16 z-10 h-24 w-auto drop-shadow-md sm:right-4 sm:top-14 sm:h-32 lg:right-10 lg:top-16 lg:h-44"
  />

  <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 text-center sm:py-20 md:px-6">
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-brand">
      <Award className="h-4 w-4" /> Recognition
    </span>
    <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
      Awards &amp; <span className="text-brand">Certification</span>
    </h1>
    <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate">
      NextGen Olympiad celebrates excellence by recognising outstanding student performance at the
      National, Zonal and School levels — with trophies, medals, certificates and special recognition prizes.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link href="/apply"><Button size="lg">Register Your School</Button></Link>
      <Link href="/results"><Button variant="outline" size="lg">Check Result</Button></Link>
    </div>
  </div>
</section>

      {/* LEVELS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <Badge tone="gold">Three Levels</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">National · Zonal · School</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate">
            Meritorious students are awarded at every level, motivating young learners to strive for greater academic achievement.
            Every participant receives appreciation for their effort.
          </p>
          <CrestDivider className="mt-6" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {MEDALS.map((m) => (
            <div key={m.title} className="rounded-3xl border border-line bg-white p-7 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${TONES[m.tone]}`}>
                <m.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{m.title}</h3>
              <span className="mt-2 inline-flex rounded-full bg-gold-soft px-3 py-1 text-sm font-extrabold text-gold-ink">{m.band}</span>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVERY PARTICIPANT */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <Badge tone="gold">For Every Participant</Badge>
            <h2 className="mt-4 font-display text-3xl capitalize font-extrabold text-ink md:text-4xl">Nobody goes Home Empty-Handed</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate">
              Ranking ends the conversation. A benchmark starts it — so every child gets a certificate and a detailed growth report.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {EVERY.map((e) => (
              <div key={e.title} className="flex gap-5 rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <e.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">{e.title}</h3>
                  <p className="mt-2 text-base font-medium leading-relaxed text-slate">{e.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <Badge tone="gold">Scholarships</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">₹10,00,000+ in student scholarships</h2>
          <CrestDivider className="mt-6" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SCHOLARSHIPS.map((s) => (
            <div key={s.title} className="relative overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{s.title}</h3>
              <span className="mt-2 inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-extrabold text-brand">{s.amount}</span>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-deep py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Ready to put your students on the podium?</h2>
            <p className="mt-2 text-lg font-semibold text-white/90">Register your school for the NextGen Olympiad today.</p>
          </div>
          <Link href="/apply"><Button variant="gold" size="lg">Register School</Button></Link>
        </div>
      </section>
    </>
  );
}
