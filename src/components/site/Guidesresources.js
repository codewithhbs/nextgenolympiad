"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const embed = (url = "") =>
    url
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("/shorts/", "/embed/");

const SLIDE_GRADIENTS = [
    "linear-gradient(135deg,#d6006e 0%,#ff3d3d 55%,#ff8a3d 100%)",
    "linear-gradient(135deg,#0057d9 0%,#00a3c4 55%,#00c98d 100%)",
    "linear-gradient(135deg,#5b21b6 0%,#7c3aed 55%,#4f46e5 100%)",
    "linear-gradient(135deg,#c2410c 0%,#ea580c 55%,#f59e0b 100%)",
];

export default function GuidesResources({
    eyebrow = "Explore & Learn",
    title = "Important Guides & Resources",
    subtitle = "Everything you need to know about the Olympiad.",
    slides = [],
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
    const grad = SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length];
    const ok = (u) => typeof u === "string" && /^(https?:\/\/|\/)/.test(u) && !u.includes("...");

    return (
        <div
            className="relative overflow-hidden"
            style={{ backgroundImage: "linear-gradient(160deg,#fff7ed 0%,#ffffff 45%,#eef2ff 100%)" }}
        >
            <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />

            {/* HEADER */}
            <section className="relative mx-auto max-w-7xl px-4 pt-16 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[var(--gold)] shadow-sm">
                    <span aria-hidden>✦</span>
                    {eyebrow}
                    <span aria-hidden>✦</span>
                </span>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-[var(--brand-deep)] md:text-4xl">{title}</h2>
                <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            </section>

            {/* CAROUSEL */}
            {n ? (
                <section className="relative mx-auto max-w-7xl px-4 pt-10 md:px-16">
                    <div
                        className="relative overflow-hidden rounded-[2rem] shadow-soft"
                        style={{ backgroundImage: grad }}
                    >
                        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rotate-12 rounded-[2rem] bg-white/10 blur-xl" />

                        <div className="relative grid items-center gap-6 md:grid-cols-2">
                            <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                                    {s?.tag || "Guide"}
                                </span>
                                <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white drop-shadow-sm md:text-4xl">
                                    {s?.title}
                                </h3>
                                {s?.description ? (
                                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">{s.description}</p>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => s?.videoUrl && setPlayer(s)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    {s?.ctaLabel || "Watch Video"}
                                    <span
                                        className="grid h-6 w-6 place-items-center rounded-full text-white"
                                        style={{ backgroundImage: grad }}
                                    >
                                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                                            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            <div className="relative h-56 w-full md:h-80">
                                {ok(s?.image) ? (
                                    <div className="absolute inset-4 overflow-hidden rounded-3xl shadow-lg md:inset-6">
                                        <Image src={s.image} alt={s?.title || "Guide"} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center gap-2 pb-5">
                            {list.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    aria-label={`Slide ${idx + 1}`}
                                    onClick={() => setI(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/40"
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
                                className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--brand-deep)] shadow-lg transition hover:-translate-x-0.5 hover:shadow-xl md:grid"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next"
                                className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--brand-deep)] shadow-lg transition hover:translate-x-0.5 hover:shadow-xl md:grid"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 6 6 6-6 6" />
                                </svg>
                            </button>
                        </>
                    ) : null}
                </section>
            ) : null}

            <div className="h-16 md:h-20" />

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