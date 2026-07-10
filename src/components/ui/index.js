"use client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

export function Button({ variant = "primary", size = "md", loading, className, children, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-navy text-white hover:bg-navy-deep shadow-soft hover:-translate-y-0.5",
    gold: "bg-gold text-navy-deep hover:bg-gold-dark hover:text-white shadow-gold hover:-translate-y-0.5",
    ink: "bg-navy text-white hover:bg-navy-deep",
    outline: "border-2 border-navy/15 text-navy hover:border-gold hover:text-gold-dark bg-white",
    ghost: "text-navy hover:bg-mist",
    danger: "bg-crimson text-white hover:bg-crimson/90",
  };
  const sizes = { sm: "px-3.5 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Input({ label, error, hint, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>}
      <input
        className={clsx("w-full rounded-xl border-2 border-line bg-white px-4 py-2.5 text-ink outline-none transition focus:border-gold placeholder:text-slate/50", error && "border-crimson", className)}
        {...props}
      />
      {hint && !error && <span className="mt-1 block text-xs text-slate">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>}
      <textarea rows={4} className={clsx("w-full rounded-xl border-2 border-line bg-white px-4 py-2.5 text-ink outline-none transition focus:border-gold", error && "border-crimson", className)} {...props} />
      {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
    </label>
  );
}

export function Select({ label, error, className, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>}
      <select className={clsx("w-full rounded-xl border-2 border-line bg-white px-4 py-2.5 text-ink outline-none transition focus:border-gold", error && "border-crimson", className)} {...props}>
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
    </label>
  );
}

export function Card({ className, children }) {
  return <div className={clsx("rounded-2xl bg-white p-6 shadow-card ring-1 ring-line", className)}>{children}</div>;
}

export function Badge({ tone = "navy", children }) {
  const tones = {
    navy: "bg-mist text-navy", gold: "bg-gold-soft text-gold-ink",
    green: "bg-navy/5 text-navy", orange: "bg-gold-soft text-gold-ink",
    red: "bg-crimson-soft text-crimson", grey: "bg-navy/5 text-slate",
  };
  return <span className={clsx("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide", tones[tone] || tones.navy)}>{children}</span>;
}

export function CrestDivider({ className }) {
  return (
    <div className={clsx("crest-divider", className)}>
      <span className="text-base leading-none">◆</span>
    </div>
  );
}

export function Spinner() {
  return <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;
}
