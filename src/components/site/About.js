import Link from "next/link";
import Image from "next/image";
import { Landmark, Target, Trophy, Globe2, ArrowRight, Brain } from "lucide-react";

const FOOTER_ITEMS = [
  { icon: Brain, title: "Knowledge", note: "that empowers" },
  { icon: Target, title: "Skills", note: "that prepare" },
  { icon: Trophy, title: "Excellence", note: "that defines us" },
  { icon: Globe2, title: "Nationwide", note: "reach, lasting impact" },
];

const MINI_STATS = [
  ["I–X", "Classes"],
  ["9+", "Subjects"],
  ["All", "Boards"],
];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-ivory py-16 md:py-24">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-gold/5 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* TEXT */}
          <div className="animate-fade-up lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold-dark">
                <Landmark className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">About the Foundation</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy md:text-[2.6rem]">
              Ranking ends the conversation.<br />
              <span className="text-gold-dark">Benchmark</span> starts it.
            </h2>
            <span className="mt-4 block h-1 w-14 rounded-full bg-gold" aria-hidden />
            <p className="mt-6 max-w-lg text-slate">
              NextGen Olympiad Foundation is a registered educational trust with more than a decade of experience in national education olympiads. We recognise excellence — but our real focus is helping every learner understand themselves better.
            </p>
            <p className="mt-4 max-w-lg text-slate">
              Instead of pitting a child against lakhs of others, we create a personal benchmark: students compete against their own best self, guided by detailed reports that show what they know, where the gaps are, and how they're growing.
            </p>

            <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
              {MINI_STATS.map(([a, b]) => (
                <div key={b} className="rounded-2xl border border-line bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
                  <div className="font-display text-2xl font-extrabold text-navy">{a}</div>
                  <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate">{b}</div>
                </div>
              ))}
            </div>

            <Link href="/about"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy py-3 pl-6 pr-2 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-deep">
              Explore Our Journey
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>

          {/* IMAGE CARD */}
          <div className="relative animate-fade-up lg:col-span-6">
            <div className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full bg-gold/15 blur-2xl" aria-hidden />

            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
              {/* illustration */}
              <div className="relative p-2 pb-0">
                <Image src="/brand/about-scene.png" alt="Teacher guiding students through NextGen Olympiad activities"
                  width={1200} height={900} className="h-auto w-full rounded-t-[1.75rem] object-contain" priority />

               
              </div>

   
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}