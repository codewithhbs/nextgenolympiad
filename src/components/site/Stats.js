"use client";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Star, BookOpen } from "lucide-react";

// parses "1,000+" / "10+" into { num: 1000, prefix: "", suffix: "+" }
const parseValue = (raw) => {
  const match = String(raw).match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: "", raw };
  const [, prefix, digits, suffix] = match;
  return { prefix, num: parseInt(digits.replace(/,/g, ""), 10), suffix };
};

const formatNum = (n) => n.toLocaleString("en-US");

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatCard({ icon: Icon, label, rawValue, delay }) {
  const { prefix, num, suffix } = parseValue(rawValue);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(num, inView);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center gap-2 bg-white px-4 py-8 text-center transition-colors duration-300 hover:bg-navy/[0.03] sm:px-6 sm:py-10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <p className="font-display text-2xl font-extrabold tabular-nums text-navy sm:text-3xl md:text-4xl">
        {prefix}
        {formatNum(count)}
        {suffix}
      </p>
      <p className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-slate sm:text-xs md:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function Stats({ schools, results }) {
  const stats = [
    { label: "Partner Schools", value: schools ? `${schools}+` : "1+", icon: GraduationCap },
    { label: "Students Enrolled", value: results ? `${results}+` : "10,000+", icon: Users },
    { label: "Years of Excellence", value: "10+", icon: Star },
    { label: "Subjects Covered", value: "9+", icon: BookOpen },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft sm:rounded-3xl md:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} rawValue={s.value} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}