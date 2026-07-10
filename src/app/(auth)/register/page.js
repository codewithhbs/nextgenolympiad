"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({
    schoolName: "", name: "", email: "", phone: "", password: "",
    city: "", state: "", address: "",
  });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    const req = ["schoolName", "name", "email", "phone", "password"];
    if (req.some((k) => !form[k])) return toast.error("Please fill all required fields");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      toast.success("Registered! Check your email for the OTP.");
      router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Register your school</h1>
      <p className="mt-1 text-sm text-ink-soft">Create an account to participate in NextGen Olympiad.</p>
      <div className="mt-6 grid gap-4">
        <Input label="School name *" value={form.schoolName} onChange={set("schoolName")} placeholder="ABC Public School" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Contact person *" value={form.name} onChange={set("name")} placeholder="Principal / Coordinator" />
          <Input label="Phone *" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
        </div>
        <Input label="Email *" type="email" value={form.email} onChange={set("email")} placeholder="school@example.com" />
        <Input label="Password *" type="password" value={form.password} onChange={set("password")} placeholder="Min 6 characters" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="City" value={form.city} onChange={set("city")} placeholder="City" />
          <Input label="State" value={form.state} onChange={set("state")} placeholder="State" />
        </div>
        <Input label="Address" value={form.address} onChange={set("address")} placeholder="Full address" />
        <Button onClick={submit} loading={loading} size="lg">Create account</Button>
      </div>
      <p className="mt-4 rounded-xl bg-cream p-3 text-center text-xs text-ink-soft">
        After email verification, your account is reviewed by our team before activation.
      </p>
      <p className="mt-4 text-center text-sm text-ink-soft">
        Already registered? <Link href="/login" className="font-semibold text-saffron hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
