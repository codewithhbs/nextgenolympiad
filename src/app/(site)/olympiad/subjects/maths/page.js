"use client";
import { useState, useEffect, useRef } from "react";
import { BookOpen, Plus, Minus, FileText, Calculator, Target, Brain, Zap, Sparkles, GraduationCap, ChevronRight, Download } from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes en-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes en-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes en-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.18)}30%{transform:scale(.96)}45%{transform:scale(1.12)}}
@keyframes en-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes en-spin{to{transform:rotate(360deg)}}
@keyframes en-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes en-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes en-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes en-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes en-drop{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes en-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.en-float{animation:en-float 3.2s ease-in-out infinite}
.en-wiggle{animation:en-wiggle 2.4s ease-in-out infinite}
.en-beat{animation:en-beat 1.6s ease-in-out infinite}
.en-pop{animation:en-pop 1.8s ease-in-out infinite}
.en-spin{animation:en-spin 14s linear infinite}
.en-glow{animation:en-glow 2s ease-in-out infinite}
.en-shine{background-size:200% 100%;animation:en-shine 3.5s linear infinite}
.en-blob{animation:en-blob 10s ease-in-out infinite}
.en-rise{animation:en-rise .7s ease-out both}
.en-drop{animation:en-drop 1s ease-in-out infinite}
.en-card:hover .en-sweep{animation:en-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="en-"]{animation:none!important}}
`;

// Syllabus sourced from Delhi Heritage School — Mathematics, Class I to IX
const SYLLABUS = {
  "Class 1": {
    "Number Sense": ["Backward and Forward Counting", "Ones and Tens"],
    "Computation Operations": ["Addition", "Subtraction", "Comparison"],
    "Patterns, Shapes": ["Patterns", "Shapes"],
    "Money, Time": ["Money", "Time"],
    "Length, Weight and Comparison": ["Measurement"],
    "Geometrical Shapes": ["Identification of Geometrical Figures"],
  },
  "Class 2": {
    "Numbers Sense": ["Ones, Tens and Hundreds"],
    "Computation Operations": ["Addition", "Subtraction", "Multiplication", "Division", "Comparison"],
    "Shapes and Patterns": ["Shapes and Patterns"],
    "Money, Time and Calendar": ["Money", "Time and Calendar"],
    "Length, Weight and Capacity": ["Measurement"],
    "Geometrical Shapes": ["Geometrical Figures"],
  },
  "Class 3": {
    "Numbers and Their Operations": ["Number Sense and Numeration", "Addition and Subtraction", "Multiplication and Division"],
    "Parts and Wholes": ["Fractions"],
    "Money, Time and Calendar": ["Time and Calendar", "Money"],
    "Length, Weight and Capacity": ["Measurement"],
    "Geometry": ["Geometrical Shapes"],
  },
  "Class 4": {
    "Numbers and Their Operations": ["Number Sense and Numeration", "Addition and Subtraction", "Factors and Multiples", "Multiplication and Division"],
    "Parts and Wholes": ["Fractions and Decimals"],
    "Money and Unitary Method": ["Money", "Unitary Method"],
    "Geometry": ["Geometrical Shapes"],
    "Area and Its Boundary": ["Perimeter and Area"],
    "Time and Calender": ["Time and Calender"],
    "Patterns and Symmetry": ["Patterns and Symmetry"],
    "Data Handling": ["Data Handling"],
    "Critical Thinking & Analysis": ["Critical Thinking", "Analysis", "Shapes and Pattern"],
  },
  "Class 5": {
    "Numbers and Their Operations": ["Number Sense and Numeration", "Numbers in Operations", "Factors and Multiples"],
    "Parts and Whole": ["Fractions and Decimals"],
    "Percentage, Ratio and Proportion": ["Percentage", "Ratio and Proportion / Time and Distance"],
    "Geometry and Measurement": ["Measurement", "Geometry"],
    "Perimeters and Areas": ["Perimeters and Areas"],
    "Solid Figures and Volumes": ["Solid Figures and Volumes"],
    "Graphical Representation of Data": ["Data Handling"],
  },
  "Class 6": {
    "Number Systems": ["Numbers and Their Operations", "Factors and Multiples"],
    "Parts and Wholes": ["Fractions and Decimals"],
    "Algebra, Ratio and Proportion": ["Algebra", "Ratio and Proportion"],
    "Geometry and Mensuration": ["Mensuration", "Geometry"],
    "Graphical Representation of Data": ["Data Handling"],
    "Integers": ["Integers"],
    "Symmetry and Practical Geometry": ["Symmetry and Practical Geometry"],
  },
  "Class 7": {
    "Numbers and Their Operations": ["Integers", "Simplifying Arithmetic Expressions", "Fractions and Decimals", "Rational Numbers", "Exponents"],
    "Algebra": ["Algebraic Expressions", "Simple Equations"],
    "Ratio and its Applications": ["Ratio and Proportion", "Percentage", "Profit and Loss", "Simple Interest"],
    "Geometry and Mensuration": ["Lines and Angles", "Triangles", "Quadrilaterals", "Solid Shapes", "Perimeter", "Area of Closed Figures"],
    "Data Handling": ["Arithmetic Mean, Median, Mode", "Bar graphs"],
  },
  "Class 8": {
    "Number Systems": ["Rational Numbers", "Exponents and Powers", "Square and Square Root", "Cube and Cube Root"],
    "Algebra and Geometry": ["Algebraic Expression and Identities", "Factorization", "Linear Equation in one variable", "Convex and Concave polygon", "Understanding Quadrilateral"],
    "Comparing Quantities": ["Direct and Inverse Proportions", "Time and Work", "Percentage", "Discount and Taxes", "Compound Interest and its Application"],
    "Mensuration": ["Surface area and volume of Cube, Cuboid and Cylinder"],
    "Data Handling": ["Introduction to Graphs", "Line graphs", "Pie Chart", "Probability"],
  },
  "Class 9": {
    "Number System": ["Irrational Numbers", "Real numbers and their Decimal expansions", "Operation on Real Numbers", "Laws of Exponents for Real Numbers"],
    "Algebra": ["Polynomials in one variable", "Zeroes of a polynomial", "Factorization of Polynomials"],
    "Geometry and Co-ordinate Geometry": ["Lines and angles", "Triangles", "Quadrilaterals", "Circles", "Linear equation in two variables", "Solution of Linear Equations", "Co-ordinate geometry"],
    "Statistics": ["Bar graphs", "Histogram", "Frequency Polygon"],
    "Mensuration": ["Surface area and volume of Right Circular Cones and Spheres", "Heron's Formula"],
  },
};

// Sample paper links — replace "#" with actual file paths when ready
const SAMPLE_PAPERS = Object.fromEntries(Object.keys(SYLLABUS).map((c) => [c, "#"]));

const SKILLS_ASSESSED = [
  { icon: Calculator, title: "Number Sense" },
  { icon: Brain, title: "Problem Solving" },
  { icon: Target, title: "Logical Reasoning" },
  { icon: Zap, title: "Speed & Accuracy" },
];

const SKILL_STYLES = [
  { bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", glow: "rgba(236,72,153,.55)", anim: "en-pop" },
  { bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", glow: "rgba(14,165,233,.55)", anim: "en-spin" },
  { bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", glow: "rgba(16,185,129,.55)", anim: "en-beat" },
  { bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", glow: "rgba(139,92,246,.55)", anim: "en-wiggle" },
];

const CLASS_TONES = [
  { bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", ring: "ring-pink-200", soft: "bg-pink-50", text: "text-pink-600" },
  { bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", ring: "ring-blue-200", soft: "bg-blue-50", text: "text-blue-600" },
  { bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", ring: "ring-emerald-200", soft: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", ring: "ring-violet-200", soft: "bg-violet-50", text: "text-violet-600" },
  { bg: "linear-gradient(135deg,#f43f5e 0%,#fbbf24 100%)", ring: "ring-rose-200", soft: "bg-rose-50", text: "text-rose-600" },
];

const CLASSES = Object.keys(SYLLABUS);

const NAV_TABS = [
  { label: "Skills Assessed", id: "skills-assessed-section" },
  { label: "Curriculum", id: "curriculum-section" },
  { label: "Sample Paper", id: "sample-paper-section" },
];

/* ================= small pieces ================= */
function SectionHeading({ n, title, sub }) {
  return (
    <div className="en-rise">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate to-indigo-900 font-display text-base font-extrabold text-white shadow-lg sm:h-14 sm:w-14 sm:text-lg">
          {n}
        </span>
        <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate sm:text-4xl xl:text-5xl">{title}</h2>
      </div>
      <p className="ml-16 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate sm:ml-[4.5rem] sm:text-sm">{sub}</p>
    </div>
  );
}

function ClassAccordion({ items, open, setOpen, renderBody }) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {items.map((c, i) => {
        const isOpen = open === c;
        const tone = CLASS_TONES[i % CLASS_TONES.length];
        return (
          <div
            key={c}
            className={`overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${isOpen ? `bg-white ${tone.ring} shadow-[0_25px_55px_-32px_rgba(15,23,42,.6)]` : "bg-white/70 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
              }`}
          >
            <button onClick={() => setOpen(isOpen ? null : c)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md transition-transform duration-300 ${isOpen ? "rotate-6 scale-105" : "group-hover:-rotate-6"}`}
                style={{ backgroundImage: tone.bg }}
              >
                <GraduationCap className={`h-6 w-6 ${isOpen ? "en-pop" : ""}`} />
              </span>
              <span className={`flex-1 font-display text-xl font-extrabold tracking-tight sm:text-2xl ${isOpen ? tone.text : "text-slate"}`}>{c}</span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${isOpen ? "text-white" : "bg-slate text-white group-hover:bg-slate"}`}
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

export default function Page() {
  const [openClass, setOpenClass] = useState(CLASSES[0]);
  const [openSampleClass, setOpenSampleClass] = useState(CLASSES[0]);
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
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="en-blob absolute -left-24 -top-24 h-96 w-96 bg-rose-300/30 blur-3xl" />
          <div className="en-blob absolute -right-24 bottom-0 h-96 w-96 bg-blue-300/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, black, transparent)" }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:px-10 xl:px-14">
          <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,.8)] ring-1 ring-rose-100 backdrop-blur">
            <span className="relative grid h-10 w-10 place-items-center rounded-full">
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" style={{ animationDuration: "2.6s" }} />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white">
                <BookOpen className="en-pop h-5 w-5" />
              </span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-sm">NextGen Olympiad</span>
            <Sparkles className="en-glow h-4 w-4 text-amber-500" />
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate sm:text-6xl xl:text-7xl">
            <span className="en-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Maths</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate sm:text-xl sm:leading-9">
            Maths is more than numbers. It teaches students to think sharply, solve problems, and see patterns in the world around them. Our Maths Olympiad is a competitive challenge that goes beyond the textbook and rewards curiosity, logic, and clear reasoning. Give your child the chance to test their talent, see where they stand, and fall in love with problem-solving.          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate shadow-sm ring-1 ring-black/5 sm:text-base">
              <GraduationCap className="en-float h-5 w-5 text-red-600" /> For Classes 1 to 9
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate shadow-sm ring-1 ring-black/5 sm:text-base">
              <FileText className="en-pop h-5 w-5 text-violet-600" /> Sample papers available
            </span>
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

      {/* ============ SKILLS ASSESSED ============ */}
      <section
        id="skills-assessed-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="en-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="01" title="Skills Assessed with Maths Olympiad" sub="For Classes 1 to 9" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS_ASSESSED.map(({ icon: Icon, title }, i) => {
              const st = SKILL_STYLES[i % SKILL_STYLES.length];
              return (
                <div
                  key={title}
                  className="en-card en-rise group relative flex flex-col items-center overflow-hidden rounded-[2rem] px-5 py-9 text-center text-white transition duration-300 hover:-translate-y-2"
                  style={{ backgroundImage: st.bg, boxShadow: `0 25px 50px -28px ${st.glow}`, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="en-blob absolute -right-8 -top-10 h-32 w-32 bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="en-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  <div className="relative h-20 w-20">
                    <svg className="en-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
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
      <section
        id="curriculum-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="en-blob absolute -left-24 top-0 h-96 w-96 bg-violet-300/25 blur-3xl" />
          <div className="en-blob absolute -right-24 bottom-0 h-96 w-96 bg-emerald-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="02" title="Curriculum" sub="Class-wise syllabus breakdown" />

          <ClassAccordion
            items={CLASSES}
            open={openClass}
            setOpen={setOpenClass}
            renderBody={(c, tone) => (
              <div className="grid gap-5 border-t border-black/5 px-5 py-6 sm:px-6 md:grid-cols-2">
                {Object.entries(SYLLABUS[c]).map(([topic, chapters]) => (
                  <div key={topic} className={`rounded-2xl ${tone.soft} p-5 ring-1 ring-black/5`}>
                    <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate sm:text-sm">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundImage: tone.bg }} />
                      {topic}
                    </p>
                    <ul className="mt-3 list-disc pl-4 text-sm leading-relaxed text-slate sm:text-[15px]">
                      {chapters.map((ch) => (
                        <li key={ch}>{ch}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </section>

      {/* ============ SAMPLE PAPER ============ */}
      <section
        id="sample-paper-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f0fdfa 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="en-blob absolute -right-24 top-0 h-96 w-96 bg-cyan-300/25 blur-3xl" />
          <div className="en-blob absolute -left-24 bottom-0 h-96 w-96 bg-fuchsia-300/25 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-20 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="03" title="Sample Paper" sub="Class-wise downloadable sample papers" />

          <ClassAccordion
            items={CLASSES}
            open={openSampleClass}
            setOpen={setOpenSampleClass}
            renderBody={(c, tone) => (
              <div className="border-t border-black/5 px-5 py-6 sm:px-6">
                <a
                  href={SAMPLE_PAPERS[c]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-2 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 sm:text-base"
                  style={{ backgroundImage: tone.bg }}
                >
                  Download {c} Sample Paper
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/25">
                    <Download className="en-drop h-4 w-4" />
                  </span>
                </a>
              </div>
            )}
          />
        </div>
      </section>
    </div>
  );
}