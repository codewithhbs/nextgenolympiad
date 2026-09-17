import Link from "next/link";
import Image from "next/image";
import { Camera, Heart, Sparkles, Star, Images, ArrowRight, Smile, PartyPopper } from "lucide-react";
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

/* ================= gallery styling ================= */
const GALLERY_CSS = `
@keyframes gl-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes gl-flash{0%,85%,100%{transform:scale(1)}90%{transform:scale(1.2)}}
@keyframes gl-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}45%{transform:scale(1.12)}}
@keyframes gl-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes gl-wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}50%{transform:rotate(10deg)}75%{transform:rotate(-6deg)}}
@keyframes gl-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}}
@keyframes gl-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes gl-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes gl-marquee{to{transform:translateX(-50%)}}
@keyframes gl-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes gl-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.gl-float{animation:gl-float 3.2s ease-in-out infinite}
.gl-flash{animation:gl-flash 2.8s ease-in-out infinite}
.gl-beat{animation:gl-beat 1.6s ease-in-out infinite}
.gl-pop{animation:gl-pop 1.8s ease-in-out infinite}
.gl-wiggle{animation:gl-wiggle 2.4s ease-in-out infinite}
.gl-glow{animation:gl-glow 2s ease-in-out infinite}
.gl-shine{background-size:200% 100%;animation:gl-shine 3.5s linear infinite}
.gl-blob{animation:gl-blob 10s ease-in-out infinite}
.gl-marquee{animation:gl-marquee 40s linear infinite}
.gl-marquee-wrap:hover .gl-marquee{animation-play-state:paused}
.gl-nudge{animation:gl-nudge 1.2s ease-in-out infinite}
.gl-tile:hover .gl-sweep{animation:gl-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="gl-"]{animation:none!important}}
`;

const GALLERY_TONES = [
  { ring: "ring-pink-300", grad: "from-pink-500 to-rose-500", pin: "bg-pink-500" },
  { ring: "ring-sky-300", grad: "from-sky-500 to-indigo-500", pin: "bg-sky-500" },
  { ring: "ring-emerald-300", grad: "from-emerald-500 to-teal-500", pin: "bg-emerald-500" },
  { ring: "ring-amber-300", grad: "from-amber-400 to-orange-500", pin: "bg-amber-400" },
  { ring: "ring-violet-300", grad: "from-violet-500 to-fuchsia-500", pin: "bg-violet-500" },
  { ring: "ring-orange-300", grad: "from-orange-500 to-red-500", pin: "bg-orange-500" },
  { ring: "ring-cyan-300", grad: "from-cyan-500 to-blue-500", pin: "bg-cyan-500" },
  { ring: "ring-red-300", grad: "from-red-500 to-rose-600", pin: "bg-red-500" },
];

/* bento layout for up to 8 tiles (md+) */
const BENTO = [
  "col-span-2 row-span-2",
  "",
  "",
  "md:row-span-2",
  "",
  "col-span-2 md:col-span-1",
  "",
  "md:col-span-2",
];

const TILTS = ["md:-rotate-1", "md:rotate-1", "md:-rotate-2", "md:rotate-2"];

const GALLERY_CHIPS = [
  { t: "Competitions", icon: PartyPopper, anim: "gl-wiggle", grad: "from-red-500 to-rose-500" },
  { t: "Activities", icon: Smile, anim: "gl-pop", grad: "from-amber-400 to-orange-500" },
  { t: "Celebrations", icon: Heart, anim: "gl-beat", grad: "from-violet-500 to-fuchsia-500" },
];

