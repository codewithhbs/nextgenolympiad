import Link from "next/link";
import Image from "next/image";
import { Award, Medal, Trophy, FileBadge, GraduationCap, HeartHandshake, BarChart3, Star, Sparkles, ArrowRight } from "lucide-react";
import { Button, Badge, CrestDivider } from "@/components/ui";

export const metadata = {
  title: "Awards & Certification",
  description:
    "NextGen Olympiad awards — gold, silver and bronze medals, certificates of merit, trophies, Student Progress Report and scholarships for meritorious students.",
};

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes aw-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes aw-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes aw-swing{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
@keyframes aw-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}45%{transform:scale(1.12)}}
@keyframes aw-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes aw-spin{to{transform:rotate(360deg)}}
@keyframes aw-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 10px rgba(251,191,36,.95))}}
@keyframes aw-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes aw-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes aw-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes aw-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes aw-bar{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
@keyframes aw-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.aw-float{animation:aw-float 3.2s ease-in-out infinite}
.aw-wiggle{animation:aw-wiggle 2.4s ease-in-out infinite}
.aw-swing{animation:aw-swing 2.4s ease-in-out infinite;transform-origin:50% 0}
.aw-beat{animation:aw-beat 1.6s ease-in-out infinite}
.aw-pop{animation:aw-pop 1.8s ease-in-out infinite}
.aw-spin{animation:aw-spin 14s linear infinite}
.aw-glow{animation:aw-glow 2s ease-in-out infinite}
.aw-shine{background-size:200% 100%;animation:aw-shine 3.5s linear infinite}
.aw-blob{animation:aw-blob 10s ease-in-out infinite}
.aw-rise{animation:aw-rise .7s ease-out both}
.aw-nudge{animation:aw-nudge 1.2s ease-in-out infinite}
.aw-bar{transform-origin:bottom;animation:aw-bar 1.5s ease-in-out infinite alternate}
.aw-card:hover .aw-sweep{animation:aw-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="aw-"]{animation:none!important}}
`;

const MEDALS = [
  {
    icon: Trophy,
    grad: "linear-gradient(135deg,#eab308 0%,#f59e0b 100%)",
    title: "Gold Medal of Distinction",
    band: "85% and above",
    text: "Certificate of Distinction with the Gold Medal for class toppers scoring 85% and above.",
  },
  {
    icon: Medal,
    grad: "linear-gradient(135deg,#94a3b8 0%,#64748b 100%)",
    title: "Silver Medal of Excellence",
    band: "80% – 84.99%",
    text: "Awarded to students scoring between 80% and 84.99% in their Olympiad paper.",
  },
  {
    icon: Medal,
    grad: "linear-gradient(135deg,#c2410c 0%,#9a3412 100%)",
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

const EVERY_GRADIENTS = [
  "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)",
  "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)",
  "linear-gradient(135deg,#10b981 0%,#facc15 100%)",
  "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)",
];

const SCHOLARSHIPS = [
  {
    icon: HeartHandshake,
    grad: "linear-gradient(135deg,#d6006e 0%,#ff8a3d 100%)",
    title: "Girl Child Scholarship (GCS)",
    amount: "₹5,000 × 100 students",
    text: "A special initiative to empower young girls through education. One-time scholarships of ₹5,000 each are awarded to 100 deserving and academically meritorious girl students from economically weaker sections across India.",
  },
  {
    icon: GraduationCap,
    grad: "linear-gradient(135deg,#0057d9 0%,#00c98d 100%)",
    title: "Academic Excellence Scholarship Award",
    amount: "₹5,000 × 100 students",
    text: "100 deserving students are awarded a one-time scholarship of ₹5,000 each — a source of motivation that inspires learners to strive for greater academic success.",
  },
];

const MEDAL_ANIMS = ["aw-wiggle", "aw-swing", "aw-swing"];
const EVERY_ANIMS = ["aw-pop", "aw-float", "aw-beat", "aw-wiggle"];
const SCH_ANIMS = ["aw-beat", "aw-pop"];
/* podium order: silver, gold, bronze on large screens */
const PODIUM = ["lg:order-2 lg:-translate-y-6", "lg:order-1", "lg:order-3"];

export default function AwardsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ HERO ============ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#ffffff 45%,#eef2ff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="aw-blob absolute -right-24 -top-24 h-96 w-96 bg-rose-300/30 blur-3xl" />
          <div className="aw-blob absolute -bottom-24 -left-24 h-96 w-96 bg-amber-300/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, black, transparent)" }}
          />
          <Star className="aw-pop absolute left-[30%] top-10 h-5 w-5 fill-amber-400 text-amber-400" />
          <Star className="aw-float absolute right-[32%] bottom-12 h-4 w-4 fill-rose-400 text-rose-400" />
        </div>

        <div className="aw-swing pointer-events-none absolute left-1 top-0 z-10 sm:left-6 lg:left-12">
          <Image src="/why-nextgen/medal.png" alt="Medal" width={226} height={290} priority className="h-20 w-auto drop-shadow-[0_15px_25px_rgba(240,180,41,.45)] sm:h-28 lg:h-40" />
        </div>
        <div className="aw-float pointer-events-none absolute right-0 top-16 z-10 sm:right-4 sm:top-14 lg:right-10 lg:top-16">
          <Image src="/why-nextgen/trophy.png" alt="Trophy" width={328} height={335} className="h-24 w-auto drop-shadow-[0_18px_30px_rgba(240,180,41,.5)] sm:h-32 lg:h-44" />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[1600px] px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-10 xl:px-14">
          <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,.8)] ring-1 ring-rose-100 backdrop-blur">
            <span className="relative grid h-10 w-10 place-items-center rounded-full">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/40" style={{ animationDuration: "2.6s" }} />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                <Award className="aw-pop h-5 w-5" />
              </span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-sm">Recognition</span>
            <Sparkles className="aw-glow h-4 w-4 text-amber-500" />
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
            Awards &amp;{" "}
            <span className="aw-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Certification</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            NextGen Olympiad celebrates excellence by recognising outstanding student performance at the
            National, Zonal and School levels — with trophies, medals, certificates and special recognition prizes.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/apply">
              <Button size="lg" className="gap-2">Register Your School <ArrowRight className="aw-nudge h-4 w-4" /></Button>
            </Link>
            <Link href="/results">
              <Button variant="outline" size="lg" className="gap-2"><BarChart3 className="aw-pop h-4 w-4" /> Check Result</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ LEVELS ============ */}
      <section
        className="relative w-full overflow-hidden py-20"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="aw-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Badge tone="gold">Three Levels</Badge>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              National · Zonal ·{" "}
              <span className="aw-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">School</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600 sm:text-xl sm:leading-9">
              Meritorious students are awarded at every level, motivating young learners to strive for greater academic achievement.
              Every participant receives appreciation for their effort.
            </p>
            <CrestDivider className="mt-6" />
          </div>

          <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
            {MEDALS.map((m, i) => (
              <div
                key={m.title}
                className={`aw-card aw-rise group relative overflow-hidden rounded-[2rem] bg-white p-8 text-center ring-1 ring-black/5 shadow-[0_25px_55px_-35px_rgba(15,23,42,.6)] transition duration-300 hover:-translate-y-2 ${PODIUM[i % PODIUM.length]}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundImage: m.grad }} />
                  <div className="aw-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                </div>

                <div className="relative mx-auto h-24 w-24">
                  <svg className="aw-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                    <circle cx="50" cy="50" r="46" stroke="#f0b429" strokeOpacity=".6" strokeWidth="2.5" strokeDasharray="40 18" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-2 grid place-items-center rounded-full text-white shadow-lg ring-4 ring-white" style={{ backgroundImage: m.grad }}>
                    <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ backgroundImage: m.grad, animationDuration: "2.8s", animationDelay: `${i * 0.35}s` }} />
                    <m.icon className={`relative h-10 w-10 ${MEDAL_ANIMS[i % MEDAL_ANIMS.length]}`} />
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{m.title}</h3>
                <span
                  className="relative mt-3 inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold text-white shadow-sm sm:text-base"
                  style={{ backgroundImage: m.grad }}
                >
                  {m.band}
                </span>
                <p className="relative mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVERY PARTICIPANT ============ */}
      <section
        className="relative w-full overflow-hidden py-20"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="aw-blob absolute -left-24 top-0 h-96 w-96 bg-violet-300/25 blur-3xl" />
          <div className="aw-blob absolute -right-24 bottom-0 h-96 w-96 bg-emerald-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Badge tone="gold">For Every Participant</Badge>
            <h2 className="mt-5 font-display text-3xl font-extrabold capitalize tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              Nobody goes Home{" "}
              <span className="aw-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Empty-Handed</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600 sm:text-xl sm:leading-9">
              Ranking ends the conversation. A benchmark starts it — so every child gets a certificate and a detailed growth report.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {EVERY.map((e, i) => (
              <div
                key={e.title}
                className="aw-card aw-rise group relative flex gap-6 overflow-hidden rounded-[2rem] p-7 shadow-[0_30px_70px_-40px_rgba(15,23,42,.85)] transition duration-300 hover:-translate-y-2 sm:p-8"
                style={{ backgroundImage: EVERY_GRADIENTS[i % EVERY_GRADIENTS.length], animationDelay: `${i * 0.1}s` }}
              >
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="aw-blob absolute -right-8 -top-10 h-40 w-40 bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="aw-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>

                <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
                  <span className="absolute inset-0 animate-ping rounded-2xl bg-white/25" style={{ animationDuration: "2.8s", animationDelay: `${i * 0.3}s` }} />
                  <span className="relative grid h-full w-full place-items-center rounded-2xl bg-white/25 text-white ring-1 ring-white/40 backdrop-blur">
                    <e.icon className={`h-8 w-8 ${EVERY_ANIMS[i % EVERY_ANIMS.length]}`} />
                  </span>
                </span>

                <div className="relative">
                  <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">{e.title}</h3>
                  <p className="mt-2 text-base font-medium leading-relaxed text-white/90 sm:text-lg">{e.text}</p>
                  {i === 1 && (
                    <div className="mt-4 flex h-10 items-end gap-1.5" aria-hidden>
                      {[40, 60, 52, 75, 90, 100].map((h, k) => (
                        <span key={k} className="aw-bar w-3 rounded-t-md bg-white/70" style={{ height: `${h}%`, animationDelay: `${k * 0.15}s` }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SCHOLARSHIPS ============ */}
      <section
        className="relative w-full overflow-hidden py-20"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fff7ed 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="aw-blob absolute -right-24 top-0 h-80 w-80 bg-rose-300/25 blur-3xl" />
          <div className="aw-blob absolute -left-24 bottom-0 h-80 w-80 bg-blue-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Badge tone="gold">Scholarships</Badge>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              <span className="aw-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">₹10,00,000+</span>{" "}
              in student scholarships
            </h2>
            <CrestDivider className="mt-6" />
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {SCHOLARSHIPS.map((s, i) => (
              <div
                key={s.title}
                className="aw-card aw-rise group relative overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-black/5 shadow-[0_30px_70px_-42px_rgba(15,23,42,.7)] transition duration-300 hover:-translate-y-2 sm:p-10"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundImage: s.grad }} />
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="aw-blob absolute -right-12 -top-12 h-44 w-44 opacity-15 blur-2xl" style={{ backgroundImage: s.grad }} />
                  <div className="aw-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                </div>

                <span className="relative grid h-16 w-16 place-items-center rounded-2xl">
                  <span className="absolute inset-0 animate-ping rounded-2xl opacity-30" style={{ backgroundImage: s.grad, animationDuration: "2.8s" }} />
                  <span className="relative grid h-full w-full place-items-center rounded-2xl text-white shadow-lg" style={{ backgroundImage: s.grad }}>
                    <s.icon className={`h-8 w-8 ${SCH_ANIMS[i % SCH_ANIMS.length]}`} />
                  </span>
                </span>

                <h3 className="relative mt-6 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{s.title}</h3>
                <span
                  className="relative mt-3 inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold text-white shadow-sm sm:text-base"
                  style={{ backgroundImage: s.grad }}
                >
                  {s.amount}
                </span>
                <p className="relative mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative w-full px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto w-full max-w-[1600px]">
          <div
            className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] px-6 py-14 text-center text-white shadow-[0_45px_100px_-45px_rgba(76,29,149,.9)] sm:px-12 lg:flex-row lg:justify-between lg:text-left"
            style={{ backgroundImage: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 45%,#be185d 100%)" }}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="aw-blob absolute -right-16 -top-16 h-72 w-72 bg-amber-400/25 blur-3xl" />
              <div className="aw-blob absolute -left-16 bottom-0 h-64 w-64 bg-blue-400/20 blur-3xl" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <Star className="aw-pop absolute left-[12%] bottom-8 h-5 w-5 fill-amber-300 text-amber-300" />
            </div>

            <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:text-left">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-[0_0_60px_-10px_rgba(251,191,36,.9)]">
                <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/30" style={{ animationDuration: "2.6s" }} />
                <Trophy className="aw-wiggle relative h-10 w-10 text-violet-900" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold sm:text-4xl xl:text-5xl">Ready to put your students on the podium?</h2>
                <p className="mt-3 text-base font-semibold text-white/85 sm:text-lg">Register your school for the NextGen Olympiad today.</p>
              </div>
            </div>

            <Link href="/apply" className="relative shrink-0">
              <Button variant="gold" size="lg" className="gap-2">Register School <ArrowRight className="aw-nudge h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}