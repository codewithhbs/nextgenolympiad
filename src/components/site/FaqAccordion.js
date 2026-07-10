"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/5 rounded-2xl bg-white p-2 shadow-card">
      {items.map((f, i) => (
        <div key={f._id || i} className="p-3">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 text-left">
            <span className="font-bold text-ink">{f.question}</span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-saffron transition ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.answer}</p>}
        </div>
      ))}
    </div>
  );
}
