"use client";
import { useEffect, useState } from "react";
import { CreditCard, CheckCircle2, Building2, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui";
import { Button, Input, Select, Spinner, Badge } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

const METHODS = ["UPI", "NEFT", "RTGS", "IMPS", "DD", "Net Banking"];

export default function SchoolPaymentPage() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ method: "UPI", ref: "", amount: "" });
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/api/school/payment").then((r) => {
    setData(r.data);
    setForm((f) => ({ ...f, amount: r.data.school?.registrationFee || "" }));
  }).catch((e) => { toast.error(e.message); setData({}); });

  useEffect(() => { load(); }, []); // eslint-disable-line

  if (!data) return <Spinner />;
  const s = data.school || {};
  const p = data.payment || {};
  const paid = s.paymentStatus === "paid";
  const submitted = s.paymentStatus === "submitted";

  const submit = async () => {
    if (!form.ref) return toast.error("Enter the transaction / reference ID");
    setSaving(true);
    try { const r = await api.post("/api/school/payment", form); toast.success(r.message); load(); }
    catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Registration Payment" subtitle="Pay the registration fee and submit your payment reference." />

      {paid && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-leaf/30 bg-leaf/5 p-4 font-semibold text-leaf">
          <CheckCircle2 className="h-5 w-5" /> Payment confirmed{s.paymentRef ? ` · Ref: ${s.paymentRef}` : ""}.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="text-sm text-ink-soft">Amount due</div>
          <div className="mt-1 text-3xl font-extrabold text-ink">₹{s.registrationFee || 0}</div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="text-sm text-ink-soft">Amount paid</div>
          <div className="mt-1 text-3xl font-extrabold text-ink">₹{s.amountPaid || 0}</div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="text-sm text-ink-soft">Status</div>
          <div className="mt-2"><Badge tone={paid ? "green" : submitted ? "orange" : "grey"}>{s.paymentStatus || "pending"}</Badge></div>
        </div>
      </div>

      {/* Bank / UPI details */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 font-bold text-ink"><Building2 className="h-4 w-4 text-saffron" /> Bank Transfer</div>
          <dl className="space-y-1.5 text-sm">
            <Row k="Account name" v={p.accountName} />
            <Row k="Bank" v={p.bankName} />
            <Row k="Account no." v={p.accountNo} />
            <Row k="IFSC" v={p.ifsc} />
            <Row k="Branch" v={p.branch} />
          </dl>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 font-bold text-ink"><Smartphone className="h-4 w-4 text-saffron" /> UPI</div>
          <Row k="UPI ID" v={p.upiId} />
          {p.note && <p className="mt-4 rounded-xl bg-cream p-3 text-xs text-ink-soft">{p.note}</p>}
        </div>
      </div>

      {/* Submit reference */}
      {!paid && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 font-bold text-ink"><CreditCard className="h-4 w-4 text-saffron" /> Submit your payment</div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Select label="Method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <Input label="Transaction / Reference ID" value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} />
          </div>
          <Button className="mt-4" variant="gold" loading={saving} onClick={submit}>
            {submitted ? "Update payment details" : "Submit payment"}
          </Button>
          {submitted && <p className="mt-3 text-sm text-ink-soft">Your payment is submitted and awaiting verification by our team.</p>}
        </div>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-soft">{k}</dt>
      <dd className="font-semibold text-ink">{v || "—"}</dd>
    </div>
  );
}
