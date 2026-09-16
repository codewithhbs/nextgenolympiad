"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Clock, Download, FileText } from "lucide-react";

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
        title: "Curriculum",
        items: [
          "Standing line, sleeping line, left slanting line, right slanting line, left curve, right curve, up and down curves",
          "Drawing shapes: triangle, square, rectangle, and circle",
          "Colouring reference objects",
          "Drawing and colouring objects",
          "Draw Simple shapes",
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
  { label: "Syllabus", id: "syllabus-section" },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState(0);
  const [openSampleIndex, setOpenSampleIndex] = useState(0);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-line"
        style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#ffffff 45%,#eff6ff 100%)" }}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Bal Vatika – I
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
            Nurturing young minds for future-ready learning
          </p>
          <p className="mt-5 max-w-3xl text-[18px] leading-relaxed text-slate">
            At Bal Vatika – I, our Olympiad is a joyful first step towards learning beyond the
            classroom. Designed for our 3-year-old little learners, it encourages curiosity,
            observation, thinking, and confidence through fun and age-appropriate examination.
          </p>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-slate">
            We believe every child is naturally curious — and our aim is to nurture that
            curiosity, one little discovery at a time.
          </p>
          <div className="mt-6 flex justify-center max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-brand-soft px-5 py-2.5 text-md font-bold text-brand shadow-sm">
              <Clock className="h-4 w-4" />
              Flexible exam window
            </div>
          </div>
        </div>
      </section>

      {/* Sticky tab navigation */}
      <div className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition hover:border-brand hover:text-brand hover:bg-brand-soft"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <section
        id="subject-section"
        className="relative overflow-hidden scroll-mt-20"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
              01
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Subject
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {SUBJECTS.map((s, i) => {
              const gradients = [
                "linear-gradient(135deg,#f472b6 0%,#fb923c 100%)",
                "linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)",
                "linear-gradient(135deg,#4ade80 0%,#facc15 100%)",
                "linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)",
              ];
              const grad = gradients[i % gradients.length];
              return (
                <div
                  key={s.subject}
                  className="rounded-2xl px-5 py-4 text-center text-white shadow-soft transition hover:-translate-y-1"
                  style={{ backgroundImage: grad }}
                >
                  <p className="font-display text-lg font-extrabold">{s.subject}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subject / Curriculum accordion */}
      <section
        id="curriculum-section"
        className="relative overflow-hidden scroll-mt-20"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
              02
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Curriculum
            </h2>
          </div>
          <p className="ml-12 mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate">
            Subject-wise <span className="text-brand">curriculum</span>
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {SUBJECTS.map((s, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={s.subject}
                  className={`rounded-2xl border border-line transition ${isOpen ? "bg-white shadow-soft" : "bg-white/60"
                    }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className={`font-display text-lg font-extrabold ${isOpen ? "text-brand" : "text-ink"}`}>
                      {s.subject}
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${isOpen ? "bg-orange-500 text-white" : "bg-white text-slate ring-1 ring-line"
                        }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="grid gap-6 border-t border-line px-5 py-5 md:grid-cols-2">
                      {/* Subject */}
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                          Subject
                        </p>
                        <p className="mt-2 text-[15px] font-bold text-ink">{s.subject}</p>
                        <p className="mt-1 text-sm text-slate">
                          {s.units.length} unit{s.units.length !== 1 ? "s" : ""} in this subject
                        </p>
                      </div>

                      {/* Curriculum */}
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                          Curriculum
                        </p>
                        <div className="mt-2 flex flex-col gap-3">
                          {s.units.map((u) => (
                            <div key={u.title}>
                              <p className="text-sm font-bold text-brand">{u.title}</p>
                              {u.items.length > 0 && (
                                <ul className="mt-1 list-disc pl-4 text-sm leading-relaxed text-slate">
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Paper accordion */}
      <section
        id="sample-paper-section"
        className="relative overflow-hidden scroll-mt-20"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#f0f9ff 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
              03
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Sample Paper
            </h2>
          </div>
          <p className="ml-12 mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate">
            Subject-wise <span className="text-brand">sample papers</span>
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {SUBJECTS.map((s, i) => {
              const isOpen = openSampleIndex === i;
              return (
                <div
                  key={s.subject}
                  className={`rounded-2xl border border-line transition ${isOpen ? "bg-white shadow-soft" : "bg-white/60"
                    }`}
                >
                  <button
                    onClick={() => setOpenSampleIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className={`font-display text-lg font-extrabold ${isOpen ? "text-brand" : "text-ink"}`}>
                      {s.subject}
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${isOpen ? "bg-orange-500 text-white" : "bg-white text-slate ring-1 ring-line"
                        }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-line px-5 py-5">
                      <Link
                        href={s.sampleHref}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:opacity-90"
                      >
                        <Download className="h-4 w-4" /> Download {s.subject} Sample Paper
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full syllabus */}
      <section
        id="syllabus-section"
        className="relative overflow-hidden scroll-mt-20"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fff7ed 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
                04
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                  Complete Syllabus
                </h2>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate">
                  Bal Vatika – I · Olympiad Syllabus
                </p>
              </div>
            </div>
            <a
              href={SYLLABUS_PDF_HREF}
              download
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:opacity-90"
            >
              <Download className="h-4 w-4" /> Download Syllabus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}