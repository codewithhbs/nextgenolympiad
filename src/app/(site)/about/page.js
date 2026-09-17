import Image from "next/image";
import Link from "next/link";
import {
  Eye, ShieldCheck, Users, Target, Sparkles, Trophy, Medal,
  GraduationCap, BookOpen, HeartHandshake, ArrowRight,
  Award, Gem, CheckCircle2, Calculator, FlaskConical, Brain,
  Globe2, BarChart3, XCircle, TrendingUp, Clock, MapPin, Star, Rocket, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";

/* toggle commented-out sections */
const SHOW_AWARDS = false;
const SHOW_SCHOLARSHIPS = false;

/* ================= animation css (server-safe) ================= */
const ANIM_CSS = `
@keyframes ng-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ng-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes ng-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes ng-spin{to{transform:rotate(360deg)}}
@keyframes ng-swing{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}
@keyframes ng-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-6px) scale(1.08)}60%{transform:translateY(0) scale(.95)}}
@keyframes ng-rocket{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(3px,-5px) rotate(-6deg)}}
@keyframes ng-blink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes ng-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes ng-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes ng-marquee{to{transform:translateX(-50%)}}
@keyframes ng-draw{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}
@keyframes ng-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes ng-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes ng-bar{from{transform:scaleY(.2)}to{transform:scaleY(1)}}
.ng-float{animation:ng-float 3s ease-in-out infinite}
.ng-wiggle{animation:ng-wiggle 2.4s ease-in-out infinite;transform-origin:50% 60%}
.ng-beat{animation:ng-beat 1.6s ease-in-out infinite}
.ng-spin{animation:ng-spin 6s linear infinite}
.ng-swing{animation:ng-swing 2.2s ease-in-out infinite;transform-origin:50% 0}
.ng-pop{animation:ng-pop 1.8s ease-in-out infinite}
.ng-rocket{animation:ng-rocket 1.2s ease-in-out infinite}
.ng-blink{animation:ng-blink 3.5s ease-in-out infinite}
.ng-glow{animation:ng-glow 2s ease-in-out infinite}
.ng-shine{background-size:200% 100%;animation:ng-shine 3.5s linear infinite}
.ng-marquee{animation:ng-marquee 28s linear infinite}
.ng-draw{stroke-dasharray:320;animation:ng-draw 2.2s ease-out forwards}
.ng-blob{animation:ng-blob 10s ease-in-out infinite}
.ng-rise{animation:ng-rise .8s ease-out both}
.ng-bar{transform-origin:bottom;animation:ng-bar 1.6s ease-in-out infinite alternate}
@media (prefers-reduced-motion:reduce){[class*="ng-"]{animation:none!important}}
`;

/* ================= helpers ================= */
function Star4({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function Laurel({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M12 21C7 19 4 15 4 9" />
      <path d="M4 9c2 0 3 1 3 3-2 0-3-1-3-3zM5 14c2 0 3 1 3 3-2 0-3-1-3-3zM4 5c1.6.4 2.4 1.6 2 3.2C4.4 7.8 3.6 6.6 4 5z" />
    </svg>
  );
}

function DotGrid({ className = "", cols = 5, rows = 4, color = "bg-rose-300" }) {
  return (
    <div className={`grid gap-2.5 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${color}`} />
      ))}
    </div>
  );
}

