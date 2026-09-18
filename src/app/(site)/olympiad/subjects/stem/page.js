"use client";
import { useState, useEffect, useRef } from "react";
import { Atom, Plus, Minus, FlaskConical, Cpu, Calculator, Brain, Download, FileText, Sparkles, GraduationCap, ChevronRight } from "lucide-react";

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

// entries can be a plain string (flat bullet) or { title, items } (topic with sub-points)
const SYLLABUS = {
  "Class 1": {
    "Section A: Science": ["Plants", "Living and Non-Living Things", "Animals", "Food", "Air and Water", "Human Body"],
    "Section B: Technology & Engineering": ["Introduction to Computer", "Uses of Computer", "Parts of Computer", "Introduction to Artificial Intelligence", "Intelligence Assessment with Logical Reasoning"],
    "Section C: Mathematics": ["Numbers and its Counting", "Operation of Addition and Subtraction", "Money, Time, Measuring Length", "Weight and Volume", "Identifying Patterns", "Visualizing Shapes"],
  },
  "Class 2": {
    "Section A: Science": ["Animals", "Plants", "Food", "Air and Water", "Human Body", "Our Universe"],
    "Section B: Technology & Engineering": ["Introduction to Computer", "Types of computer", "Uses of Computer", "Parts of Computer", "Working of Computer", "Keyboard and Mouse", "Introduction to Artificial Intelligence", "Intelligence Assessment with Logical Reasoning"],
    "Section C: Mathematics": ["Knowing Numbers", "Fundamental Operation of Numbers", "Patterns, Uses of Numbers in Daily Life", "Measurement", "Identifying 2D and 3D Shapes"],
  },
  "Class 3": {
    "Section A: Science": ["Understanding motion: Force and its impact", "The magical world of planets, moons and stars", "The three physical states of matter", "Sensors of the human body", "Kingdom of plants and animals"],
    "Section B: Technology & Engineering (Information Technology)": ["Introduction to Hardware and Software", "Usage of the Internet", "Coding using 'Scratch' - Block-based Programming Language (Beginner)", "Introduction to Artificial Intelligence (AI vs Human Intelligence)", "Intelligence assessment with Logical Reasoning"],
    "Section C: Mathematics": ["Exploring Numbers", "Splitting a Number", "Daily Mathematics", "Geometrical Shapes", "Working on Data"],
  },
  "Class 4": {
    "Section A: Science": [
      { title: "Forces and their applications", items: ["Force, effects of forces, different types of force"] },
      { title: "Energy and its different forms", items: ["Energy, different types of energy"] },
      { title: "Our magical solar system", items: ["Our solar system, sun, planets"] },
      { title: "The three physical states of matter", items: ["Solids, Liquids, Gases", "Melting, Evaporation, Condensation, Freezing"] },
      { title: "Kingdom of plants and animals", items: ["Different types of plants", "Animals and their habitats"] },
      { title: "Systems inside our body", items: ["Digestive system", "Respiratory system", "Circulatory system"] },
    ],
    "Section B: Technology & Engineering": [
      "Information Technology — More on Hardware and Software, Application of Internet and Security",
      "Coding using 'Scratch' - Block based Programming Language (Intermediate)",
      "Introduction to Artificial Intelligence (AI Smart Homes)",
      "Intelligence assessment with Logical Reasoning",
    ],
    "Section C: Mathematics": [
      { title: "Working with Numbers", items: ["Addition, Subtraction, Multiplication and Division of Numbers"] },
      { title: "Dividing A Whole", items: ["Applying Fractions"] },
      { title: "Everyday Mathematics", items: ["Time, Money, Measuring Length, Mass and Capacity"] },
      { title: "Understanding Geometrical Shapes", items: ["Geometrical Figures, Patterns"] },
      { title: "Representing Data", items: ["Pictograph, Bar Graph"] },
    ],
  },
  "Class 5": {
    "Section A: Science": [
      { title: "Force, work & energy", items: ["Frictional force, Magnetic force, Gravitational force, Elastic force", "Work, Energy"] },
      { title: "The simple machines", items: ["Lever, Plane, Pulley, Wheel & Axle, Screw"] },
      { title: "Light: The fastest thing", items: ["Light, Reflection, Transparency, Luminous & Non-luminous"] },
      { title: "Forces of nature: natural calamities", items: ["Earthquake, Flood, Drought, Cyclone"] },
      { title: "Imagine the unimaginable: Universe", items: ["Solar system, Planets, Constellations"] },
      { title: "Systems inside our body", items: ["Skeletal system, Nervous system, Circulatory system"] },
    ],
    "Section B: Technology & Engineering": [
      "Information Technology — Computer Fundamental, Windows OS, Introduction to MS-Office, Internet and communication",
      "Introduction and basics of Programming Language",
      "Coding using 'Scratch' - Block based Programming Language (Advanced)",
      "Artificial Intelligence (Domains of AI)",
      "Intelligence assessment with Logical Reasoning",
    ],
    "Section C: Mathematics": [
      { title: "Number Sense and Numeration", items: ["Numbers and Their Operations, Factors and Multiples"] },
      { title: "Understanding Fractions", items: ["Fractions and Decimals"] },
      { title: "Ratio and Its Application", items: ["Ratio and Proportion, Percentage, Time and Distance"] },
      { title: "Geometrical shapes", items: ["Angle, Polygon and Circle, Perimeter and Area of Geometrical shapes"] },
      { title: "Handling Data", items: ["Handling Data and its Representation"] },
    ],
  },
  "Class 6": {
    "Section A: Science": [
      { title: "Everyday science", items: ["Materials, Properties of materials, Grouping materials, Separation of components of mixture"] },
      { title: "Story of Movement", items: ["Transport, measurement, Motion"] },
      { title: "Light rays and their interesting behaviour", items: ["Light, Reflection, Shadow, Transparency, Luminous and Non-luminous objects"] },
      { title: "Magic of magnet", items: ["Magnet, Poles of magnet, Magnetic and Non-magnetic materials, Compass"] },
      { title: "Current and its path", items: ["Electricity, Electric circuits, Conductors, Insulators, Dry cell, Bulb"] },
      { title: "Movement in living world", items: ["Human skeletal system, Joints, Gait of animals"] },
    ],
    "Section B: Technology & Engineering": [
      { title: "AI", items: ["Introduction to AI, The Birth of AI, Understanding AI, Future of AI, New Technologies (Augmented Reality)"] },
      { title: "Coding", items: ["Introduction of Coding, Algorithms with Block Coding, Variables using Block Coding, Control with Conditionals, Loops using Block Coding"] },
      { title: "Intelligence assessment with Logical Reasoning", items: ["Series Completion, Blood Relation, Direction Sense Test, Geometrical Shapes, Mirror and Water Reflections"] },
    ],
    "Section C: Mathematics": [
      { title: "Numbers and its Operations", items: ["Whole Numbers, Simplification of Numbers, Factors and Multiples, Fractions and Decimals"] },
      { title: "Comparing Quantities", items: ["Ratio and Proportion"] },
      { title: "Algebra", items: ["Algebraic Expressions"] },
      { title: "Geometry", items: ["Lines and Angles, Elementary Geometrical Shapes"] },
      { title: "Mensuration", items: ["Perimeter, Area"] },
      { title: "Data Handling", items: ["Graphical representation of data"] },
    ],
  },
  "Class 7": {
    "Section A: Science": [
      { title: "Light and its interaction with objects", items: ["Rectilinear property of light, Laws of reflections, Object & image, Mirrors, Lenses, Dispersion of light"] },
      { title: "Current and its effects", items: ["Electric components, Electric circuits, Heating effect of current, Magnetic effect of current, Electromagnet, Fuse"] },
      { title: "Concept of Motion and Time", items: ["Uniform and Non-uniform motion, Graphical representation of motion, Time"] },
      { title: "Understanding temperature", items: ["Heat, Flow of heat, Thermometers"] },
      { title: "Sour, bitter and salty taste of substances", items: ["Acids, Bases, Salts"] },
      { title: "Components of Environment", items: ["Soil, Air, Water, Forest"] },
      { title: "The processes that make life possible", items: ["Nutrition, Human digestive system, Human respiratory system, Human circulatory system"] },
    ],
    "Section B: Technology & Engineering": [
      { title: "AI", items: ["Introduction to AI, Application Area of AI, Ethics of AI, Future of AI, New Technologies (Virtual Reality)"] },
      { title: "Coding", items: ["Understanding Programming Languages, Variable in Real Life, Sequencing with Block Coding, Fun with Functions, Understanding Arrays and Collections"] },
      { title: "Intelligence assessment with Logical Reasoning", items: ["Series Completion, Geometrical Shapes, Analogy and Classification, Coding & Decoding, Cubes and Dice"] },
    ],
    "Section C: Mathematics": [
      { title: "Number System", items: ["Integers, Simplifying Arithmetic expressions, Fractions and Decimals, Rational Numbers, Exponents"] },
      { title: "Algebra", items: ["Algebraic Expressions, Simple Equations"] },
      { title: "Comparing Quantities", items: ["Ratio and Proportion, Percentage, Profit and Loss, Simple Interest"] },
      { title: "Geometry", items: ["Lines and Angles, Triangles, Quadrilaterals, Solid shapes, Symmetry"] },
      { title: "Handling Data", items: ["Mean, mode and Median, Bar graphs"] },
      { title: "Mensuration", items: ["Perimeter, Area and Volume"] },
    ],
  },
  "Class 8": {
    "Section A: Science": [
      { title: "Some important physical quantities", items: ["Light, Electricity, Force, Sound"] },
      { title: "Some natural phenomena", items: ["Electric charge, Electroscope, Lightening, Earthquake"] },
      { title: "Important Materials", items: ["Metals, Non-metals, Fibres, Plastics"] },
      { title: "World Beyond Earth", items: ["Stars, Galaxy, Constellation, Solar system, Satellites, Comets, Meteors"] },
      { title: "Systems inside human body", items: ["Reproductive system, Circulatory system, Excretory system"] },
    ],
    "Section B: Technology & Engineering": [
      { title: "AI", items: ["Introduction to AI, History of AI, Application of AI, Future of AI, AI Ethics and Bias"] },
      { title: "Coding", items: ["Conditionals in Details, Get Creative with Loops, Functions"] },
      { title: "Intelligence assessment with Logical Reasoning", items: ["Series Completion, Classification, Direction Sense Test, Coding & Decoding, Image Reflection"] },
    ],
    "Section C: Mathematics": [
      { title: "Rational Numbers", items: ["Rational Numbers, Exponents, Square and Square Root, Cube and Cube Root"] },
      { title: "Algebra", items: ["Algebraic Expression, Factorization, Linear Equation"] },
      { title: "Geometry", items: ["Convex and Concave polygon"] },
      { title: "Ratio and its Application", items: ["Direct and inverse proportions, Percentage, Discount and Taxes, Compound Interest"] },
      { title: "Mensuration", items: ["Surface area and volume of Cube, Cuboid and Cylinder"] },
      { title: "Handling Data", items: ["Introduction to graphs, Line graphs, Pie Chart, Probability of an event"] },
    ],
  },
  "Class 9": {
    "Section A: Science": [
      { title: "Chemical composition of our physical world", items: ["Matter, Metals, Non-metals, Metalloids, Mixture, Atoms, Molecules"] },
      { title: "Force & Motion", items: ["Motion, Displacement, Acceleration, Equations of motion, Force, Newton's laws of motion"] },
      { title: "Gravitation", items: ["Universal law of gravitation, Free fall, Pressure, Buoyancy"] },
      { title: "Work & Energy", items: ["Work, Forms of energy, Conservation of energy, Power"] },
      { title: "Sound", items: ["Sound, Propagation of sound, Types of waves, Human ear"] },
      { title: "Cell and Tissues", items: ["Cell, Cell organelles, Tissues, Plant tissues, Animal tissues"] },
    ],
    "Section B: Technology & Engineering": [
      { title: "AI", items: ["Introduction to AI, AI Project Cycle, Neural Networks"] },
      { title: "Coding", items: ["Coding with Python - Intermediate"] },
      { title: "Intelligence assessment with Logical Reasoning", items: ["Series Completion, Blood Relation, Syllogism, Inserting Missing Number, Figures Sequence"] },
    ],
    "Section C: Mathematics": [
      { title: "Rational Numbers", items: ["Irrational Numbers, Real Numbers and their Decimal Expansions, Operation on Real Numbers, Laws of Exponents for Real Numbers"] },
      { title: "Algebra", items: ["Polynomials in one variable, Zeros of a polynomial, Factorization of polynomials, Algebraic Identities"] },
      { title: "Linear Equation and Coordinate Geometry", items: ["Linear equation in two variables, Solution of Linear equations, Coordinate geometry"] },
      { title: "Geometry", items: ["Lines and angles, Triangles, Quadrilaterals, Circles"] },
      { title: "Handling Data", items: ["Bar graphs, Histogram, Frequency Polygon"] },
      { title: "Mensuration", items: ["Surface Area and Volume"] },
    ],
  },
};

