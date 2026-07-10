"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSent(true);
      toast.success("Reset link sent if the email exists");
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Forgot password?</h1>
      <p className="mt-1 text-sm text-ink-soft">We'll email you a link to reset it.</p>
      {sent ? (
        <div className="mt-6 rounded-xl bg-leaf/10 p-4 text-sm text-leaf">
          If an account exists for <b>{email}</b>, a reset link is on its way. Check your inbox and spam folder.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.com" onKeyDown={(e) => e.key === "Enter" && submit()} />
          <Button onClick={submit} loading={loading} size="lg">Send reset link</Button>
        </div>
      )}
      <p className="mt-6 text-center text-sm text-ink-soft">
        <Link href="/login" className="font-semibold hover:text-saffron">Back to sign in</Link>
      </p>
    </div>
  );
}
