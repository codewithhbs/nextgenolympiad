"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, Printer, Download, Trophy } from "lucide-react";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";
import { Button, Badge, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const medalTone = { gold: "orange", silver: "grey", bronze: "red", none: "ink" };

export default function SchoolResultsPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const [card, setCard] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cls) params.set("class", cls);
      const r = await api.get(`/api/results/school?${params}`);
      setItems(r.data.items || []);
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [q, cls, toast]);
  useEffect(() => { load(); }, [load]);

  const classes = useMemo(() => [...new Set(items.map((r) => r.class).filter(Boolean))].sort(), [items]);

  const downloadCsv = () => {
    if (!items.length) return toast.error("No results to export");
    const head = ["Rank", "StudentCode", "Name", "Class", "Section", "Total", "Max", "Percentage", "Medal", "Session"];
    const rows = items.map((r) => [r.rank, r.studentCode, r.studentName, r.class, r.section, r.totalMarks, r.maxMarks, r.percentage, r.medal, r.session]);
    const csv = [head, ...rows].map((row) => row.map((c) => `"${c ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `results-${Date.now()}.csv`;
    a.click();
  };

  const printCard = () => window.print();

  return (
    <div>
      <PageHeader title="Results" subtitle="View and download your students' olympiad results"
        action={<Button variant="outline" onClick={downloadCsv}><Download className="h-4 w-4" /> Export CSV</Button>} />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or code…"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-saffron" />
        </div>
        <select value={cls} onChange={(e) => setCls(e.target.value)}
          className="rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron">
          <option value="">All classes</option>
          {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
        </select>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState title="No results yet" text="Results appear here once published by the admin." />
      ) : (
        <TableWrap>
          <thead><tr><Th>Rank</Th><Th>Code</Th><Th>Name</Th><Th>Class</Th><Th>Total</Th><Th>%</Th><Th>Medal</Th><Th className="text-right">Scorecard</Th></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="hover:bg-cloud">
                <Td><span className="font-bold">{r.rank || "—"}</span></Td>
                <Td><span className="font-mono text-xs">{r.studentCode}</span></Td>
                <Td>{r.studentName}</Td>
                <Td>{r.class}{r.section ? `-${r.section}` : ""}</Td>
                <Td>{r.totalMarks}/{r.maxMarks}</Td>
                <Td>{r.percentage}%</Td>
                <Td>{r.medal !== "none" ? <Badge tone={medalTone[r.medal]}>{r.medal}</Badge> : "—"}</Td>
                <Td className="text-right">
                  <button onClick={() => setCard(r)} className="rounded-lg px-2 py-1 text-sm font-semibold text-saffron hover:bg-saffron-soft">View</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      <Modal open={!!card} onClose={() => setCard(null)} title="Scorecard" wide>
        {card && (
          <div>
            <div id="scorecard" className="rounded-2xl border-2 border-ink/10 p-6">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <div>
                  <div className="text-lg font-extrabold text-ink">NextGen Olympiad {card.session}</div>
                  <div className="text-sm text-ink-soft">Official Scorecard</div>
                </div>
                <Trophy className="h-10 w-10 text-saffron" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-ink-soft">Name:</span> <b className="text-ink">{card.studentName}</b></div>
                <div><span className="text-ink-soft">Code:</span> <b className="text-ink">{card.studentCode}</b></div>
                <div><span className="text-ink-soft">Class:</span> <b className="text-ink">{card.class}{card.section ? `-${card.section}` : ""}</b></div>
                <div><span className="text-ink-soft">Rank:</span> <b className="text-ink">{card.rank || "—"}</b></div>
              </div>
              {card.subjects?.length > 0 && (
                <table className="mt-4 w-full text-left text-sm">
                  <thead><tr className="border-b border-ink/10"><th className="py-2">Subject</th><th className="py-2 text-right">Marks</th><th className="py-2 text-right">Max</th></tr></thead>
                  <tbody>
                    {card.subjects.map((s, i) => (
                      <tr key={i} className="border-b border-ink/5"><td className="py-1.5">{s.subject}</td><td className="py-1.5 text-right">{s.marks}</td><td className="py-1.5 text-right">{s.maxMarks}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-sky p-4">
                <div><div className="text-xs text-ink-soft">Total</div><div className="text-xl font-extrabold text-ink">{card.totalMarks}/{card.maxMarks}</div></div>
                <div><div className="text-xs text-ink-soft">Percentage</div><div className="text-xl font-extrabold text-saffron">{card.percentage}%</div></div>
                <div><div className="text-xs text-ink-soft">Medal</div><div className="text-xl font-extrabold capitalize text-leaf">{card.medal !== "none" ? card.medal : "—"}</div></div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 print:hidden">
              <Button onClick={printCard}><Printer className="h-4 w-4" /> Print</Button>
              <Button variant="ghost" onClick={() => setCard(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