function GallerySection({ images }) {
  const tiles = images.slice(0, 8);
  const strip = images.length ? [...images, ...images, ...images] : [];

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#fdf2f8 45%,#eff6ff 100%)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: GALLERY_CSS }} />

      {/* bg decor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="gl-blob absolute -left-24 top-0 h-96 w-96 bg-rose-300/30 blur-3xl" />
        <div className="gl-blob absolute -right-24 bottom-0 h-96 w-96 bg-sky-300/30 blur-3xl" />
        <div className="gl-blob absolute left-1/2 top-1/3 h-72 w-72 bg-amber-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}
        />
        <Star className="gl-pop absolute left-[6%] top-12 h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="gl-pop absolute right-[7%] top-20 h-3 w-3 fill-rose-400 text-rose-400" style={{ animationDelay: ".8s" }} />
        <Camera className="gl-float absolute right-[12%] top-10 hidden h-8 w-8 -rotate-12 text-sky-300 md:block" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* header */}
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:items-end lg:text-left">
          <div>
            <span className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(216,31,38,0.8)] ring-1 ring-rose-100 backdrop-blur">
              <span className="relative grid h-9 w-9 place-items-center rounded-full">
                <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" style={{ animationDuration: "2.6s" }} />
                <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white">
                  <Camera className="gl-flash h-4 w-4" />
                </span>
              </span>
              <span className="text-xl font-extrabold uppercase text-red-600 sm:text-3xl">Gallery</span>
              <Sparkles className="gl-glow h-4 w-4 text-amber-500" />
            </span>

            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Our{" "}
              <span className="gl-shine bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent">Moments</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
              Children participating in activities, competitions and joyful learning across our partner schools.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {GALLERY_CHIPS.map(({ t, icon: Icon, anim, grad }, i) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-black/5">
                <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${grad} text-white`}>
                  <Icon className={`h-4 w-4 ${anim}`} style={{ animationDelay: `${i * 0.3}s` }} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* bento grid */}
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[220px] lg:gap-5">
          {tiles.map((g, i) => {
            const tone = GALLERY_TONES[i % GALLERY_TONES.length];
            return (
              <div
                key={`${g.src}-${i}`}
                className={`gl-tile group relative overflow-hidden rounded-[1.6rem] bg-white p-1.5 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.6)] ring-2 ${tone.ring} transition duration-500 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_30px_60px_-28px_rgba(15,23,42,0.7)] ${BENTO[i] || ""} ${TILTS[i % TILTS.length]}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${tone.grad} opacity-0 mix-blend-multiply transition duration-500 group-hover:opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  {/* light sweep */}
                  <div className="gl-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  {/* caption */}
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between gap-2 p-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                    <span className="line-clamp-1 text-xs font-bold text-white sm:text-sm">{g.alt}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/90 text-rose-500">
                      <Heart className="gl-beat h-4 w-4 fill-rose-500" />
                    </span>
                  </div>
                </div>
                {/* pin */}
                <span className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/3 rounded-full border-2 border-white shadow ${tone.pin}`} />
              </div>
            );
          })}
        </div>

        {/* film strip marquee */}
        {strip.length > 0 && (
          <div className="gl-marquee-wrap relative mt-10 -rotate-1 overflow-hidden rounded-2xl bg-slate-900 py-3 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.9)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            {/* sprocket holes */}
            <div className="pointer-events-none absolute inset-x-0 top-1 flex justify-between px-2" aria-hidden>
              {Array.from({ length: 40 }).map((_, i) => <span key={i} className="h-1.5 w-2.5 rounded-sm bg-white/25" />)}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-between px-2" aria-hidden>
              {Array.from({ length: 40 }).map((_, i) => <span key={i} className="h-1.5 w-2.5 rounded-sm bg-white/25" />)}
            </div>
            <div className="gl-marquee flex w-max gap-3 py-2">
              {strip.map((g, i) => (
                <div key={i} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/20 sm:h-24 sm:w-36">
                  <Image src={g.src} alt="" aria-hidden fill sizes="144px" className="object-cover grayscale-[30%] transition hover:grayscale-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* cta */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-rose-500 py-3 pl-6 pr-2 font-bold text-white shadow-lg shadow-rose-400/40 transition hover:-translate-y-0.5"
          >
            <Images className="gl-pop h-5 w-5" />
            View full gallery
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400 text-slate-900">
              <ArrowRight className="gl-nudge h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [{ faqs, testimonials, gallery, schools, results }, settings] = await Promise.all([getData(), getSettings().catch(() => ({}))]);
  const galleryImgs = gallery.length
    ? gallery.map((g) => ({ src: g.image.url, alt: g.alt || "Activity" }))
    : FALLBACK_GALLERY.map((src) => ({ src, alt: "Students at a NextGen activity" }));

  return (
    <>
      <HeroSlider slides={settings?.heroSlides} mode={settings?.heroMode} />
      <About />
      <Stats schools={schools} results={results} />

      <Features />
      {/* <GuidesResources
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
      /> */}
      <QuizAndResult />

      <GallerySection images={galleryImgs} />

      <TestimonialAndFaq faqs={faqs} testimonials={testimonials} />
      <Cta />
    </>
  );
}