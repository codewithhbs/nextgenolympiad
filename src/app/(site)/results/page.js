import ResultLookup from "@/components/site/ResultLookup";
import { Search, FileCheck2, Trophy } from "lucide-react";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Check Results • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Check your NextGen Olympiad result instantly using your student code. View marks, percentage, rank and medal for session 2026-27.",
    keywords: ["nextgen olympiad result", "olympiad result check", "student code result"],
    path: "/results",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

const steps = [
  { icon: Search, title: "Enter code", text: "Type the unique student code printed on the hall ticket." },
  { icon: FileCheck2, title: "View scorecard", text: "Instantly see subject-wise marks and percentage." },
  { icon: Trophy, title: "Rank & medal", text: "Check the rank achieved and any medal awarded." },
];

export default function ResultsPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative bg-sky py-20">
        {/* <div className="blob right-[-6rem] top-[-4rem] h-72 w-72 bg-leaf/20" /> */}
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="mb-3 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-leaf shadow-soft">Results 2026-27</span>
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">Check your olympiad result</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Enter your student code below to view your scorecard instantly.</p>
        </div>
      </section>

    
        <ResultLookup />


      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-white p-7 text-center shadow-card">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-soft text-saffron">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-saffron">STEP {i + 1}</div>
              <h3 className="mt-1 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-soft">
          Schools can view and download all student results from the school dashboard after logging in.
        </p>
      </section>
    </div>
  );
}
