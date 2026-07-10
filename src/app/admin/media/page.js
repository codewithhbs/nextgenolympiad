"use client";
import { useState } from "react";
import { UploadCloud, Copy } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function AdminMediaPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);

  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try { const d = await api.upload(file, "nextgen/media"); setItems((x) => [d, ...x]); toast.success("Uploaded"); }
    catch (er) { toast.error(er.message); } finally { setBusy(false); }
  };
  const copy = (url) => { navigator.clipboard.writeText(url); toast.success("URL copied"); };

  return (
    <div>
      <PageHeader title="Media Library" subtitle="Upload images to Cloudinary and copy their URLs" />
      <label className="mb-6 flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 bg-white p-8 text-center hover:border-saffron">
        <UploadCloud className="h-8 w-8 text-saffron" />
        <span className="font-semibold text-ink">Click to upload an image</span>
        <input type="file" accept="image/*" className="hidden" onChange={upload} />
      </label>
      {busy && <Spinner />}
      {items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <div key={i} className="rounded-2xl bg-white p-3 shadow-card">
              <img src={m.url} alt="" className="mb-2 h-32 w-full rounded-xl object-cover" />
              <button onClick={() => copy(m.url)} className="flex w-full items-center justify-center gap-1 rounded-lg bg-sky py-1.5 text-xs font-semibold text-ink hover:bg-saffron-soft">
                <Copy className="h-3.5 w-3.5" /> Copy URL
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
