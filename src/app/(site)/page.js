import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Faq from "@/models/Faq";
import Testimonial from "@/models/Testimonial";
import Gallery from "@/models/Gallery";
import School from "@/models/School";
import Result from "@/models/Result";
import { Button, Badge, CrestDivider } from "@/components/ui";
import { getSettings } from "@/lib/seo";

import HeroSlider from "@/components/site/HeroSlider";
import Stats from "@/components/site/Stats";
import About from "@/components/site/About";
import Features from "@/components/site/Features";
import QuizAndResult from "@/components/site/QuizAndResult";
import TestimonialAndFaq from "@/components/site/Testinomial&Faq";
import Cta from "@/components/site/Cta";
import GuidesResources from "@/components/site/Guidesresources";

function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

async function getData() {
  try {
    await connectDB();
    const [faqs, testimonials, gallery, schools, results] = await Promise.all([
      Faq.find({ isActive: true }).sort({ order: 1 }).limit(6).lean(),
      Testimonial.find({ isActive: true }).sort({ order: 1 }).limit(6).lean(),
      Gallery.find({ isActive: true }).sort({ order: 1 }).limit(10).lean(),
      School.countDocuments({ status: "approved" }),
      Result.countDocuments(),
    ]);
    return {
      faqs: serialize(faqs),
      testimonials: serialize(testimonials),
      gallery: serialize(gallery),
      schools,
      results,
    };
  } catch {
    return { faqs: [], testimonials: [], gallery: [], schools: 0, results: 0 };
  }
}

const FALLBACK_GALLERY = [
  "/gallery/activity-1.jpg", "/gallery/activity-2.jpg", "/gallery/activity-3.jpg",
  "/gallery/activity-4.jpg", "/gallery/activity-5.jpg", "/gallery/activity-6.jpg",
];

const GALLERY_ACCENTS = [
  "#f472b6", "#60a5fa", "#4ade80", "#facc15", "#a78bfa", "#fb923c", "#22d3ee", "#f87171",
];

export default async function Home() {
  const [{ faqs, testimonials, gallery, schools, results }, settings] = await Promise.all([getData(), getSettings().catch(() => ({}))]);
  const galleryImgs = gallery.length ? gallery.map((g) => ({ src: g.image.url, alt: g.alt || "Activity" })) : FALLBACK_GALLERY.map((src) => ({ src, alt: "Students at a NextGen activity" }));

  return (
    <>
      <HeroSlider slides={settings?.heroSlides} mode={settings?.heroMode} />
      <About />
      <Stats schools={schools} results={results} />

      <Features />
      <GuidesResources
        slides={[
          {
            tag: "Guide",
            title: "How to Fill OMR Sheet",
            description: "Learn the correct way to fill OMR Sheet and avoid common mistakes.",
            image: "https://res.cloudinary.com/dkl7kgcbb/image/upload/v1784008279/nextgen/media/ubfb8rygewykbgztoyuy.jpg",
            videoUrl: "https://www.youtube.com/watch?v=REAL_ID",
            thumbnail: "https://res.cloudinary.com/dkl7kgcbb/image/upload/.../thumb.jpg",
          },
        ]}
      />
      <QuizAndResult />

      {/* GALLERY */}
      <section
        className="relative overflow-hidden py-16 md:px-6"
        style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#fdf2f8 45%,#eff6ff 100%)" }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge tone="gold">Our Moments</Badge>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Learning in action</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate">Children participating in activities, competitions and joyful learning across our partner schools.</p>
            <CrestDivider className="mt-6" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImgs.slice(0, 8).map((g, i) => {
              const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];
              const accent = GALLERY_ACCENTS[i % GALLERY_ACCENTS.length];
              return (
                <div
                  key={i}
                  className={`group relative aspect-square overflow-hidden rounded-3xl bg-white p-1.5 shadow-card transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-soft ${rotations[i % rotations.length]}`}
                  style={{ boxShadow: `0 0 0 3px ${accent}33` }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image src={g.src} alt={g.alt} fill className="object-cover transition duration-300 group-hover:scale-110" />
                  </div>
                  <span
                    className="absolute -right-1.5 -top-1.5 h-6 w-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center"><Link href="/gallery"><Button variant="outline">View full gallery</Button></Link></div>
        </div>
      </section>

      <TestimonialAndFaq faqs={faqs} testimonials={testimonials} />
      <Cta />
    </>
  );
}