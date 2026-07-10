"use client";
import { useEffect, useState } from "react";
import { Save, Building2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Textarea, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function SchoolProfilePage() {
  const toast = useToast();
  const [id, setId] = useState(null);
  const [school, setSchool] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/api/auth/me").then((r) => { setSchool(r.data.user?.school || {}); setId(r.data.user?.school?._id); })
      .catch((e) => toast.error(e.message));
  }, [toast]);

  if (!school) return <Spinner />;
  const set = (k) => (e) => setSchool({ ...school, [k]: e.target.value });
  const uploadLogo = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const d = await api.upload(file, "nextgen/school-logos"); setSchool({ ...school, logo: { url: d.url, publicId: d.publicId } }); toast.success("Logo uploaded"); }
    catch (er) { toast.error(er.message); }
  };
  const save = async () => {
    setBusy(true);
    try { await api.patch(`/api/schools/${id}`, {
      contactPerson: school.contactPerson, phone: school.phone, address: school.address,
      city: school.city, state: school.state, pincode: school.pincode, board: school.board, logo: school.logo,
    }); toast.success("Profile updated"); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="School Profile" subtitle="Update your school details"
        action={<Button onClick={save} loading={busy}><Save className="h-4 w-4" /> Save</Button>} />
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-4">
          {school.logo?.url ? <img src={school.logo.url} alt="" className="h-16 w-16 rounded-xl object-contain" />
            : <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-sky text-ink"><Building2 className="h-7 w-7" /></div>}
          <div>
            <div className="font-bold text-ink">{school.name}</div>
            <div className="text-xs text-ink-soft">Code: {school.code} • {school.email}</div>
            <input type="file" accept="image/*" onChange={uploadLogo} className="mt-1 text-xs" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Contact person" value={school.contactPerson || ""} onChange={set("contactPerson")} />
            <Input label="Phone" value={school.phone || ""} onChange={set("phone")} />
          </div>
          <Textarea label="Address" value={school.address || ""} onChange={set("address")} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" value={school.city || ""} onChange={set("city")} />
            <Input label="State" value={school.state || ""} onChange={set("state")} />
            <Input label="Pincode" value={school.pincode || ""} onChange={set("pincode")} />
          </div>
          <Input label="Board" value={school.board || ""} onChange={set("board")} placeholder="CBSE / ICSE / State" />
          <Button onClick={save} loading={busy}><Save className="h-4 w-4" /> Save profile</Button>
        </div>
      </div>
    </div>
  );
}
