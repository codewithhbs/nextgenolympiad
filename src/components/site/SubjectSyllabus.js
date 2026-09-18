"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Minus, Download, FileText, Clock, ChevronRight, Sparkles, GraduationCap } from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes sy-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes sy-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes sy-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes sy-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes sy-spin{to{transform:rotate(360deg)}}
@keyframes sy-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes sy-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes sy-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes sy-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes sy-drop{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes sy-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.sy-float{animation:sy-float 3.2s ease-in-out infinite}
.sy-wiggle{animation:sy-wiggle 2.4s ease-in-out infinite}
.sy-beat{animation:sy-beat 1.6s ease-in-out infinite}
.sy-pop{animation:sy-pop 1.8s ease-in-out infinite}
.sy-spin{animation:sy-spin 14s linear infinite}
.sy-glow{animation:sy-glow 2s ease-in-out infinite}
.sy-shine{background-size:200% 100%;animation:sy-shine 3.5s linear infinite}
.sy-blob{animation:sy-blob 10s ease-in-out infinite}
.sy-rise{animation:sy-rise .7s ease-out both}
.sy-drop{animation:sy-drop 1s ease-in-out infinite}
.sy-card:hover .sy-sweep{animation:sy-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="sy-"]{animation:none!important}}
`;

const SKILL_STYLES = [
  { bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", glow: "rgba(236,72,153,.55)", anim: "sy-pop" },
  { bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", glow: "rgba(14,165,233,.55)", anim: "sy-spin" },
  { bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", glow: "rgba(16,185,129,.55)", anim: "sy-beat" },
  { bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", glow: "rgba(139,92,246,.55)", anim: "sy-wiggle" },
];

const CLASS_TONES = [
  { bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", ring: "ring-pink-200", soft: "bg-pink-50", text: "text-pink-600" },
  { bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", ring: "ring-blue-200", soft: "bg-blue-50", text: "text-blue-600" },
  { bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", ring: "ring-emerald-200", soft: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", ring: "ring-violet-200", soft: "bg-violet-50", text: "text-violet-600" },
  { bg: "linear-gradient(135deg,#f43f5e 0%,#fbbf24 100%)", ring: "ring-rose-200", soft: "bg-rose-50", text: "text-rose-600" },
];

function SectionEntry({ entry }) {
  if (typeof entry === "string") return <li className="leading-relaxed">{entry}</li>;
  return (
    <li className="mb-2 list-none">
      <span className="font-bold text-slate-900">{entry.title}</span>
      {entry.items?.length > 0 && (
        <ul className="mt-1 list-disc pl-4 text-slate-600">
          {entry.items.map((it) => <li key={it} className="leading-relaxed">{it}</li>)}
        </ul>
      )}
    </li>
  );
}

function Accordion({ items, open, setOpen, renderBody }) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {items.map((c, i) => {
        const isOpen = open === c;
        const tone = CLASS_TONES[i % CLASS_TONES.length];
        return (
          <div
            key={c}
            className={`overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${
              isOpen ? `bg-white ${tone.ring} shadow-[0_25px_55px_-32px_rgba(15,23,42,.6)]` : "bg-white/70 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
            }`}
          >
            <button onClick={() => setOpen(isOpen ? null : c)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md transition-transform duration-300 ${isOpen ? "rotate-6 scale-105" : "group-hover:-rotate-6"}`}
                style={{ backgroundImage: tone.bg }}
              >
                <GraduationCap className={`h-6 w-6 ${isOpen ? "sy-pop" : ""}`} />
              </span>
              <span className={`flex-1 font-display text-xl font-extrabold tracking-tight sm:text-2xl ${isOpen ? tone.text : "text-slate-900"}`}>{c}</span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${isOpen ? "text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
                style={isOpen ? { backgroundImage: tone.bg } : undefined}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">{renderBody(c, tone)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SubjectSyllabus({
  icon: BadgeIcon,
  subject,
  intro,
  classRange,
  skills = [],
  syllabus = {},
  samplePapers = {},
  showCurriculum = true,
  columns = 2,
}) {
  const CLASSES = Object.keys(syllabus);
  const [openClass, setOpenClass] = useState(CLASSES[0]);
  const [openSampleClass, setOpenSampleClass] = useState(CLASSES[0]);
  const [activeTab, setActiveTab] = useState("skills-assessed-section");
  const ticking = useRef(false);

  const TABS = [
    { label: "Skills Assessed", id: "skills-assessed-section" },
    showCurriculum && { label: "Curriculum", id: "curriculum-section" },
    { label: "Sample Paper", id: "sample-paper-section" },
  ].filter(Boolean);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        let cur = TABS[0].id;
        TABS.forEach((t) => {
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
  }, [showCurriculum]);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const num = (i) => String(i).padStart(2, "0");

  const Heading = ({ n, title, sub }) => (
    <div className="sy-rise">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900 font-display text-base font-extrabold text-white shadow-lg sm:h-14 sm:w-14 sm:text-lg">
          {n}
        </span>
        <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">{title}</h2>
      </div>
      <p className="ml-16 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 sm:ml-[4.5rem] sm:text-sm">{sub}</p>
    </div>
  );

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ============ HERO ============ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#ffffff 45%,#eff6ff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="sy-blob absolute -left-24 -top-24 h-96 w-96 bg-rose-300/30 blur-3xl" />
          <div className="sy-blob absolute -right-24 bottom-0 h-96 w-96 bg-blue-300/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, black, transparent)" }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-14 sm:px-6 lg:px-10 xl:px-14 md:pb-20 md:pt-20">
          <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,.8)] ring-1 ring-rose-100 backdrop-blur">
            <span className="relative grid h-10 w-10 place-items-center rounded-full">
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" style={{ animationDuration: "2.6s" }} />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white">
                <BadgeIcon className="sy-pop h-5 w-5" />
              </span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-sm">NextGen Olympiad</span>
            <Sparkles className="sy-glow h-4 w-4 text-amber-500" />
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
            <span className="sy-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">{subject}</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-xl sm:leading-9">{intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-black/5 sm:text-base">
              <GraduationCap className="sy-float h-5 w-5 text-red-600" /> {classRange}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-black/5 sm:text-base">
              <FileText className="sy-pop h-5 w-5 text-violet-600" /> Sample papers available
            </span>
          </div>
        </div>
      </section>

      {/* ============ STICKY TABS ============ */}
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10 xl:px-14">
          {TABS.map((tab) => {
            const on = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition sm:text-base ${
                  on ? "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-rose-400/40" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
                <ChevronRight className={`h-4 w-4 transition ${on ? "rotate-90" : "opacity-50"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ SKILLS ============ */}
      <section
        id="skills-assessed-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="sy-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <Heading n={num(1)} title={`Skills Assessed with ${subject} Olympiad`} sub={classRange} />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ icon: Icon, title }, i) => {
              const st = SKILL_STYLES[i % SKILL_STYLES.length];
              return (
                <div
                  key={title}
                  className="sy-card sy-rise group relative flex flex-col items-center overflow-hidden rounded-[2rem] px-5 py-9 text-center text-white transition duration-300 hover:-translate-y-2"
                  style={{ backgroundImage: st.bg, boxShadow: `0 25px 50px -28px ${st.glow}`, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="sy-blob absolute -right-8 -top-10 h-32 w-32 bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="sy-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  <div className="relative h-20 w-20">
                    <svg className="sy-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                      <circle cx="50" cy="50" r="46" stroke="white" strokeOpacity=".6" strokeWidth="2" strokeDasharray="40 18" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-2 grid place-items-center rounded-full bg-white/25 ring-1 ring-white/40 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white/35">
                      <Icon className={`h-8 w-8 ${st.anim}`} strokeWidth={1.8} style={{ animationDelay: `${i * 0.3}s` }} />
                    </span>
                  </div>

                  <p className="relative mt-4 font-display text-base font-extrabold sm:text-lg">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CURRICULUM ============ */}
      {showCurriculum && (
        <section
          id="curriculum-section"
          className="relative w-full scroll-mt-24 overflow-hidden"
          style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="sy-blob absolute -left-24 top-0 h-96 w-96 bg-violet-300/25 blur-3xl" />
            <div className="sy-blob absolute -right-24 bottom-0 h-96 w-96 bg-emerald-300/25 blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-16 sm:px-6 lg:px-10 xl:px-14">
            <Heading n={num(2)} title="Curriculum" sub="Class-wise syllabus breakdown" />

            <Accordion
              items={CLASSES}
              open={openClass}
              setOpen={setOpenClass}
              renderBody={(c, tone) => (
                <div className={`grid gap-5 border-t border-black/5 px-5 py-6 sm:px-6 ${columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
                  {Object.entries(syllabus[c]).map(([section, entries]) => (
                    <div key={section} className={`rounded-2xl ${tone.soft} p-5 ring-1 ring-black/5`}>
                      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800 sm:text-sm">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundImage: tone.bg }} />
                        {section}
                      </p>
                      <ul className="mt-3 list-disc pl-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        {entries.map((entry, idx) => <SectionEntry key={idx} entry={entry} />)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </section>
      )}

      {/* ============ SAMPLE PAPER ============ */}
      <section
        id="sample-paper-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f0fdfa 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="sy-blob absolute -right-24 top-0 h-96 w-96 bg-cyan-300/25 blur-3xl" />
          <div className="sy-blob absolute -left-24 bottom-0 h-96 w-96 bg-fuchsia-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-20 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <Heading n={num(showCurriculum ? 3 : 2)} title="Sample Paper" sub="Class-wise downloadable sample papers" />

          <Accordion
            items={CLASSES}
            open={openSampleClass}
            setOpen={setOpenSampleClass}
            renderBody={(c, tone) => {
              const href = samplePapers[c];
              const ready = href && href !== "#";
              return (
                <div className="border-t border-black/5 px-5 py-6 sm:px-6">
                  {ready ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-2 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 sm:text-base"
                      style={{ backgroundImage: tone.bg }}
                    >
                      Download {c} Sample Paper
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/25">
                        <Download className="sy-drop h-4 w-4" />
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500 sm:text-base">
                      <Clock className="h-4 w-4" /> Sample paper coming soon
                    </span>
                  )}
                </div>
              );
            }}
          />
        </div>
      </section>
    </div>
  );
}