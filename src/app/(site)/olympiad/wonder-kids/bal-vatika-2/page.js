"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, Clock, Download, FileText, BookOpen, Calculator, Leaf, Palette, Sparkles, Star, ChevronRight, Baby } from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes bv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes bv-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes bv-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes bv-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes bv-spin{to{transform:rotate(360deg)}}
@keyframes bv-tick{0%,100%{transform:rotate(0)}50%{transform:rotate(180deg)}}
@keyframes bv-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes bv-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes bv-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes bv-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes bv-drop{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes bv-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.bv-float{animation:bv-float 3.2s ease-in-out infinite}
.bv-wiggle{animation:bv-wiggle 2.4s ease-in-out infinite}
.bv-beat{animation:bv-beat 1.6s ease-in-out infinite}
.bv-pop{animation:bv-pop 1.8s ease-in-out infinite}
.bv-spin{animation:bv-spin 14s linear infinite}
.bv-tick{animation:bv-tick 4s ease-in-out infinite}
.bv-glow{animation:bv-glow 2s ease-in-out infinite}
.bv-shine{background-size:200% 100%;animation:bv-shine 3.5s linear infinite}
.bv-blob{animation:bv-blob 10s ease-in-out infinite}
.bv-rise{animation:bv-rise .7s ease-out both}
.bv-drop{animation:bv-drop 1s ease-in-out infinite}
.bv-card:hover .bv-sweep{animation:bv-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="bv-"]{animation:none!important}}
`;

// Curriculum content sourced from Balvatika_II_Olympiad_Syllabus.docx
const SUBJECTS = [
  {
    subject: "English",
    sampleHref: "#",
    units: [
      { title: "1. Vowels a, e, i, o, u (Alphabets)", items: ["Recognition and identification of vowels."] },
      { title: "2. Action Words", items: ["Identifying and using action words like dancing, running etc."] },
      { title: "3. Two or Three Letter Words (Word Formation)", items: ["Making simple words using given letters."] },
      { title: "4. Introduction of in / on / and / this / that", items: ["Understanding and using in, on, and, this, that in simple sentences."] },
      { title: "5. Opposites", items: ["Learning and identifying opposite words."] },
      { title: "6. Look and Write", items: ["Observing the picture and writing the correct word."] },
      { title: "7. Missing Alphabets", items: ["Identifying and writing the missing letters in sequence."] },
      { title: "8. Myself", items: ["Talking about myself and my likes."] },
      { title: "9. Spell Check", items: [] },
      { title: "10. Pictorial Depiction", items: [] },
    ],
  },
  {
    subject: "Maths",
    sampleHref: "#",
    units: [
      { title: "1. Pre-Number Concepts", items: ["Big - Small", "Tall - Short", "Long - Short", "Heavy - Light", "Full - Empty", "Odd one out"] },
      { title: "2. Number Adventure", items: ["Counting 1 - 50", "Greater than, less than, equal to", "After, Before, Between", "Number names (1 - 20)"] },
      { title: "3. Ascending / Descending Order", items: ["Arranging numbers in increasing and decreasing order."] },
      { title: "4. Shapes", items: ["Square, Triangle, Circle, Rectangle, Heart, Star, Cube, Cuboid, Cylinder, Cone, Sphere"] },
      { title: "5. Continue the Pattern", items: [] },
    ],
  },
  {
    subject: "EVS",
    sampleHref: "/sample-papers/Balvatika_II_EVS.pdf",
    units: [
      { title: "1. Me and My Family", items: ["Body parts", "Good habits / Bad habits", "Exploring emotions", "My family", "Magical words"] },
      { title: "2. Animals and Plants", items: ["Domestic / Wild Animals", "Animals and their young ones", "Habitats of Animals", "Parts of Plant", "Fruits", "Fruit with single seed and multiple seed", "Vegetable"] },
      { title: "3. Helpers", items: [] },
      { title: "4. Mode of Transport", items: ["Road", "Water", "Air"] },
      { title: "5. Seasons", items: ["Summer", "Winter", "Spring", "Rainy"] },
      { title: "6. Festivals", items: ["Lohri", "Republic", "Holi", "Diwali", "Dussehra", "Christmas"] },
      { title: "7. Water", items: ["Sources of water", "Do's and Don'ts"] },
    ],
  },
  {
    subject: "Drawing",
    sampleHref: "/sample-papers/BAL-VATIKA-2-DRAWING.pdf",
    units: [
      { title: "Curriculum", items: ["Curriculum to be added soon"] },
    ],
  },
];

const SYLLABUS_PDF_HREF = "/downloads/balvatika-2-syllabus.pdf";

const NAV_TABS = [
  { label: "Subjects", id: "subject-section" },
  { label: "Curriculum", id: "curriculum-section" },
  { label: "Sample Paper", id: "sample-paper-section" },
  { label: "Syllabus", id: "syllabus-section" },
];

/* look per subject */
const SUBJECT_STYLES = {
  Maths: { icon: Calculator, badge: "123", anim: "bv-wiggle", bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", soft: "bg-pink-50", ring: "ring-pink-200", text: "text-pink-600", glow: "rgba(236,72,153,.5)" },
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
            className={`overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${
              isOpen ? `bg-white ${st.ring} shadow-[0_25px_55px_-32px_rgba(15,23,42,.6)]` : "bg-white/70 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
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
        className="relative overflow-hidden border-b border-line"
        style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#ffffff 45%,#eff6ff 100%)" }}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Bal Vatika – II
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
            Age-appropriate assessment across core early-learning areas
          </p>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-slate">
            At Bal Vatika – II, our Olympiad encourages 4-year-olds to explore, observe, think,
            and learn with confidence. Through simple and engaging age-appropriate examination,
            children get an opportunity to strengthen their early learning skills while enjoying
            the excitement of discovering something new.
          </p>
          <div className="mt-6 flex justify-center max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-brand-soft px-5 py-2.5 text-md font-bold text-brand shadow-sm">
              <Clock className="h-4 w-4" />
              Flexible exam window
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
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition sm:text-base ${
                  on ? "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-rose-400/40" : "bg-slate text-white hover:bg-slate"
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
          <SectionHeading n="01" title="Subject" sub="All subjects covered" />

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
      <section
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
                  Bal Vatika – II · Olympiad Syllabus
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
      </section>
    </div>
  );
}