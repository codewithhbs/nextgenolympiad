"use client";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="Admin Users" subtitle="Manage staff accounts and roles" />
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron-soft text-saffron"><Users className="h-5 w-5" /></div>
          <div>
            <div className="font-bold text-ink">Role-based access</div>
            <p className="text-sm text-ink-soft">super_admin &amp; admin accounts sign in here. School accounts are created via public registration.</p>
          </div>
        </div>
        <EmptyState title="User management module"
          text="Wire this to a /api/users route (CRUD + role assignment) — models & auth guards are already in place." />
      </div>
    </div>
  );
}
