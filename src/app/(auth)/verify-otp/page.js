"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Input, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => { setEmail(params.get("email") || ""); }, [params]);
  useEffect(() => {
    if (!cooldown) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const verify = async () => {
    if (code.length !== 6) return toast.error("Enter the 6-digit code");
    setLoading(true);
    try {
      await api.post("/api/auth/verify-otp", { email, code });
      toast.success("Email verified! Await admin approval to sign in.");
      router.push("/login");
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  const resend = async () => {
    try {
      await api.post("/api/auth/resend-otp", { email });
      toast.success("New OTP sent");
      setCooldown(30);
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Verify your email</h1>
      <p className="mt-1 text-sm text-ink-soft">Enter the 6-digit code sent to {email || "your email"}.</p>
      <div className="mt-6 grid gap-4">
        {!params.get("email") && (
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.com" />
        )}
        <Input label="OTP code" value={code} maxLength={6} inputMode="numeric"
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000"
          className="text-center text-2xl font-bold tracking-[0.4em]"
          onKeyDown={(e) => e.key === "Enter" && verify()} />
        <Button onClick={verify} loading={loading} size="lg">Verify email</Button>
        <button onClick={resend} disabled={cooldown > 0}
          className="text-sm font-semibold text-saffron hover:underline disabled:opacity-50">
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-ink-soft">
        <Link href="/login" className="font-semibold hover:text-saffron">Back to sign in</Link>
      </p>
    </div>
  );
}

export default function VerifyOtpPage() {
  return <Suspense fallback={<Spinner />}><VerifyInner /></Suspense>;
}