/* animated "gif-like" icon */
function AnimIcon({ icon: Icon, anim = "ng-float", grad = "from-red-500 to-rose-500", size = "md", ping = true, className = "" }) {
  const box = { sm: "h-10 w-10 rounded-xl", md: "h-14 w-14 rounded-2xl", lg: "h-20 w-20 rounded-3xl" }[size];
  const ico = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-10 w-10" }[size];
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${box} ${className}`}>
      {ping && <span className={`absolute inset-0 ${box} bg-gradient-to-br ${grad} opacity-40 animate-ping`} style={{ animationDuration: "2.6s" }} />}
      <span className={`relative grid h-full w-full place-items-center ${box} bg-gradient-to-br ${grad} text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)] ring-4 ring-white`}>
        <Icon className={`${ico} ${anim}`} strokeWidth={1.8} />
      </span>
    </span>
  );
}

function Eyebrow({ children, icon: Icon = Sparkles }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 via-white to-rose-100 px-4 py-2 ring-1 ring-amber-300 shadow-[0_10px_30px_-15px_rgba(240,180,41,0.9)]">
      <Icon className="ng-glow h-3.5 w-3.5 text-amber-500" />
      <span className="text-sm font-extrabold uppercase text-red-600 sm:text-2xl">{children}</span>
    </span>
  );
}

function GradText({ children, className = "" }) {
  return (
    <span className={`ng-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function GemDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300 sm:w-28" />
      <Gem className="ng-pop h-4 w-4 text-amber-500" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300 sm:w-28" />
    </div>
  );
}

