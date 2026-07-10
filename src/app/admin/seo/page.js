"use client";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function AdminSeoPage() {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { api.get("/api/settings").then((r) => setS(r.data.settings)).catch((e) => toast.error(e.message)); }, [toast]);
  if (!s) return <Spinner />;
  const seo = (k) => (e) => setS({ ...s, seoDefaults: { ...(s.seoDefaults || {}), [k]: k === "keywords" ? e.target.value.split(",").map((x) => x.trim()) : e.target.value } });
  const integ = (k) => (e) => setS({ ...s, integrations: { ...(s.integrations || {}), [k]: e.target.value } });
  const save = async () => { setBusy(true); try { await api.patch("/api/settings", s); toast.success("SEO settings saved"); } catch (e) { toast.error(e.message); } finally { setBusy(false); } };
  return (
    <div className="max-w-3xl">
      <PageHeader title="SEO Defaults" subtitle="Default meta tags & analytics integrations"
        action={<Button onClick={save} loading={busy}><Save className="h-4 w-4" /> Save</Button>} />
      <div className="grid gap-6">
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Default meta</h2>
          <div className="grid gap-4">
            <Input label="Meta title" value={s.seoDefaults?.metaTitle || ""} onChange={seo("metaTitle")} />
            <Textarea label="Meta description" value={s.seoDefaults?.metaDescription || ""} onChange={seo("metaDescription")} />
            <Input label="Keywords (comma separated)" value={(s.seoDefaults?.keywords || []).join(", ")} onChange={seo("keywords")} />
            <Input label="Default OG image URL" value={s.seoDefaults?.ogImage || ""} onChange={seo("ogImage")} />
          </div>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-extrabold text-ink">Integrations</h2>
          <div className="grid gap-4">
            <Input label="Google Analytics ID" value={s.integrations?.googleAnalytics || ""} onChange={integ("googleAnalytics")} placeholder="G-XXXXXXX" />
            <Input label="Google Search Console token" value={s.integrations?.googleSearchConsole || ""} onChange={integ("googleSearchConsole")} />
          </div>
        </section>
        <Button onClick={save} loading={busy} size="lg"><Save className="h-4 w-4" /> Save SEO settings</Button>
      </div>
    </div>
  );
}
