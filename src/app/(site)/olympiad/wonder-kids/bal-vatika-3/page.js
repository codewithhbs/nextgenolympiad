import React from "react";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
        <Sparkles className="h-4 w-4" /> Bal Vatika – III
      </span>
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
        Coming Soon
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate">
        We&apos;re putting the finishing touches on the Bal Vatika – III Olympiad. Curriculum,
        sample papers, and exam details will be available here shortly.
      </p>
    </div>
  );
}