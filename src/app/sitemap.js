import { connectDB } from "@/lib/db";
import Page from "@/models/Page";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/about", "/quiz", "/results", "/contact", "/gallery", "/faq"].map((p) => ({
    url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly", priority: p === "" ? 1 : 0.7,
  }));
  let dynamic = [];
  try {
    await connectDB();
    const pages = await Page.find({ isPublished: true }).select("slug updatedAt").lean();
    dynamic = pages.map((pg) => ({ url: `${base}/${pg.slug}`, lastModified: pg.updatedAt, priority: 0.5 }));
  } catch {}
  return [...staticRoutes, ...dynamic];
}