// Sample paper links — replace "#" with actual file paths when ready
const SAMPLE_PAPERS = {
  "Class 1": "#",
  "Class 2": "#",
  "Class 3": "#",
  "Class 4": "#",
  "Class 5": "#",
  "Class 6": "#",
  "Class 7": "#",
  "Class 8": "#",
  "Class 9": "#",
};

const SKILLS_ASSESSED = [
  { icon: FlaskConical, title: "Scientific Thinking" },
  { icon: Cpu, title: "Coding & Technology" },
  { icon: Calculator, title: "Mathematical Reasoning" },
  { icon: Brain, title: "Logical Reasoning" },
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
// entries can be a plain string (flat bullet) or { title, items } (topic with sub-points)
function SectionEntry({ entry }) {
  if (typeof entry === "string") {
    return <li className="leading-relaxed">{entry}</li>;
  }
  return (
    <li className="mb-2 list-none">
      <span className="font-bold text-slate">{entry.title}</span>
      {entry.items?.length > 0 && (
        <ul className="mt-1 list-disc pl-4 text-slate">
          {entry.items.map((it) => (
            <li key={it} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

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
            className={`overflow-hidden rounded-3xl ring-1 transition-all duration-300 ${
              isOpen ? `bg-white ${tone.ring} shadow-[0_25px_55px_-32px_rgba(15,23,42,.6)]` : "bg-white/70 ring-black/5 backdrop-blur hover:bg-white hover:shadow-md"
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
                <Atom className="en-spin h-5 w-5" />
              </span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600 sm:text-sm">NextGen Olympiad</span>
            <Sparkles className="en-glow h-4 w-4 text-amber-500" />
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate sm:text-6xl xl:text-7xl">
            <span className="en-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">STEM</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate sm:text-xl sm:leading-9">
            Class-wise STEM syllabus covering Science, Technology &amp; Engineering, and
            Mathematics.
          </p>

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

      {/* ============ SKILLS ASSESSED ============ */}
      <section
        id="skills-assessed-section"
        className="relative w-full scroll-mt-24 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="en-blob pointer-events-none absolute -right-24 top-10 h-80 w-80 bg-amber-300/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-16 sm:px-6 lg:px-10 xl:px-14">
          <SectionHeading n="01" title="Skills Assessed with STEM Olympiad" sub="For Classes 1 to 9" />

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
              <div className="grid gap-5 border-t border-black/5 px-5 py-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(SYLLABUS[c]).map(([section, entries]) => (
                  <div key={section} className={`rounded-2xl ${tone.soft} p-5 ring-1 ring-black/5`}>
                    <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate sm:text-sm">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundImage: tone.bg }} />
                      {section}
                    </p>
                    <ul className="mt-3 list-disc pl-4 text-sm leading-relaxed text-slate sm:text-[15px]">
                      {entries.map((entry, idx) => (
                        <SectionEntry key={idx} entry={entry} />
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