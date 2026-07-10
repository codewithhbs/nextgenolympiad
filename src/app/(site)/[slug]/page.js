import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Page from "@/models/Page";
import { getSettings, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function getPage(slug) {
  try {
    await connectDB();
    return JSON.parse(JSON.stringify(await Page.findOne({ slug, isPublished: true }).lean()));
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [p, s] = await Promise.all([getPage(slug), getSettings().catch(() => ({}))]);
  if (!p) return buildMetadata({ title: "Not found", path: `/${slug}`, noIndex: true, siteName: s.siteName });
  return buildMetadata({
    title: `${p.seo?.metaTitle || p.title} • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: p.seo?.metaDescription || p.title,
    keywords: p.seo?.keywords,
    image: p.seo?.ogImage || s.seoDefaults?.ogImage,
    path: `/${slug}`,
    noIndex: p.seo?.noIndex,
    siteName: s.siteName,
  });
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const p = await getPage(slug);
  if (!p) notFound();
  return (
    <div className="overflow-hidden">
      <section className="relative bg-sky py-16">
        <div className="blob right-[-6rem] top-[-4rem] h-64 w-64 bg-saffron/20" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">{p.title}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-14">
        {p.content ? (
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: p.content }} />
        ) : (
          <p className="text-center text-ink-soft">Content coming soon.</p>
        )}
      </article>
    </div>
  );
}
