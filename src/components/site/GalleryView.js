"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import GalleryGrid from "./GalleryGrid";

const PAGE = 9;

const CAT_ORDER = [
    "Academic",
    "Award Ceremony",
    "Examination",
    "Science Fair",
    "Art Competition",
    "Workshop",
    "Teachers",
    "School Visits",
    "Videos",
];

const src = (i) =>
    i?.image?.url ||
    i?.imageUrl ||
    i?.thumbnail?.url ||
    (typeof i?.image === "string" ? i.image : "") ||
    i?.url ||
    i?.thumbnail ||
    "";

const isVideo = (i) =>
    Boolean(i?.videoUrl || i?.type === "video" || String(i?.category || "").toLowerCase() === "videos");

const yearOf = (i) => String(i?.year || (i?.createdAt ? new Date(i.createdAt).getFullYear() : ""));

const label = (c) => (c ? c.charAt(0).toUpperCase() + c.slice(1) : c);

export default function GalleryView({ items = [] }) {
    const [active, setActive] = useState("All");
    const [count, setCount] = useState(PAGE);
    const [preview, setPreview] = useState(null);

    const photos = useMemo(() => items.filter((i) => !isVideo(i) && src(i)), [items]);
    const videos = useMemo(() => items.filter(isVideo), [items]);

    const cats = useMemo(() => {
        const present = new Set(items.map((i) => label(i?.category)).filter(Boolean));
        const ordered = CAT_ORDER.filter((c) => present.has(c));
        const extra = [...present].filter((c) => !CAT_ORDER.includes(c));
        return ["All", ...ordered, ...extra];
    }, [items]);

    const filtered = useMemo(() => {
        if (active === "All") return photos;
        if (active === "Videos") return videos;
        return items.filter((i) => label(i?.category) === active);
    }, [active, items, photos, videos]);

    const visible = filtered.slice(0, count);

    const timeline = useMemo(() => {
        const map = {};
        items.forEach((i) => {
            const y = yearOf(i);
            if (!y) return;
            map[y] = map[y] || [];
            const t = i?.eventName || i?.title || label(i?.category);
            if (t && !map[y].includes(t)) map[y].push(t);
        });
        return Object.entries(map)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, list]) => ({ year, list: list.slice(0, 4) }));
    }, [items]);

    const schools = useMemo(() => {
        const map = {};
        items.forEach((i) => {
            const s = i?.school || i?.schoolName;
            if (!s) return;
            map[s] = (map[s] || 0) + 1;
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, n]) => ({ name, n }));
    }, [items]);

    useEffect(() => setCount(PAGE), [active]);

    const onKey = useCallback((e) => {
        if (e.key === "Escape") setPreview(null);
    }, []);

    useEffect(() => {
        if (!preview) return;
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [preview, onKey]);

    const hero = [photos[0], photos[1], photos[2]];

    return (
        <div className="overflow-hidden bg-white">
            {/* HERO */}
            <section className="relative bg-gradient-to-b from-[var(--surface)] via-[var(--surface)] to-white py-14 md:py-20">
                <span className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[var(--line)]/40 blur-2xl" />
                <span className="pointer-events-none absolute right-10 top-24 h-32 w-32 rounded-full bg-[var(--line)]/60 blur-xl" />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
                    <div>
                        <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Our Gallery
                        </p>
                        <h1 className="text-4xl font-extrabold leading-[1.1] text-[var(--brand)] md:text-5xl">
                            Moments That
                            <br />
                            Inspire <span className="text-[var(--gold)]">Excellence</span>
                        </h1>
                        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
                            Capturing every achievement, curiosity, innovation and unforgettable Olympiad memory.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative col-span-1 h-56 overflow-hidden rounded-[2rem] rounded-tr-[6rem] bg-slate-100 md:h-64">
                            {src(hero[0]) ? (
                                <Image
                                    src={src(hero[0])}
                                    alt={hero[0]?.title || "Gallery"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:768px) 50vw, 300px"
                                />
                            ) : null}
                        </div>
                        <div className="relative col-span-1 h-40 self-start overflow-hidden rounded-[2rem] rounded-bl-[5rem] bg-slate-100 md:h-48">
                            {src(hero[1]) ? (
                                <Image
                                    src={src(hero[1])}
                                    alt={hero[1]?.title || "Gallery"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:768px) 50vw, 300px"
                                />
                            ) : null}
                        </div>
                        <div className="relative col-span-2 h-44 overflow-hidden rounded-[2rem] rounded-tl-[6rem] bg-slate-100 md:h-52">
                            {src(hero[2]) ? (
                                <Image
                                    src={src(hero[2])}
                                    alt={hero[2]?.title || "Gallery"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width:768px) 100vw, 600px"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* FILTERS */}
            {cats.length > 1 ? (
                <section className="mx-auto max-w-6xl px-4 pt-12">
                    <div className="flex flex-wrap gap-2">
                        {cats.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setActive(c)}
                                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                    active === c
                                        ? "bg-[var(--brand)] text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* GRID */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                {visible.length ? (
                    <>
                        <GalleryGrid items={visible} onSelect={setPreview} />
                        {filtered.length > visible.length ? (
                            <div className="mt-10 text-center">
                                <button
                                    type="button"
                                    onClick={() => setCount((c) => c + PAGE)}
                                    className="rounded-xl bg-[var(--brand)] px-7 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand)]"
                                >
                                    Load More
                                </button>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="py-10 text-center text-slate-400">Gallery images will appear here soon.</p>
                )}
            </section>


            {/* CTA */}
            <section className="mx-auto max-w-6xl px-4 pb-20">
                <div className="relative overflow-hidden rounded-3xl bg-[var(--brand)] px-6 py-8 md:px-10">
                    <span className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
                    <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
                        <div className="flex items-center gap-5">
                            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[var(--brand)]">
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A3.5 3.5 0 0 1 18 18H7Z" />
                                    <path d="M12 12v6M9.5 14.5 12 12l2.5 2.5" />
                                </svg>
                            </span>
                            <div className="text-center md:text-left">
                                <p className="text-sm text-white/70">Have memories from your school?</p>
                                <h3 className="text-2xl font-extrabold text-white">Share your Olympiad moments.</h3>
                                <p className="mt-1 text-xs text-white/60">
                                    Upload photos of your events and achievements to be featured in our gallery.
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link
                                href="/contact"
                                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-7 text-sm font-bold text-white transition hover:bg-[var(--gold-dark)]"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 16V4M8 8l4-4 4 4M4 18v2h16v-2" />
                                </svg>
                                Upload Gallery
                            </Link>
                            <p className="mt-2 text-[11px] text-white/50">JPG, PNG up to 10MB</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIGHTBOX */}
            {preview ? (
                <div
                    className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4"
                    onClick={() => setPreview(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => setPreview(null)}
                            className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                            aria-label="Close"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 6l12 12M18 6 6 18" />
                            </svg>
                        </button>
                        {preview?.videoUrl ? (
                            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                                <iframe
                                    src={preview.videoUrl.replace("watch?v=", "embed/")}
                                    title={preview?.title || "Video"}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        ) : (
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900">
                                {src(preview) ? (
                                    <Image src={src(preview)} alt={preview?.title || "Gallery"} fill className="object-contain" sizes="100vw" />
                                ) : null}
                            </div>
                        )}
                        {preview?.title ? <p className="mt-3 text-center text-sm text-white/80">{preview.title}</p> : null}
                    </div>
                </div>
            ) : null}
        </div>
    );
}