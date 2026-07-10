"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowRight, BadgeCheck } from "lucide-react";
import { Button, Input, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const SUBJECTS = ["English", "Mathematics", "EVS", "STEM", "Computational Thinking"];

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.email || !form.password) return toast.error("Enter email and password");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      toast.success("Welcome back!");
      const role = res.data?.user?.role;
      const next = params.get("next");
      router.replace(next || (role === "school" ? "/school" : "/admin"));
      router.refresh();
    } catch (e) {
      if (e.data?.needOtp) {
        toast.error("Verify your email to continue");
        router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
      } else {
        toast.error(e.message);
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* LEFT — benchmark story panel */}
      <div className="relative hidden overflow-hidden bg-navy lg:flex lg:flex-col">
        {/* faint graph-paper texture, on-brand for an assessment product */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" aria-hidden />

        <div className="relative flex h-full flex-col p-10 xl:p-14">
          <Link href="/" className="text-xl font-extrabold text-white">
            NextGen<span className="text-gold">.</span>
          </Link>

          <div className="flex flex-1 flex-col justify-center gap-7 py-10">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-gold">
              <BadgeCheck className="h-3.5 w-3.5" /> Registered Trust · Govt. of NCT Delhi
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-[1.15] text-white xl:text-[2.5rem]">
              Ranking ends the conversation.<br />Benchmark starts it.
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-white/60">
              Every learner competes against their own growth, term over term —
              not against lakhs of others.
            </p>

            {/* signature: self-vs-self benchmark chart */}
            <div className="mt-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">One learner, three rounds</p>
              <svg viewBox="0 0 300 120" className="mt-3 w-full" role="img" aria-label="Score rising from 62 to 74 to 88 across three olympiad rounds">
                <line x1="20" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M28 84 L150 58 L272 24" fill="none" stroke="#D4A93D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {[
                  { x: 28, y: 84, v: "62%" },
                  { x: 150, y: 58, v: "74%" },
                  { x: 272, y: 24, v: "88%" },
                ].map((p) => (
                  <g key={p.x}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#0B1B36" stroke="#D4A93D" strokeWidth="2.5" />
                    <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">{p.v}</text>
                  </g>
                ))}
                {["Round 1", "Round 2", "Round 3"].map((l, i) => (
                  <text key={l} x={[28, 150, 272][i]} y="114" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)">{l}</text>
                ))}
              </svg>
            </div>

         
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ["500+", "Partner Schools"],
              ["10K+", "Students"],
              ["10+", "Years"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-xl font-extrabold text-white">{n}</div>
                <div className="text-[11px] font-medium text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="relative flex items-center justify-center bg-white px-5 py-8 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,169,61,0.07),transparent_45%)] lg:hidden" aria-hidden />

        <div className="relative w-full max-w-[380px]">
          <Link href="/" className="mb-6 inline-flex items-center text-xl font-extrabold text-navy lg:hidden">
            NextGen<span className="text-gold-dark">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy/5 text-navy">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold leading-tight text-ink">Sign in</h1>
              <p className="text-sm text-ink-soft">Access your school's Olympiad dashboard</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3.5 rounded-3xl border border-line/70 bg-white p-5 shadow-card sm:p-6">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@school.com"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <div>
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="********"
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <div className="mt-1.5 text-right">
                <Link href="/forgot-password" className="text-xs font-semibold text-saffron hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button onClick={submit} loading={loading} size="lg" className="mt-1 group">
              Sign in
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          <p className="mt-5 text-center text-sm text-ink-soft">
            New school? <Link href="/register" className="font-semibold text-saffron hover:underline">Register here</Link>
          </p>

          <p className="mt-8 text-center text-xs text-ink-soft/60">
            For Classes Bal Vatika I – X · <Link href="/privacy" className="hover:underline">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<Spinner />}><LoginInner /></Suspense>;
}