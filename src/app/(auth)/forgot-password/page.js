"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ShieldCheck, Clock, RotateCcw } from "lucide-react";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const startCooldown = () => {
    setCooldown(30);
    const t = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const submit = async () => {
    if (!validEmail) return toast.error("Enter a valid email");
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSent(true);
      startCooldown();
      toast.success("Reset link sent if the email exists");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* BRAND PANEL */}
      <div className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-saffron/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-leaf/20 blur-3xl" />

        <Link href="/" className="relative z-10 text-lg font-extrabold text-white">
          NextGen<span className="text-saffron">.</span>
        </Link>

        <div className="relative z-10 max-w-sm">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-saffron backdrop-blur">
            <KeyRound className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white">
            Locked out? <br /> Let's get you back in.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Reset links are single-use and expire quickly, so your account stays secure.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-saffron" /> Secure, single-use link</li>
            <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-saffron" /> Expires in 15 minutes</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-saffron" /> Straight to your inbox</li>
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/40">© {new Date().getFullYear()} NextGen Olympiad Foundation</p>
      </div>

      {/* FORM PANEL */}
      <div className="flex items-center justify-center bg-surface px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {/* mobile brand */}
          <Link href="/" className="mb-8 block text-center text-lg font-extrabold text-ink lg:hidden">
            NextGen<span className="text-saffron">.</span>
          </Link>

          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h1 className="mt-6 font-display text-2xl font-extrabold text-ink">Check your email</h1>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                If an account exists for <b className="text-ink">{email}</b>, a reset link is on its way.
                Check your inbox and spam folder.
              </p>

              <div className="mt-8 space-y-3">
                <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full">Open email app</Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={cooldown > 0 || loading}
                  loading={loading}
                  onClick={submit}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend link"}
                </Button>
              </div>

              <p className="mt-6 text-sm text-ink-soft">
                Wrong email?{" "}
                <button onClick={() => setSent(false)} className="font-semibold text-ink hover:text-saffron">
                  Change it
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/10 text-saffron lg:hidden">
                <KeyRound className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-extrabold text-ink lg:mt-0">Forgot password?</h1>
              <p className="mt-2 text-sm text-ink-soft">
                Enter the email linked to your account and we'll send a reset link.
              </p>

              <div className="mt-8 grid gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.com"
                  autoFocus
                  icon={Mail}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                />
                <Button onClick={submit} loading={loading} disabled={!validEmail} size="lg" className="w-full">
                  Send reset link
                </Button>
              </div>
            </>
          )}

          <Link
            href="/login"
            className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-saffron"
          >
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}