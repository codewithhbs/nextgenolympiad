"use client";
import { useState, useEffect } from "react";
import {
  Star, Quote, ThumbsUp, ChevronUp, ChevronDown,
  HelpCircle, ClipboardCheck, BookOpen, Coffee, Leaf, MessageSquareText,
} from "lucide-react";

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

export default function TestimonialAndFaq({ testimonials, faqs }) {
  const T = (testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS).slice(0, 3);
  const F = faqs?.length ? faqs : DEFAULT_FAQS;

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % T.length), 4000);
    return () => clearInterval(t);
  }, [T.length]);

  const [open, setOpen] = useState(0);

  return (
    <div>
      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky to-cloud py-16 md:py-20">
        {/* faint corner quote + dots + stars */}
        <Quote className="pointer-events-none absolute left-[6%] top-6 h-16 w-16 rotate-180 text-ink/10" aria-hidden />
        <span className="pointer-events-none absolute right-[10%] top-10 h-6 w-6 rounded-full border-2 border-ink/10" aria-hidden />
        <span className="pointer-events-none absolute left-[4%] bottom-16 h-5 w-5 rounded-full border-2 border-ink/10" aria-hidden />
        <Star className="pointer-events-none absolute left-[8%] top-1/2 h-4 w-4 text-[#2f6bff]/25" aria-hidden />
        <Star className="pointer-events-none absolute right-[16%] top-6 h-4 w-4 text-[#2f6bff]/25" aria-hidden />
        <Star className="pointer-events-none absolute right-[6%] bottom-20 h-4 w-4 text-cherry/20" aria-hidden />

        {/* floating badge icons */}
        <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 rotate-[-8deg] rounded-2xl bg-[#2f6bff] p-2.5 text-white shadow-soft sm:block">
          <ThumbsUp className="h-5 w-5" />
        </div>
        <div className="pointer-events-none absolute right-4 top-8 hidden rotate-[8deg] rounded-2xl bg-leaf p-2.5 text-white shadow-soft sm:block">
          <Star className="h-5 w-5 fill-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-leaf/10 px-4 py-1.5 text-sm font-bold text-leaf">Loved by educators</span>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">What schools say</h2>
            <div className="mt-3 flex justify-center gap-1.5">
              <span className="h-1 w-8 rounded-full bg-[#2f6bff]" />
              <span className="h-1 w-5 rounded-full bg-leaf" />
              <span className="h-1 w-3 rounded-full bg-saffron" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {T.map((t, i) => (
              <div key={t._id || i} className="relative rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
                <Quote className="pointer-events-none absolute right-5 top-5 h-8 w-8 text-ink/5" aria-hidden />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating || 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-saffron text-saffron" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-ink/5 pt-4">
                  {t.avatar?.url ? (
                    <img src={t.avatar.url} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-sm font-black text-white">
                      {t.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.role}{t.school ? ` · ${t.school}` : ""}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* pagination dots */}
          <div className="mt-8 flex justify-center gap-2">
            {T.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-[#2f6bff]" : "w-2 bg-ink/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative overflow-hidden bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[380px_1fr]">
            {/* LEFT — heading + icon-collage illustration */}
            <div>
              <span className="inline-block rounded-full bg-saffron-soft px-4 py-1.5 text-sm font-bold text-saffron">Queries</span>
              <h2 className="mt-3 text-3xl font-black leading-tight text-ink md:text-4xl">Frequently asked</h2>
              <div className="mt-3 flex gap-1.5">
                <span className="h-1 w-10 rounded-full bg-[#2f6bff]" />
                <span className="h-1 w-6 rounded-full bg-leaf" />
                <span className="h-1 w-4 rounded-full bg-saffron" />
              </div>
              <p className="mt-4 max-w-sm text-ink-soft">
                Can&apos;t find what you&apos;re looking for? Reach out and our team will help right away.
              </p>

              {/* clean illustration: centered medallion + orbiting chips */}
              <div className="relative mt-10 hidden h-64 w-full lg:block">
                {/* soft gradient blob backdrop */}
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#2f6bff]/10 via-leaf/10 to-saffron/10 blur-xl" aria-hidden />
                {/* dashed orbit ring */}
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/10" aria-hidden />

                {/* centerpiece */}
                <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-ink/5">
                  <HelpCircle className="h-11 w-11 text-[#2f6bff]" strokeWidth={1.75} />
                </div>

                {/* orbiting chips, evenly spaced */}
                <div className="absolute left-1/2 top-2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-leaf text-white shadow-soft">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#2f6bff] text-white shadow-soft">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="absolute bottom-2 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl bg-saffron text-white shadow-soft">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <div className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-cherry shadow-soft ring-1 ring-ink/5">
                  <Coffee className="h-5 w-5" />
                </div>

                {/* mini support card, bottom-anchored */}
                <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-ink/5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                    <Leaf className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">Still have questions?</p>
                    <p className="text-[11px] text-ink-soft">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — accordion, first item open by default (matches reference) */}
            <div className="rounded-3xl bg-white p-3 shadow-card ring-1 ring-ink/5 sm:p-5">
              {F.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f._id || i} className={i !== F.length - 1 ? "border-b border-ink/5" : ""}>
                    <button onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-3 py-5 text-left sm:px-4">
                      <span className="font-bold text-ink">{f.question}</span>
                      <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-saffron text-white" : "text-saffron"}`}>
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-3 pb-5 text-sm leading-relaxed text-ink-soft sm:px-4">{f.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}