"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Trash2 } from "lucide-react";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";
import { Spinner, Badge, Button } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const medalTone = { gold: "orange", silver: "grey", bronze: "red", none: "ink" };

export default function AdminResultsListPage() {
  const toast = useToast();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState([]);

  useEffect(() => { api.get("/api/schools?status=approved&limit=200").then((r) => setSchools(r.data.items || [])).catch(() => {}); }, []);

  const load = useCallback(async () => {
    setSel([]);
    if (!school) { setItems([]); return; }
    setLoading(true);
    try { const r = await api.get(`/api/results/school?school=${school}&q=${encodeURIComponent(q)}`); setItems(r.data.items || []); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [school, q, toast]);
  useEffect(() => { load(); }, [load]);

  const del = async (ids) => {
    if (!confirm(ids.length === 1 ? "Delete this result?" : `Delete ${ids.length} selected results?`)) return;
    try { await api.post("/api/results/bulk-delete", { ids }); toast.success("Deleted"); load(); } catch (e) { toast.error(e.message); }
  };
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSel = items.length > 0 && sel.length === items.length;

  return (
    <div>
      <PageHeader title="All Results" subtitle="Browse published results per school" />
      <div className="mb-4 flex flex-wrap gap-3">
        <select value={school} onChange={(e) => setSchool(e.target.value)}
          className="rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 text-ink outline-none focus:border-saffron">
          <option value="">— Select school —</option>
          {schools.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
        </select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or code…"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-saffron" />
        </div>
      </div>
      {sel.length > 0 && (
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-cherry/10 px-4 py-2.5">
          <span className="text-sm font-semibold text-ink">{sel.length} selected</span>
          <Button variant="danger" size="sm" onClick={() => del(sel)}><Trash2 className="h-4 w-4" /> Delete selected</Button>
          <button onClick={() => setSel([])} className="text-sm font-semibold text-ink-soft hover:underline">Clear</button>
        </div>
      )}
      {loading ? <Spinner /> : !school ? <EmptyState title="Select a school to view results" /> : items.length === 0 ? <EmptyState title="No results found" /> : (
        <TableWrap>
          <thead><tr><Th><input type="checkbox" className="h-4 w-4 accent-saffron" checked={allSel} onChange={() => setSel(allSel ? [] : items.map((r) => r._id))} /></Th><Th>Rank</Th><Th>Code</Th><Th>Name</Th><Th>Class</Th><Th>Total</Th><Th>%</Th><Th>Medal</Th><Th className="text-right">Actions</Th></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="hover:bg-cloud">
                <Td><input type="checkbox" className="h-4 w-4 accent-saffron" checked={sel.includes(r._id)} onChange={() => toggle(r._id)} /></Td>
                <Td><span className="font-bold">{r.rank || "—"}</span></Td>
                <Td><span className="font-mono text-xs">{r.studentCode}</span></Td>
                <Td>{r.studentName}</Td>
                <Td>{r.class}{r.section ? `-${r.section}` : ""}</Td>
                <Td>{r.totalMarks}/{r.maxMarks}</Td>
                <Td>{r.percentage}%</Td>
                <Td>{r.medal !== "none" ? <Badge tone={medalTone[r.medal]}>{r.medal}</Badge> : "—"}</Td>
                <Td className="text-right"><button onClick={() => del([r._id])} title="Delete" className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><Trash2 className="h-4 w-4" /></button></Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
