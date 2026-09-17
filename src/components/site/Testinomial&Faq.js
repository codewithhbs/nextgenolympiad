"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star, Quote, ThumbsUp, ChevronDown, ChevronLeft, ChevronRight,
  HelpCircle, MessageSquareText, Sparkles, Heart, ArrowRight, Lightbulb, School, Users,
} from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes tf-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes tf-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes tf-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes tf-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes tf-thumb{0%,100%{transform:rotate(0) translateY(0)}30%{transform:rotate(-18deg) translateY(-3px)}60%{transform:rotate(6deg)}}
@keyframes tf-bob{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg) translateY(-4px)}}
@keyframes tf-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes tf-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes tf-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes tf-in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes tf-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes tf-type{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
@keyframes tf-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
.tf-float{animation:tf-float 3.2s ease-in-out infinite}
.tf-wiggle{animation:tf-wiggle 2.4s ease-in-out infinite}
.tf-beat{animation:tf-beat 1.6s ease-in-out infinite}
.tf-pop{animation:tf-pop 1.8s ease-in-out infinite}
.tf-thumb{animation:tf-thumb 2s ease-in-out infinite;transform-origin:30% 80%}
.tf-bob{animation:tf-bob 2.6s ease-in-out infinite}
.tf-glow{animation:tf-glow 2s ease-in-out infinite}
.tf-shine{background-size:200% 100%;animation:tf-shine 3.5s linear infinite}
.tf-blob{animation:tf-blob 10s ease-in-out infinite}
.tf-in{animation:tf-in .6s ease-out both}
.tf-bar{transform-origin:left;animation:tf-bar 5s linear both}
.tf-type span{animation:tf-type 1.2s ease-in-out infinite}
.tf-type span:nth-child(2){animation-delay:.15s}
.tf-type span:nth-child(3){animation-delay:.3s}
.tf-nudge{animation:tf-nudge 1.2s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){[class*="tf-"],.tf-type span{animation:none!important}}
`;

/* ================= defaults ================= */
const DEFAULT_TESTIMONIALS = [
  { name: "Mrs. Anjali Verma", role: "Principal", school: "Sunrise Public School", rating: 5,
    message: "NextGen Olympiad made competitive learning genuinely exciting for our students. The process was smooth and results were quick." },
  { name: "Mr. Rakesh Kumar", role: "Parent", school: "", rating: 5,
    message: "My daughter loved the Wonder Kids Olympiad. It felt like play, not pressure. Highly recommended!" },
  { name: "Ms. Priya Nair", role: "Coordinator", school: "Green Valley School", rating: 5,
    message: "Well-designed papers that reward thinking. The school dashboard makes managing students effortless." },
];

const DEFAULT_FAQS = [
  { question: "Who can participate in NextGen Olympiad?",
    answer: "Students from Classes I to X can participate in the NextGen Olympiad, and Bal Vatika I to III can join our Wonder Kids." },
  { question: "How does my school register?",
    answer: "Click Register, fill in your school details, verify your email via OTP, and our team will approve your account." },
  { question: "How are results published?",
    answer: "The admin uploads results per school. They instantly appear in your school dashboard and can be checked publicly using the student code." },
  { question: "Do all participants get certificates?",
    answer: "Yes. Every participant receives a certificate, and top performers earn medals and trophies." },
];

const TONES = [
  { grad: "from-pink-500 to-orange-400", soft: "bg-pink-50", ring: "ring-pink-200", text: "text-pink-600" },
  { grad: "from-blue-500 to-cyan-400", soft: "bg-sky", ring: "ring-sky", text: "text-sky" },
  { grad: "from-emerald-500 to-lime-400", soft: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-600" },
  { grad: "from-violet-500 to-pink-500", soft: "bg-violet-50", ring: "ring-violet-200", text: "text-violet-600" },
  { grad: "from-rose-500 to-amber-400", soft: "bg-rose-50", ring: "ring-rose-200", text: "text-rose-600" },
];

const ROLE_ICON = { Principal: School, Parent: Heart, Coordinator: Users };

/* ================= helpers ================= */
function Stars({ n = 5, size = "h-4 w-4", animate = false }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, j) => (
        <Star key={j} className={`${size} fill-amber-400 text-amber-400 ${animate ? "tf-pop" : ""}`} style={animate ? { animationDelay: `${j * 0.12}s` } : undefined} />
      ))}
    </div>
  );
}

function Avatar({ t, tone, size = "h-12 w-12" }) {
  return t.avatar?.url ? (
    <img src={t.avatar.url} alt={t.name} className={`${size} shrink-0 rounded-full object-cover ring-4 ring-white`} />
  ) : (
    <div className={`${size} grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${tone.grad} text-base font-black text-white ring-4 ring-white`}>
      {t.name?.replace(/^(Mrs?\.|Ms\.|Dr\.)\s*/i, "").charAt(0)}
    </div>
  );
}

function Eyebrow({ icon: Icon, anim, children }) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,0.8)] ring-1 ring-rose-100 backdrop-blur">
      <span className="relative grid h-9 w-9 place-items-center rounded-full">
        <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" style={{ animationDuration: "2.6s" }} />
        <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white">
          <Icon className={`h-4 w-4 ${anim}`} />
        </span>
      </span>
      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600">{children}</span>
      <Sparkles className="tf-glow h-4 w-4 text-amber-500" />
    </span>
  );
}

/* ================= component ================= */
export default function TestimonialAndFaq({ testimonials, faqs }) {
  const T = (testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS).slice(0, 6);
  const F = faqs?.length ? faqs : DEFAULT_FAQS;

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || T.length < 2) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % T.length), 5000);
    return () => clearInterval(t);
  }, [T.length, paused, slide]);

  const go = (d) => setSlide((s) => (s + d + T.length) % T.length);
  const active = T[slide] || T[0];
  const activeTone = TONES[slide % TONES.length];
  const ActiveRoleIcon = ROLE_ICON[active?.role] || Heart;

  const [open, setOpen] = useState(0);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-rose-50 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="tf-blob absolute -left-24 top-10 h-96 w-96 bg-sky-200/40 blur-3xl" />
          <div className="tf-blob absolute -right-24 bottom-0 h-96 w-96 bg-rose-200/40 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(#93c5fd 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}
          />
          <Quote className="tf-float absolute left-[5%] top-8 h-16 w-16 rotate-180 text-sky-200" />
          <Star className="tf-pop absolute right-[18%] top-8 h-4 w-4 fill-amber-400 text-amber-400" />
          <Star className="tf-pop absolute left-[10%] bottom-12 h-3 w-3 fill-rose-400 text-rose-400" style={{ animationDelay: ".7s" }} />
          <div className="tf-bob absolute right-4 top-10 hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 p-2.5 text-white shadow-lg sm:block">
            <Star className="tf-beat h-5 w-5 fill-white" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center">
            <Eyebrow icon={ThumbsUp} anim="tf-thumb">Loved by Educators</Eyebrow>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              What{" "}
              <span className="tf-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Schools Say</span>
            </h2>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
            {/* featured */}
            <div
              className={`relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br ${activeTone.grad} p-[3px] shadow-[0_35px_80px_-40px_rgba(15,23,42,0.8)]`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2.05rem] bg-slate-900 p-7 text-white sm:p-10">
                <div className={`tf-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 bg-gradient-to-br ${activeTone.grad} opacity-30 blur-2xl`} aria-hidden />
                <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} aria-hidden />

                <div className="relative flex items-center justify-between">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${activeTone.grad} shadow-lg`}>
                    <Quote className="tf-wiggle h-7 w-7 fill-white/30" />
                  </span>
                  <Stars n={active.rating || 5} size="h-5 w-5" animate />
                </div>

                <p key={`msg-${slide}`} className="tf-in relative mt-7 flex-1 text-lg font-semibold leading-relaxed sm:text-2xl sm:leading-relaxed">
                  &ldquo;{active.message}&rdquo;
                </p>

                <div key={`who-${slide}`} className="tf-in relative mt-8 flex items-center gap-4">
                  <Avatar t={active} tone={activeTone} size="h-14 w-14" />
                  <div className="min-w-0">
                    <p className="text-lg font-extrabold">{active.name}</p>
                    <p className="flex items-center gap-1.5 text-sm text-white/70">
                      <ActiveRoleIcon className="tf-beat h-4 w-4 text-amber-300" />
                      <span className="truncate">{active.role}{active.school ? ` · ${active.school}` : ""}</span>
                    </p>
                  </div>
                </div>

                {/* controls */}
                <div className="relative mt-8 flex items-center gap-4">
                  <button onClick={() => go(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white/20">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex flex-1 gap-2">
                    {T.map((_, i) => (
                      <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                        {i < slide && <span className="block h-full w-full bg-white/70" />}
                        {i === slide && (
                          <span
                            key={`bar-${slide}`}
                            className={`block h-full w-full bg-gradient-to-r ${activeTone.grad} ${paused ? "" : "tf-bar"}`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => go(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white/20">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* list */}
            <div className="flex flex-col gap-4">
              {T.map((t, i) => {
                const tone = TONES[i % TONES.length];
                const on = i === slide;
                return (
                  <button
                    key={t._id || i}
                    onClick={() => setSlide(i)}
                    className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-3xl p-5 text-left ring-1 transition duration-300 ${
                      on ? `${tone.soft} ${tone.ring} -translate-y-0.5 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.6)]` : "bg-white ring-black/5 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    <span className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${tone.grad} transition ${on ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                    <Avatar t={t} tone={tone} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-bold text-slate-900">{t.name}</p>
                        <Stars n={t.rating || 5} size="h-3.5 w-3.5" />
                      </div>
                      <p className={`text-xs font-semibold ${tone.text}`}>{t.role}{t.school ? ` · ${t.school}` : ""}</p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">&ldquo;{t.message}&rdquo;</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section
        className="relative w-full overflow-hidden py-16 md:py-24"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#fff7ed 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="tf-blob absolute -left-24 top-0 h-96 w-96 bg-violet-200/40 blur-3xl" />
          <div className="tf-blob absolute -right-24 bottom-0 h-96 w-96 bg-amber-200/40 blur-3xl" />
          <Sparkles className="tf-glow absolute right-[10%] top-10 h-6 w-6 text-amber-400" />
          <Sparkles className="tf-pop absolute left-[8%] bottom-16 h-5 w-5 text-violet-400" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:px-10 xl:px-14">
          {/* left — intro + help card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-center lg:text-left">
              <Eyebrow icon={HelpCircle} anim="tf-wiggle">Got Questions?</Eyebrow>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Frequently Asked{" "}
                <span className="tf-shine bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-slate-600 lg:mx-0">
                Quick answers for parents, schools and curious little minds.
              </p>
            </div>

            {/* illustration */}
            <div className="relative mx-auto mt-8 hidden h-44 max-w-sm lg:block" aria-hidden>
              <div className="tf-float absolute left-0 top-4 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-lg ring-1 ring-black/5">
                <p className="text-sm font-bold text-slate-800">How do I register? 🤔</p>
              </div>
              <div className="tf-float absolute right-0 top-20 rounded-2xl rounded-br-sm bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-3 text-white shadow-lg" style={{ animationDelay: ".8s" }}>
                <div className="tf-type flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
              <span className="tf-pop absolute bottom-0 left-12 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <Lightbulb className="tf-glow h-6 w-6" />
              </span>
            </div>

            {/* help card */}
            <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-slate p-6 text-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.9)]">
              <div className="tf-blob pointer-events-none absolute -right-12 -top-12 h-40 w-40 bg-emerald-400/30 blur-2xl" aria-hidden />
              <div className="relative flex items-center gap-4">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                  <span className="absolute inset-0 animate-ping rounded-2xl bg-emerald-400/40" style={{ animationDuration: "2.6s" }} />
                  <span className="relative grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400">
                    <MessageSquareText className="tf-pop h-7 w-7" />
                  </span>
                </span>
                <div>
                  <p className="text-lg font-extrabold">Still have questions?</p>
                  <p className="text-sm text-white/70">We reply within 24 hours</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5"
              >
                Contact us <ArrowRight className="tf-nudge h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* right — accordion */}
          <div className="flex flex-col gap-4">
            {F.map((f, i) => {
              const isOpen = open === i;
              const tone = TONES[i % TONES.length];
              return (
                <div
                  key={f._id || i}
                  className={`group relative overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${
                    isOpen ? `bg-white ${tone.ring} shadow-[0_25px_55px_-30px_rgba(15,23,42,0.6)]` : "bg-white/80 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
                  }`}
                >
                  <span className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${tone.grad} transition ${isOpen ? "opacity-100" : "opacity-0"}`} />
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tone.grad} text-lg font-black text-white shadow-md transition-transform duration-300 ${isOpen ? "rotate-6 scale-105" : "group-hover:-rotate-6"}`}
                    >
                      {isOpen ? <Lightbulb className="tf-glow h-6 w-6" /> : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 font-bold transition ${isOpen ? tone.text : "text-slate-900"}`}>{f.question}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${
                        isOpen ? `rotate-180 bg-gradient-to-br ${tone.grad} text-white` : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* smooth height */}
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6 pl-[5.25rem] sm:px-6 sm:pl-[5.5rem]">
                        <p className={`rounded-2xl ${tone.soft} p-4 text-sm leading-relaxed text-slate-700`}>{f.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}