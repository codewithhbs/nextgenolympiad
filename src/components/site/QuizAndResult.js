import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Palette, ArrowRight } from "lucide-react";
import ResultLookup from "@/components/site/ResultLookup";

const PROGRAMS = [
  {
    icon: GraduationCap,
    title: "NextGen Olympiad\nI to X",
    text: "English, Computational Thinking, Mathematics, STEM/EVS. Conducted offline on multiple dates.",
    href: "/olympiad/nextgen",
    card: "from-ink to-ink-soft",
    image: "/brand/books.png",
    btn: "bg-saffron text-white hover:bg-saffron/90",
    line: "bg-saffron",
  },
  {
    icon: Palette,
    title: "Wonder Kids\nBal Vatika I–III",
    text: "English, Mathematics, EVS, Hindi & Drawing — joyful, age-appropriate assessments for early learners.",
    href: "/olympiad/wonder-kids",
    btn: "bg-ink text-white hover:bg-ink/90",
    line: "bg-white/70",
    image: "/brand/grilstudent.png",
    card: "from-saffron to-cherry",
  },
];

const QuizAndResult = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* PROGRAM CARDS */}
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <div key={p.title}
              className={`relative isolate overflow-hidden rounded-3xl bg-gradient-to-br ${p.card} p-6 shadow-soft sm:p-8`}>
              {/* decorative circles */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/5 sm:-right-20 sm:-top-20 sm:h-64 sm:w-64" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/5 sm:-bottom-16 sm:-left-16 sm:h-40 sm:w-40" />

              {/* image — fixed footprint, never overlaps text */}
              <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-28 opacity-90 sm:h-44 sm:w-40 md:h-52 md:w-48">
                <Image src={p.image} alt="" fill sizes="200px" className="object-contain object-bottom" priority />
              </div>

              {/* content — reserves space for image at every breakpoint */}
              <div className="relative z-10 max-w-[62%] text-white sm:max-w-[58%]">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 sm:mb-5 sm:h-11 sm:w-11">
                  <p.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>

                <h3 className="whitespace-pre-line text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                  {p.title}
                </h3>

                <span className={`mt-3 block h-1 w-12 rounded-full ${p.line}`} />

                <p className="mt-3 text-sm text-white/85 sm:mt-4 sm:text-base">{p.text}</p>

                <Link href={p.href}
                  className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-soft transition hover:-translate-y-0.5 sm:mt-7 sm:px-6 sm:py-3 sm:text-base ${p.btn}`}>
                  View details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESULT BAND */}
      {/* <div className="mt-8 overflow-hidden bg-cream px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-leaf/10 px-4 py-1.5 text-sm font-bold text-leaf">Results</span>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">Check your result instantly</h2>
            <p className="mt-2 text-ink-soft">Enter your Student Code to view your score, percentage and rank.</p>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[220px_1fr_220px]">
            <div className="hidden justify-center lg:flex">
              <div className="relative h-56 w-56">
                <Image src="/brand/search.png" alt="" fill sizes="220px" className="object-contain" priority />
              </div>
            </div>

            <div className="relative">
              <ResultLookup />
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="relative h-56 w-56">
                <Image src="/brand/trophy.png" alt="" fill sizes="220px" className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default QuizAndResult;