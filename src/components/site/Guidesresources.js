"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const NAVY = "var(--brand-deep)";
const GOLD = "var(--gold)";

const ICONS = {
    doc: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
            <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
    ),
    pen: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
        </svg>
    ),
    plane: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M21 3 3 10.5l6 2.5 2.5 6L21 3Z" />
            <path d="m9 13 4-4" />
        </svg>
    ),
    ticket: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" />
            <path d="M14 6v12" />
        </svg>
    ),
};

const embed = (url = "") =>
    url
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("/shorts/", "/embed/");

export default function GuidesResources({
    eyebrow = "Explore & Learn",
    title = "Important Guides & Resources",
    subtitle = "Everything you need to know about the Olympiad.",
    slides = [],
    videosEyebrow = "Learn & Prepare",
    videosTitle = "Instructional Videos",
    videosSubtitle = "Step-by-step guidance to help you understand and use our platform effectively.",
    videos = [],
    onViewAll,
    viewAllHref = "/resources",
}) {
    const list = useMemo(() => slides.filter(Boolean), [slides]);
    const [i, setI] = useState(0);
    const [player, setPlayer] = useState(null);

    const n = list.length;
    const next = useCallback(() => setI((p) => (n ? (p + 1) % n : 0)), [n]);
    const prev = useCallback(() => setI((p) => (n ? (p - 1 + n) % n : 0)), [n]);

    useEffect(() => {
        if (n < 2 || player) return;
        const t = setInterval(next, 6000);
        return () => clearInterval(t);
    }, [n, next, player]);

    useEffect(() => {
        if (!player) return;
        const onKey = (e) => e.key === "Escape" && setPlayer(null);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [player]);

    const s = list[i];
    const ok = (u) => typeof u === "string" && /^(https?:\/\/|\/)/.test(u) && !u.includes("...");
    return (
        <div className="bg-white">
            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-4 pt-16 text-center">
                <p className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--gold)]">
                    <span aria-hidden>→</span>
                    {eyebrow}
                    <span aria-hidden>←</span>
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-[var(--brand-deep)] md:text-4xl">{title}</h2>
                <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            </section>

            {/* CAROUSEL */}
            {n ? (
                <section className="relative mx-auto max-w-7xl px-4 pt-8 md:px-16">
                    <div className="relative overflow-hidden rounded-2xl bg-[var(--brand)]">
                        <div className="grid items-center gap-6 md:grid-cols-2">
                            <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">
                                <svg
                                    className="pointer-events-none absolute left-4 top-6 h-24 w-24 text-white/10"
                                    viewBox="0 0 100 100"
                                    fill="currentColor"
                                    aria-hidden
                                >
                                    {Array.from({ length: 7 }).map((_, r) =>
                                        Array.from({ length: 7 }).map((__, c) => (
                                            <circle key={`${r}-${c}`} cx={6 + c * 14} cy={6 + r * 14} r="1.6" />
                                        ))
                                    )}
                                </svg>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                                    {s?.tag || "Guide"}
                                </p>
                                <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                                    {s?.title}
                                </h3>
                                {s?.description ? (
                                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{s.description}</p>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => s?.videoUrl && setPlayer(s)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--gold-dark)]"
                                >
                                    {s?.ctaLabel || "Watch Video"}
                                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25">
                                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                                            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            <div className="relative h-56 w-full md:h-80">
                                {ok(s?.image) ? (
                                    <Image src={s.image} alt={s?.title || "Guide"} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
                                ) : null}
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--brand-deep)] via-[var(--brand-deep)]/60 to-transparent" />
                                <span className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-white/10 md:block">
                                    <svg viewBox="0 0 24 24" className="h-32 w-32" fill="currentColor">
                                        <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm7 3.5v5l5-2.5-5-2.5Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                            {list.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    aria-label={`Slide ${idx + 1}`}
                                    onClick={() => setI(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === i ? "w-5 bg-[var(--gold)]" : "w-2 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {n > 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous"
                                className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--brand-deep)] shadow-lg transition hover:bg-slate-50 md:grid"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next"
                                className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--brand-deep)] shadow-lg transition hover:bg-slate-50 md:grid"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 6 6 6-6 6" />
                                </svg>
                            </button>
                        </>
                    ) : null}
                </section>
            ) : null}



            {/* PLAYER */}
            {player ? (
                <div
                    className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4"
                    onClick={() => setPlayer(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => setPlayer(null)}
                            aria-label="Close"
                            className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 6l12 12M18 6 6 18" />
                            </svg>
                        </button>
                        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                            <iframe
                                src={embed(player.videoUrl)}
                                title={player?.title || "Video"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                        {player?.title ? <p className="mt-3 text-center text-sm text-white/80">{player.title}</p> : null}
                    </div>
                </div>
            ) : null}
        </div>
    );
}