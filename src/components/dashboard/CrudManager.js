"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

/**
 * fields: [{ name, label, type: "text"|"textarea"|"number"|"image"|"select", options?, required? }]
 * render: (item) => JSX for the list row card
 */
export default function CrudManager({ title, subtitle, endpoint, fields, empty, render, uploadFolder = "nextgen" }) {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await api.get(endpoint); setItems(r.data.items || []); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [endpoint, toast]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm({}); setOpen(true); };
  const openEdit = (item) => { setForm(item); setOpen(true); };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const upload = (k) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await api.upload(file, uploadFolder);
      setForm((f) => ({ ...f, [k]: { url: data.url, publicId: data.publicId } }));
      toast.success("Image uploaded");
    } catch (er) { toast.error(er.message); } finally { setUploading(false); }
  };

  const save = async () => {
    for (const f of fields) if (f.required && !form[f.name]) return toast.error(`${f.label} is required`);
    setBusy(true);
    try {
      await api.post(endpoint, form);
      toast.success("Saved");
      setOpen(false); load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    try { await api.del(endpoint, { id }); toast.success("Deleted"); load(); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle}
        action={<Button onClick={openNew}><Plus className="h-4 w-4" /> Add new</Button>} />

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState title={empty || "No items yet"} text="Click “Add new” to create one." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="flex flex-col rounded-2xl bg-white p-5 shadow-card">
              <div className="flex-1">{render(item)}</div>
              <div className="mt-4 flex gap-2 border-t border-ink/5 pt-3">
                <button onClick={() => openEdit(item)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-ink hover:bg-sky"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                <button onClick={() => remove(item._id)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-cherry hover:bg-cherry/10"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={form._id ? "Edit" : "Add new"}>
        <div className="grid gap-4">
          {fields.map((f) => {
            if (f.type === "textarea") return <Textarea key={f.name} label={f.label} value={form[f.name] || ""} onChange={set(f.name)} placeholder={f.placeholder} />;
            if (f.type === "number") return <Input key={f.name} type="number" label={f.label} value={form[f.name] ?? ""} onChange={set(f.name)} />;
            if (f.type === "select") return (
              <label key={f.name} className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">{f.label}</span>
                <select value={form[f.name] || ""} onChange={set(f.name)} className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 text-ink outline-none focus:border-saffron">
                  <option value="">— Select —</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>
            );
            if (f.type === "image") return (
              <div key={f.name}>
                <span className="mb-1.5 block text-sm font-semibold text-ink">{f.label}</span>
                {form[f.name]?.url && <img src={form[f.name].url} alt="" className="mb-2 h-24 w-full rounded-xl object-cover" />}
                <input type="file" accept="image/*" onChange={upload(f.name)} className="text-sm" />
                {uploading && <span className="ml-2 text-xs text-saffron">Uploading…</span>}
              </div>
            );
            return <Input key={f.name} label={f.label} value={form[f.name] || ""} onChange={set(f.name)} placeholder={f.placeholder} />;
          })}
          <div className="flex gap-2">
            <Button onClick={save} loading={busy}>Save</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
