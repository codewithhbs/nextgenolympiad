"use client";
import { useEffect, useState } from "react";
import { Plus, Save, Trash2, ExternalLink, Eye, EyeOff, ChevronUp, ChevronDown, GripVertical, Layers } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/Toast";
import { Button, Badge, Input, Textarea, Select, Spinner } from "@/components/ui";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";

const TYPES = ["text", "email", "tel", "url", "number", "password", "date", "textarea", "select", "radio", "checkbox", "note", "richtext", "subjectDates", "classMatrix"];
const HAS_OPTIONS = ["select", "radio"];
const slugify = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

const blankForm = () => ({
  slug: "", title: "", subtitle: "", isActive: true, order: 99,
  successMessage: "<p>Registration received. Our team will contact you shortly.</p>",
  steps: [{ key: "step1", title: "School Details", description: "", fields: [blankField()] }],
});
const blankField = () => ({ name: "", label: "", type: "text", required: false, colSpan: 1, placeholder: "", hint: "", options: [], showIf: { field: "", equals: "" } });

function move(arr, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const c = [...arr]; [c[i], c[j]] = [c[j], c[i]]; return c;
}

export default function AdminFormBuilder() {
  const toast = useToast();
  const [forms, setForms] = useState(null);
  const [f, setF] = useState(null); // editing form
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setForms(null);
    try { const r = await api.get("/api/registration-form?all=1"); setForms(r.data.forms); }
    catch (e) { toast.error(e.message); setForms([]); }
  };
  useEffect(() => { load(); }, []); // eslint-disable-line

  // ---- immutable updaters ----
  const setForm = (patch) => setF((p) => ({ ...p, ...patch }));
  const setStep = (si, patch) => setF((p) => { const steps = [...p.steps]; steps[si] = { ...steps[si], ...patch }; return { ...p, steps }; });
  const setField = (si, fi, patch) => setF((p) => {
    const steps = [...p.steps]; const fields = [...steps[si].fields];
    fields[fi] = { ...fields[fi], ...patch }; steps[si] = { ...steps[si], fields }; return { ...p, steps };
  });
  const addStep = () => setF((p) => ({ ...p, steps: [...p.steps, { key: `step${p.steps.length + 1}`, title: "New Step", description: "", fields: [blankField()] }] }));
  const delStep = (si) => setF((p) => ({ ...p, steps: p.steps.filter((_, i) => i !== si) }));
  const moveStep = (si, d) => setF((p) => ({ ...p, steps: move(p.steps, si, d) }));
  const addField = (si) => setStep(si, { fields: [...f.steps[si].fields, blankField()] });
  const delField = (si, fi) => setStep(si, { fields: f.steps[si].fields.filter((_, i) => i !== fi) });
  const moveField = (si, fi, d) => setStep(si, { fields: move(f.steps[si].fields, fi, d) });

  const save = async () => {
    if (!f.title) return toast.error("Form title is required");
    const slug = f.slug || slugify(f.title);
    // normalise field names + strip empty showIf
    const steps = f.steps.map((s, si) => ({
      ...s, key: s.key || `step${si + 1}`,
      fields: s.fields.map((fl) => ({
        ...fl,
        name: fl.name || slugify(fl.label) || `field_${Math.random().toString(36).slice(2, 6)}`,
        options: HAS_OPTIONS.includes(fl.type) ? (fl.options || []).filter((o) => o.value) : undefined,
        showIf: fl.showIf?.field ? fl.showIf : undefined,
      })),
    }));
    setSaving(true);
    try { await api.post("/api/registration-form", { ...f, slug, steps }); toast.success("Form saved"); await load(); setF(null); }
    catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };

  const toggleActive = async (form) => {
    try { await api.post("/api/registration-form", { ...form, isActive: !form.isActive }); toast.success(form.isActive ? "Hidden" : "Published"); load(); }
    catch (e) { toast.error(e.message); }
  };
  const remove = async (form) => {
    if (!confirm(`Delete "${form.title}"?`)) return;
    try { await api.del("/api/registration-form", { id: form._id }); toast.success("Deleted"); load(); }
    catch (e) { toast.error(e.message); }
  };

  // ---------------- EDITOR ----------------
  if (f) {
    return (
      <div className="mx-auto max-w-4xl">
        <PageHeader title={f._id ? "Edit form" : "New form"} subtitle="Build steps and fields visually — no code."
          action={<div className="flex gap-2"><Button variant="ghost" onClick={() => setF(null)}>Cancel</Button><Button variant="gold" onClick={save} loading={saving} className="gap-2"><Save className="h-4 w-4" /> Save</Button></div>} />

        {/* Form meta */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title *" value={f.title} onChange={(e) => setForm({ title: e.target.value })} />
            <Input label="Slug (URL id)" value={f.slug} onChange={(e) => setForm({ slug: slugify(e.target.value) })} placeholder="auto from title" hint="Used in the registration link" />
            <Input label="Subtitle" value={f.subtitle} onChange={(e) => setForm({ subtitle: e.target.value })} className="sm:col-span-1" />
            <Input label="Order" type="number" value={f.order} onChange={(e) => setForm({ order: Number(e.target.value) })} />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy">
            <input type="checkbox" checked={f.isActive} onChange={(e) => setForm({ isActive: e.target.checked })} className="h-4 w-4 accent-gold" /> Published (visible on the website)
          </label>
          <div className="mt-4">
            <span className="mb-1.5 block text-sm font-semibold text-navy">Success message (HTML allowed)</span>
            <RichTextEditor value={f.successMessage} onChange={(html) => setForm({ successMessage: html })} height={160} />
          </div>
        </div>

        {/* Steps */}
        {f.steps.map((s, si) => (
          <div key={si} className="mb-5 rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-gold-dark" />
              <span className="text-xs font-bold uppercase tracking-wide text-slate">Step {si + 1}</span>
              <div className="ml-auto flex gap-1">
                <button onClick={() => moveStep(si, -1)} className="rounded p-1 text-slate hover:bg-mist"><ChevronUp className="h-4 w-4" /></button>
                <button onClick={() => moveStep(si, 1)} className="rounded p-1 text-slate hover:bg-mist"><ChevronDown className="h-4 w-4" /></button>
                {f.steps.length > 1 && <button onClick={() => delStep(si)} className="rounded p-1 text-crimson hover:bg-crimson-soft"><Trash2 className="h-4 w-4" /></button>}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Step title" value={s.title} onChange={(e) => setStep(si, { title: e.target.value })} />
              <Input label="Step description" value={s.description} onChange={(e) => setStep(si, { description: e.target.value })} />
            </div>

            <div className="mt-4 space-y-3">
              {s.fields.map((fl, fi) => (
                <FieldEditor key={fi} field={fl} onChange={(patch) => setField(si, fi, patch)}
                  onDelete={() => delField(si, fi)} onUp={() => moveField(si, fi, -1)} onDown={() => moveField(si, fi, 1)} />
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-3 gap-1" onClick={() => addField(si)}><Plus className="h-4 w-4" /> Add field</Button>
          </div>
        ))}
        <Button variant="ghost" className="gap-1" onClick={addStep}><Plus className="h-4 w-4" /> Add step</Button>
      </div>
    );
  }

  // ---------------- LIST ----------------
  return (
    <div>
      <PageHeader title="Registration Forms" subtitle="Common builder for every registration form — steps, fields, validation and conditional logic."
        action={<Button variant="gold" onClick={() => setF(blankForm())} className="gap-2"><Plus className="h-4 w-4" /> New form</Button>} />
      {!forms ? <Spinner /> : forms.length === 0 ? <EmptyState title="No forms yet" text="Create your first registration form." /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div key={form._id} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg font-bold text-navy">{form.title}</div>
                  <div className="text-xs text-ink-soft">/{form.slug} · {form.steps?.length || 0} steps</div>
                </div>
                <Badge tone={form.isActive ? "green" : "grey"}>{form.isActive ? "Live" : "Hidden"}</Badge>
              </div>
              {form.subtitle && <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{form.subtitle}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setF({ ...form, steps: form.steps?.length ? form.steps.map(normStep) : blankForm().steps })}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => toggleActive(form)} className="gap-1">
                  {form.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}{form.isActive ? "Hide" : "Publish"}
                </Button>
                <Link href="/apply" target="_blank"><Button size="sm" variant="ghost" className="gap-1"><ExternalLink className="h-4 w-4" /></Button></Link>
                <button onClick={() => remove(form)} className="ml-auto text-crimson hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function normStep(s) {
  return { ...s, fields: (s.fields || []).map((fl) => ({ options: [], showIf: { field: "", equals: "" }, colSpan: 1, ...fl, showIf: fl.showIf || { field: "", equals: "" }, options: fl.options || [] })) };
}

function FieldEditor({ field, onChange, onDelete, onUp, onDown }) {
  const showOptions = HAS_OPTIONS.includes(field.type);
  const setOpt = (i, patch) => { const options = [...(field.options || [])]; options[i] = { ...options[i], ...patch }; onChange({ options }); };
  const addOpt = () => onChange({ options: [...(field.options || []), { label: "", value: "" }] });
  const delOpt = (i) => onChange({ options: field.options.filter((_, x) => x !== i) });

  return (
    <div className="rounded-xl border border-line bg-ivory p-3">
      <div className="flex items-start gap-2">
        <GripVertical className="mt-2 h-4 w-4 shrink-0 text-slate" />
        <div className="grid flex-1 gap-2 sm:grid-cols-12">
          <div className="sm:col-span-5"><Input label="Label" value={field.label} onChange={(e) => onChange({ label: e.target.value })} /></div>
          <div className="sm:col-span-3">
            <Select label="Type" value={field.type} onChange={(e) => onChange({ type: e.target.value })}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Select label="Width" value={field.colSpan} onChange={(e) => onChange({ colSpan: Number(e.target.value) })}>
              <option value={1}>Half</option><option value={2}>Full</option>
            </Select>
          </div>
          <div className="flex items-end sm:col-span-2">
            <label className="flex items-center gap-1.5 pb-2.5 text-xs font-semibold text-navy">
              <input type="checkbox" checked={!!field.required} onChange={(e) => onChange({ required: e.target.checked })} className="h-4 w-4 accent-gold" /> Required
            </label>
          </div>

          {!["note", "richtext", "checkbox", "subjectDates", "classMatrix"].includes(field.type) && (
            <div className="sm:col-span-6"><Input label="Placeholder" value={field.placeholder || ""} onChange={(e) => onChange({ placeholder: e.target.value })} /></div>
          )}
          <div className="sm:col-span-6"><Input label="Helper / note text" value={field.hint || ""} onChange={(e) => onChange({ hint: e.target.value })} /></div>

          {showOptions && (
            <div className="sm:col-span-12">
              <span className="mb-1 block text-xs font-semibold text-navy">Options</span>
              <div className="space-y-1.5">
                {(field.options || []).map((o, i) => (
                  <div key={i} className="flex gap-2">
                    <input placeholder="Label" value={o.label} onChange={(e) => setOpt(i, { label: e.target.value, value: o.value || slugifyOpt(e.target.value) })} className="w-full rounded-lg border border-line px-2 py-1.5 text-sm" />
                    <input placeholder="Value" value={o.value} onChange={(e) => setOpt(i, { value: e.target.value })} className="w-40 rounded-lg border border-line px-2 py-1.5 text-sm" />
                    <button onClick={() => delOpt(i)} className="text-crimson"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <button onClick={addOpt} className="mt-1.5 text-xs font-semibold text-gold-dark hover:underline">+ Add option</button>
            </div>
          )}

          <div className="sm:col-span-12">
            <span className="mb-1 block text-xs font-semibold text-slate">Show only if (optional)</span>
            <div className="flex gap-2">
              <input placeholder="field name" value={field.showIf?.field || ""} onChange={(e) => onChange({ showIf: { ...field.showIf, field: e.target.value } })} className="w-full rounded-lg border border-line px-2 py-1.5 text-sm" />
              <span className="self-center text-xs text-slate">equals</span>
              <input placeholder="value" value={field.showIf?.equals || ""} onChange={(e) => onChange({ showIf: { ...field.showIf, equals: e.target.value } })} className="w-full rounded-lg border border-line px-2 py-1.5 text-sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={onUp} className="rounded p-1 text-slate hover:bg-mist"><ChevronUp className="h-4 w-4" /></button>
          <button onClick={onDown} className="rounded p-1 text-slate hover:bg-mist"><ChevronDown className="h-4 w-4" /></button>
          <button onClick={onDelete} className="rounded p-1 text-crimson hover:bg-crimson-soft"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}

const slugifyOpt = (s) => (s || "").trim();
