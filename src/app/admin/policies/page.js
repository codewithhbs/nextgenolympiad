"use client";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Textarea, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const POLICIES = [
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-and-conditions", title: "Terms & Conditions" },
  { slug: "refund-policy", title: "Refund Policy" },
  { slug: "disclaimer", title: "Disclaimer" },
];

export default function AdminPoliciesPage() {
  const toast = useToast();
  const [active, setActive] = useState(POLICIES[0]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/cms/pages/${active.slug}`)
      .then((r) => setContent(r.data.page?.content || ""))
      .catch(() => setContent(""))
      .finally(() => setLoading(false));
  }, [active]);

  const save = async () => {
    setBusy(true);
    try {
      await api.patch(`/api/cms/pages/${active.slug}`, { slug: active.slug, title: active.title, type: "policy", content, isPublished: true });
      toast.success("Policy saved");
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div>
      <PageHeader title="Policies" subtitle="Edit legal & policy pages" />
      <div className="mb-4 flex flex-wrap gap-2">
        {POLICIES.map((p) => (
          <button key={p.slug} onClick={() => setActive(p)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${active.slug === p.slug ? "bg-ink text-white" : "bg-white text-ink-soft hover:bg-sky"}`}>
            {p.title}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-card">
        {loading ? <Spinner /> : (
          <>
            <Textarea label={`${active.title} content (HTML allowed)`} value={content} onChange={(e) => setContent(e.target.value)} rows={14} />
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={save} loading={busy}><Save className="h-4 w-4" /> Save</Button>
              <a href={`/${active.slug}`} target="_blank" className="text-sm font-semibold text-saffron hover:underline">Preview →</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
