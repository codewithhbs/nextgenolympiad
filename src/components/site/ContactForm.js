"use client";
import { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function ContactForm() {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return toast.error("Please fill name, email and message");
    setLoading(true);
    try {
      await api.post("/api/contact", form);
      toast.success("Message sent! We'll reply soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" />
        <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
        <Input label="Subject" value={form.subject} onChange={set("subject")} placeholder="How can we help?" />
      </div>
      <Textarea label="Message" value={form.message} onChange={set("message")} placeholder="Write your message…" />
      <div><Button onClick={submit} loading={loading} size="lg">Send message</Button></div>
    </div>
  );
}
