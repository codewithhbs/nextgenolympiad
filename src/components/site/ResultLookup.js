"use client";
import { useState } from "react";
import { Search, UserRound, Trophy, Loader2, AlertCircle } from "lucide-react";

export default function ResultLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!code.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`/api/results/lookup?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.data?.result) throw new Error("No result found for this code.");
      setResult(data.data.result);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* search bar */}
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Student Code Input */}
          <div className="relative flex-1 min-w-0">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Enter Student Code (e.g. NG2026-00123)"
              className="w-full rounded-2xl border-2 border-ink/10 bg-white py-4 pl-12 pr-5 text-base font-semibold text-ink shadow-card outline-none transition-all duration-300 placeholder:font-normal placeholder:text-ink/40 focus:border-saffron focus:ring-4 focus:ring-saffron/20"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={search}
            disabled={loading}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-saffron px-8 py-4 font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-saffron/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[170px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Check Result</span>
              </>
            )}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-cherry/10 px-4 py-3 text-sm font-semibold text-cherry">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {result && (
        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5">
          {/* header */}
          <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-ink to-ink-soft px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <UserRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black leading-tight">{result.studentName}</h3>
                <p className="text-sm text-white/70">Class {result.class} · {result.studentCode}</p>
              </div>
            </div>
            {result.medal && result.medal !== "none" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-3 py-1.5 text-xs font-black uppercase text-white">
                <Trophy className="h-3.5 w-3.5" /> {result.medal}
              </span>
            )}
          </div>
          {/* stats */}
          <div className="grid grid-cols-3 divide-x divide-ink/5 px-2 py-5 text-center">
            <Stat label="Total" value={`${result.totalMarks}/${result.maxMarks}`} tone="text-ink" />
            <Stat label="Percentage" value={`${result.percentage}%`} tone="text-saffron" />
            <Stat label="Rank" value={result.rank || "—"} tone="text-leaf" />
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="px-3">
      <p className={`text-2xl font-black ${tone}`}>{value}</p>
      <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
    </div>
  );
}