"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Input, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

function ResetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(params.get("token") || "");
    setEmail(params.get("email") || "");
  }, [params]);

  const submit = async () => {
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { email, token, password: form.password });
      toast.success("Password reset! Please sign in.");
      router.push("/login");
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Set a new password</h1>
      <p className="mt-1 text-sm text-ink-soft">Choose a strong password for your account.</p>
      {!token || !email ? (
        <div className="mt-6 rounded-xl bg-cherry/10 p-4 text-sm text-cherry">
          Invalid reset link. Please request a new one.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <Input label="New password" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" />
          <Input label="Confirm password" type="password" value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="Re-enter password"
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          <Button onClick={submit} loading={loading} size="lg">Reset password</Button>
        </div>
      )}
      <p className="mt-6 text-center text-sm text-ink-soft">
        <Link href="/login" className="font-semibold hover:text-saffron">Back to sign in</Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<Spinner />}><ResetInner /></Suspense>;
}
