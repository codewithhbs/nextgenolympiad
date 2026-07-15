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

// Strips BSON types (ObjectId, Date) down to plain JSON-safe values.
// Required before passing Mongoose `.lean()` docs into a Client Component —
// RSC only accepts plain objects/arrays/strings/numbers across the boundary.
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
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <Badge tone="gold">Our Moments</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Learning in action</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate">Children participating in activities, competitions and joyful learning across our partner schools.</p>
          <CrestDivider className="mt-6" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImgs.slice(0, 8).map((g, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-line shadow-card">
              <Image src={g.src} alt={g.alt} fill className="object-contain transition duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><Link href="/gallery"><Button variant="outline">View full gallery</Button></Link></div>
      </section>

      <TestimonialAndFaq faqs={faqs} testimonials={testimonials} />
      <Cta />
    </>
  );
}