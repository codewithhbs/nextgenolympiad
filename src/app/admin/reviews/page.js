"use client";
import { useEffect, useState, useCallback } from "react";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";
import { Spinner, Badge } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const medalTone = { gold: "orange", silver: "grey", bronze: "red", none: "ink" };

export default function AdminReviewRanksPage() {
  const toast = useToast();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get("/api/schools?status=approved&limit=200").then((r) => setSchools(r.data.items || [])).catch(() => {}); }, []);
  const load = useCallback(async () => {
    if (!school) { setItems([]); return; }
    setLoading(true);
    try { const r = await api.get(`/api/results/school?school=${school}`); setItems((r.data.items || []).filter((x) => x.medal !== "none").slice(0, 50)); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [school, toast]);
  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <PageHeader title="Review Ranks" subtitle="Spot-check top rank-holders & medal winners per school" />
      <select value={school} onChange={(e) => setSchool(e.target.value)}
        className="mb-4 rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron">
        <option value="">— Select school —</option>
        {schools.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
      </select>
      {loading ? <Spinner /> : !school ? <EmptyState title="Select a school" /> : items.length === 0 ? <EmptyState title="No medal winners yet" /> : (
        <TableWrap>
          <thead><tr><Th>Rank</Th><Th>Name</Th><Th>Code</Th><Th>%</Th><Th>Medal</Th></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="hover:bg-cloud">
                <Td><span className="font-bold">{r.rank || "—"}</span></Td>
                <Td>{r.studentName}</Td>
                <Td><span className="font-mono text-xs">{r.studentCode}</span></Td>
                <Td>{r.percentage}%</Td>
                <Td><Badge tone={medalTone[r.medal]}>{r.medal}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
