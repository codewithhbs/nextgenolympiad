"use client";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Select, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return arr; const c = [...arr]; [c[i], c[j]] = [c[j], c[i]]; return c; };

export default function AdminSettingsPage() {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { api.get("/api/settings").then((r) => setS(r.data.settings)).catch((e) => toast.error(e.message)); }, [toast]);
  if (!s) return <Spinner />;

  const top = (k) => (e) => setS({ ...s, [k]: e.target.value });
  const nest = (grp, k) => (e) => setS({ ...s, [grp]: { ...(s[grp] || {}), [k]: e.target.value } });
  const uploadImg = (k) => async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const d = await api.upload(file, "nextgen/brand"); setS({ ...s, [k]: { url: d.url, publicId: d.publicId } }); toast.success("Uploaded"); }
    catch (er) { toast.error(er.message); }
  };

  const slides = s.heroSlides || [];
  const setSlides = (v) => setS({ ...s, heroSlides: v });
  const setSlide = (i, patch) => setSlides(slides.map((sl, x) => x === i ? { ...sl, ...patch } : sl));
  const addSlide = () => setSlides([...slides, { image: "", kicker: "", title: "", subtitle: "", ctaText: "", ctaHref: "" }]);
  const delSlide = (i) => setSlides(slides.filter((_, x) => x !== i));
  const uploadSlide = (i) => async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const d = await api.upload(file, "nextgen/hero"); setSlide(i, { image: d.url }); toast.success("Uploaded"); }
    catch (er) { toast.error(er.message); }
  };

  const save = async () => {
    setBusy(true);
    try { await api.patch("/api/settings", s); toast.success("Settings saved"); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Site Settings" subtitle="Branding, hero, contact, payment and social"
        action={<Button onClick={save} loading={busy}><Save className="h-4 w-4" /> Save</Button>} />

      <div className="grid gap-6">
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Brand</h2>
          <div className="grid gap-4">
            <Input label="Site name" value={s.siteName || ""} onChange={top("siteName")} />
            <Input label="Tagline" value={s.tagline || ""} onChange={top("tagline")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-1.5 block text-sm font-semibold text-ink">Logo</span>
                {s.logo?.url && <img src={s.logo.url} alt="" className="mb-2 h-12 object-contain" />}
                <input type="file" accept="image/*" onChange={uploadImg("logo")} className="text-sm" />
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-semibold text-ink">Favicon</span>
                {s.favicon?.url && <img src={s.favicon.url} alt="" className="mb-2 h-10 object-contain" />}
                <input type="file" accept="image/*" onChange={uploadImg("favicon")} className="text-sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-extrabold text-ink">Hero section</h2>
            <div className="w-56">
              <Select label="Display mode" value={s.heroMode || "content"} onChange={top("heroMode")}>
                <option value="content">Banner + content</option>
                <option value="banner">Banner only</option>
              </Select>
            </div>
          </div>
          <p className="mb-4 text-xs text-ink-soft">
            {s.heroMode === "banner"
              ? "Banner-only: full-width image slides. Only Image (and optional link) are used."
              : "Banner + content: image on one side, headline/subtitle/CTA on the other."}
          </p>

          <div className="space-y-4">
            {slides.map((sl, i) => (
              <div key={i} className="rounded-xl border border-line bg-ivory p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate">Slide {i + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setSlides(move(slides, i, -1))} className="rounded p-1 text-slate hover:bg-mist"><ChevronUp className="h-4 w-4" /></button>
                    <button onClick={() => setSlides(move(slides, i, 1))} className="rounded p-1 text-slate hover:bg-mist"><ChevronDown className="h-4 w-4" /></button>
                    <button onClick={() => delSlide(i)} className="rounded p-1 text-crimson hover:bg-crimson-soft"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Image</span>
                    {sl.image && <img src={sl.image} alt="" className="mb-2 h-24 w-full rounded-lg object-cover" />}
                    <input type="file" accept="image/*" onChange={uploadSlide(i)} className="text-sm" />
                    <Input className="mt-2" placeholder="…or paste image URL" value={sl.image || ""} onChange={(e) => setSlide(i, { image: e.target.value })} />
                  </div>
                  {s.heroMode !== "banner" && (
                    <>
                      <Input label="Kicker" value={sl.kicker || ""} onChange={(e) => setSlide(i, { kicker: e.target.value })} />
                      <Input label="Title" value={sl.title || ""} onChange={(e) => setSlide(i, { title: e.target.value })} />
                      <Textarea label="Subtitle" value={sl.subtitle || ""} onChange={(e) => setSlide(i, { subtitle: e.target.value })} className="sm:col-span-2" />
                      <Input label="Button text" value={sl.ctaText || ""} onChange={(e) => setSlide(i, { ctaText: e.target.value })} />
                    </>
                  )}
                  <Input label="Link (URL)" value={sl.ctaHref || ""} onChange={(e) => setSlide(i, { ctaHref: e.target.value })} placeholder="/apply" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3 gap-1" onClick={addSlide}><Plus className="h-4 w-4" /> Add slide</Button>
          {slides.length === 0 && <p className="mt-2 text-xs text-ink-soft">No slides added — the site shows built-in default slides until you add your own.</p>}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Contact</h2>
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Email" value={s.contact?.email || ""} onChange={nest("contact", "email")} />
              <Input label="Phone" value={s.contact?.phone || ""} onChange={nest("contact", "phone")} />
            </div>
            <Textarea label="Address" value={s.contact?.address || ""} onChange={nest("contact", "address")} />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Payment details (shown to schools)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Account name" value={s.payment?.accountName || ""} onChange={nest("payment", "accountName")} />
            <Input label="Bank name" value={s.payment?.bankName || ""} onChange={nest("payment", "bankName")} />
            <Input label="Account number" value={s.payment?.accountNo || ""} onChange={nest("payment", "accountNo")} />
            <Input label="IFSC" value={s.payment?.ifsc || ""} onChange={nest("payment", "ifsc")} />
            <Input label="Branch" value={s.payment?.branch || ""} onChange={nest("payment", "branch")} />
            <Input label="UPI ID" value={s.payment?.upiId || ""} onChange={nest("payment", "upiId")} />
            <Textarea label="Payment note" value={s.payment?.note || ""} onChange={nest("payment", "note")} className="sm:col-span-2" />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-extrabold text-ink">Social links</h2>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input type="checkbox" checked={!!s.socialEnabled} onChange={(e) => setS({ ...s, socialEnabled: e.target.checked })} className="h-4 w-4 accent-gold" />
              Show on site
            </label>
          </div>
          <p className="mb-3 text-xs text-ink-soft">Links stay hidden on the website until “Show on site” is on and a valid URL is set.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {["facebook", "instagram", "youtube", "twitter", "linkedin"].map((k) => (
              <Input key={k} label={k[0].toUpperCase() + k.slice(1)} value={s.social?.[k] || ""} onChange={nest("social", k)} placeholder="https://…" />
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Footer</h2>
          <div className="grid gap-4">
            <Input label="Footer text" value={s.footerText || ""} onChange={top("footerText")} />
            <Input label="Copyright" value={s.copyright || ""} onChange={top("copyright")} />
          </div>
        </section>

        <Button onClick={save} loading={busy} size="lg"><Save className="h-4 w-4" /> Save all settings</Button>
      </div>
    </div>
  );
}
