"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, Search, UserRound, FileSpreadsheet, Download, Upload, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { PageHeader, EmptyState, TableWrap, Th, Td } from "@/components/dashboard/ui";
import { Button, Input, Spinner } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const blank = { name: "", studentCode: "", class: "", section: "", subject: "", city: "", state: "", barcode: "", parentName: "", mobile: "", image: null };

const TEMPLATE_HEADERS = ["SNAME", "CLASS", "SECTION", "SUBJECT", "SCHOOL", "CITY", "STATE", "ENROLLMENT NO", "BARCODE"];

async function uploadExcel(file, school, dryRun) {
  const send = async () => {
    const fd = new FormData();
    fd.append("file", file);
    if (school) fd.append("school", school);
    fd.append("dryRun", dryRun ? "true" : "false");
    return fetch("/api/students/bulk", { method: "POST", body: fd, credentials: "include" });
  };
  let res = await send();
  if (res.status === 401) {
    const r = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
    if (r.ok) res = await send();
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || "Upload failed"), { errors: data.errors });
  return data.data;
}

/** schoolId: pass when used by admin (to scope + attach). Omit for school role (server scopes to own school). */
export default function StudentsManager({ schoolId = null, schools = null }) {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selSchool, setSelSchool] = useState(schoolId || "");

  // bulk upload state
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bulkResult, setBulkResult] = useState(null);
  const [bulkErrors, setBulkErrors] = useState([]);
  const [bulkBusy, setBulkBusy] = useState(false);
  const fileRef = useRef(null);

  const effectiveSchool = schools ? selSchool : schoolId;
  const selectedSchoolObj = schools?.find((s) => s._id === selSchool);

  const load = useCallback(async () => {
    if (schools && !selSchool) { setItems([]); setSubjects([]); setLoading(false); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (effectiveSchool) params.set("school", effectiveSchool);
      if (q) params.set("q", q);
      if (subjectFilter) params.set("subject", subjectFilter);
      const r = await api.get(`/api/students?${params}`);
      setItems(r.data.items || []);
      setSubjects(r.data.subjects || []);
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [effectiveSchool, q, subjectFilter, schools, selSchool, toast]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const openNew = () => {
    if (schools && !selSchool) return toast.error("Select a school first");
    setForm({ ...blank, subject: subjectFilter || "" }); setEditId(null); setOpen(true);
  };
  const openEdit = (s) => { setForm({ ...blank, ...s }); setEditId(s._id); setOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const uploadImg = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try { const d = await api.upload(file, "nextgen/students"); setForm((f) => ({ ...f, image: { url: d.url, publicId: d.publicId } })); toast.success("Photo uploaded"); }
    catch (er) { toast.error(er.message); } finally { setUploading(false); }
  };

  const save = async () => {
    if (!form.name || !form.studentCode || !form.class) return toast.error("Name, enrollment no and class are required");
    if (schools && !selSchool) return toast.error("Select a school first");
    setBusy(true);
    try {
      const { _id, school, createdAt, updatedAt, __v, gender, ...payload } = form;
      if (editId) await api.patch(`/api/students/${editId}`, payload);
      else await api.post("/api/students", schools ? { ...payload, school: selSchool } : payload);
      toast.success("Saved"); setOpen(false); load();
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const remove = async (id) => {
    if (!confirm("Delete this student?")) return;
    try { await api.del(`/api/students/${id}`); toast.success("Deleted"); load(); } catch (e) { toast.error(e.message); }
  };

  // ---------- Bulk Excel ----------
  const resetBulk = () => { setBulkFile(null); setPreview(null); setBulkResult(null); setBulkErrors([]); if (fileRef.current) fileRef.current.value = ""; };
  const openBulk = () => {
    if (schools && !selSchool) return toast.error("Select a school first");
    resetBulk(); setBulkOpen(true);
  };

  const downloadTemplate = async () => {
    const XLSX = await import("xlsx");
    const schoolName = selectedSchoolObj?.name || "YOUR SCHOOL NAME";
    const rows = [
      TEMPLATE_HEADERS,
      ["AREESHA", 1, "A", "ENGLISH", schoolName, "NEW DELHI", "DELHI", 1001, 1001],
      ["AFIYA FATIMA", 1, "A", "ENGLISH", schoolName, "NEW DELHI", "DELHI", 1002, 1002],
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 28 }, { wch: 8 }, { wch: 9 }, { wch: 14 }, { wch: 32 }, { wch: 14 }, { wch: 12 }, { wch: 15 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "students-upload-template.xlsx");
  };

  const pickFile = async (e) => {
    const f = e.target.files?.[0];
    setPreview(null); setBulkResult(null); setBulkErrors([]);
    if (!f) return setBulkFile(null);
    setBulkFile(f);
    setBulkBusy(true);
    try {
      const d = await uploadExcel(f, schools ? selSchool : null, true);
      setPreview(d); setBulkErrors(d.errors || []);
    } catch (er) { toast.error(er.message); setBulkErrors(er.errors || []); }
    finally { setBulkBusy(false); }
  };

  const confirmImport = async () => {
    if (!bulkFile) return;
    setBulkBusy(true);
    try {
      const d = await uploadExcel(bulkFile, schools ? selSchool : null, false);
      setBulkResult(d); setPreview(null); setBulkErrors(d.errors || []);
      toast.success(`${d.inserted} added, ${d.updated} updated`);
      load();
    } catch (er) { toast.error(er.message); setBulkErrors(er.errors || []); }
    finally { setBulkBusy(false); }
  };

  const selectCls = "rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 outline-none focus:border-saffron";

  return (
    <div>
      <PageHeader title="Students" subtitle="Manage student records — add one by one or upload Excel"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={openBulk}><FileSpreadsheet className="h-4 w-4" /> Upload Excel</Button>
            <Button onClick={openNew}><Plus className="h-4 w-4" /> Add student</Button>
          </div>
        } />

      <div className="mb-4 flex flex-wrap gap-3">
        {schools && (
          <select value={selSchool} onChange={(e) => { setSelSchool(e.target.value); setSubjectFilter(""); }} className={selectCls}>
            <option value="">— Select school —</option>
            {schools.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
          </select>
        )}
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className={selectCls}>
          <option value="">All subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, enrollment no or barcode…"
            className="w-full rounded-xl border-2 border-ink/10 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-saffron" />
        </div>
      </div>

      {!loading && items.length > 0 && <p className="mb-2 text-sm text-ink/60">{items.length} student(s)</p>}

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState title="No students" text={schools && !selSchool ? "Select a school to view students." : "Add a student or upload an Excel file."} />
      ) : (
        <TableWrap>
          <thead><tr><Th>Student</Th><Th>Enrollment No</Th><Th>Class</Th><Th>Subject</Th><Th>City / State</Th><Th>Barcode</Th><Th className="text-right">Actions</Th></tr></thead>
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
                <Td>{s.subject || "—"}</Td>
                <Td>{[s.city, s.state].filter(Boolean).join(", ") || "—"}</Td>
                <Td><span className="font-mono text-xs">{s.barcode || "—"}</span></Td>
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

      {/* ---------- Add / Edit ---------- */}
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
            <Input label="Enrollment no *" value={form.studentCode} onChange={set("studentCode")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Class *" value={form.class} onChange={set("class")} />
            <Input label="Section" value={form.section} onChange={set("section")} />
            <Input label="Subject name" value={form.subject} onChange={set("subject")} placeholder="e.g. ENGLISH" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" value={form.city} onChange={set("city")} />
            <Input label="State" value={form.state} onChange={set("state")} />
            <Input label="Barcode" value={form.barcode} onChange={set("barcode")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Parent name" value={form.parentName || ""} onChange={set("parentName")} />
            <Input label="Mobile" value={form.mobile || ""} onChange={set("mobile")} />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} loading={busy}>Save</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* ---------- Bulk Excel upload ---------- */}
      <Modal open={bulkOpen} onClose={() => setBulkOpen(false)} title="Upload students via Excel" wide>
        <div className="grid gap-4">
          {selectedSchoolObj && (
            <p className="rounded-xl bg-sky px-4 py-2 text-sm text-ink">School: <b>{selectedSchoolObj.name}</b> ({selectedSchoolObj.code})</p>
          )}

          <div className="rounded-xl border-2 border-dashed border-ink/15 p-4 text-sm text-ink/70">
            <p className="mb-2 font-semibold text-ink">Required columns (first row = headings):</p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {TEMPLATE_HEADERS.map((h) => (
                <span key={h} className="rounded-md bg-cloud px-2 py-1 font-mono text-xs text-ink">{h}</span>
              ))}
            </div>
            <p>SNAME, CLASS, ENROLLMENT NO are mandatory. Same ENROLLMENT NO + SUBJECT re-upload karne par record update hoga (duplicate nahi banega).</p>
            <button onClick={downloadTemplate} className="mt-3 inline-flex items-center gap-1.5 font-semibold text-saffron hover:underline">
              <Download className="h-4 w-4" /> Download sample template
            </button>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-ink/10 bg-white px-4 py-3 hover:border-saffron">
            <Upload className="h-5 w-5 text-saffron" />
            <span className="flex-1 truncate text-sm">{bulkFile ? bulkFile.name : "Choose .xlsx / .xls / .csv file"}</span>
            {bulkFile && <button type="button" onClick={(e) => { e.preventDefault(); resetBulk(); }} className="rounded p-1 hover:bg-sky"><X className="h-4 w-4" /></button>}
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={pickFile} className="hidden" />
          </label>

          {bulkBusy && <div className="flex items-center gap-2 text-sm text-ink/60"><Spinner /> Processing…</div>}

          {preview?.warnings?.map((w, i) => (
            <p key={i} className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm text-amber-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{w}</p>
          ))}

          {preview && (
            <>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-cloud p-3"><div className="text-2xl font-bold text-ink">{preview.count}</div><div className="text-xs text-ink/60">Valid rows</div></div>
                <div className="rounded-xl bg-emerald-50 p-3"><div className="text-2xl font-bold text-emerald-700">{preview.newCount}</div><div className="text-xs text-ink/60">New</div></div>
                <div className="rounded-xl bg-sky p-3"><div className="text-2xl font-bold text-ink">{preview.updateCount}</div><div className="text-xs text-ink/60">Will update</div></div>
              </div>
              <div className="max-h-72 overflow-auto rounded-xl border border-ink/10">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-cloud text-left">
                    <tr>{["#", "Name", "Class", "Sec", "Subject", "Enroll No", "Barcode", ""].map((h) => <th key={h} className="px-2 py-2 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {preview.preview.map((p) => (
                      <tr key={p.line} className="border-t border-ink/5">
                        <td className="px-2 py-1.5 text-ink/40">{p.line}</td>
                        <td className="px-2 py-1.5 font-semibold">{p.name}</td>
                        <td className="px-2 py-1.5">{p.class}</td>
                        <td className="px-2 py-1.5">{p.section}</td>
                        <td className="px-2 py-1.5">{p.subject || "—"}</td>
                        <td className="px-2 py-1.5 font-mono">{p.studentCode}</td>
                        <td className="px-2 py-1.5 font-mono">{p.barcode}</td>
                        <td className="px-2 py-1.5">
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${p.status === "new" ? "bg-emerald-100 text-emerald-700" : "bg-sky text-ink"}`}>{p.status === "new" ? "NEW" : "UPDATE"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.count > preview.preview.length && <p className="p-2 text-center text-xs text-ink/50">+ {preview.count - preview.preview.length} more rows</p>}
              </div>
            </>
          )}

          {bulkResult && (
            <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-5 w-5" /> {bulkResult.inserted} students added, {bulkResult.updated} updated.
            </p>
          )}

          {bulkErrors.length > 0 && (
            <div className="max-h-40 overflow-auto rounded-xl bg-cherry/5 p-3 text-xs text-cherry">
              <p className="mb-1 font-bold">{bulkErrors.length} row(s) skipped:</p>
              {bulkErrors.map((e, i) => <div key={i}>Row {e.line}: {e.error}</div>)}
            </div>
          )}

          <div className="flex gap-2">
            {preview && !bulkResult && (
              <Button onClick={confirmImport} loading={bulkBusy}><Upload className="h-4 w-4" /> Import {preview.count} students</Button>
            )}
            <Button variant="ghost" onClick={() => setBulkOpen(false)}>{bulkResult ? "Done" : "Cancel"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
