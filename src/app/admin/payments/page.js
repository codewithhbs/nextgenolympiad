"use client";
import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, RotateCcw, RefreshCw, Search } from "lucide-react";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/Toast";
import { Button, Badge, Input, Spinner } from "@/components/ui";
import { PageHeader, TableWrap, Th, Td, EmptyState } from "@/components/dashboard/ui";

const STATUS = ["pending", "submitted", "paid"];
const TONE = { pending: "grey", submitted: "orange", paid: "green" };

export default function AdminPaymentsPage() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [feeEdit, setFeeEdit] = useState({}); // id -> value

  const load = useCallback(async () => {
    setItems(null);
    try { const r = await api.get(`/api/school/payment${status ? `?status=${status}` : ""}`); setItems(r.data.schools); }
    catch (e) { toast.error(e.message); setItems([]); }
  }, [status, toast]);
  useEffect(() => { load(); }, [load]);

  const patch = async (payload, msg) => {
    try { await api.patch("/api/school/payment", payload); toast.success(msg); load(); }
    catch (e) { toast.error(e.message); }
  };
  const verify = (s) => patch({ id: s._id, paymentStatus: "paid", amountPaid: s.amountPaid || s.registrationFee || 0 }, "Marked as paid");
  const revert = (s) => patch({ id: s._id, paymentStatus: "pending" }, "Reverted to pending");
  const setFee = (s) => {
    const fee = Number(feeEdit[s._id]);
    if (Number.isNaN(fee)) return toast.error("Enter a valid fee");
    patch({ id: s._id, registrationFee: fee }, "Fee updated");
  };

  const rows = (items || []).filter((s) =>
    !q || [s.name, s.code, s.email, s.paymentRef].some((v) => (v || "").toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <PageHeader title="Payments" subtitle="Verify school registration payments and set fees"
        action={<Button variant="ghost" onClick={load} className="gap-2"><RefreshCw className="h-4 w-4" /> Refresh</Button>} />

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search school, code, ref…"
            className="rounded-xl border-2 border-line bg-white py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border-2 border-line bg-white px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {!items ? <Spinner /> : rows.length === 0 ? (
        <EmptyState title="No schools found" text="School payments will appear here after registration." />
      ) : (
        <TableWrap>
          <thead>
            <tr><Th>School</Th><Th>Fee (₹)</Th><Th>Paid</Th><Th>Method / Ref</Th><Th>Status</Th><Th className="text-right">Actions</Th></tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s._id}>
                <Td>
                  <div className="font-bold text-ink">{s.name}</div>
                  <div className="text-xs text-ink-soft">{s.code} · {s.email}</div>
                </Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <input type="number" defaultValue={s.registrationFee || 0}
                      onChange={(e) => setFeeEdit((f) => ({ ...f, [s._id]: e.target.value }))}
                      className="w-24 rounded-lg border border-line px-2 py-1 text-sm" />
                    <button onClick={() => setFee(s)} className="text-xs font-semibold text-gold-dark hover:underline">set</button>
                  </div>
                </Td>
                <Td>₹{s.amountPaid || 0}</Td>
                <Td className="text-xs">
                  {s.paymentMethod || "—"}<br />
                  <span className="text-ink-soft">{s.paymentRef || "—"}</span>
                </Td>
                <Td><Badge tone={TONE[s.paymentStatus] || "grey"}>{s.paymentStatus || "pending"}</Badge></Td>
                <Td className="text-right">
                  {s.paymentStatus !== "paid" ? (
                    <Button size="sm" variant="gold" onClick={() => verify(s)} className="gap-1"><CheckCircle2 className="h-4 w-4" /> Verify</Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => revert(s)} className="gap-1"><RotateCcw className="h-4 w-4" /> Revert</Button>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </div>
  );
}
