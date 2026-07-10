"use client";
import { useEffect, useState, useCallback } from "react";
import { Download, Eye, Trash2, RefreshCw } from "lucide-react";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/Toast";
import { Button, Badge, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";

const STATUS = ["pending", "verified", "paid", "rejected"];
const TONE = { pending: "grey", verified: "navy", paid: "green", rejected: "red" };

export default function AdminRegistrationsPage() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [view, setView] = useState(null);

  const load = useCallback(async () => {
    setItems(null);
    const q = new URLSearchParams();
    if (slug) q.set("slug", slug);
    if (status) q.set("status", status);
    try { const r = await api.get(`/api/registration?${q}`); setItems(r.data.items); }
    catch (e) { toast.error(e.message); setItems([]); }
  }, [slug, status, toast]);

  useEffect(() => { load(); }, [load]);

  const setStatusFor = async (id, s) => {
    try { await api.patch("/api/registration", { id, status: s }); toast.success("Updated"); load(); }
    catch (e) { toast.error(e.message); }
  };
  const remove = async (id) => {
    if (!confirm("Delete this registration?")) return;
    try { await api.del("/api/registration", { id }); toast.success("Deleted"); load(); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="School Registrations" subtitle="Olympiad registration submissions"
        action={
          <div className="flex gap-2">
            <a href={`/api/registration?export=xlsx${slug ? `&slug=${slug}` : ""}`}>
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
            </a>
            <Button variant="ghost" onClick={load} className="gap-2"><RefreshCw className="h-4 w-4" /> Refresh</Button>
          </div>
        } />

      <div className="mb-4 flex flex-wrap gap-2">
        <select value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-xl border-2 border-line bg-white px-3 py-2 text-sm">
          <option value="">All programmes</option>
          <option value="olympiad">Olympiad (I–X)</option>
          <option value="wonderkids">Wonder Kids</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border-2 border-line bg-white px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {!items ? <Spinner /> : items.length === 0 ? (
        <EmptyState title="No registrations yet" text="Submissions will appear here as schools register." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>School</Th><Th>Programme</Th><Th>Students</Th><Th>Amount</Th><Th>Status</Th><Th>Submitted</Th><Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id}>
                <Td>
                  <div className="font-bold text-ink">{r.schoolName || "—"}</div>
                  <div className="text-xs text-ink-soft">{r.email}</div>
                </Td>
                <Td><span className="text-xs">{r.formSlug}</span></Td>
                <Td>{r.totalStudents}</Td>
                <Td>₹{r.totalAmount}</Td>
                <Td>
                  <select value={r.status} onChange={(e) => setStatusFor(r._id, e.target.value)}
                    className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-semibold">
                    {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Td>
                <Td className="text-xs">{new Date(r.createdAt).toLocaleDateString("en-IN")}</Td>
                <Td className="text-right">
                  <button onClick={() => setView(r)} className="mr-2 text-navy hover:text-gold-dark"><Eye className="h-4 w-4" /></button>
                  <button onClick={() => remove(r._id)} className="text-crimson hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      <Modal open={!!view} onClose={() => setView(null)} title={view?.schoolName || "Registration"}>
        {view && (
          <div className="max-h-[60vh] space-y-2 overflow-y-auto text-sm">
            <div className="mb-3 flex gap-2">
              <Badge tone={TONE[view.status]}>{view.status}</Badge>
              <Badge tone="gold">{view.totalStudents} students</Badge>
              <Badge tone="navy">₹{view.totalAmount}</Badge>
            </div>
            {Object.entries(view.data || {}).filter(([k]) => !k.startsWith("_")).map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-2 border-b border-line py-1.5">
                <span className="font-semibold text-ink-soft">{k}</span>
                <span className="col-span-2 break-words text-ink">
                  {typeof v === "object" ? JSON.stringify(v) : String(v)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
