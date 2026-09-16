import Link from "next/link";
import Image from "next/image";
import { Landmark, ArrowRight } from "lucide-react";

const MINI_STATS = [
  ["I–X", "Classes"],
  ["9+", "Subjects"],
  ["All", "Boards"],
];

export default function About() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#fdf2f8 50%,#eff6ff 100%)" }}
    >
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="animate-fade-up lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand/40 text-brand-deep">
                <Landmark className="h-6 w-6" />
              </span>
              <span className="text-xl font-bold uppercase tracking-[0.25em] text-brand">About the Foundation</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy md:text-[2.6rem]">
              Ranking ends the conversation.<br />
              <span className="text-crimson">Benchmark</span> starts it.
            </h2>
            <span className="mt-4 block h-1 w-14 rounded-full bg-gold" aria-hidden />
            <p className="mt-6 max-w-lg text-slate">
              NextGen Olympiad Foundation is a registered educational trust with more than a decade of experience in national education olympiads. We recognise excellence — but our real focus is helping every learner understand themselves better.
            </p>
            <p className="mt-4 max-w-lg text-slate">
              Instead of pitting a child against lakhs of others, we create a personal benchmark: students compete against their own best self, guided by detailed reports that show what they know, where the gaps are, and how they're growing.
            </p>

            <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
              {MINI_STATS.map(([a, b], i) => {
                const gradients = [
                  "linear-gradient(135deg,#f472b6 0%,#fb923c 100%)",
                  "linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)",
                  "linear-gradient(135deg,#4ade80 0%,#facc15 100%)",
                ];
                return (
                  <div
                    key={b}
                    className="rounded-2xl p-4 text-center text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                    style={{ backgroundImage: gradients[i % gradients.length] }}
                  >
                    <div className="font-display text-2xl font-extrabold">{a}</div>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide">{b}</div>
                  </div>
                );
              })}
            </div>

            <Link href="/about"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-crimson py-3 pl-6 pr-2 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-deep">
              Explore Our Journey
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>

          <div className="relative animate-fade-up lg:col-span-6">
            <div className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full bg-gold/15 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
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