function Wave({ fill = "#d81f26", className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`} aria-hidden>
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="h-16 w-full sm:h-24 md:h-32">
        <path d="M0,150 C280,60 520,190 820,160 C1080,134 1260,70 1440,110 L1440,260 L0,260 Z" fill={fill} />
        <path d="M0,152 C280,62 520,192 820,162 C1080,136 1260,72 1440,112" stroke="#f0b429" strokeWidth="2.5" fill="none" />
        <path d="M0,196 C300,120 560,236 880,206 C1120,184 1290,140 1440,166" stroke="#f7d27a" strokeWidth="1.5" fill="none" opacity="0.9" />
      </svg>
    </div>
  );
}

/* ================= metadata ================= */
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

/* ================= data ================= */
const SUBJECTS = [
  { label: "Mathematics", icon: Calculator, grad: "from-red-500 to-rose-500", anim: "ng-wiggle", pos: "left-0 top-6 sm:-left-2" },
  { label: "Science", icon: FlaskConical, grad: "from-red-500 to-indigo-500", anim: "ng-swing", pos: "right-0 top-2 sm:-right-2" },
  { label: "English", icon: BookOpen, grad: "from-emerald-500 to-teal-500", anim: "ng-pop", pos: "left-2 bottom-14 sm:-left-4" },
  { label: "Reasoning", icon: Brain, grad: "from-violet-500 to-fuchsia-500", anim: "ng-beat", pos: "right-2 bottom-20 sm:-right-4" },
];

const STATS = [
  { value: "10+", label: "Years of experience", icon: Clock, anim: "ng-spin", grad: "from-red-500 to-rose-500", tint: "from-rose-50 to-white" },
  { value: "Bal Vatika – X", label: "Classes covered", icon: GraduationCap, anim: "ng-float", grad: "from-amber-400 to-orange-500", tint: "from-amber-50 to-white" },
  { value: "200", label: "Scholarships awarded", icon: HeartHandshake, anim: "ng-beat", grad: "from-violet-500 to-fuchsia-500", tint: "from-violet-50 to-white" },
  { value: "Pan-India", label: "School network", icon: Globe2, anim: "ng-spin", grad: "from-emerald-500 to-teal-500", tint: "from-emerald-50 to-white" },
];

const FEATURES = [
  { t: "Govt. registered trust", icon: ShieldCheck, grad: "from-red-500 to-rose-500", anim: "ng-pop", bg: "bg-rose-50 ring-rose-100" },
  { t: "Pan-India school network", icon: Globe2, grad: "from-red-500 to-indigo-500", anim: "ng-spin", bg: "bg-sky-50 ring-sky-100" },
  { t: "Reasoning-first papers", icon: Lightbulb, grad: "from-amber-400 to-orange-500", anim: "ng-glow", bg: "bg-amber-50 ring-amber-100" },
  { t: "Detailed progress reports", icon: BarChart3, grad: "from-emerald-500 to-teal-500", anim: "ng-float", bg: "bg-emerald-50 ring-emerald-100" },
];

const VISION = [
  { icon: Eye, anim: "ng-blink", grad: "from-red-500 to-rose-500", accent: "bg-rose-500", title: "Our Vision", text: "To empower students and teachers for a future-ready educational system, and to see Bharat as the Vishwaguru — discovering learners' potential by opening new opportunities and strengthening their knowledge base and confidence." },
  { icon: ShieldCheck, anim: "ng-pop", grad: "from-amber-400 to-orange-500", accent: "bg-amber-500", title: "A Registered Trust", text: "NextGen Olympiad Foundation is a trust registered by the Govt. of NCT of Delhi, headquartered in New Delhi, dedicated to promoting learning beyond the school curriculum for Classes Bal Vatika I to X." },
  { icon: Users, anim: "ng-float", grad: "from-violet-500 to-fuchsia-500", accent: "bg-violet-500", title: "In Partnership", text: "We are proud to associate with esteemed, future-ready institutions in spreading quality education — reckoned as the organiser of one of the biggest and most popular national olympiads." },
];

const GAINS = [
  { icon: Award, anim: "ng-swing", grad: "from-red-500 to-rose-500", title: "Skills That Last a Lifetime", text: "Beyond certificates and medals — real understanding students carry forward." },
  { icon: TrendingUp, anim: "ng-pop", grad: "from-emerald-500 to-teal-500", title: "Measurable Improvement", text: "See interpretational improvement in specific areas over time." },
  { icon: Rocket, anim: "ng-rocket", grad: "from-violet-500 to-fuchsia-500", title: "Powered Potential", text: "Strong assessment tools and reports that reveal each learner's strengths." },
];

const AWARDS = [
  { medal: "Gold", grad: "from-amber-300 to-amber-500", label: "Gold Medal & Certificate of Distinction", note: "Class toppers scoring 85% and above.", icon: Medal, anim: "ng-swing" },
  { medal: "Silver", grad: "from-slate-300 to-slate-500", label: "Silver Medal of Excellence", note: "Students scoring 80% to 84.99%.", icon: Medal, anim: "ng-swing" },
  { medal: "Bronze", grad: "from-orange-300 to-orange-600", label: "Bronze Medal of Excellence", note: "Students scoring 75% to 79.99%.", icon: Medal, anim: "ng-swing" },
  { medal: "SPR", grad: "from-red-400 to-red-700", label: "Student Progress Report", note: "A detailed SPR for every participant.", icon: BarChart3, anim: "ng-float" },
  { medal: "All", grad: "from-rose-400 to-fuchsia-600", label: "Certificate of Participation", note: "Awarded to all participants.", icon: Award, anim: "ng-pop" },
];

const SCHOLARSHIPS = [
  { icon: HeartHandshake, anim: "ng-beat", grad: "from-rose-500 to-fuchsia-500", title: "Girl Child Scholarship (SGCS)", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving, academically meritorious girl students from economically weaker sections across India.", tagline: "Educate a girl, empower a generation." },
  { icon: GraduationCap, anim: "ng-float", grad: "from-amber-400 to-orange-500", title: "Academic Excellence Scholarship", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving students — a source of motivation to strive for greater academic success.", tagline: "Rewarding excellence today, building a better tomorrow." },
];

const MARQUEE = ["Mathematics", "Science", "English", "Reasoning", "Learn", "Compete", "Excel", "Benchmark", "Grow"];

/* ================= page ================= */
export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-white">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top_left,#ffe4e6_0%,transparent_45%),radial-gradient(ellipse_at_top_right,#fef3c7_0%,transparent_45%),radial-gradient(ellipse_at_bottom,#ede9fe_0%,transparent_55%)] bg-white pt-10 pb-36 sm:pt-14 sm:pb-44 md:pt-16 md:pb-52">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ng-blob absolute -left-32 -top-32 h-[340px] w-[340px] bg-gradient-to-br from-rose-300/50 to-orange-200/30 blur-3xl" />
          <div className="ng-blob absolute -right-32 top-10 h-[380px] w-[380px] bg-gradient-to-bl from-amber-300/50 to-yellow-100/30 blur-3xl" />
          <div className="ng-blob absolute left-1/3 bottom-10 h-[260px] w-[260px] bg-violet-300/30 blur-3xl" />
          <svg className="absolute -left-24 -top-24 h-[300px] w-[300px] opacity-50 sm:h-[420px] sm:w-[420px]" viewBox="0 0 400 400" fill="none">
            {[40, 70, 100, 130, 160, 190].map((r) => (
              <circle key={r} cx="120" cy="120" r={r} stroke="#fda4af" strokeWidth="1.2" />
            ))}
          </svg>
          <DotGrid className="absolute right-4 top-6 opacity-70 sm:right-10" cols={6} rows={4} color="bg-amber-400" />
          <DotGrid className="absolute left-3 top-[62%] hidden opacity-60 sm:grid" cols={4} rows={4} color="bg-rose-400" />
          <Star4 className="ng-pop absolute left-[46%] top-[12%] h-5 w-5 text-amber-400" />
          <Star4 className="ng-float absolute left-[4%] top-[40%] h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
          <Star4 className="ng-pop absolute right-[4%] top-[48%] h-4 w-4 text-violet-400" />
          <Star4 className="ng-float absolute left-[40%] bottom-[30%] hidden h-3 w-3 text-sky-400 md:block" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:px-10 xl:px-14">
          {/* LEFT */}
          <div className="ng-rise text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 via-white to-rose-100 px-4 py-2 ring-1 ring-amber-300 shadow-[0_10px_30px_-15px_rgba(240,180,41,0.9)] sm:gap-3 sm:px-5">
              <Laurel className="h-4 w-4 text-amber-500" />
              <span className="text-[14px] font-extrabold uppercase tracking-[0.14em] sm:text-xl sm:tracking-[0.18em]">
                <span className="text-red-600">Learn</span> <span className="text-amber-500">•</span>{" "}
                <span className="text-violet-600">Compete</span> <span className="text-amber-500">•</span>{" "}
                <span className="text-emerald-600">Excel</span>
              </span>
              <Laurel className="h-4 w-4 -scale-x-100 text-amber-500" />
            </span>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:mt-6 sm:text-5xl xl:text-6xl">
              A Veteran of{" "}
              <span className="relative inline-block">
                <GradText>National Education Olympiads</GradText>
                <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                  <path className="ng-draw" d="M2 9 C80 2, 200 2, 298 8" stroke="#f0b429" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
              NextGen Olympiad Foundation brings more than a decade of experience, excellence and popularity —
              designing olympiads that reward <span className="font-semibold text-violet-700">reasoning</span> over{" "}
              <span className="font-semibold text-red-600 line-through decoration-2">rote</span>.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild variant="gold" size="lg" className="gap-2 shadow-lg shadow-amber-300/50">
                <Link href="/apply">Register School <ArrowRight className="ng-float h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-rose-300 bg-white/70 backdrop-blur hover:bg-rose-50">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>

            {/* trust row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-3">
                {["from-red-500 to-rose-500", "from-amber-400 to-orange-500", "from-violet-500 to-fuchsia-500", "from-emerald-500 to-teal-500"].map((g, i) => (
                  <span key={g} className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${g} text-white ring-4 ring-white`}>
                    <GraduationCap className="ng-float h-4 w-4" style={{ animationDelay: `${i * 0.3}s` }} />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="ng-pop h-4 w-4 fill-amber-400 text-amber-400" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <p className="mt-0.5 text-xs font-semibold text-neutral-600">Trusted by schools across India</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-square w-full">
              <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-amber-400 p-[3px] shadow-[0_30px_80px_-30px_rgba(216,31,38,0.7)]">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-rose-50 via-white to-amber-50" />
              </div>
              <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-amber-300/80 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-[24%] rounded-full bg-gradient-to-br from-amber-200/60 via-rose-100/60 to-violet-200/60 blur-xl" />
              {/* orbit dots */}
              <div className="absolute inset-[6%] animate-[spin_18s_linear_infinite]">
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,.9)]" />
                <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-rose-500" />
              </div>

              <img
                src="/images/trophy-laurel.png"
                alt=""
                aria-hidden
                className="ng-float absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_22px_40px_rgba(240,180,41,0.45)]"
                style={{ translate: "-50% -50%", transform: "none" }}
              />

              {SUBJECTS.map(({ label, icon, grad, anim, pos }, i) => (
                <div
                  key={label}
                  className={`ng-float absolute ${pos} flex items-center gap-2 rounded-2xl bg-white/90 py-2 pl-2 pr-3 shadow-xl ring-1 ring-black/5 backdrop-blur`}
                  style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i * 0.4}s` }}
                >
                  <AnimIcon icon={icon} anim={anim} grad={grad} size="sm" ping={false} />
                  <span className="text-xs font-bold text-neutral-800 sm:text-sm">{label}</span>
                </div>
              ))}

              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-4 py-2 text-white shadow-lg shadow-rose-400/40">
                <Trophy className="ng-wiggle h-4 w-4 text-amber-300" />
                <span className="whitespace-nowrap text-xs font-bold sm:text-sm">Medals • Certificates • Ranks</span>
                <Sparkles className="ng-glow h-4 w-4 text-amber-300" />
              </div>
            </div>
          </div>
        </div>

        <Wave fill="#d81f26" />
      </section>

      {/* ================= STATS ================= */}
      <section className="relative -mt-16 sm:-mt-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`ng-rise group relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.tint} p-4 text-center shadow-[0_25px_60px_-35px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition hover:-translate-y-1.5 sm:p-6 lg:text-left`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${s.grad} opacity-15 transition group-hover:scale-150`} />
                <div className="relative flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <AnimIcon icon={s.icon} anim={s.anim} grad={s.grad} size="md" />
                  <div>
                    <div className={`bg-gradient-to-r ${s.grad} bg-clip-text font-display text-lg font-extrabold text-transparent sm:text-2xl xl:text-3xl`}>{s.value}</div>
                    <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500 sm:text-xs">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-white to-rose-50 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ng-blob absolute -left-40 top-10 h-[420px] w-[420px] bg-amber-200/40 blur-3xl" />
          <div className="ng-blob absolute -right-40 bottom-0 h-[420px] w-[420px] bg-rose-200/50 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" }}
          />
          <Star4 className="ng-pop absolute left-[6%] top-[12%] h-5 w-5 text-amber-400" />
          <Star4 className="ng-float absolute right-[8%] top-[18%] h-4 w-4 text-rose-400" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10 xl:px-14">
          {/* IMAGE */}
          <div className="relative order-2 mx-auto w-full max-w-[640px] lg:order-1">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-[2rem] bg-gradient-to-br from-red-500 via-rose-500 to-amber-400 sm:translate-x-6 sm:translate-y-6" aria-hidden />
            <div className="ng-float absolute -left-5 -top-5 hidden h-28 w-28 rounded-3xl border-2 border-dashed border-amber-400 sm:block" aria-hidden />

            <div className="relative overflow-hidden rounded-[2rem] bg-white p-2.5 shadow-[0_30px_80px_-35px_rgba(216,31,38,0.6)] ring-1 ring-amber-100">
              <Image src="/brand/about-scene.png" alt="Young learners with a teacher" width={1000} height={800} className="h-auto w-full rounded-[1.6rem] object-contain" />
            </div>

            <div className="ng-float absolute -left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-left-8">
              <AnimIcon icon={GraduationCap} anim="ng-wiggle" grad="from-amber-400 to-orange-500" size="sm" ping={false} />
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">For students</p>
                <p className="font-display text-sm font-extrabold text-neutral-900 sm:text-base">Bal Vatika I – Class X</p>
              </div>
            </div>

            <div className="ng-float absolute -right-2 top-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 px-4 py-2.5 text-white shadow-lg shadow-rose-400/40 sm:-right-6" style={{ animationDelay: "1s" }}>
              <MapPin className="ng-pop h-5 w-5 text-amber-300" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-100">Based in</p>
                <p className="font-display text-sm font-extrabold">New Delhi</p>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <Eyebrow icon={Star4}>About the Foundation</Eyebrow>

            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl xl:text-5xl">
              Inspiring Young Minds, <GradText>Beyond the Classroom</GradText>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8 lg:mx-0">
              NextGen Olympiad Foundation is a <span className="font-semibold text-neutral-900">Government of NCT of Delhi registered educational trust</span> based in New Delhi, nurturing talent and promoting learning beyond the classroom through innovative Olympiad programs.
            </p>

            <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
              {[
                { t: "Our Mission", d: "Inspire young minds and nurture talent in students from Bal Vatika I to Class X.", icon: Target, anim: "ng-beat", grad: "from-red-500 to-rose-500", bar: "from-red-500 to-rose-400" },
                { t: "Our Vision", d: "A future-ready education system that builds knowledge, confidence and critical thinking.", icon: Eye, anim: "ng-blink", grad: "from-violet-500 to-fuchsia-500", bar: "from-violet-500 to-fuchsia-400" },
              ].map((c) => (
                <div key={c.t} className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:-translate-y-1">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.bar}`} />
                  <AnimIcon icon={c.icon} anim={c.anim} grad={c.grad} size="sm" />
                  <h3 className="mt-3 font-display text-base font-extrabold text-neutral-900">{c.t}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-600">{c.d}</p>
                </div>
              ))}
            </div>

            <ul className="mt-5 grid gap-3 text-left sm:grid-cols-2">
              {FEATURES.map(({ t, icon, grad, anim, bg }) => (
                <li key={t} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ring-1 transition hover:scale-[1.02] ${bg}`}>
                  <AnimIcon icon={icon} anim={anim} grad={grad} size="sm" ping={false} className="!h-9 !w-9 !rounded-lg" />
                  <span className="text-sm font-semibold text-neutral-800">{t}</span>
                  <CheckCircle2 className="ng-pop ml-auto h-4 w-4 shrink-0 text-emerald-500" />
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-600 lg:mx-0">
              As one of India&apos;s leading National Olympiad organisers, we partner with schools across the country to unlock every child&apos;s true potential.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="relative -rotate-1 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 py-4 shadow-[0_20px_50px_-30px_rgba(216,31,38,0.9)]">
        <div className="flex w-max ng-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-lg font-extrabold uppercase tracking-wider text-white sm:text-2xl">
              {w}
              <Star4 className="h-5 w-5 text-amber-300" />
            </span>
          ))}
        </div>
      </section>

      {/* ================= VISION / TRUST / PARTNERSHIP ================= */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <DotGrid className="pointer-events-none absolute left-4 top-10 hidden opacity-50 lg:grid" cols={5} rows={5} />
        <DotGrid className="pointer-events-none absolute bottom-10 right-4 hidden opacity-50 lg:grid" cols={5} rows={5} color="bg-violet-300" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Eyebrow icon={Users}>Who we are</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-neutral-900 sm:text-4xl md:text-5xl">
              Built on Purpose, <GradText>Trust and Partnership</GradText>
            </h2>
            <GemDivider className="mt-5" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VISION.map((v, i) => (
              <div
                key={v.title}
                className={`group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_20px_55px_-35px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 sm:p-8 ${i === 1 ? "md:-translate-y-6 md:hover:-translate-y-8" : ""}`}
              >
                {/* hover fill */}
                <div className={`absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br ${v.grad} transition-transform duration-500 group-hover:scale-y-100`} />
                <span className="absolute right-6 top-4 font-display text-6xl font-extrabold text-neutral-100 transition group-hover:text-white/20">0{i + 1}</span>
                <div className="relative">
                  <AnimIcon icon={v.icon} anim={v.anim} grad={v.grad} size="lg" />
                  <h3 className="mt-6 font-display text-xl font-extrabold text-neutral-900 transition group-hover:text-white">{v.title}</h3>
                  <span className={`mt-2 block h-1 w-10 rounded-full ${v.accent} transition-all group-hover:w-20 group-hover:bg-white`} />
                  <p className="mt-4 text-sm leading-7 text-neutral-600 transition group-hover:text-white/90">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENCHMARK PHILOSOPHY ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-amber-50/50 pt-16 pb-36 sm:pt-24 sm:pb-44">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ng-blob absolute left-1/4 top-20 h-[300px] w-[300px] bg-rose-200/40 blur-3xl" />
          <div className="ng-blob absolute right-10 top-1/3 h-[260px] w-[260px] bg-amber-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Eyebrow icon={Lightbulb}>We believe</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-snug text-neutral-900 sm:text-4xl md:text-5xl">
              Ranking Ends the Conversation.{" "}
              <GradText className="block sm:inline">Benchmark Starts It.</GradText>
            </h2>
            <GemDivider className="mt-5" />
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              NextGen focuses on creating a benchmark for each participant, where students compete against their own self rather than lakhs of others. It&apos;s not about who did better than whom — it&apos;s about self-growth and understanding each learner better.
            </p>
          </div>

          {/* ranking vs benchmark */}
          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl bg-white/80 p-6 text-left ring-1 ring-neutral-200 grayscale-[40%] backdrop-blur sm:p-8">
              <div className="flex items-center gap-3">
                <XCircle className="ng-wiggle h-8 w-8 text-neutral-400" />
                <h3 className="font-display text-xl font-extrabold text-neutral-500 line-through decoration-red-400 decoration-2">Ranking</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-500">
                <li>• Compared against lakhs of others</li>
                <li>• One number, no insight</li>
                <li>• Pressure over progress</li>
              </ul>
            </div>

            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-300/60">
              <ArrowRight className="ng-rocket h-7 w-7 rotate-90 md:rotate-0" />
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 p-6 text-left text-white shadow-[0_30px_70px_-35px_rgba(216,31,38,0.9)] sm:p-8">
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
              <div className="relative flex items-center gap-3">
                <CheckCircle2 className="ng-beat h-8 w-8 text-amber-300" />
                <h3 className="font-display text-xl font-extrabold">Benchmark</h3>
              </div>
              <ul className="relative mt-4 space-y-2 text-sm text-white/90">
                <li>• Students compete with their own self</li>
                <li>• Detailed, skill-wise insight</li>
                <li>• Growth you can measure</li>
              </ul>
              {/* animated bars */}
              <div className="relative mt-5 flex h-14 items-end gap-2" aria-hidden>
                {[40, 55, 50, 70, 85, 100].map((h, i) => (
                  <span key={i} className="ng-bar w-full rounded-t-md bg-gradient-to-t from-amber-300 to-amber-100" style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* gains */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {GAINS.map((g, i) => (
              <div
                key={g.title}
                className="ng-rise group relative rounded-[2rem] bg-white/90 px-6 pb-8 pt-12 text-center shadow-[0_20px_55px_-35px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative mx-auto mb-6 h-28 w-28">
                  <svg className="ng-spin absolute inset-0 h-full w-full" style={{ animationDuration: "14s" }} viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="#f0b429" strokeWidth="1.8" strokeDasharray="50 22" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-3 grid place-items-center">
                    <AnimIcon icon={g.icon} anim={g.anim} grad={g.grad} size="lg" className="!rounded-full [&>span]:!rounded-full" />
                  </div>
                </div>
                <h3 className={`bg-gradient-to-r ${g.grad} bg-clip-text text-lg font-extrabold text-transparent`}>{g.title}</h3>
                <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-6 text-neutral-600">{g.text}</p>
                <span className={`mx-auto mt-5 block h-1 w-10 rounded-full bg-gradient-to-r ${g.grad} transition-all group-hover:w-24`} />
              </div>
            ))}
          </div>
        </div>

        <Wave fill="#d81f26" />
      </section>

      {/* ================= AWARDS ================= */}
      {SHOW_AWARDS && (
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center">
              <Eyebrow icon={Medal}>Recognition</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-neutral-900 sm:text-4xl md:text-5xl">
                Every effort <GradText>deserves recognition</GradText>
              </h2>
              <GemDivider className="mt-5" />
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                From medals of distinction to a personal progress report for every single participant — no learner walks away empty-handed.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {AWARDS.map((a, i) => (
                <div key={a.label} className={`group relative overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_20px_55px_-35px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:-translate-y-2 ${i < 3 ? "lg:pt-10" : ""}`}>
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${a.grad}`} />
                  <AnimIcon icon={a.icon} anim={a.anim} grad={a.grad} size="lg" className="!rounded-full [&>span]:!rounded-full" />
                  <span className="mt-4 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-600">{a.medal}</span>
                  <h3 className="mt-1 text-base font-extrabold leading-snug text-neutral-900">{a.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-600">{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SCHOLARSHIPS ================= */}
      {SHOW_SCHOLARSHIPS && (
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 to-white py-16 sm:py-24">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="text-center">
              <Eyebrow icon={HeartHandshake}>Scholarships</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-neutral-900 sm:text-4xl md:text-5xl">
                Support that goes <GradText>beyond the exam</GradText>
              </h2>
              <GemDivider className="mt-5" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SCHOLARSHIPS.map((s) => (
                <div key={s.title} className="group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:-translate-y-1 sm:p-9">
                  <div className={`ng-blob absolute -right-12 -top-12 h-40 w-40 bg-gradient-to-br ${s.grad} opacity-15`} />
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                    <AnimIcon icon={s.icon} anim={s.anim} grad={s.grad} size="lg" />
                    <div>
                      <span className={`inline-block rounded-full bg-gradient-to-r ${s.grad} px-3 py-1 text-xs font-extrabold text-white`}>₹5,000 × 100</span>
                      <h3 className="mt-3 font-display text-xl font-extrabold text-neutral-900">{s.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{s.text}</p>
                      <p className="mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold italic text-red-600">“{s.tagline}”</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-[#d81f26] pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-900 via-red-950 to-neutral-900 px-6 py-14 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-amber-300/30 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="ng-blob absolute -left-20 -top-20 h-72 w-72 bg-red-500/30 blur-2xl" />
              <div className="ng-blob absolute -bottom-24 -right-16 h-80 w-80 bg-amber-400/25 blur-2xl" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <Star4 className="ng-pop absolute left-[10%] bottom-10 h-6 w-6 text-amber-300" />
              <Star4 className="ng-float absolute right-[12%] top-10 h-5 w-5 text-white/60" />
              <Star4 className="ng-pop absolute right-[30%] bottom-8 hidden h-4 w-4 text-rose-300 sm:block" />
            </div>

            <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
              <div className="mx-auto">
                <div className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-[0_0_60px_-10px_rgba(251,191,36,0.9)] sm:h-32 sm:w-32">
                  <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/40" style={{ animationDuration: "2.4s" }} />
                  <Trophy className="ng-wiggle relative h-14 w-14 text-red-700 sm:h-16 sm:w-16" strokeWidth={1.7} />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="font-display text-2xl font-extrabold leading-snug text-white sm:text-4xl md:text-5xl">
                  Let&apos;s Build a Strong Academic{" "}
                  <span className="ng-shine bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">Foundation Together</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">
                  Register your school for the NextGen Olympiad 2026–27 and give every learner a fair, insightful benchmark.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild variant="gold" size="lg" className="w-full gap-2 sm:w-auto">
                  <Link href="/apply">Register School <ArrowRight className="ng-float h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" className="w-full border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto">
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}