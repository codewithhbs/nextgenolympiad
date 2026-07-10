import { connectDB } from "./db";
import Settings from "@/models/Settings";

export async function getSettings() {
  await connectDB();
  let s = await Settings.findOne({ key: "global" }).lean();
  if (!s) s = (await Settings.create({ key: "global" })).toObject();
  return s;
}

export function buildMetadata({ title, description, keywords, image, path = "/", noIndex = false, siteName }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}${path}`;
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(base),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title, description, url, siteName, type: "website", images: image ? [{ url: image }] : [] },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
  };
}

export function organizationSchema(settings) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings?.siteName || "NextGen Olympiad Foundation",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    email: settings?.contact?.email,
    telephone: settings?.contact?.phone,
    address: { "@type": "PostalAddress", streetAddress: settings?.contact?.address, addressCountry: "IN" },
  };
}
