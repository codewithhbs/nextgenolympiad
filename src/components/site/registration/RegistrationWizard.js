"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, CheckCircle2, Loader2, Users, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";
import { validateStep, isVisible, isNote, computeTotals, matrixTotal } from "@/lib/formEngine";
import DynamicField from "./DynamicField";

export default function RegistrationWizard({ form, onRestart }) {
  const toast = useToast();
  const steps = form.steps || [];
  const totalSteps = steps.length;
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null); // success message

  const isReview = current === totalSteps;
  const step = steps[current];
  const totals = useMemo(() => computeTotals(form, data), [form, data]);

  const onChange = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      toast.error("Please fix the highlighted fields");
      const firstBad = document.querySelector("[data-err='1']");
      firstBad?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setCurrent((c) => Math.min(c + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setCurrent((c) => Math.max(c - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    // Full validation before submit
    const all = {};
    steps.forEach((s) => Object.assign(all, validateStep(s, data)));
    if (Object.keys(all).length) {
      setErrors(all);
      const idx = steps.findIndex((s) => Object.keys(validateStep(s, data)).length);
      setCurrent(idx);
      toast.error("Some fields need attention");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/api/registration", { formSlug: form.slug, data });
      setDone(res.data?.successMessage || form.successMessage || "Registration submitted successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      if (e.data?.errors) setErrors(e.data.errors);
      toast.error(e.message || "Submission failed. Please try again.");
    } finally { setSubmitting(false); }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-line bg-white p-10 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-navy">Registration received</h2>
        <div className="prose-cms mt-3 text-slate" dangerouslySetInnerHTML={{ __html: done }} />
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/school/payment"><Button variant="gold">Add students &amp; pay</Button></Link>
          <Link href="/school"><Button variant="outline">Go to dashboard</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress stepper */}
      {/* <div className="mb-8 flex items-center">
        {steps.map((s, i) => {
          const state = i < current || isReview ? "done" : i === current ? "active" : "todo";
          return (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition
                  ${state === "done" ? "bg-gold text-navy-deep" : state === "active" ? "bg-navy text-white ring-4 ring-navy/15" : "bg-mist text-slate"}`}>
                  {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`mt-1.5 hidden text-[0.7rem] font-semibold sm:block ${state === "todo" ? "text-slate" : "text-navy"}`}>{s.title}</span>
              </div>
              {i < steps.length - 1 && <div className={`mx-1 h-0.5 flex-1 rounded ${i < current || isReview ? "bg-gold" : "bg-line"}`} />}
            </div>
          );
        })}
      </div> */}

      <div className="rounded-3xl  border border-line bg-white p-6 shadow-card md:p-8">
        {!isReview ? (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wide text-gold-dark">Step {current + 1} of {totalSteps}</span>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">{step.title}</h2>
              {step.description && <p className="mt-1.5 text-sm text-slate">{step.description}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {step.fields.map((f) =>
                isVisible(f, data) ? (
                  <div key={f.name} data-err={errors[f.name] ? "1" : "0"} className={f.colSpan === 2 || ["note","subjectDates","classMatrix","checkbox"].includes(f.type) ? "sm:col-span-2" : ""}>
                    <DynamicField field={f} value={data[f.name]} error={errors[f.name]} data={data} onChange={onChange} />
                  </div>
                ) : null
              )}
            </div>
          </>
        ) : (
          <Review form={form} data={data} totals={totals} onEdit={setCurrent} />
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <Button variant="ghost" onClick={goBack} disabled={current === 0} className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          {!isReview ? (
            <Button variant="primary" onClick={goNext} className="gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gold" onClick={submit} loading={submitting}>
              {submitting ? "Submitting…" : "Submit Registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Review({ form, data, totals, onEdit }) {
  return (
    <div>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wide text-gold-dark">Final step</span>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Review & submit</h2>
        <p className="mt-1.5 text-sm text-slate">Check everything is correct before submitting.</p>
      </div>

      <div className="space-y-4">
        {form.steps.map((s, i) => (
          <div key={s.key} className="rounded-2xl border border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-navy">{s.title}</h3>
              <button onClick={() => onEdit(i)} className="text-sm font-semibold text-gold-dark hover:underline">Edit</button>
            </div>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {s.fields.filter((f) => !isNote(f) && isVisible(f, data)).map((f) => (
                <ReviewRow key={f.name} field={f} value={data[f.name]} />
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewRow({ field, value }) {
  let display;
  if (field.type === "subjectDates") {
    display = value ? Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(" · ") : "—";
  } else if (field.type === "classMatrix") {
    display = `${matrixTotal(value)} students`;
  } else if (field.type === "checkbox") {
    display = value ? "Yes" : "No";
  } else if (field.type === "password") {
    display = value ? "••••••••" : "—";
  } else {
    display = value === "" || value == null ? "—" : String(value);
  }
  const full = ["subjectDates", "classMatrix", "textarea"].includes(field.type) || field.colSpan === 2;
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate">{field.label}</dt>
      <dd className="mt-0.5 break-words text-sm font-medium text-navy">{display}</dd>
    </div>
  );
}
