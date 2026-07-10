import ContactForm from "@/components/site/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Contact Us • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Get in touch with NextGen Olympiad Foundation. Reach us for school registration, olympiad queries and support.",
    keywords: ["contact nextgen olympiad", "olympiad support", "school registration query"],
    path: "/contact",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

export default async function ContactPage() {
  let s = {};
  try { s = await getSettings(); } catch {}
  const c = s.contact || {};
  const cards = [
    { icon: Mail, label: "Email", value: c.email, href: c.email ? `mailto:${c.email}` : null },
    { icon: Phone, label: "Phone", value: c.phone, href: c.phone ? `tel:${c.phone}` : null },
    { icon: MapPin, label: "Address", value: c.address, href: null },
  ];
  return (
    <div className="overflow-hidden">
      <section className="relative bg-sky py-20">

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">We'd love to hear from you</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Questions about registration or the olympiad? Send us a message.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            {cards.map((card) => (
              <div key={card.label} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron-soft text-saffron">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-soft">{card.label}</div>
                  {card.href ? (
                    <a href={card.href} className="font-semibold text-ink hover:text-saffron">{card.value}</a>
                  ) : (
                    <div className="font-semibold text-ink">{card.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-card md:col-span-3">
            <h2 className="mb-5 text-2xl font-extrabold text-ink">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
