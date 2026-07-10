import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { getSettings, buildMetadata, organizationSchema } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  const d = s?.seoDefaults || {};
  return buildMetadata({
    title: { default: d.metaTitle || "NextGen Olympiad Foundation", template: `%s · ${s?.siteName || "NextGen Olympiad"}` },
    description: d.metaDescription || "National level Olympiad for Classes I–X and Wonder Kids for Bal Vatika.",
    keywords: d.keywords, image: d.ogImage, siteName: s?.siteName,
  });
}

export default async function RootLayout({ children }) {
  let settings = {};
  try { settings = await getSettings(); } catch {}
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(settings)) }} />
        {settings?.integrations?.googleAnalytics && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.integrations.googleAnalytics}`} />
        )}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
