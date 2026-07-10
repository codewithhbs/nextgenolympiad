"use client";
import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button, Spinner } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function AdminNotificationsPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); api.get("/api/notifications").then((r) => setItems(r.data.items || [])).catch((e) => toast.error(e.message)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const markAll = async () => { try { await api.patch("/api/notifications", {}); toast.success("All marked read"); load(); } catch (e) { toast.error(e.message); } };
  return (
    <div>
      <PageHeader title="Notifications" subtitle="System and activity alerts"
        action={<Button variant="outline" onClick={markAll}><CheckCheck className="h-4 w-4" /> Mark all read</Button>} />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState title="No notifications" /> : (
        <div className="grid gap-2">
          {items.map((n) => (
            <div key={n._id} className={`flex items-start gap-3 rounded-2xl p-4 shadow-card ${n.isRead ? "bg-white" : "bg-saffron-soft"}`}>
              <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-saffron"><Bell className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-ink">{n.title}</div>
                <p className="text-sm text-ink-soft">{n.message}</p>
                <div className="mt-1 text-xs text-ink-soft">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
