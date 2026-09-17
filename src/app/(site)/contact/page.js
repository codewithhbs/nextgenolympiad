import ContactForm from "@/components/site/ContactForm";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
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

const CARD_GRADIENTS = [
  "linear-gradient(135deg,#f472b6 0%,#fb923c 100%)",
  "linear-gradient(135deg,#60a5fa 0%,#22d3ee 100%)",
  "linear-gradient(135deg,#4ade80 0%,#facc15 100%)",
];

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
      <section
        className="relative overflow-hidden py-20"
        style={{ backgroundImage: "linear-gradient(160deg,#fff1f2 0%,#eef2ff 50%,#f0fdf4 100%)" }}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
        <Sparkles className="pointer-events-none absolute left-[12%] top-10 h-6 w-6 text-saffron/40" aria-hidden />
        <Sparkles className="pointer-events-none absolute right-[15%] bottom-8 h-5 w-5 text-brand/30" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-ink md:text-5xl">We&apos;d Love to Hear From You</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Questions about registration or the olympiad? Send us a message.</p>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-16"
        style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fefce8 50%,#ffffff 100%)" }}
      >
        <div className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="space-y-4 md:col-span-2">
              {cards.map((card, i) => (
                <div
                  key={card.label}
                  className="group relative overflow-hidden rounded-2xl p-5 text-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                  style={{ backgroundImage: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
                >
                  <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/80">{card.label}</div>
                      {card.href ? (
                        <a href={card.href} className="font-semibold text-white hover:underline">{card.value}</a>
                      ) : (
                        <div className="font-semibold text-white">{card.value}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-line md:col-span-3">
              <h2 className="mb-5 text-2xl font-extrabold text-ink">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}