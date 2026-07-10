"use client";
import { useEffect, useState, useCallback } from "react";
import { Mail, Reply, Trash2 } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button, Textarea, Badge, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const tone = { new: "orange", read: "ink", replied: "green", closed: "grey" };
const tabs = ["", "new", "read", "replied", "closed"];

export default function AdminContactsPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [active, setActive] = useState(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await api.get(`/api/contact${status ? `?status=${status}` : ""}`); setItems(r.data.items || []); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [status, toast]);
  useEffect(() => { load(); }, [load]);

  const open = async (c) => {
    setActive(c); setReply("");
    if (c.status === "new") { try { await api.patch(`/api/contact/${c._id}`, { status: "read" }); load(); } catch {} }
  };
  const sendReply = async () => {
    if (!reply.trim()) return toast.error("Write a reply");
    setBusy(true);
    try { await api.patch(`/api/contact/${active._id}`, { reply }); toast.success("Reply sent"); setActive(null); load(); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const remove = async (id) => {
    if (!confirm("Delete this query?")) return;
    try { await api.del(`/api/contact/${id}`); toast.success("Deleted"); load(); } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="Contact Queries" subtitle="Messages from the website contact form" />
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t || "all"} onClick={() => setStatus(t)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize ${status === t ? "bg-ink text-white" : "bg-white text-ink-soft hover:bg-sky"}`}>
            {t || "all"}
          </button>
        ))}
      </div>
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState title="No queries" /> : (
        <div className="grid gap-3">
          {items.map((c) => (
            <div key={c._id} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{c.name}</span>
                    <Badge tone={tone[c.status]}>{c.status}</Badge>
                  </div>
                  <div className="text-xs text-ink-soft">{c.email}{c.phone ? ` • ${c.phone}` : ""}</div>
                  {c.subject && <div className="mt-1 text-sm font-semibold text-ink">{c.subject}</div>}
                  <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{c.message}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => open(c)} className="rounded-lg p-2 text-saffron hover:bg-saffron-soft"><Reply className="h-4 w-4" /></button>
                  <button onClick={() => remove(c._id)} className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!active} onClose={() => setActive(null)} title="Reply to enquiry">
        {active && (
          <div className="grid gap-3">
            <div className="rounded-xl bg-cloud p-3 text-sm">
              <div className="font-bold text-ink">{active.name} <span className="font-normal text-ink-soft">• {active.email}</span></div>
              <p className="mt-1 text-ink-soft">{active.message}</p>
            </div>
            {active.reply?.message && <div className="rounded-xl bg-leaf/10 p-3 text-sm text-ink-soft">Previous reply: {active.reply.message}</div>}
            <Textarea label="Your reply" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your response…" />
            <div className="flex gap-2">
              <Button onClick={sendReply} loading={busy}><Mail className="h-4 w-4" /> Send reply</Button>
              <Button variant="ghost" onClick={() => api.patch(`/api/contact/${active._id}`, { status: "closed" }).then(() => { setActive(null); load(); })}>Mark closed</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
