"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Check, X, Ban, Eye, Trash2 } from "lucide-react";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";
import { Button, Input, Badge, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const statusTone = { pending: "orange", approved: "green", rejected: "red", suspended: "grey" };
const filters = ["", "pending", "approved", "rejected", "suspended"];

export default function AdminSchoolsPage() {
  const toast = useToast();
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [sel, setSel] = useState([]);

  const load = useCallback(async () => {
    setLoading(true); setSel([]);
    try {
      const params = new URLSearchParams({ q, status, page: String(page), limit: "15" });
      const res = await api.get(`/api/schools?${params}`);
      setData(res.data);
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [q, status, page, toast]);

  useEffect(() => { load(); }, [load]);

  const act = async (id, action, reasonText) => {
    setBusy(true);
    try {
      await api.post(`/api/schools/${id}/approve`, { action, reason: reasonText });
      toast.success(`School ${action}d`);
      setRejecting(null); setReason(""); setView(null);
      load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  const del = async (ids) => {
    if (!confirm(ids.length === 1 ? "Delete this school?" : `Delete ${ids.length} selected schools?`)) return;
    try { await api.post("/api/schools/bulk-delete", { ids }); toast.success("Deleted"); setView(null); load(); } catch (e) { toast.error(e.message); }
  };
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSel = data.items.length > 0 && sel.length === data.items.length;

  return (
    <div>
      <PageHeader title="Schools" subtitle="Review and manage registered schools" />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} placeholder="Search name, email, code…"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2.5 pl-10 pr-4 text-ink outline-none focus:border-saffron" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f || "all"} onClick={() => { setPage(1); setStatus(f); }}
              className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize transition ${status === f ? "bg-ink text-white" : "bg-white text-ink-soft hover:bg-sky"}`}>
              {f || "all"}
            </button>
          ))}
        </div>
      </div>

      {sel.length > 0 && (
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-cherry/10 px-4 py-2.5">
          <span className="text-sm font-semibold text-ink">{sel.length} selected</span>
          <Button variant="danger" size="sm" onClick={() => del(sel)}><Trash2 className="h-4 w-4" /> Delete selected</Button>
          <button onClick={() => setSel([])} className="text-sm font-semibold text-ink-soft hover:underline">Clear</button>
        </div>
      )}
      {loading ? <Spinner /> : data.items.length === 0 ? (
        <EmptyState title="No schools found" text="Try a different search or filter." />
      ) : (
        <>
          <TableWrap>
            <thead>
              <tr>
                <Th><input type="checkbox" className="h-4 w-4 accent-saffron" checked={allSel} onChange={() => setSel(allSel ? [] : data.items.map((s) => s._id))} /></Th><Th>School</Th><Th>Code</Th><Th>Contact</Th><Th>Status</Th><Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((s) => (
                <tr key={s._id} className="hover:bg-cloud">
                  <Td><input type="checkbox" className="h-4 w-4 accent-saffron" checked={sel.includes(s._id)} onChange={() => toggle(s._id)} /></Td>
                  <Td>
                    <div className="font-bold text-ink">{s.name}</div>
                    <div className="text-xs text-ink-soft">{s.city || "—"}{s.state ? `, ${s.state}` : ""}</div>
                  </Td>
                  <Td><span className="font-mono text-xs">{s.code}</span></Td>
                  <Td>
                    <div className="text-sm">{s.email}</div>
                    <div className="text-xs text-ink-soft">{s.phone}</div>
                  </Td>
                  <Td><Badge tone={statusTone[s.status]}>{s.status}</Badge></Td>
                  <Td className="text-right">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => setView(s)} title="View" className="rounded-lg p-2 text-ink hover:bg-sky"><Eye className="h-4 w-4" /></button>
                      {s.status !== "approved" && (
                        <button onClick={() => act(s._id, "approve")} disabled={busy} title="Approve" className="rounded-lg p-2 text-leaf hover:bg-leaf/10"><Check className="h-4 w-4" /></button>
                      )}
                      {s.status === "pending" && (
                        <button onClick={() => setRejecting(s)} title="Reject" className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><X className="h-4 w-4" /></button>
                      )}
                      {s.status === "approved" && (
                        <button onClick={() => act(s._id, "suspend")} disabled={busy} title="Suspend" className="rounded-lg p-2 text-ink-soft hover:bg-ink/5"><Ban className="h-4 w-4" /></button>
                      )}
                      <button onClick={() => del([s._id])} title="Delete" className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>

          {data.pages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
              <span className="text-sm text-ink-soft">Page {data.page} of {data.pages}</span>
              <Button variant="outline" size="sm" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          )}
        </>
      )}

      {/* View modal */}
      <Modal open={!!view} onClose={() => setView(null)} title="School details">
        {view && (
          <div className="grid gap-3 text-sm">
            {[["Name", view.name], ["Code", view.code], ["Email", view.email], ["Phone", view.phone],
              ["Contact person", view.contactPerson], ["Board", view.board], ["City", view.city],
              ["State", view.state], ["Pincode", view.pincode], ["Address", view.address]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-ink/5 pb-2">
                <span className="font-semibold text-ink-soft">{k}</span>
                <span className="text-right text-ink">{v || "—"}</span>
              </div>
            ))}
            <div className="flex justify-between"><span className="font-semibold text-ink-soft">Status</span><Badge tone={statusTone[view.status]}>{view.status}</Badge></div>
            {view.rejectionReason && <div className="rounded-lg bg-cherry/10 p-2 text-cherry">Reason: {view.rejectionReason}</div>}
            <div className="mt-2 flex gap-2">
              {view.status !== "approved" && <Button onClick={() => act(view._id, "approve")} loading={busy}>Approve</Button>}
              {view.status === "pending" && <Button variant="danger" onClick={() => { setRejecting(view); setView(null); }}>Reject</Button>}
            </div>
          </div>
        )}
      </Modal>

      {/* Reject modal */}
      <Modal open={!!rejecting} onClose={() => setRejecting(null)} title="Reject school">
        <div className="grid gap-4">
          <p className="text-sm text-ink-soft">Provide a reason (emailed to the school).</p>
          <Input label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Incomplete details" />
          <div className="flex gap-2">
            <Button variant="danger" loading={busy} onClick={() => act(rejecting._id, "reject", reason)}>Confirm reject</Button>
            <Button variant="ghost" onClick={() => setRejecting(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
