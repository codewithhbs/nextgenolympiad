"use client";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { ShieldCheck } from "lucide-react";

export default function AdminAuditLogsPage() {
  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="Track admin actions across the platform" />
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-grape-soft text-grape"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <div className="font-bold text-ink">Activity trail</div>
            <p className="text-sm text-ink-soft">School approvals and result uploads already write to the AuditLog collection.</p>
          </div>
        </div>
        <EmptyState title="Audit log viewer"
          text="Add a GET /api/audit-logs route to list AuditLog entries with pagination — the model is ready." />
      </div>
    </div>
  );
}
