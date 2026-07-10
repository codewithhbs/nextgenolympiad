"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { PageHeader, EmptyState, TableWrap, Th, Td } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Badge, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const blank = { slug: "", title: "", type: "standard", content: "", showInNav: false, navOrder: 0, isPublished: true, seo: {} };

export default function AdminPagesPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [editingSlug, setEditingSlug] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await api.get("/api/cms/pages"); setItems(r.data.items || []); }
    catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [toast]);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditingSlug(null); setOpen(true); };
  const openEdit = (p) => { setForm({ ...blank, ...p, seo: p.seo || {} }); setEditingSlug(p.slug); setOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setSeo = (k) => (e) => setForm((f) => ({ ...f, seo: { ...f.seo, [k]: e.target.value } }));

  const save = async () => {
    if (!form.slug || !form.title) return toast.error("Slug and title are required");
    setBusy(true);
    try {
      const slug = form.slug.toLowerCase().trim().replace(/\s+/g, "-");
      await api.patch(`/api/cms/pages/${editingSlug || slug}`, { ...form, slug });
      toast.success("Page saved"); setOpen(false); load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const remove = async (slug) => {
    if (!confirm(`Delete page "${slug}"?`)) return;
    try { await api.del(`/api/cms/pages/${slug}`); toast.success("Deleted"); load(); } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="CMS Pages" subtitle="Create and edit website pages"
        action={<Button onClick={openNew}><Plus className="h-4 w-4" /> New page</Button>} />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState title="No pages yet" text="Create pages like about, privacy-policy, terms…" /> : (
        <TableWrap>
          <thead><tr><Th>Title</Th><Th>Slug</Th><Th>Type</Th><Th>Nav</Th><Th>Status</Th><Th className="text-right">Actions</Th></tr></thead>
          <tbody>
            {items.map((p) => (
              <tr key={p._id} className="hover:bg-cloud">
                <Td><span className="font-bold text-ink">{p.title}</span></Td>
                <Td><span className="font-mono text-xs">/{p.slug}</span></Td>
                <Td className="capitalize">{p.type}</Td>
                <Td>{p.showInNav ? <Badge tone="green">yes</Badge> : <Badge tone="grey">no</Badge>}</Td>
                <Td>{p.isPublished ? <Badge tone="green">published</Badge> : <Badge tone="orange">draft</Badge>}</Td>
                <Td className="text-right">
                  <div className="inline-flex gap-1.5">
                    <a href={`/${p.slug}`} target="_blank" className="rounded-lg p-2 text-ink hover:bg-sky"><ExternalLink className="h-4 w-4" /></a>
                    <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-ink hover:bg-sky"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(p.slug)} className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editingSlug ? "Edit page" : "New page"} wide>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" value={form.title} onChange={set("title")} placeholder="About Us" />
            <Input label="Slug" value={form.slug} onChange={set("slug")} placeholder="about" disabled={!!editingSlug} />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Type</span>
            <select value={form.type} onChange={set("type")} className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron">
              {["standard", "policy", "custom"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <Textarea label="Content (HTML allowed)" value={form.content} onChange={set("content")} rows={8} placeholder="<h2>Heading</h2><p>Body…</p>" />
          <div className="grid gap-4 rounded-xl bg-cloud p-4 sm:grid-cols-2">
            <Input label="Meta title" value={form.seo?.metaTitle || ""} onChange={setSeo("metaTitle")} />
            <Input label="Meta description" value={form.seo?.metaDescription || ""} onChange={setSeo("metaDescription")} />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input type="checkbox" checked={!!form.showInNav} onChange={(e) => setForm({ ...form, showInNav: e.target.checked })} /> Show in nav
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input type="checkbox" checked={!!form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Published
            </label>
            <Input label="" type="number" value={form.navOrder} onChange={set("navOrder")} placeholder="Nav order" className="w-28" />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} loading={busy}>Save page</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
