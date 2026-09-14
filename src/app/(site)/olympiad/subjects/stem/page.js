"use client";
import { useState } from "react";
import { Atom, Plus, Minus } from "lucide-react";

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

const CLASSES = Object.keys(SYLLABUS);

function SectionEntry({ entry }) {
  if (typeof entry === "string") {
    return <li>{entry}</li>;
  }
  return (
    <li className="mb-1 list-none">
      <span className="font-bold text-ink">{entry.title}</span>
      {entry.items?.length > 0 && (
        <ul className="mt-1 list-disc pl-4 text-slate">
          {entry.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Page() {
  const [openClass, setOpenClass] = useState(CLASSES[0]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <section className="border-b border-line pb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
          <Atom className="h-4 w-4" /> NextGen Olympiad
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          STEM
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate">
          Class-wise STEM syllabus covering Science, Technology &amp; Engineering, and
          Mathematics.
        </p>
      </section>

      {/* Class-wise accordion */}
      <section className="mt-8 flex flex-col gap-3">
        {CLASSES.map((c) => {
          const isOpen = openClass === c;
          const data = SYLLABUS[c];
          return (
            <div
              key={c}
              className={`rounded-2xl border border-line transition ${
                isOpen ? "bg-white shadow-soft" : "bg-slate-50/60"
              }`}
            >
              <button
                onClick={() => setOpenClass(isOpen ? null : c)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className={`font-display text-lg font-extrabold ${isOpen ? "text-brand" : "text-ink"}`}>
                  {c}
                </span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isOpen ? "bg-orange-500 text-white" : "bg-white text-slate ring-1 ring-line"
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-8 border-t border-line px-5 py-5 md:grid-cols-3">
                  {Object.entries(data).map(([section, entries]) => (
                    <div key={section}>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                        {section}
                      </p>
                      <ul className="mt-2 list-disc pl-4 text-sm leading-relaxed text-slate">
                        {entries.map((entry, idx) => (
                          <SectionEntry key={idx} entry={entry} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}