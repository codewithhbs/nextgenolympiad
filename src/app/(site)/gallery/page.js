import GalleryGrid from "@/components/site/GalleryGrid";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { getSettings, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Gallery • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Moments from NextGen Olympiad events, felicitations and school activities.",
    keywords: ["nextgen olympiad gallery", "olympiad photos", "prize distribution"],
    path: "/gallery",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

async function getItems() {
  try {
    await connectDB();
    return JSON.parse(JSON.stringify(await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean()));
  } catch { return []; }
}

export default async function GalleryPage() {
  const items = await getItems();
  return (
    <div className="overflow-hidden">
      <section className="relative bg-sky py-20">
      
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">Our gallery</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Glimpses of curiosity, celebration and achievement.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        {items.length ? (
          <GalleryGrid items={items} />
        ) : (
          <p className="py-10 text-center text-ink-soft">Gallery images will appear here soon.</p>
        )}
      </section>
    </div>
  );
}
