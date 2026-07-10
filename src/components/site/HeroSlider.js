"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Trophy, Brain, Globe, ShieldCheck } from "lucide-react";

const DEFAULT_SLIDES = [
  { image: "/brand/hero-scene.png", kicker: "National-Level Olympiad · 2026–27", title: "Learn. Compete. Excel.", subtitle: "A national-level Olympiad for Classes I–X and Wonder Kids (Bal Vatika I–III), designed to reward reasoning over rote.", ctaText: "Register Your School", ctaHref: "/apply" },
  { image: "/gallery/activity-1.jpg", kicker: "Benchmark, not just rank", title: "Every child competes with their own best self.", subtitle: "Detailed Student Progress Reports show what learners know, where the gaps are, and how they grow.", ctaText: "How It Works", ctaHref: "/about" },
  { image: "/gallery/activity-5.jpg", kicker: "Wonder Kids Olympiad", title: "Joyful, play-based learning for early years.", subtitle: "Aligned with NEP 2020, Wonder Kids gently introduces Bal Vatika learners to structured thinking.", ctaText: "Explore Wonder Kids", ctaHref: "/about" },
];

const PILLARS = [
  { icon: Globe, label: "National level" },
  { icon: ShieldCheck, label: "Secure & fair" },
  { icon: Brain, label: "Application-based" },
  { icon: Trophy, label: "Awards for all" },
];

function useCarousel(n, ms = 6000) {
  const [i, setI] = useState(0);
  const go = useCallback((d) => setI((p) => (p + d + n) % n), [n]);
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return { i, setI, go };
}

function Dots({ data, i, setI }) {
  if (data.length < 2) return null;
  return (
    <div className="relative flex justify-center gap-2 pb-6 pt-4">
      {data.map((_, idx) => (
        <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
          className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"}`} />
      ))}
    </div>
  );
}

// BANNER-ONLY mode: full-width image slides, no text overlay panel.
function BannerHero({ data }) {
  const { i, setI, go } = useCarousel(data.length);
  return (
    <section className="relative bg-navy-deep">
      <div className="relative mx-auto ">
        <div className="relative aspect-[16/6] w-full overflow-hidden sm:aspect-[16/6]">
          {data.map((s, idx) => {
            const img = (
              <Image key={idx} src={s.image} alt={s.title || "Banner"} fill priority={idx === 0}
                className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`} />
            );
            return s.ctaHref ? (
              <Link key={idx} href={s.ctaHref} className={`absolute inset-0 ${idx === i ? "z-10" : "z-0"}`}>{img}</Link>
            ) : img;
          })}
          {data.length > 1 && (
            <>
              <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-navy shadow-soft hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-navy shadow-soft hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// BANNER + CONTENT mode: split layout with headline, CTA, pillars.
function ContentHero({ data }) {
  const { i, setI, go } = useCarousel(data.length);
  const s = data[i];
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-navy/60 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-16">
        <div key={i} className="animate-slide-fade">
          {s.kicker && <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">{s.kicker}</span>}
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] md:text-5xl">{s.title}</h1>
          {s.subtitle && <p className="mt-5 max-w-xl text-lg text-white/75">{s.subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={s.ctaHref || "/apply"} className="inline-flex items-center gap-3 rounded-full bg-gold py-3 pl-6 pr-2 font-bold text-navy-deep shadow-gold transition hover:-translate-y-0.5 hover:bg-white">
              {s.ctaText || "Register"}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep/15"><ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link href="/results" className="inline-flex items-center rounded-full border-2 border-white/25 px-7 py-3 font-bold text-white transition hover:bg-white/10">Check Results</Link>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2 sm:items-start">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold"><p.icon className="h-5 w-5" /></span>
                <span className="text-center text-xs font-semibold text-white/70 sm:text-left">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-soft">
            {data.map((slide, idx) => (
              <Image key={idx} src={slide.image} alt={slide.title || "slide"} fill priority={idx === 0}
                className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`} />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
          </div>
          {data.length > 1 && (
            <>
              <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-navy shadow-soft hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-navy shadow-soft hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </>
          )}
        </div>
      </div>
      <Dots data={data} i={i} setI={setI} />
    </section>
  );
}

// mode: "banner" (image only) | "content" (banner + text). Defaults to content.
export default function HeroSlider({ slides, mode }) {
  const data = slides?.length ? slides : DEFAULT_SLIDES;
  return mode === "banner" ? <BannerHero data={data} /> : <ContentHero data={data} />;
}
