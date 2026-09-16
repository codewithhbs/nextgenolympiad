"use client";
import { useState, useEffect } from "react";
import {
  Star, Quote, ThumbsUp, ChevronUp, ChevronDown,
  HelpCircle, ClipboardCheck, BookOpen, Coffee, Leaf, MessageSquareText, Sparkles,
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

const FAQ_GRADIENTS = [
  "linear-gradient(135deg,#f472b6 0%,#fb923c 100%)",
  "linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)",
  "linear-gradient(135deg,#4ade80 0%,#facc15 100%)",
  "linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)",
  "linear-gradient(135deg,#fb7185 0%,#fbbf24 100%)",
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
        <Quote className="pointer-events-none absolute left-[6%] top-6 h-16 w-16 rotate-180 text-ink/10" aria-hidden />
        <span className="pointer-events-none absolute right-[10%] top-10 h-6 w-6 rounded-full border-2 border-ink/10" aria-hidden />
        <span className="pointer-events-none absolute left-[4%] bottom-16 h-5 w-5 rounded-full border-2 border-ink/10" aria-hidden />
        <Star className="pointer-events-none absolute left-[8%] top-1/2 h-4 w-4 text-[var(--brand)]/25" aria-hidden />
        <Star className="pointer-events-none absolute right-[16%] top-6 h-4 w-4 text-[var(--brand)]/25" aria-hidden />
        <Star className="pointer-events-none absolute right-[6%] bottom-20 h-4 w-4 text-cherry/20" aria-hidden />

        <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 rotate-[-8deg] rounded-2xl bg-[var(--brand)] p-2.5 text-white shadow-soft sm:block">
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
              <span className="h-1 w-8 rounded-full bg-[var(--brand)]" />
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

          <div className="mt-8 flex justify-center gap-2">
            {T.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-[var(--brand)]" : "w-2 bg-ink/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ — redesigned, colorful ============ */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{ backgroundImage: "linear-gradient(160deg,#eef2ff 0%,#fdf2f8 50%,#fff7ed 100%)" }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <Sparkles className="pointer-events-none absolute right-[12%] top-10 h-6 w-6 text-saffron/40" aria-hidden />
        <Sparkles className="pointer-events-none absolute left-[10%] bottom-16 h-5 w-5 text-[var(--brand)]/30" aria-hidden />

        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-saffron shadow-sm">
              <HelpCircle className="h-4 w-4" /> Got Questions?
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              Quick answers for parents, schools and curious little minds.
            </p>
            <div className="mt-3 flex justify-center gap-1.5">
              <span className="h-1 w-10 rounded-full bg-[var(--brand)]" />
              <span className="h-1 w-6 rounded-full bg-leaf" />
              <span className="h-1 w-4 rounded-full bg-saffron" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {F.map((f, i) => {
              const isOpen = open === i;
              const grad = FAQ_GRADIENTS[i % FAQ_GRADIENTS.length];
              return (
                <div
                  key={f._id || i}
                  className={`overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-all duration-300 ${isOpen ? "shadow-soft" : ""}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-sm transition-transform duration-300"
                      style={{ backgroundImage: grad, transform: isOpen ? "rotate(6deg) scale(1.05)" : "none" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-bold text-ink">{f.question}</span>
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300"
                      style={{ backgroundImage: grad, transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 pl-[4.75rem] sm:px-6 sm:pl-[5.25rem]">
                      <p className="text-sm leading-relaxed text-ink-soft">{f.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-ink/5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf/10 text-leaf">
              <MessageSquareText className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-ink">Still have questions?</p>
              <p className="text-xs text-ink-soft">We reply within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}