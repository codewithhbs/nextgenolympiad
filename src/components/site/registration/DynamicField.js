"use client";
import { Input, Textarea } from "@/components/ui";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Info } from "lucide-react";

export default function DynamicField({ field, value, error, data, onChange }) {
  const set = (v) => onChange(field.name, v);
  const col = field.colSpan === 2 ? "sm:col-span-2" : "";

  // NOTE block
  if (field.type === "note") {
    return (
      <div className={`sm:col-span-2 ${field.name.startsWith("_note") && field.name !== "_noteA" && field.name !== "_noteB" && field.name !== "_noteC" && field.name !== "_noteD" ? "mt-2" : ""}`}>
        {field.name.startsWith("_note") && !["_noteA","_noteB","_noteC","_noteD"].includes(field.name) ? (
          <h4 className="border-b border-line pb-2 font-display text-base font-bold text-navy">{field.label}</h4>
        ) : (
          <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold-soft/50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
            <div>
              <div className="text-sm font-bold text-navy">{field.label}</div>
              {field.hint && <p className="mt-1 text-sm text-slate">{field.hint}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  const label = field.label + (field.required ? " *" : "");

  // TEXT-LIKE
  if (["text", "email", "tel", "url", "number", "password"].includes(field.type)) {
    return (
      <div className={col}>
        <Input label={label} type={field.type === "number" ? "number" : field.type === "email" ? "email" : field.type === "password" ? "password" : "text"}
          inputMode={field.type === "tel" ? "tel" : undefined}
          placeholder={field.placeholder} hint={field.hint} error={error}
          value={value ?? ""} onChange={(e) => set(e.target.value)} />
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className={col}>
        <Input label={label} type="date" error={error} value={value ?? ""} onChange={(e) => set(e.target.value)} />
      </div>
    );
  }

  if (field.type === "richtext") {
    return (
      <div className={col}>
        <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
        <RichTextEditor value={value ?? ""} onChange={set} placeholder={field.placeholder} />
        {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={col}>
        <Textarea label={label} placeholder={field.placeholder} error={error} value={value ?? ""} onChange={(e) => set(e.target.value)} />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={col}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
          <select className={`w-full rounded-xl border-2 bg-white px-4 py-2.5 text-ink outline-none transition focus:border-gold ${error ? "border-crimson" : "border-line"}`}
            value={value ?? ""} onChange={(e) => set(e.target.value)}>
            <option value="">Select…</option>
            {(field.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
        </label>
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className={col}>
        <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((o) => {
            const active = value === o.value;
            return (
              <button type="button" key={o.value} onClick={() => set(o.value)}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${active ? "border-gold bg-gold-soft text-gold-ink" : "border-line bg-white text-navy hover:border-gold/50"}`}>
                {o.label}
              </button>
            );
          })}
        </div>
        {error && <span className="mt-1.5 block text-xs text-crimson">{error}</span>}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className={`flex items-start gap-3 ${col}`}>
        <input type="checkbox" checked={value === true} onChange={(e) => set(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-line text-gold accent-gold" />
        <span className="text-sm text-slate">{field.label}{field.required ? " *" : ""}
          {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
        </span>
      </label>
    );
  }

  // SECTION B — subject exam dates
  if (field.type === "subjectDates") {
    const subjects = field.opts?.subjects || [];
    const val = value || {};
    return (
      <div className="sm:col-span-2">
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-navy text-xs font-bold uppercase tracking-wide text-white">
            <div className="px-4 py-3">Subject</div>
            <div className="border-l border-white/15 px-4 py-3 text-center">Date 1</div>
            <div className="border-l border-white/15 px-4 py-3 text-center">Date 2</div>
          </div>
          {subjects.map((s, si) => (
            <div key={s.name} className={`grid grid-cols-[1.4fr_1fr_1fr] items-stretch ${si % 2 ? "bg-ivory" : "bg-white"}`}>
              <div className="flex items-center px-4 py-3 text-sm font-semibold text-navy">{s.name}</div>
              {s.dates.map((d) => {
                const active = val[s.name] === d;
                return (
                  <button type="button" key={d} onClick={() => set({ ...val, [s.name]: d })}
                    className={`border-l border-line px-3 py-3 text-center text-sm transition ${active ? "bg-gold-soft font-bold text-gold-ink" : "text-slate hover:bg-mist"}`}>
                    {d}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {error && <span className="mt-2 block text-xs text-crimson">{error}</span>}
      </div>
    );
  }

  // SECTION C — class x subject matrix
  if (field.type === "classMatrix") {
    const rows = field.opts?.rows || [];
    const cols = field.opts?.cols || [];
    const val = value || {};
    const setCell = (r, c, v) => {
      const num = v === "" ? "" : Math.max(0, Number(v) || 0);
      set({ ...val, [r]: { ...(val[r] || {}), [c]: num } });
    };
    const colTotal = (c) => rows.reduce((t, r) => t + (Number(val[r]?.[c]) || 0), 0);
    const rowTotal = (r) => cols.reduce((t, c) => t + (Number(val[r]?.[c]) || 0), 0);
    const grand = rows.reduce((t, r) => t + rowTotal(r), 0);

    return (
      <div className="sm:col-span-2">
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-navy text-xs font-bold uppercase tracking-wide text-white">
                <th className="px-3 py-3 text-left">Class</th>
                {cols.map((c) => <th key={c} className="border-l border-white/15 px-3 py-3 text-center">{c}</th>)}
                <th className="border-l border-white/15 px-3 py-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={r} className={ri % 2 ? "bg-ivory" : "bg-white"}>
                  <td className="px-3 py-2 font-semibold text-navy">{r}</td>
                  {cols.map((c) => (
                    <td key={c} className="border-l border-line px-2 py-1.5">
                      <input type="number" min="0" inputMode="numeric" value={val[r]?.[c] ?? ""}
                        onChange={(e) => setCell(r, c, e.target.value)}
                        className="w-16 rounded-lg border border-line bg-white px-2 py-1.5 text-center text-navy outline-none focus:border-gold" />
                    </td>
                  ))}
                  <td className="border-l border-line px-3 py-2 text-center font-bold text-gold-dark">{rowTotal(r)}</td>
                </tr>
              ))}
              <tr className="bg-parchment font-bold text-navy">
                <td className="px-3 py-2">Total</td>
                {cols.map((c) => <td key={c} className="border-l border-line px-3 py-2 text-center">{colTotal(c)}</td>)}
                <td className="border-l border-line px-3 py-2 text-center text-gold-dark">{grand}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {error && <span className="mt-2 block text-xs text-crimson">{error}</span>}
      </div>
    );
  }

  return null;
}
