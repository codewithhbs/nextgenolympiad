"use client";
import { X } from "lucide-react";
export default function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-auto rounded-2xl bg-white p-6 shadow-soft animate-fade-up`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink/60 hover:bg-sky" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
