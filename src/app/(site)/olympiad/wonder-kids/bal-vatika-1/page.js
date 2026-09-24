"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, Clock, Download, FileText, BookOpen, Calculator, Leaf, Palette, Sparkles, Star, ChevronRight, Baby } from "lucide-react";
import Image from "next/image";
const HERO_IMAGE = "/images/bal-vatika.png";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes bv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes bv-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes bv-tick{0%,100%{transform:rotate(0)}50%{transform:rotate(180deg)}}
@keyframes bv-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes bv-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes bv-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes bv-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes bv-spin{to{transform:rotate(360deg)}}
.bv-float{animation:bv-float 3.4s ease-in-out infinite}
.bv-pop{animation:bv-pop 1.8s ease-in-out infinite}
.bv-tick{animation:bv-tick 4s ease-in-out infinite}
.bv-glow{animation:bv-glow 2s ease-in-out infinite}
.bv-shine{background-size:200% 100%;animation:bv-shine 3.5s linear infinite}
.bv-blob{animation:bv-blob 10s ease-in-out infinite}
.bv-rise{animation:bv-rise .8s ease-out both}
.bv-spin-slow{animation:bv-spin 30s linear infinite}
@media (prefers-reduced-motion:reduce){[class*="bv-"]{animation:none!important}}
`;

// Curriculum content sourced from Balvatika_I_Olympiad_Syllabus.docx
const SUBJECTS = [
  {
    subject: "Mathematics",
    sampleHref: "#",
    units: [
      { title: "Unit 1: Pre-Number Concept", items: ["Big - Small", "Tall - Short", "Open - Close", "Sit - Stand"] },
      { title: "Unit 2: Understanding Numbers", items: ["Numbers 1 - 10", "Numbers 11 - 20"] },
      { title: "Unit 3: Shapes", items: ["Circle", "Square", "Rectangle", "Triangle", "Heart", "Star"] },
      { title: "Unit 4: Before and After", items: ["What comes After", "What comes Before"] },
      { title: "Unit 5: Complete the Pattern", items: [] },
      { title: "Unit 6: Simple Puzzles", items: [] },
    ],
  },
  {
    subject: "English",
    sampleHref: "#",
    units: [
      { title: "Unit 1: Alphabet", items: ["Capital A to Z", "Small a to z"] },
      { title: "Unit 2: Action Words", items: ["Playing", "Dancing", "Clapping", "Eating etc."] },
      { title: "Unit 3: Word Formation", items: ["Two Letter Words"] },
    ],
  },
  {
    subject: "EVS",
    sampleHref: "/sample-papers/BAL-VATIKA-1-EVS-OLYMPIAD-PAPER.pdf",
    units: [
      { title: "Unit 1: About Myself", items: ["All about me", "Who Am I?", "My Face", "My House", "My Good Habits"] },
      { title: "Unit 2: My Body", items: ["Eyes", "Ears", "Nose", "Tongue", "Head", "Hips", "Hand"] },
      { title: "Unit 3: Animals", items: ["Domestic Animals", "Wild Animals"] },
      { title: "Unit 4: Transport", items: ["Road", "Water", "Air"] },
      { title: "Unit 5: Colours", items: ["Red, Blue, White", "Orange, Pink, Brown", "Yellow, Green, Black"] },
      { title: "Unit 6: Around Us", items: ["Places, Games, Shapes, Day and Night"] },
    ],
  },
  {
    subject: "Drawing",
    sampleHref: "/sample-papers/Final-BAL-VATIKA-1-DRAWING.pdf",
    units: [
      {
        title: "Pre-Writing Strokes",
        items: [
          "Standing",
          "Sleeping",
          "Left and Right Slanting Lines",
          "Left and Right Curves",
          "Upward and Downward Curves",
        ],
      },
      {
        title: "Basic Shape Drawing",
        items: [
          "Circle",
          "Square",
          "Rectangle",
          "Triangle",
        ],
      },
      {
        title: "Shape-Based Drawing",
        items: [
          "Creating simple objects using basic shapes and lines",
        ],
      },
      {
        title: "Colouring Skills",
        items: [
          "Colouring objects by observing a given reference with neatness and appropriate colour selection",
        ],
      },
      {
        title: "Drawing & Colouring",
        items: [
          "Drawing familiar objects independently and colouring them creatively",
        ],
      },
    ],
  },
];

const SYLLABUS_PDF_HREF = "/downloads/balvatika-1-syllabus.pdf";

const NAV_TABS = [
  { label: "Subjects", id: "subject-section" },
  { label: "Curriculum", id: "curriculum-section" },
  { label: "Sample Paper", id: "sample-paper-section" },
  // { label: "Syllabus", id: "syllabus-section" },
];

/* look per subject */
const SUBJECT_STYLES = {
  Mathematics: { icon: Calculator, badge: "123", anim: "bv-wiggle", bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", soft: "bg-pink-50", ring: "ring-pink-200", text: "text-pink-600", glow: "rgba(236,72,153,.5)" },
  English: { icon: BookOpen, badge: "Aa", anim: "bv-pop", bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", soft: "bg-blue-50", ring: "ring-blue-200", text: "text-blue-600", glow: "rgba(14,165,233,.5)" },
  EVS: { icon: Leaf, badge: "🌱", anim: "bv-float", bg: "linear-gradient(135deg,#10b981 0%,#facc15 100%)", soft: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-600", glow: "rgba(16,185,129,.5)" },
  Drawing: { icon: Palette, badge: "🎨", anim: "bv-beat", bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", soft: "bg-violet-50", ring: "ring-violet-200", text: "text-violet-600", glow: "rgba(139,92,246,.5)" },
};
const FALLBACK_STYLE = { icon: FileText, badge: "••", anim: "bv-pop", bg: "linear-gradient(135deg,#f43f5e 0%,#fbbf24 100%)", soft: "bg-rose-50", ring: "ring-rose-200", text: "text-rose-600", glow: "rgba(244,63,94,.5)" };
const styleOf = (name) => SUBJECT_STYLES[name] || FALLBACK_STYLE;

/* ================= small pieces ================= */
function SectionHeading({ n, title, sub }) {
  return (
    <div className="bv-rise">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate to-indigo-900 font-display text-base font-extrabold text-white shadow-lg sm:h-14 sm:w-14 sm:text-lg">
          {n}
        </span>
        <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate sm:text-4xl xl:text-5xl">{title}</h2>
      </div>
      {sub && <p className="ml-16 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate sm:ml-[4.5rem] sm:text-sm">{sub}</p>}
    </div>
  );
}

function SubjectAccordion({ items, open, setOpen, renderBody }) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {items.map((s, i) => {
        const isOpen = open === i;
        const st = styleOf(s.subject);
        const Icon = st.icon;
        return (
          <div
            key={s.subject}
            className={`overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${isOpen ? `bg-white ${st.ring} shadow-[0_25px_55px_-32px_rgba(15,23,42,.6)]` : "bg-white/70 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
              }`}
          >
            <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md transition-transform duration-300 ${isOpen ? "rotate-6 scale-105" : "group-hover:-rotate-6"}`}
                style={{ backgroundImage: st.bg }}
              >
                <Icon className={`h-6 w-6 ${isOpen ? st.anim : ""}`} />
              </span>
              <span className={`flex-1 font-display text-xl font-extrabold tracking-tight sm:text-2xl ${isOpen ? st.text : "text-slate"}`}>{s.subject}</span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${isOpen ? "text-white" : "bg-slate text-white group-hover:bg-slate"}`}
                style={isOpen ? { backgroundImage: st.bg } : undefined}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">{renderBody(s, st)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const [openIndex, setOpenIndex] = useState(0);
  const [openSampleIndex, setOpenSampleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(NAV_TABS[0].id);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        let cur = NAV_TABS[0].id;
        NAV_TABS.forEach((t) => {
          const el = document.getElementById(t.id);
          if (el && el.getBoundingClientRect().top <= 140) cur = t.id;
        });
        setActiveTab(cur);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ HERO ============ */}
      <section
  className="relative w-full overflow-hidden"
  style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#ffffff 45%,#eff6ff 100%)" }}
>
  <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />
 
  {/* backdrop */}
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    <div className="bv-blob absolute -left-24 -top-24 h-80 w-80 bg-rose-300/35 blur-3xl" />
    <div className="bv-blob absolute -right-24 bottom-0 h-80 w-80 bg-blue-300/35 blur-3xl" />
    <div className="bv-blob absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 bg-amber-300/25 blur-3xl" />
    <div
      className="absolute inset-0 opacity-30"
      style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, black, transparent)" }}
    />
    <Star className="bv-pop absolute left-[6%] top-14 h-5 w-5 fill-amber-400 text-amber-400" />
    <Star className="bv-float absolute left-[35%] bottom-10 hidden h-4 w-4 fill-violet-400 text-violet-400 sm:block" />
  </div>
 
  <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-10 xl:px-14">
    {/* ================= LEFT: content ================= */}
    <div>
      {/* badge */}
      <span className="bv-rise inline-flex items-center gap-3 rounded-full bg-white/85 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,.8)] ring-1 ring-rose-100 backdrop-blur">
        <span className="relative grid h-10 w-10 place-items-center rounded-full">
          <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/40" style={{ animationDuration: "2.6s" }} />
          <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <Baby className="bv-pop h-5 w-5" />
          </span>
        </span>
        <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-sm">Wonder Kids Olympiad</span>
        <Sparkles className="bv-glow h-4 w-4 text-amber-500" />
      </span>
 
      {/* title */}
      <h1 className="bv-rise mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
        Balvatika –{" "}
        <span className="relative inline-block">
          <span className="bv-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">I</span>
          <span className="bv-spin-slow absolute -inset-4 rounded-full border-2 border-dashed border-amber-300/70" aria-hidden />
        </span>
      </h1>
 
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-amber-600 sm:text-base">
        Nurturing young minds for future-ready learning
      </p>
 
      <span className="mt-5 block h-1.5 w-24 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600" aria-hidden />
 
      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
        At Balvatika – I, our Olympiad is a joyful first step towards learning beyond the
        classroom. Designed for our 3-year-old little learners, it encourages curiosity,
        observation, thinking, and confidence through fun and age-appropriate examination.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
        We believe every child is naturally curious — and our aim is to nurture that
        curiosity, one little discovery at a time.
      </p>
 
      {/* chips */}
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-black/5 sm:text-base">
          <Clock className="bv-tick h-5 w-5 text-red-600" />
          Flexible exam window
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-black/5 sm:text-base">
          <Baby className="bv-pop h-5 w-5 text-amber-600" />
          Age 3+ little learners
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-black/5 sm:text-base">
          <Sparkles className="bv-glow h-5 w-5 text-violet-600" />
          Play-based questions
        </span>
      </div>
    </div>
 
    {/* ================= RIGHT: image ================= */}
    <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
      {/* back gradient card */}
      <div className="absolute inset-0 translate-x-4 translate-y-5 -rotate-2 rounded-[2.4rem] bg-gradient-to-br from-red-500 via-rose-500 to-amber-400 sm:translate-x-6 sm:translate-y-6" aria-hidden />
      <div className="bv-spin-slow absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border-2 border-dashed border-amber-400/80 sm:block" aria-hidden />
 
      {/* photo */}
      <div className="relative overflow-hidden rounded-[2.4rem] bg-white p-2.5 shadow-[0_35px_85px_-40px_rgba(216,31,38,.65)] ring-1 ring-black/5">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src={HERO_IMAGE}
            alt="Little learners at the Balvatika Olympiad"
            fill
            priority
            sizes="(min-width:1024px) 40vw, (min-width:640px) 70vw, 90vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>
 
      {/* floating bubbles */}
      <span className="bv-float absolute -left-4 top-10 grid h-16 w-16 place-items-center rounded-3xl bg-white/95 font-display text-xl font-black text-pink-500 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-left-7 sm:h-20 sm:w-20 sm:text-2xl">
        Aa
      </span>
      <span className="bv-float absolute -right-3 top-1/3 grid h-14 w-14 place-items-center rounded-2xl bg-white/95 font-display text-lg font-black text-blue-500 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-right-6 sm:h-16 sm:w-16 sm:text-xl" style={{ animationDelay: "1s" }}>
        123
      </span>
      <span className="bv-float absolute -left-3 bottom-24 hidden h-14 w-14 place-items-center rounded-2xl bg-white/95 text-2xl shadow-xl ring-1 ring-black/5 backdrop-blur sm:-left-6 sm:grid" style={{ animationDelay: ".5s" }}>
        🎨
      </span>
 
      {/* bottom badge */}
      <div className="bv-float absolute -bottom-5 left-1/2 flex items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 py-2.5 text-white shadow-xl" style={{ translate: "-50% 0", animationDelay: ".8s" }}>
        <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
        <span className="text-xs font-extrabold sm:text-sm">Learning through play</span>
      </div>
    </div>
  </div>
</section>

      {/* ============ STICKY TABS ============ */}
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10 xl:px-14">
          {NAV_TABS.map((tab) => {
            const on = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition sm:text-base ${on ? "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-rose-400/40" : "bg-slate text-white hover:bg-slate"
                  }`}
              >
                {tab.label}
                <ChevronRight className={`h-4 w-4 transition ${on ? "rotate-90" : "opacity-50"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ SUBJECT ============ */}
      <section
        id="subject-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="bv-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="01" title="Subject" sub="What little learners attempt" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUBJECTS.map((s, i) => {
              const st = styleOf(s.subject);
              const Icon = st.icon;
              return (
                <div
                  key={s.subject}
                  className="bv-card bv-rise group relative overflow-hidden rounded-[2rem] px-5 py-8 text-center text-white transition duration-300 hover:-translate-y-2"
                  style={{ backgroundImage: st.bg, boxShadow: `0 25px 50px -28px ${st.glow}`, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="bv-blob absolute -right-8 -top-10 h-32 w-32 bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="bv-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  <div className="relative mx-auto h-20 w-20">
                    <svg className="bv-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                      <circle cx="50" cy="50" r="46" stroke="white" strokeOpacity=".6" strokeWidth="2" strokeDasharray="40 18" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-2 grid place-items-center rounded-full bg-white/25 ring-1 ring-white/40 backdrop-blur transition duration-300 group-hover:scale-110">
                      <Icon className={`h-8 w-8 ${st.anim}`} strokeWidth={1.8} style={{ animationDelay: `${i * 0.25}s` }} />
                    </span>
                  </div>

                  <p className="relative mt-4 font-display text-xl font-extrabold sm:text-2xl">{s.subject}</p>
                  <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-white/85">
                    {s.units.length} unit{s.units.length !== 1 ? "s" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CURRICULUM ============ */}
      <section
        id="curriculum-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bv-blob absolute -left-24 top-0 h-96 w-96 bg-violet-300/25 blur-3xl" />
          <div className="bv-blob absolute -right-24 bottom-0 h-96 w-96 bg-emerald-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="02" title="Curriculum" sub="Subject-wise curriculum" />

          <SubjectAccordion
            items={SUBJECTS}
            open={openIndex}
            setOpen={setOpenIndex}
            renderBody={(s, st) => (
              <div className="grid gap-5 border-t border-black/5 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                {/* Subject */}
                <div className={`rounded-2xl ${st.soft} p-5 ring-1 ring-black/5`}>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate sm:text-sm">Subject</p>
                  <p className={`mt-3 font-display text-2xl font-extrabold ${st.text}`}>{s.subject}</p>
                  <p className="mt-1 text-sm text-slate sm:text-base">
                    {s.units.length} unit{s.units.length !== 1 ? "s" : ""} in this subject
                  </p>
                </div>

                {/* Curriculum */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate sm:text-sm">Curriculum</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {s.units.map((u, ui) => (
                      <div key={u.title} className="rounded-xl bg-slate p-4 ring-1 ring-black/5">
                        <p className="flex items-start gap-2 text-sm font-bold text-white sm:text-[15px]">
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-black text-white" style={{ backgroundImage: st.bg }}>
                            {ui + 1}
                          </span>
                          {u.title}
                        </p>
                        {u.items.length > 0 && (
                          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-white">
                            {u.items.map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* ============ SAMPLE PAPER ============ */}
      <section
        id="sample-paper-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f0f9ff 50%,#ffffff 100%)" }}
      >
        <div className="bv-blob pointer-events-none absolute -right-24 top-0 h-80 w-80 bg-blue-300/25 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="03" title="Sample Paper" sub="Subject-wise sample papers" />

          <SubjectAccordion
            items={SUBJECTS}
            open={openSampleIndex}
            setOpen={setOpenSampleIndex}
            renderBody={(s, st) => (
              <div className="border-t border-black/5 px-5 py-6 sm:px-6">
                <Link
                  href={s.sampleHref}
                  target="_blank"
                  className="group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-2 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 sm:text-base"
                  style={{ backgroundImage: st.bg }}
                >
                  Download {s.subject} Sample Paper
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/25">
                    <Download className="bv-drop h-4 w-4" />
                  </span>
                </Link>
              </div>
            )}
          />
        </div>
      </section>

      {/* ============ FULL SYLLABUS ============ */}
      {/* <section
        id="syllabus-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fff7ed 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bv-blob absolute -right-24 top-0 h-80 w-80 bg-rose-300/25 blur-3xl" />
          <div className="bv-blob absolute -left-24 bottom-0 h-80 w-80 bg-blue-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <div
            className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2.2rem] p-8 text-center text-white shadow-[0_40px_90px_-45px_rgba(30,27,75,.9)] sm:p-10 lg:flex-row lg:justify-between lg:text-left"
            style={{ backgroundImage: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 60%,#7c3aed 100%)" }}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="bv-blob absolute -right-12 -top-12 h-48 w-48 bg-amber-400/30 blur-2xl" />
              <div className="bv-blob absolute -bottom-16 -left-10 h-48 w-48 bg-rose-400/20 blur-2xl" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            </div>

            <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:text-left">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 font-display text-lg font-extrabold ring-1 ring-white/30 backdrop-blur">
                04
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl">Complete Syllabus</h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 sm:text-sm">
                  Balvatika – I · Olympiad Syllabus
                </p>
              </div>
            </div>

            <a
              href={SYLLABUS_PDF_HREF}
              download
              className="relative inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-3 pl-6 pr-2 text-sm font-bold text-slate shadow-lg shadow-amber-500/40 transition hover:-translate-y-0.5 sm:text-base"
            >
              Download Syllabus
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/30">
                <Download className="bv-drop h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}