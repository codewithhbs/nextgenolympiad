"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Home, ChevronRight, Search, RefreshCw, Eye, Download, FileText,
  BookOpen, Calendar, HardDrive, Clock, ChevronLeft, Award,
} from "lucide-react";

const PER_PAGE = 6;

function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const diff = Math.max(0, Date.now() - d.getTime());
  const day = 86400000;
  if (diff < day) return "today";
  const days = Math.floor(diff / day);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const w = Math.floor(days / 7);
  if (w < 5) return `${w} week${w > 1 ? "s" : ""} ago`;
  const m = Math.floor(days / 30);
  return `${m} month${m > 1 ? "s" : ""} ago`;
}

export default function ResourceListPage({
  breadcrumb = "Sample Papers",
  title = "Sample Papers",
  subtitle = "",
  items = [],
  classes = [],
  subjects = [],
  years = [],
  cta = { title: "", text: "", label: "Explore", href: "#" },
}) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const [sub, setSub] = useState("");
  const [yr, setYr] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let out = items.filter((it) => {
      const hay = `${it.title} ${it.class} ${it.subject}`.toLowerCase();
      return (
        (!q || hay.includes(q.toLowerCase())) &&
        (!cls || it.class === cls) &&
        (!sub || it.subject === sub) &&
        (!yr || String(it.year) === yr)
      );
    });
    out = [...out].sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      const da = new Date(a.updatedAt || 0).getTime();
      const db = new Date(b.updatedAt || 0).getTime();
      return sort === "oldest" ? da - db : db - da;
    });
    return out;
  }, [items, q, cls, sub, yr, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * PER_PAGE;
  const view = filtered.slice(start, start + PER_PAGE);

  const reset = () => { setQ(""); setCls(""); setSub(""); setYr(""); setSort("latest"); setPage(1); };
  const onFilter = (setter) => (e) => { setter(e.target.value); setPage(1); };

  return (
    <div className="bg-surface">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:px-6">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-brand"><Home className="h-4 w-4" /> Home</Link>
            <ChevronRight className="h-4 w-4 text-line" />
            <Link href="/resources" className="hover:text-brand">Resources</Link>
            <ChevronRight className="h-4 w-4 text-line" />
            <span className="text-ink">{breadcrumb}</span>
          </nav>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
              {subtitle && <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-slate">{subtitle}</p>}
            </div>
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <div className="flex h-24 w-40 items-center justify-center rounded-2xl bg-gold-soft">
                <FileText className="h-12 w-12 text-brand" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* FILTER BAR */}
        <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-end">
            <label className="block">
              <span className="sr-only">Search</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                <input
                  value={q}
                  onChange={onFilter(setQ)}
                  placeholder="Search papers by title, class or subject…"
                  className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand focus:bg-white"
                />
              </div>
            </label>

            <Select label="Class" value={cls} onChange={onFilter(setCls)} options={classes} allLabel="All Classes" />
            <Select label="Subject" value={sub} onChange={onFilter(setSub)} options={subjects} allLabel="All Subjects" />
            <Select label="Year" value={yr} onChange={onFilter(setYr)} options={years} allLabel="All Years" />

            <button
              onClick={reset}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
            >
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>

        {/* COUNT + SORT */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate">
            {total === 0 ? "No results" : `Showing ${start + 1} to ${Math.min(start + PER_PAGE, total)} of ${total} results`}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-brand"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </label>
        </div>

        {/* LIST */}
        <div className="mt-4 space-y-3">
          {view.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-line" />
              <p className="mt-3 text-sm font-semibold text-slate">No papers match your filters.</p>
              <button onClick={reset} className="mt-3 text-sm font-bold text-brand underline">Clear filters</button>
            </div>
          )}

          {view.map((it) => (
            <div key={it.id} className="rounded-2xl border border-line bg-white p-4 shadow-card transition hover:shadow-soft sm:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <FileText className="h-6 w-6" />
                    <span className="sr-only">PDF</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-extrabold text-ink sm:text-lg">{it.title}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate">
                      {it.class && <Meta icon={BookOpen}>{it.class}</Meta>}
                      {it.subject && <Meta>{it.subject}</Meta>}
                      {it.year && <Meta icon={Calendar}>{it.year}</Meta>}
                      {it.size && <Meta icon={HardDrive}>{it.size}</Meta>}
                      {it.updatedAt && <Meta icon={Clock}>Updated {timeAgo(it.updatedAt)}</Meta>}
                    </div>
                    {it.desc && <p className="mt-2 line-clamp-2 text-sm text-slate">{it.desc}</p>}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {it.url && (
                    <a
                      href={it.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand md:flex-none"
                    >
                      <Eye className="h-4 w-4" /> Preview
                    </a>
                  )}
                  {it.url && (
                    <a
                      href={it.url} download
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-deep md:flex-none"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <PageBtn disabled={safePage === 1} onClick={() => setPage(safePage - 1)}><ChevronLeft className="h-4 w-4" /></PageBtn>
            {pageList(safePage, pages).map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="px-2 text-sm text-slate">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-9 w-9 rounded-full text-sm font-bold transition ${p === safePage ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand"}`}
                >
                  {p}
                </button>
              )
            )}
            <PageBtn disabled={safePage === pages} onClick={() => setPage(safePage + 1)}><ChevronRight className="h-4 w-4" /></PageBtn>
          </div>
        )}

        {/* CTA BANNER */}
        {cta?.title && (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-brand/20 bg-brand-soft/60 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-brand-deep">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-extrabold text-brand">{cta.title}</h4>
                <p className="text-sm font-medium text-slate">{cta.text}</p>
              </div>
            </div>
            <Link href={cta.href} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-deep">
              {cta.label} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function Select({ label, value, onChange, options, allLabel }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="h-[42px] w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-brand lg:w-40"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Icon && <Icon className="h-3.5 w-3.5" />}{children}
    </span>
  );
}

function PageBtn({ disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function pageList(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const s = Math.max(2, cur - 1);
  const e = Math.min(total - 1, cur + 1);
  if (s > 2) out.push("…");
  for (let i = s; i <= e; i++) out.push(i);
  if (e < total - 1) out.push("…");
  out.push(total);
  return out;
}