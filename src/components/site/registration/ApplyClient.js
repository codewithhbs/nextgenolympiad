"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, BookOpen, Baby } from "lucide-react";
import { api } from "@/lib/apiClient";
import { Spinner } from "@/components/ui";
import RegistrationWizard from "@/components/site/registration/RegistrationWizard";

const ICONS = { olympiad: BookOpen, wonderkids: Baby };

export default function ApplyClient() {
  const [forms, setForms] = useState(null);
  const [active, setActive] = useState(null); // full form
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/registration-form")
      .then((r) => setForms(r.data.forms || []))
      .catch((e) => setError(e.message || "Could not load registration forms"));
  }, []);

  const choose = async (slug) => {
    setLoadingForm(true); setError("");
    try {
    
      const r = await api.get(`/api/registration-form?slug=olympiad`);
      setActive(r.data.form);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { setError(e.message || "Could not load this form"); }
    finally { setLoadingForm(false); }
  };
  useEffect(()=>{
    choose("olympiad")
  },[])

  if (active) return <RegistrationWizard form={active} onRestart={() => setActive(null)} />;

  if (error && !forms) return (
    <div className="mx-auto max-w-md rounded-2xl border border-crimson/30 bg-crimson-soft p-6 text-center">
      <p className="font-semibold text-crimson">{error}</p>
      <button onClick={() => location.reload()} className="mt-3 font-semibold text-navy underline">Retry</button>
    </div>
  );

  if (!forms) return <Spinner />;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-2">
        {forms.map((f) => {
          const Icon = ICONS[f.slug] || BookOpen;
          return (
            <button key={f.slug} onClick={() => choose(f.slug)} disabled={loadingForm}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 text-left shadow-card transition hover:-translate-y-1 hover:border-gold hover:shadow-soft disabled:opacity-60">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold group-hover:bg-gold group-hover:text-navy">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy">{f.title}</h3>
              {f.subtitle && <p className="mt-2 text-sm text-slate">{f.subtitle}</p>}
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-dark">
                Start registration
                {loadingForm ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-4 text-center text-sm text-crimson">{error}</p>}
    </div>
  );
}
