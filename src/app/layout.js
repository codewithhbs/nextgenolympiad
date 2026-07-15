import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { getSettings, buildMetadata, organizationSchema } from "@/lib/seo";
import { buildThemeCss, fontHref } from "@/lib/theme";

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
  const theme = settings?.theme || {};

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontHref(theme)} rel="stylesheet" />
        {/* Admin-controlled colors + type scale */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />
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
