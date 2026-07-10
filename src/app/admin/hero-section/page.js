"use client";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, ChevronUp, ChevronDown, Pencil, X, ImageOff, Smartphone, Monitor } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Select, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const emptySlide = { image: "", mobileImage: "", kicker: "", title: "", subtitle: "", ctaText: "", ctaHref: "" };

const move = (arr, i, dir) => {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const Page = () => {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [busy, setBusy] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // number = editing, "new" = creating, null = closed
  const [draft, setDraft] = useState(emptySlide);
  const [draftBusy, setDraftBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [mobileUploadBusy, setMobileUploadBusy] = useState(false);

  useEffect(() => {
    api.get("/api/settings").then((r) => setS(r.data.settings)).catch((e) => toast.error(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!s) return <Spinner />;

  const top = (k) => (e) => setS({ ...s, [k]: e.target.value });
  const slides = s.heroSlides || [];
  const setSlides = (v) => setS({ ...s, heroSlides: v });

  const persist = async (nextSlides) => {
    setBusy(true);
    try {
      await api.patch("/api/settings", { ...s, heroSlides: nextSlides });
      setS({ ...s, heroSlides: nextSlides });
      toast.success("Saved");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const reorder = (i, dir) => persist(move(slides, i, dir));
  const removeSlide = (i) => {
    if (!confirm("Delete this slide?")) return;
    persist(slides.filter((_, x) => x !== i));
  };

  const openNew = () => { setDraft(emptySlide); setEditIndex("new"); };
  const openEdit = (i) => { setDraft({ ...emptySlide, ...slides[i] }); setEditIndex(i); };
  const closeModal = () => setEditIndex(null);

  const uploadDraftImg = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadBusy(true);
    try {
      const d = await api.upload(file, "nextgen/hero");
      setDraft((prev) => ({ ...prev, image: d.url }));
      toast.success("Uploaded");
    } catch (er) { toast.error(er.message || "Upload failed or timed out"); }
    finally { setUploadBusy(false); }
  };

  const uploadDraftMobileImg = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMobileUploadBusy(true);
    try {
      const d = await api.upload(file, "nextgen/hero");
      setDraft((prev) => ({ ...prev, mobileImage: d.url }));
      toast.success("Uploaded");
    } catch (er) { toast.error(er.message || "Upload failed or timed out"); }
    finally { setMobileUploadBusy(false); }
  };

  const saveDraft = async () => {
    setDraftBusy(true);
    const next = editIndex === "new" ? [...slides, draft] : slides.map((sl, x) => (x === editIndex ? draft : sl));
    try {
      await api.patch("/api/settings", { ...s, heroSlides: next });
      setS({ ...s, heroSlides: next });
      toast.success(editIndex === "new" ? "Slide added" : "Slide updated");
      closeModal();
    } catch (e) { toast.error(e.message); }
    finally { setDraftBusy(false); }
  };

  return (
    <div>
      <section className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="mb-4 font-extrabold text-ink">Hero section</h2>

        <div className="space-y-2">
          {slides.map((sl, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-ivory p-3">
              <div className="flex flex-col gap-0.5">
                <button disabled={i === 0 || busy} onClick={() => reorder(i, -1)} className="rounded p-1 text-slate hover:bg-mist disabled:opacity-30">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button disabled={i === slides.length - 1 || busy} onClick={() => reorder(i, 1)} className="rounded p-1 text-slate hover:bg-mist disabled:opacity-30">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {sl.image ? (
                <img src={sl.image} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-mist text-slate">
                  <ImageOff className="h-5 w-5" />
                </div>
              )}

              {/* small mobile-image indicator so it's obvious at a glance which slides have one set */}
              <div
                className={`flex h-14 w-8 shrink-0 items-center justify-center rounded-lg border ${
                  sl.mobileImage ? "border-line bg-white" : "border-dashed border-line/70 bg-mist/50"
                }`}
                title={sl.mobileImage ? "Mobile image set" : "No mobile image — falls back to desktop image"}
              >
                {sl.mobileImage ? (
                  <img src={sl.mobileImage} alt="" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <Smartphone className="h-4 w-4 text-slate/50" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold uppercase tracking-wide text-slate">Slide {i + 1}</p>
                <p className="truncate font-semibold text-ink">
                  {s.heroMode === "banner" ? (sl.ctaHref || "No link set") : (sl.title || "Untitled slide")}
                </p>
                {s.heroMode !== "banner" && sl.subtitle && (
                  <p className="truncate text-xs text-ink-soft">{sl.subtitle}</p>
                )}
              </div>

              <div className="flex shrink-0 gap-1">
                <button onClick={() => openEdit(i)} className="rounded p-2 text-slate hover:bg-mist" title="Edit">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => removeSlide(i)} className="rounded p-2 text-crimson hover:bg-crimson-soft" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {slides.length === 0 && (
            <p className="rounded-xl border border-dashed border-line p-4 text-center text-xs text-ink-soft">
              No slides added — the site shows built-in default slides until you add your own.
            </p>
          )}
        </div>

        <Button variant="outline" size="sm" className="mt-3 gap-1" onClick={openNew}>
          <Plus className="h-4 w-4" /> Add slide
        </Button>
      </section>

      {editIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-extrabold text-ink">{editIndex === "new" ? "Add slide" : `Edit slide ${editIndex + 1}`}</h3>
              <button onClick={closeModal} className="rounded p-1 text-slate hover:bg-mist">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <Select label="Display mode" value={s.heroMode || "content"} onChange={top("heroMode")}>
                  <option value="content">Banner + content</option>
                  <option value="banner">Banner only</option>
                </Select>
                <p className="mt-1 text-xs text-ink-soft">
                  {s.heroMode === "banner"
                    ? "Banner-only: full-width image slides. Only Image (and optional link) are used."
                    : "Banner + content: image on one side, headline/subtitle/CTA on the other."}
                </p>
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Monitor className="h-3.5 w-3.5" /> Desktop image
                </span>
                {draft.image ? (
                  <img src={draft.image} alt="" className="mb-2 h-32 w-full rounded-lg object-cover" />
                ) : (
                  <div className="mb-2 flex h-32 w-full items-center justify-center rounded-lg bg-mist text-slate">
                    <ImageOff className="h-6 w-6" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={uploadDraftImg} disabled={uploadBusy} className="text-sm" />
                {uploadBusy && <span className="ml-2 text-xs text-slate">Uploading…</span>}
                <Input className="mt-2" placeholder="…or paste image URL" value={draft.image || ""} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Smartphone className="h-3.5 w-3.5" /> Mobile image
                </span>
                <p className="mb-1.5 text-xs text-ink-soft">Optional — shown on small screens instead of the desktop image. Falls back to the desktop image if left empty.</p>
                {draft.mobileImage ? (
                  <img src={draft.mobileImage} alt="" className="mb-2 h-32 w-full rounded-lg object-cover" />
                ) : (
                  <div className="mb-2 flex h-32 w-full items-center justify-center rounded-lg bg-mist text-slate">
                    <ImageOff className="h-6 w-6" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={uploadDraftMobileImg} disabled={mobileUploadBusy} className="text-sm" />
                {mobileUploadBusy && <span className="ml-2 text-xs text-slate">Uploading…</span>}
                <Input className="mt-2" placeholder="…or paste image URL" value={draft.mobileImage || ""} onChange={(e) => setDraft({ ...draft, mobileImage: e.target.value })} />
              </div>

              {s.heroMode !== "banner" && (
                <>
                  <Input label="Kicker" value={draft.kicker || ""} onChange={(e) => setDraft({ ...draft, kicker: e.target.value })} />
                  <Input label="Title" value={draft.title || ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                  <Textarea label="Subtitle" value={draft.subtitle || ""} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
                  <Input label="Button text" value={draft.ctaText || ""} onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })} />
                </>
              )}

              <Input label="Link (URL)" value={draft.ctaHref || ""} onChange={(e) => setDraft({ ...draft, ctaHref: e.target.value })} placeholder="/apply" />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
              <Button size="sm" className="gap-1" disabled={draftBusy} onClick={saveDraft}>
                <Save className="h-4 w-4" /> {draftBusy ? "Saving…" : "Save slide"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;