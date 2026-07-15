"use client";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Select, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";
import { DEFAULT_THEME } from "@/lib/theme";

const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return arr; const c = [...arr]; [c[i], c[j]] = [c[j], c[i]]; return c; };

const THEME_FIELDS = [
  ["brand", "Primary (China Red)"],
  ["brandHover", "Primary hover"],
  ["brandDeep", "Dark panel (footer / dark strips)"],
  ["brandSoft", "Primary tint (pills)"],
  ["gold", "Golden"],
  ["goldDark", "Golden text"],
  ["goldSoft", "Golden tint"],
  ["goldInk", "Golden ink"],
  ["accent", "Blue accent (light)"],
  ["accentSoft", "Blue tint"],
  ["ink", "Body text"],
  ["muted", "Muted text"],
  ["bg", "Page background"],
  ["surface", "Section background"],
  ["line", "Borders"],
  ["crimson", "Error / danger"],
];

const FONTS = ["Playfair Display", "Mulish", "Poppins", "Inter", "Montserrat", "Merriweather", "Lora", "Nunito", "Rubik"];

export default function AdminSettingsPage() {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { api.get("/api/settings").then((r) => setS(r.data.settings)).catch((e) => toast.error(e.message)); }, [toast]);
  if (!s) return <Spinner />;

  const theme = { ...DEFAULT_THEME, ...(s.theme || {}) };
  const setTh = (patch) => setS({ ...s, theme: { ...theme, ...patch } });
  const setTheme = (k) => (e) => setTh({ [k]: e.target.value });
  const resetTheme = () => setS({ ...s, theme: { ...DEFAULT_THEME } });

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
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-extrabold text-ink">Appearance — colours &amp; text size</h2>
            <Button variant="outline" size="sm" onClick={resetTheme}>Reset to China Red</Button>
          </div>
          <p className="mb-4 text-xs text-ink-soft">Applies to the whole public website instantly after saving.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {THEME_FIELDS.map(([k, label]) => (
              <div key={k}>
                <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={theme[k] || "#000000"} onChange={setTheme(k)}
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border-2 border-line bg-white" />
                  <Input value={theme[k] || ""} onChange={setTheme(k)} className="uppercase" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-ink">Base font size — {theme.baseFontSize || 17}px</span>
              <input type="range" min="14" max="24" step="1" value={theme.baseFontSize || 17}
                onChange={(e) => setTh({ baseFontSize: Number(e.target.value) })} className="w-full accent-gold" />
              <span className="mt-1 block text-xs text-ink-soft">Scales every text on the site.</span>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-ink">Header menu font size — {theme.navFontSize || 16}px</span>
              <input type="range" min="12" max="22" step="1" value={theme.navFontSize || 16}
                onChange={(e) => setTh({ navFontSize: Number(e.target.value) })} className="w-full accent-gold" />
              <span className="mt-1 block text-xs text-ink-soft">Header nav is sized separately from body text.</span>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-ink">Header logo height — {theme.logoHeight || 56}px</span>
              <input type="range" min="36" max="96" step="2" value={theme.logoHeight || 56}
                onChange={(e) => setTh({ logoHeight: Number(e.target.value) })} className="w-full accent-gold" />
            </div>
            <Select label="Body weight" value={String(theme.bodyWeight || 500)} onChange={(e) => setTh({ bodyWeight: Number(e.target.value) })}>
              {[400, 500, 600, 700].map((w) => <option key={w} value={w}>{w}</option>)}
            </Select>
            <Select label="Heading weight" value={String(theme.headingWeight || 800)} onChange={(e) => setTh({ headingWeight: Number(e.target.value) })}>
              {[600, 700, 800, 900].map((w) => <option key={w} value={w}>{w}</option>)}
            </Select>
            <Select label="Heading font" value={theme.headingFont || "Playfair Display"} onChange={(e) => setTh({ headingFont: e.target.value })}>
              {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
            </Select>
            <Select label="Body font" value={theme.bodyFont || "Mulish"} onChange={(e) => setTh({ bodyFont: e.target.value })}>
              {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
            </Select>
          </div>

          {/* Live preview */}
          <div className="mt-5 rounded-2xl border-2 border-line p-5"
            style={{ background: theme.bg, fontSize: `${theme.baseFontSize || 17}px` }}>
            <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ background: theme.goldSoft, color: theme.goldInk }}>Preview</span>
            <p className="mt-3 text-[1.6em] font-extrabold leading-tight" style={{ color: theme.brand }}>Learn • Compete • Excel</p>
            <p className="mt-2" style={{ color: theme.ink, fontWeight: theme.bodyWeight || 500 }}>
              Body text at your chosen size and weight — this is what visitors read.
            </p>
            <p className="mt-1 text-[0.95em]" style={{ color: theme.muted }}>Muted / secondary text.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-xl px-5 py-2.5 font-bold" style={{ background: theme.brand, color: "#fff" }}>Register School</span>
              <span className="rounded-xl px-5 py-2.5 font-bold" style={{ background: theme.gold, color: theme.brandDeep }}>Awards</span>
              <span className="rounded-xl px-5 py-2.5 font-bold" style={{ background: theme.accentSoft, color: theme.accent }}>Olympiad</span>
            </div>
          </div>
        </section>

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
