import Image from "next/image";
import Link from "next/link";
import {
  Eye, ShieldCheck, Users, Target, Sparkles, Trophy, Medal,
  GraduationCap, BookOpen, HeartHandshake, ArrowRight,
  Award, Gem, CheckCircle2,
} from "lucide-react";
import { Badge, Button, CrestDivider } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";

/* ---------------- decorative helpers ---------------- */
function Star4({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.7 6.2 5.1 10.6 12 12-6.9 1.4-11.3 5.8-12 12-.7-6.2-5.1-10.6-12-12C6.9 10.6 11.3 6.2 12 0z" />
    </svg>
  );
}

function Laurel({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M15 2c-5 3-7 7-6 12 .5 3 2.5 6 5 8" />
      <path d="M13 5c-2.5-.6-4 .4-4.5 2.2" />
      <path d="M11 9c-2.6-.4-4 .8-4.3 2.6" />
      <path d="M10 13c-2.6-.2-3.9 1.1-4 3" />
      <path d="M10 17.5c-2.5.2-3.6 1.6-3.5 3.5" />
    </svg>
  );
}

function DotGrid({ className = "", cols = 6, rows = 5 }) {
  return (
    <div className={`grid gap-2.5 sm:gap-3 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }} aria-hidden>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-rose-200" />
      ))}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-red-600 sm:text-xs sm:tracking-[0.35em]">{children}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
    </div>
  );
}

function GemDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300 sm:w-28 md:w-40" />
      <span className="h-1.5 w-1.5 rotate-45 bg-amber-400" />
      <Gem className="h-4 w-4 text-amber-500" />
      <span className="h-1.5 w-1.5 rotate-45 bg-amber-400" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300 sm:w-28 md:w-40" />
    </div>
  );
}

/* ---------------- metadata ---------------- */
export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch { }
  return buildMetadata({
    title: `About Us • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "NextGen Olympiad Foundation — a veteran of national education olympiads with over a decade of experience, nurturing learners from Bal Vatika to Class X.",
    keywords: ["about nextgen olympiad", "olympiad foundation india", "wonder kids olympiad", "school olympiad"],
    path: "/about",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

/* ---------------- data ---------------- */
const VISION = [
  { icon: Eye, title: "Our Vision", text: "To empower students and teachers for a future-ready educational system, and to see Bharat as the Vishwaguru — discovering learners' potential by opening new opportunities and strengthening their knowledge base and confidence." },
  { icon: ShieldCheck, title: "A Registered Trust", text: "NextGen Olympiad Foundation is a trust registered by the Govt. of NCT of Delhi, headquartered in New Delhi, dedicated to promoting learning beyond the school curriculum for Classes Bal Vatika I to X." },
  { icon: Users, title: "In Partnership", text: "We are proud to associate with esteemed, future-ready institutions in spreading quality education — reckoned as the organiser of one of the biggest and most popular national olympiads." },
];

const GAINS = [
  { icon: Award, title: "Skills that last a lifetime", text: "Beyond certificates and medals — real understanding students carry forward." },
  { icon: Target, title: "Measurable improvement", text: "See interpretational improvement in specific areas over time." },
  { icon: Sparkles, title: "Powered potential", text: "Strong assessment tools and reports that reveal each learner's strengths." },
];

const AWARDS = [
  { medal: "Gold", ring: "from-amber-300 to-amber-500", label: "Gold Medal & Certificate of Distinction", note: "Class toppers scoring 85% and above.", icon: Medal },
  { medal: "Silver", ring: "from-slate-200 to-slate-400", label: "Silver Medal of Excellence", note: "Students scoring 80% to 84.99%.", icon: Medal },
  { medal: "Bronze", ring: "from-orange-300 to-orange-600", label: "Bronze Medal of Excellence", note: "Students scoring 75% to 79.99%.", icon: Medal },
  { medal: "SPR", ring: "from-red-400 to-red-700", label: "Student Progress Report", note: "A detailed SPR for every participant.", icon: BookOpen },
  { medal: "All", ring: "from-rose-300 to-rose-600", label: "Certificate of Participation", note: "Awarded to all participants.", icon: Award },
];

const SCHOLARSHIPS = [
  { icon: HeartHandshake, title: "Girl Child Scholarship (SGCS)", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving, academically meritorious girl students from economically weaker sections across India.", tagline: "Educate a girl, empower a generation." },
  { icon: GraduationCap, title: "Academic Excellence Scholarship", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving students — a source of motivation to strive for greater academic success.", tagline: "Rewarding excellence today, building a better tomorrow." },
];

const STATS = [
  { value: "10+", label: "Years of experience" },
  { value: "Bal Vatika – X", label: "Classes covered" },
  { value: "200", label: "Scholarships awarded" },
  { value: "Pan-India", label: "School network" },
];

/* ---------------- page ---------------- */
export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white pt-10 pb-20 sm:pt-14 sm:pb-28 md:pt-16 md:pb-36">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <svg className="absolute -left-28 -top-28 h-[280px] w-[280px] opacity-40 sm:h-[400px] sm:w-[400px]" viewBox="0 0 400 400" fill="none">
            {[40, 70, 100, 130, 160, 190].map((r) => (
              <circle key={r} cx="120" cy="120" r={r} stroke="#fecdd3" strokeWidth="1.2" />
            ))}
            <circle cx="120" cy="120" r="30" fill="#fee2e2" opacity="0.5" />
          </svg>
          <div className="absolute -right-24 top-16 hidden h-[320px] w-[320px] rounded-full bg-rose-50/70 md:block" />
          <DotGrid className="absolute right-6 top-6 opacity-60 sm:right-12 sm:top-8" cols={5} rows={4} />
          <DotGrid className="absolute left-4 top-[58%] hidden opacity-60 sm:grid sm:left-8" cols={4} rows={3} />
          <Star4 className="absolute left-[10%] top-[16%] h-4 w-4 text-amber-400 sm:h-6 sm:w-6 sm:left-[16%]" />
          <Star4 className="absolute left-[8%] top-[34%] h-3 w-3 text-rose-300 sm:h-4 sm:w-4 sm:left-[15%]" />
          <Star4 className="absolute right-[10%] top-[30%] h-4 w-4 text-amber-400 sm:h-5 sm:w-5 sm:right-[15%]" />
        </div>

        {/* trophy */}
        <div className="pointer-events-none absolute bottom-12 right-0 hidden w-[210px] translate-x-2 select-none lg:block xl:w-[260px]" aria-hidden>
          <img src="/images/trophy-laurel.png" alt="" className="h-auto w-full opacity-95 drop-shadow-[0_18px_35px_rgba(240,180,41,0.25)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-4 py-2 shadow-[0_10px_30px_-18px_rgba(240,180,41,0.9)] sm:gap-3 sm:px-5">
            <Laurel className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-600 sm:text-xs sm:tracking-[0.18em]">
              Learn <span className="text-amber-500">•</span> Compete <span className="text-amber-500">•</span> Excel
            </span>
            <Laurel className="h-4 w-4 -scale-x-100 text-amber-500" />
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl font-display text-2xl font-extrabold leading-[1.18] tracking-tight text-neutral-900 sm:mt-6 sm:text-4xl md:text-5xl">
            A veteran of <span className="text-red-600">national education olympiads</span>
          </h1>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-amber-300 sm:w-24" />
            <Star4 className="h-4 w-4 text-amber-400" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-amber-300 sm:w-24" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            NextGen Olympiad Foundation brings more than a decade of experience, excellence and popularity — designing olympiads that reward reasoning over rote.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-7">
            <Link href="/apply"><Button variant="gold" size="lg" className="gap-2">Register School <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Talk to us</Button></Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden>
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="h-16 w-full sm:h-24 md:h-32">
            <path d="M0,150 C280,60 520,190 820,160 C1080,134 1260,70 1440,110 L1440,260 L0,260 Z" fill="#d81f26" />
            <path d="M0,152 C280,62 520,192 820,162 C1080,136 1260,72 1440,112" stroke="#f0b429" strokeWidth="2.5" fill="none" />
            <path d="M0,196 C300,120 560,236 880,206 C1120,184 1290,140 1440,166" stroke="#f7d27a" strokeWidth="1.5" fill="none" opacity="0.9" />
            <path d="M120,258 C300,200 620,238 900,196 C1140,160 1300,180 1440,150" stroke="#f0b429" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative -mt-6 sm:-mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] sm:gap-4 sm:rounded-3xl sm:p-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl bg-rose-50/50 px-3 py-5 text-center sm:px-4 sm:py-6">
                <div className="font-display text-xl font-extrabold text-red-600 sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-500 sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative order-2 md:order-1">
            <div className="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 rounded-2xl border-2 border-amber-200 sm:block" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-2 shadow-[0_25px_70px_-40px_rgba(0,0,0,0.5)]">
              <Image src="/brand/about-scene.png" alt="Young learners with a teacher" width={1000} height={800} className="h-auto w-full rounded-2xl object-contain" />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-2xl bg-red-600/10 sm:block" aria-hidden />
          </div>

          <div className="order-1 text-center md:order-2 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2">
              <Star4 className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-xs">About the Foundation</span>
            </span>

            <h2 className="mt-5 font-display text-2xl font-extrabold leading-snug text-neutral-900 sm:text-3xl md:text-4xl">
              Inspiring young minds, <span className="text-red-600">beyond the classroom</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
              NextGen Olympiad Foundation is a Government of NCT of Delhi registered educational trust based in New Delhi. Our mission is to inspire young minds, nurture talent, and promote learning beyond the classroom for students from Bal Vatika I to Class X through innovative Olympiad programs.
            </p>

            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
              We envision a future-ready education system that empowers students and teachers with knowledge, confidence, and critical thinking. As one of India&apos;s leading National Olympiad organisers, we partner with schools across the country to unlock every child&apos;s true potential.
            </p>

            <ul className="mt-6 grid gap-2.5 text-left sm:grid-cols-2">
              {["Govt. registered trust", "Pan-India school network", "Reasoning-first papers", "Detailed progress reports"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= VISION / TRUST / PARTNERSHIP ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 to-white py-14 sm:py-20">
        <DotGrid className="pointer-events-none absolute left-4 top-10 hidden opacity-50 lg:grid" cols={5} rows={5} />
        <DotGrid className="pointer-events-none absolute right-4 bottom-10 hidden opacity-50 lg:grid" cols={5} rows={5} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-neutral-900 sm:text-3xl md:text-4xl">
              Built on purpose, <span className="text-red-600">trust and partnership</span>
            </h2>
            <GemDivider className="mt-5" />
          </div>

          <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
            {VISION.map((v) => (
              <div key={v.title} className="group relative rounded-2xl border border-amber-100 bg-white p-6 shadow-[0_14px_45px_-30px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_22px_55px_-28px_rgba(220,38,38,0.4)] sm:p-7">
                <span className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-amber-300 via-red-500 to-amber-300 opacity-0 transition group-hover:opacity-100" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_25px_-12px_rgba(220,38,38,0.9)] sm:h-14 sm:w-14">
                  <v.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-lg font-extrabold text-neutral-900">{v.title}</h3>
                <span className="mt-2 block h-0.5 w-8 rounded-full bg-amber-400" />
                <p className="mt-3 text-sm leading-6 text-neutral-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENCHMARK PHILOSOPHY ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-rose-50/40 pt-14 sm:pt-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <DotGrid className="absolute left-4 top-16 hidden opacity-40 md:grid" cols={6} rows={6} />
          <DotGrid className="absolute right-6 top-1/3 hidden opacity-40 md:grid" cols={6} rows={6} />
          <svg className="absolute -left-10 top-0 h-56 w-56 opacity-[0.15] sm:h-72 sm:w-72" viewBox="0 0 200 200" fill="none">
            {[...Array(6)].map((_, i) => (
              <path key={i} d={`M-20 ${40 + i * 14} Q 60 ${-10 + i * 14} 200 ${60 + i * 14}`} stroke="#e11d48" strokeWidth="1" />
            ))}
          </svg>
          <svg className="absolute -right-10 -top-6 h-56 w-56 opacity-[0.15] sm:h-72 sm:w-72" viewBox="0 0 200 200" fill="none">
            {[...Array(6)].map((_, i) => (
              <path key={i} d={`M20 ${-20 + i * 14} Q 140 ${20 + i * 14} 220 ${120 + i * 14}`} stroke="#e11d48" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="hidden h-px w-24 bg-gradient-to-r from-transparent to-amber-300 sm:block md:w-32" />
              <span className="hidden h-1.5 w-1.5 rounded-full bg-amber-400 sm:block" />
              <span className="hidden h-px w-8 bg-amber-300 sm:block" />
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300 bg-white shadow-[0_6px_20px_-8px_rgba(240,180,41,0.9)] sm:h-16 sm:w-16">
                <Award className="h-7 w-7 text-red-600 sm:h-8 sm:w-8" strokeWidth={1.6} />
              </span>
              <span className="hidden h-px w-8 bg-amber-300 sm:block" />
              <span className="hidden h-1.5 w-1.5 rounded-full bg-amber-400 sm:block" />
              <span className="hidden h-px w-24 bg-gradient-to-l from-transparent to-amber-300 sm:block md:w-32" />
            </div>

            <div className="mt-6"><Eyebrow>We believe</Eyebrow></div>

            <h2 className="mt-4 font-display text-2xl font-extrabold leading-snug text-neutral-900 sm:text-4xl md:text-5xl">
              Ranking ends the conversation.{" "}
              <span className="block text-red-600 sm:inline">Benchmark starts it.</span>
            </h2>

            <GemDivider className="mt-5" />

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              NextGen focuses on creating a benchmark for each participant, where students compete against their own self rather than lakhs of others. It&apos;s not about who did better than whom — it&apos;s about self-growth and understanding each learner better.
            </p>
          </div>

          <div className="mt-10 grid gap-5 pb-24 sm:gap-6 sm:pb-32 md:grid-cols-3 md:pb-40">
            {GAINS.map((g) => (
              <div
                key={g.title}
                className="group rounded-2xl border border-amber-100 bg-white/90 px-5 py-7 text-center shadow-[0_14px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-28px_rgba(220,38,38,0.4)] sm:px-6 sm:py-8"
              >
                <div className="relative mx-auto mb-5 h-20 w-20 sm:mb-6 sm:h-24 sm:w-24">
                  <svg className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="#f0b429" strokeWidth="1.5" strokeDasharray="60 28" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-[9px] flex items-center justify-center rounded-full bg-red-600 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.9)] ring-4 ring-white">
                    <g.icon className="h-8 w-8 text-white sm:h-9 sm:w-9" strokeWidth={1.7} />
                  </span>
                </div>
                <span className="mx-auto mb-3 block h-0.5 w-8 rounded-full bg-amber-400" />
                <h3 className="text-base font-extrabold text-red-600 sm:text-lg">{g.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-neutral-600">{g.text}</p>
                <span className="mx-auto mt-5 block h-0.5 w-10 rounded-full bg-amber-300 sm:mt-6" />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden>
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="h-20 w-full sm:h-28">
            <path d="M0,90 C240,10 420,140 720,95 C1020,50 1200,130 1440,70 L1440,160 L0,160 Z" fill="#d81f26" />
            <path d="M0,92 C240,12 420,142 720,97 C1020,52 1200,132 1440,72" stroke="#f0b429" strokeWidth="2.5" fill="none" />
            <path d="M0,130 C260,70 460,160 760,125 C1060,90 1240,155 1440,110 L1440,160 L0,160 Z" fill="#f0b429" opacity="0.9" />
            <path d="M0,142 C280,104 480,172 780,140 C1080,108 1260,164 1440,132 L1440,160 L0,160 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ================= AWARDS & RECOGNITION ================= */}
      {/* <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <Eyebrow>Recognition</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-neutral-900 sm:text-3xl md:text-4xl">
            Every effort <span className="text-red-600">deserves recognition</span>
          </h2>
          <GemDivider className="mt-5" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            From medals of distinction to a personal progress report for every single participant — no learner walks away empty-handed.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <div
              key={a.label}
              className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-6 shadow-[0_14px_45px_-30px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-28px_rgba(220,38,38,0.35)]"
            >
              <div className="flex items-start gap-4">
                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${a.ring} text-white shadow-[0_10px_25px_-14px_rgba(0,0,0,0.8)] ring-4 ring-white`}>
                  <a.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-600">{a.medal}</span>
                  <h3 className="mt-1 text-base font-extrabold leading-snug text-neutral-900">{a.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-600">{a.note}</p>
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-amber-300 via-red-500 to-amber-300 transition group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </section> */}

      {/* ================= SCHOLARSHIPS ================= */}
      {/* <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 to-white py-14 sm:py-20">
        <Star4 className="pointer-events-none absolute left-[8%] top-12 hidden h-6 w-6 text-amber-300 lg:block" />
        <Star4 className="pointer-events-none absolute right-[8%] bottom-16 hidden h-5 w-5 text-rose-300 lg:block" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Eyebrow>Scholarships</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-neutral-900 sm:text-3xl md:text-4xl">
              Support that goes <span className="text-red-600">beyond the exam</span>
            </h2>
            <GemDivider className="mt-5" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SCHOLARSHIPS.map((s) => (
              <div
                key={s.title}
                className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-6 shadow-[0_18px_55px_-35px_rgba(0,0,0,0.5)] transition hover:-translate-y-1 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-50" aria-hidden />
                <div className="relative">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_25px_-12px_rgba(220,38,38,0.9)]">
                    <s.icon className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-neutral-900 sm:text-xl">{s.title}</h3>
                  <span className="mt-2 block h-0.5 w-10 rounded-full bg-amber-400" />
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{s.text}</p>
                  <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold italic text-red-600">
                    “{s.tagline}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-700 px-6 py-12 text-center shadow-[0_30px_80px_-40px_rgba(220,38,38,0.8)] sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-amber-300/20" />
              <Star4 className="absolute left-[12%] bottom-8 hidden h-6 w-6 text-amber-300/70 sm:block" />
              <Star4 className="absolute right-[14%] top-8 hidden h-5 w-5 text-white/40 sm:block" />
            </div>

            <div className="relative">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300/60 bg-white/10 backdrop-blur">
                <Trophy className="h-8 w-8 text-amber-300" strokeWidth={1.7} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl md:text-4xl">
                Let&apos;s build a strong academic <span className="text-amber-300">foundation together</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                Register your school for the NextGen Olympiad 2026–27 and give every learner a fair, insightful benchmark.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/apply" className="sm:w-auto">
                  <Button variant="gold" size="lg" className="w-full gap-2 sm:w-auto">Register School <ArrowRight className="h-4 w-4" /></Button>
                </Link>
                <Link href="/contact" className="sm:w-auto">
                  <Button size="lg" className="w-full border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto">Talk to us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}