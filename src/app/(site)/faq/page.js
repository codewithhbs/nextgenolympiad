import FaqAccordion from "@/components/site/FaqAccordion";
import { connectDB } from "@/lib/db";
import Faq from "@/models/Faq";
import { getSettings, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `FAQs • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Frequently asked questions about NextGen Olympiad registration, exam pattern, results and certificates.",
    keywords: ["nextgen olympiad faq", "olympiad questions", "olympiad registration help"],
    path: "/faq",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

async function getItems() {
  try {
    await connectDB();
    return JSON.parse(JSON.stringify(await Faq.find({ isActive: true }).sort({ order: 1 }).lean()));
  } catch { return []; }
}

export default async function FaqPage() {
  const items = await getItems();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <div className="overflow-hidden">
      {items.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <section className="relative bg-sky py-20">
        <div className="blob left-[-6rem] top-[-4rem] h-72 w-72 bg-grape/20" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">Frequently asked questions</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Everything you need to know about our olympiads.</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16">
        {items.length ? (
          <FaqAccordion items={items} />
        ) : (
          <p className="py-10 text-center text-ink-soft">FAQs will be added soon.</p>
        )}
      </section>
    </div>
  );
}
