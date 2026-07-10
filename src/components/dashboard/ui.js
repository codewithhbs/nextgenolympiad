import clsx from "clsx";

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, tone = "saffron" }) {
  const tones = {
    saffron: "bg-saffron-soft text-saffron", green: "bg-leaf/10 text-leaf",
    grape: "bg-grape-soft text-grape", red: "bg-cherry/10 text-cherry", ink: "bg-sky text-ink",
  };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-ink-soft">{label}</div>
          <div className="mt-1 text-3xl font-extrabold text-ink">{value}</div>
        </div>
        {Icon && <div className={clsx("inline-flex h-12 w-12 items-center justify-center rounded-2xl", tones[tone])}><Icon className="h-6 w-6" /></div>}
      </div>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", text }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/10 bg-white/50 py-16 text-center">
      <p className="font-bold text-ink">{title}</p>
      {text && <p className="mt-1 text-sm text-ink-soft">{text}</p>}
    </div>
  );
}

export function TableWrap({ children }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className }) {
  return <th className={clsx("border-b border-ink/5 px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-soft", className)}>{children}</th>;
}

export function Td({ children, className }) {
  return <td className={clsx("border-b border-ink/5 px-4 py-3 text-ink", className)}>{children}</td>;
}
