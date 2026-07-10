"use client";
import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";
import { Spinner, Badge } from "@/components/ui";
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

  useEffect(() => { api.get("/api/schools?status=approved&limit=200").then((r) => setSchools(r.data.items || [])).catch(() => {}); }, []);

  const load = useCallback(async () => {
    if (!school) { setItems([]); return; }
    setLoading(true);
    try { const r = await api.get(`/api/results/school?school=${school}&q=${encodeURIComponent(q)}`); setItems(r.data.items || []); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [school, q, toast]);
  useEffect(() => { load(); }, [load]);

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
      {loading ? <Spinner /> : !school ? <EmptyState title="Select a school to view results" /> : items.length === 0 ? <EmptyState title="No results found" /> : (
        <TableWrap>
          <thead><tr><Th>Rank</Th><Th>Code</Th><Th>Name</Th><Th>Class</Th><Th>Total</Th><Th>%</Th><Th>Medal</Th></tr></thead>
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
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
