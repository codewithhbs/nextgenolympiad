"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Trophy, Bell, UserPlus, FileText, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/apiClient";

export default function SchoolDashboard() {
  const [stats, setStats] = useState(null);
  const [me, setMe] = useState(null);
  const [pay, setPay] = useState(null);

  useEffect(() => {
    api.get("/api/dashboard/stats").then((r) => setStats(r.data.stats)).catch(() => setStats({}));
    api.get("/api/auth/me").then((r) => setMe(r.data.user)).catch(() => {});
    api.get("/api/school/payment").then((r) => setPay(r.data)).catch(() => {});
  }, []);

  if (!stats) return <Spinner />;
  const status = pay?.school?.paymentStatus;
  const fee = pay?.school?.registrationFee || 0;

  return (
    <div>
      <PageHeader title={me?.school?.name ? `Welcome, ${me.school.name}` : "School Dashboard"}
        subtitle={me?.school?.code ? `School code: ${me.school.code}` : "Manage your students, payment and results"} />

      {/* Payment banner */}
      {pay && status !== "paid" && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-gold/40 bg-gold-soft/60 p-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold"><CreditCard className="h-6 w-6" /></div>
          <div className="flex-1">
            <div className="font-bold text-ink">
              {status === "submitted" ? "Payment submitted — awaiting verification" : "Complete your registration payment"}
            </div>
            <div className="text-sm text-ink-soft">
              {status === "submitted"
                ? "We're verifying your payment. You'll be notified once confirmed."
                : fee ? `Amount due: ₹${fee}. Add students, then complete payment to confirm your registration.`
                      : "Add students, then complete payment to confirm your registration."}
            </div>
          </div>
          <Link href="/school/payment" className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep">
            {status === "submitted" ? "View" : "Pay now"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
      {pay && status === "paid" && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-leaf/30 bg-leaf/5 p-4 text-sm font-semibold text-leaf">
          <CheckCircle2 className="h-5 w-5" /> Registration payment confirmed.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={GraduationCap} label="Students" value={stats.students ?? 0} tone="grape" />
        <StatCard icon={Trophy} label="Results" value={stats.results ?? 0} tone="green" />
        <StatCard icon={Bell} label="Session" value="2026-27" tone="saffron" />
      </div>

      <h2 className="mb-3 mt-10 text-lg font-extrabold text-ink">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{ href: "/school/students", label: "Add students", icon: UserPlus },
          { href: "/school/payment", label: "Payment", icon: CreditCard },
          { href: "/school/results", label: "View results", icon: FileText },
          { href: "/school/profile", label: "Update profile", icon: GraduationCap }].map((q) => (
          <Link key={q.href} href={q.href} className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron-soft text-saffron"><q.icon className="h-5 w-5" /></div>
            <span className="font-bold text-ink">{q.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
