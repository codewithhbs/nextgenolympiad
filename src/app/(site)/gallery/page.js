import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { getSettings, buildMetadata } from "@/lib/seo";
import GalleryView from "@/components/site/GalleryView";

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
    const rows = await Gallery.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(rows));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getItems();
  return <GalleryView items={items} />;
}