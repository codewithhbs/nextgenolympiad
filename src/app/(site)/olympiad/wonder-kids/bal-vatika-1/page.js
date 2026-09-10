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
    sampleHref: "#",
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
    sampleHref: "#",
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

export default function Page() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Hero */}
      <section className="border-b border-line pb-10">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Bal Vatika – 1
        </h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
          Nurturing young minds for future-ready learning
        </p>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-slate">
          At Bal Vatika – 1, our Olympiad is a joyful first step towards learning beyond the
          classroom. Designed for our 3-year-old little learners, it encourages curiosity,
          observation, thinking, and confidence through fun and age-appropriate examination.
        </p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate">
          We believe every child is naturally curious — and our aim is to nurture that
          curiosity, one little discovery at a time.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
          <Clock className="h-4 w-4" /> Flexible exam window
        </div>
      </section>

      {/* Subject */}
      <section className="mt-14">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
            01
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
            Subject
          </h2>
        </div>
        <p className="ml-12 mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate">
          All <span className="text-brand">subjects covered</span>
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {SUBJECTS.map((s) => (
            <div
              key={s.subject}
              className="rounded-2xl border border-line bg-white px-5 py-4 text-center shadow-soft"
            >
              <p className="font-display text-lg font-extrabold text-brand">{s.subject}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subject / Curriculum / Sample Paper accordion */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
            02
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
            Curriculum
          </h2>
        </div>
        <p className="ml-12 mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate">
          Subject-wise <span className="text-brand">curriculum &amp; sample papers</span>
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {SUBJECTS.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={s.subject}
                className={`rounded-2xl border border-line transition ${isOpen ? "bg-white shadow-soft" : "bg-slate-50/60"
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
                  <div className="border-t border-line px-5 py-5">
                    {/* Curriculum */}
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                        Curriculum
                      </p>
                      <div className="mt-3 grid gap-x-8 gap-y-4 md:grid-cols-2">
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
      </section>

      {/* Full syllabus */}
      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
              03
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                Complete Syllabus
              </h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate">
                Bal Vatika – 1 · Olympiad Syllabus
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

        {/* <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {SUBJECTS.map((s) => (
              <div key={s.subject}>
                <h3 className="font-display text-lg font-extrabold text-brand">{s.subject}</h3>
                <div className="mt-3 flex flex-col gap-3">
                  {s.units.map((u) => (
                    <div key={u.title}>
                      <p className="text-sm font-bold text-ink">{u.title}</p>
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
            ))}
          </div>
        </div> */}
      </section>
    </div>
  );
}