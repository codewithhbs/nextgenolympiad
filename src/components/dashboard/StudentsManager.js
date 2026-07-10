"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, UserRound } from "lucide-react";
import { PageHeader, EmptyState, TableWrap, Th, Td } from "@/components/dashboard/ui";
import { Button, Input, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const blank = { name: "", studentCode: "", class: "", section: "", gender: "male", parentName: "", mobile: "", image: null };

/** schoolId: pass when used by admin (to scope + attach). Omit for school role (server scopes to own school). */
export default function StudentsManager({ schoolId = null, schools = null }) {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selSchool, setSelSchool] = useState(schoolId || "");

  const effectiveSchool = schools ? selSchool : schoolId;

  const load = useCallback(async () => {
    if (schools && !selSchool) { setItems([]); setLoading(false); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (effectiveSchool) params.set("school", effectiveSchool);
      if (q) params.set("q", q);
      const r = await api.get(`/api/students?${params}`);
      setItems(r.data.items || []);
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [effectiveSchool, q, schools, selSchool, toast]);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditId(null); setOpen(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditId(s._id); setOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const uploadImg = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try { const d = await api.upload(file, "nextgen/students"); setForm((f) => ({ ...f, image: { url: d.url, publicId: d.publicId } })); toast.success("Photo uploaded"); }
    catch (er) { toast.error(er.message); } finally { setUploading(false); }
  };

  const save = async () => {
    if (!form.name || !form.studentCode || !form.class) return toast.error("Name, code and class are required");
    if (schools && !selSchool) return toast.error("Select a school first");
    setBusy(true);
    try {
      if (editId) await api.patch(`/api/students/${editId}`, form);
      else await api.post("/api/students", schools ? { ...form, school: selSchool } : form);
      toast.success("Saved"); setOpen(false); load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const remove = async (id) => {
    if (!confirm("Delete this student?")) return;
    try { await api.del(`/api/students/${id}`); toast.success("Deleted"); load(); } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="Students" subtitle="Manage student records"
        action={<Button onClick={openNew}><Plus className="h-4 w-4" /> Add student</Button>} />

      <div className="mb-4 flex flex-wrap gap-3">
        {schools && (
          <select value={selSchool} onChange={(e) => setSelSchool(e.target.value)}
            className="rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron">
            <option value="">— Select school —</option>
            {schools.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
          </select>
        )}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or code…"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-saffron" />
        </div>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState title="No students" text={schools && !selSchool ? "Select a school to view students." : "Add your first student."} />
      ) : (
        <TableWrap>
          <thead><tr><Th>Student</Th><Th>Code</Th><Th>Class</Th><Th>Parent</Th><Th>Mobile</Th><Th className="text-right">Actions</Th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id} className="hover:bg-cloud">
                <Td>
                  <div className="flex items-center gap-2">
                    {s.image?.url ? <img src={s.image.url} alt="" className="h-9 w-9 rounded-full object-cover" />
                      : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky text-ink"><UserRound className="h-4 w-4" /></div>}
                    <span className="font-bold text-ink">{s.name}</span>
                  </div>
                </Td>
                <Td><span className="font-mono text-xs">{s.studentCode}</span></Td>
                <Td>{s.class}{s.section ? `-${s.section}` : ""}</Td>
                <Td>{s.parentName || "—"}</Td>
                <Td>{s.mobile || "—"}</Td>
                <Td className="text-right">
                  <div className="inline-flex gap-1.5">
                    <button onClick={() => openEdit(s)} className="rounded-lg p-2 text-ink hover:bg-sky"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(s._id)} className="rounded-lg p-2 text-cherry hover:bg-cherry/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "Edit student" : "Add student"}>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            {form.image?.url ? <img src={form.image.url} alt="" className="h-16 w-16 rounded-full object-cover" />
              : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky text-ink"><UserRound className="h-7 w-7" /></div>}
            <div>
              <span className="mb-1 block text-sm font-semibold text-ink">Photo</span>
              <input type="file" accept="image/*" onChange={uploadImg} className="text-sm" />
              {uploading && <span className="ml-2 text-xs text-saffron">Uploading…</span>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name *" value={form.name} onChange={set("name")} />
            <Input label="Student code *" value={form.studentCode} onChange={set("studentCode")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Class *" value={form.class} onChange={set("class")} />
            <Input label="Section" value={form.section} onChange={set("section")} />
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Gender</span>
              <select value={form.gender} onChange={set("gender")} className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron">
                {["male", "female", "other"].map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Parent name" value={form.parentName} onChange={set("parentName")} />
            <Input label="Mobile" value={form.mobile} onChange={set("mobile")} />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} loading={busy}>Save</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
