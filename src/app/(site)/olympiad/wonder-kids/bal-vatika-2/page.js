"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Clock, Download, FileText } from "lucide-react";

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
    sampleHref: "#",
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
    sampleHref: "#",
    units: [
      { title: "Curriculum", items: ["Curriculum to be added soon"] },
    ],
  },
];

const SYLLABUS_PDF_HREF = "/downloads/balvatika-2-syllabus.pdf";

export default function Page() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Hero */}
      <section className="border-b border-line pb-10">
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
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
          <Clock className="h-4 w-4" /> Flexible exam window
        </div>
      </section>

      {/* Subject / Curriculum / Sample Paper accordion */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2545] text-sm font-extrabold text-white">
            01
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
                className={`rounded-2xl border border-line transition ${
                  isOpen ? "bg-white shadow-soft" : "bg-slate-50/60"
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
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      isOpen ? "bg-orange-500 text-white" : "bg-white text-slate ring-1 ring-line"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="grid gap-6 border-t border-line px-5 py-5 md:grid-cols-3">
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

                    {/* Sample Paper */}
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                        Sample Paper
                      </p>
                      <Link
                        href={s.sampleHref}
                        className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
                      >
                        <FileText className="h-4 w-4" /> {s.subject} Sample Paper
                      </Link>
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
              02
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                Complete Syllabus
              </h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate">
                Bal Vatika – II · Olympiad Syllabus
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

        <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8">
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
        </div>
      </section>
    </div>
  );
}