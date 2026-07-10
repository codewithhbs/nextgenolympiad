"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function GalleryGrid({ items = [] }) {
  const [active, setActive] = useState(null);
  if (!items.length) return <p className="text-center text-ink-soft">Gallery coming soon.</p>;
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <button key={g._id} onClick={() => setActive(g)} className="group relative aspect-square overflow-hidden rounded-2xl bg-sky shadow-card">
            <Image src={g.image.url} alt={g.alt || g.title || "gallery"} fill className="object-cover transition duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4" onClick={() => setActive(null)}>
          <button className="absolute right-6 top-6 text-white"><X className="h-7 w-7" /></button>
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image src={active.image.url} alt={active.alt || "gallery"} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
