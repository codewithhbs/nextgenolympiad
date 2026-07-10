import { Brain, Target, Trophy, Medal, BookOpen, Cpu, Calculator, Leaf, Globe } from "lucide-react";
import { Badge, CrestDivider } from "@/components/ui";

const CARDS = [
  { icon: Brain, title: "Conceptual Understanding", text: "Age-appropriate questions that build genuine clarity — application over rote." },
  { icon: Target, title: "Healthy Competition", text: "A confidence-building platform that celebrates effort at every level." },
  { icon: Trophy, title: "Rewards & Recognition", text: "Medals, certificates and special prizes for meritorious performers." },
  { icon: Medal, title: "National-Level Ranking", text: "School, zonal and national recognition backed by a decade of trust." },
];

const SUBJECTS = [
  { icon: BookOpen, label: "English" },
  { icon: Cpu, label: "Computational Thinking" },
  { icon: Calculator, label: "Mathematics" },
  { icon: Leaf, label: "EVS" },
  { icon: Globe, label: "STEM" },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-parchment py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <Badge tone="gold">Why NextGen</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy md:text-4xl">Built for young minds</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate">
            Every element of the NextGen Olympiad is designed to help students grow, compete and excel with confidence.
          </p>
          <CrestDivider className="mt-6" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <div key={c.title} className="group rounded-3xl border border-line bg-white p-7 shadow-card transition hover:-translate-y-1.5 hover:shadow-soft">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy">{c.title}</h3>
              <p className="mt-2 text-sm text-slate">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Subjects strip */}
        <div className="mt-12 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <div className="mb-5 text-center text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">Olympiad Subjects · Classes I–X</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SUBJECTS.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-ivory px-4 py-2 text-sm font-semibold text-navy">
                <s.icon className="h-4 w-4 text-gold-dark" /> {s.label}
              </span>
            ))}
          </div>
          <div className="mt-4 text-center text-xs text-slate">
            Wonder Kids (Bal Vatika I–III): English · Mathematics · EVS · Drawing · Hindi
          </div>
        </div>
      </div>
    </section>
  );
}
