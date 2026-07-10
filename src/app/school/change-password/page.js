"use client";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function ChangePasswordPage() {
  const toast = useToast();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async () => {
    if (form.newPassword.length < 6) return toast.error("New password must be 6+ characters");
    if (form.newPassword !== form.confirm) return toast.error("Passwords do not match");
    setBusy(true);
    try { await api.post("/api/auth/change-password", { currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success("Password changed"); setForm({ currentPassword: "", newPassword: "", confirm: "" }); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  return (
    <div className="max-w-md">
      <PageHeader title="Change Password" subtitle="Keep your account secure" />
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-soft text-saffron"><KeyRound className="h-6 w-6" /></div>
        <div className="grid gap-4">
          <Input label="Current password" type="password" value={form.currentPassword} onChange={set("currentPassword")} />
          <Input label="New password" type="password" value={form.newPassword} onChange={set("newPassword")} />
          <Input label="Confirm new password" type="password" value={form.confirm} onChange={set("confirm")} />
          <Button onClick={submit} loading={busy}>Update password</Button>
        </div>
      </div>
    </div>
  );
}
