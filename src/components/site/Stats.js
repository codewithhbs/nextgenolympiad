import { GraduationCap, Target, ShieldCheck, Sparkles } from "lucide-react";

const PILLARS = [
  { icon: GraduationCap, title: "For Classes I–X", text: "Age-appropriate assessment, Bal Vatika to Class 10." },
  { icon: Target, title: "Benchmark, Not Rank", text: "Students grow against their own past self." },
  { icon: ShieldCheck, title: "All Boards Welcome", text: "One consistent standard across every board." },
  { icon: Sparkles, title: "9+ Subjects", text: "From core academics to computational thinking." },
];

const GRADIENTS = [
  "linear-gradient(135deg,#f472b6 0%,#fb923c 100%)",
  "linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)",
  "linear-gradient(135deg,#4ade80 0%,#facc15 100%)",
  "linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)",
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-3xl p-5 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-6"
            style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
          >
            <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl transition-transform duration-500 group-hover:scale-125" />
            <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur sm:h-12 sm:w-12">
              <p.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="relative mt-3 font-display text-base font-extrabold text-white sm:text-lg">{p.title}</p>
            <p className="relative mt-1 text-[11px] font-medium leading-snug text-white/90 sm:text-xs">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}