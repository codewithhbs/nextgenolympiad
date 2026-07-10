"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { School2, GraduationCap, Trophy, Mail, Clock, FileSpreadsheet, FileText, Settings } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/apiClient";

const quick = [
  { href: "/admin/results", label: "Upload Results", icon: FileSpreadsheet },
  { href: "/admin/schools", label: "Approve Schools", icon: School2 },
  { href: "/admin/pages", label: "Edit Pages", icon: FileText },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get("/api/dashboard/stats").then((r) => setStats(r.data.stats)).catch(() => setStats({})); }, []);
  if (!stats) return <Spinner />;
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of the NextGen Olympiad platform" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={School2} label="Schools" value={stats.schools ?? 0} tone="saffron" />
        <StatCard icon={Clock} label="Pending Approval" value={stats.pending ?? 0} tone="red" />
        <StatCard icon={GraduationCap} label="Students" value={stats.students ?? 0} tone="grape" />
        <StatCard icon={Trophy} label="Results" value={stats.results ?? 0} tone="green" />
        <StatCard icon={Mail} label="New Queries" value={stats.queries ?? 0} tone="ink" />
      </div>

      <h2 className="mb-3 mt-10 text-lg font-extrabold text-ink">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quick.map((q) => (
          <Link key={q.href} href={q.href}
            className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron-soft text-saffron">
              <q.icon className="h-5 w-5" />
            </div>
            <span className="font-bold text-ink">{q.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
