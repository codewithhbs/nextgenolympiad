import { GraduationCap, Target, ShieldCheck, Sparkles, School, Trophy } from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes st-cap{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-6px) rotate(-12deg)}60%{transform:translateY(0) rotate(8deg)}}
@keyframes st-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}45%{transform:scale(1.12)}}
@keyframes st-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes st-twinkle{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.2)}}
@keyframes st-spin{to{transform:rotate(360deg)}}
@keyframes st-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes st-rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes st-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.st-cap{animation:st-cap 2.4s ease-in-out infinite}
.st-beat{animation:st-beat 1.6s ease-in-out infinite}
.st-pop{animation:st-pop 1.8s ease-in-out infinite}
.st-twinkle{animation:st-twinkle 2.6s ease-in-out infinite}
.st-spin{animation:st-spin 16s linear infinite}
.st-blob{animation:st-blob 9s ease-in-out infinite}
.st-rise{animation:st-rise .8s ease-out both}
.st-card:hover .st-sweep{animation:st-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="st-"]{animation:none!important}}
`;

const PILLARS = [
  { icon: GraduationCap, anim: "st-cap", title: "For Balvatika I to X", text: "Age-appropriate assessment, Balvatika to Class 10.", bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", tint: "#fdf2f8", line: "#ec4899", glow: "rgba(236,72,153,0.45)" },
  { icon: Target, anim: "st-beat", title: "Benchmark, Not Rank", text: "Students grow against their own past self.", bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", tint: "#eff6ff", line: "#0ea5e9", glow: "rgba(14,165,233,0.45)" },
  { icon: ShieldCheck, anim: "st-pop", title: "All Boards Welcome", text: "One consistent standard across every board.", bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", tint: "#ecfdf5", line: "#10b981", glow: "rgba(16,185,129,0.45)" },
  { icon: Sparkles, anim: "st-twinkle", title: "9+ Subjects", text: "From core academics to computational thinking.", bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", tint: "#f5f3ff", line: "#8b5cf6", glow: "rgba(139,92,246,0.45)" },
];

export default function Stats({ schools = 0, results = 0 }) {
  const live = [
    schools > 0 && { icon: School, label: "Partner schools", value: schools },
    results > 0 && { icon: Trophy, label: "Results published", value: results },
  ].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* soft backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="st-blob absolute -left-24 top-0 h-80 w-80 bg-rose-300/40 blur-3xl" />
        <div className="st-blob absolute left-1/3 -top-10 h-72 w-72 bg-amber-300/35 blur-3xl" />
        <div className="st-blob absolute -right-24 bottom-0 h-80 w-80 bg-violet-300/40 blur-3xl" />
        <div className="st-blob absolute right-1/3 bottom-0 h-64 w-64 bg-emerald-300/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(#fda4af 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-14">
        {/* 1 col mobile → 2 cols tablet & small laptop → 4 cols only on wide screens */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="st-card st-rise group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 text-white ring-1 ring-white/25 transition duration-300 hover:-translate-y-2 sm:p-6"
              style={{ backgroundImage: p.bg, animationDelay: `${i * 0.1}s`, boxShadow: `0 28px 55px -28px ${p.glow}` }}
            >
              {/* decor */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="st-blob absolute -right-10 -top-12 h-36 w-36 bg-white/25 blur-xl transition-transform duration-500 group-hover:scale-150" />
                <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-black/10" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <div className="st-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </div>

              {/* header row: icon + number */}
              <div className="relative flex items-center justify-between gap-3">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center sm:h-[4.5rem] sm:w-[4.5rem]">
                  <svg className="st-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                    <circle cx="50" cy="50" r="46" stroke="white" strokeOpacity=".65" strokeWidth="2.5" strokeDasharray="40 18" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/25" style={{ animationDuration: "2.8s", animationDelay: `${i * 0.4}s` }} />
                  <span className="absolute inset-2 grid place-items-center rounded-full bg-white/25 ring-1 ring-white/50 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white/35">
                    <p.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${p.anim}`} strokeWidth={1.9} style={{ animationDelay: `${i * 0.3}s` }} />
                  </span>
                </span>

                <span className="font-display text-4xl font-extrabold leading-none text-white/35 sm:text-5xl">0{i + 1}</span>
              </div>

              {/* text */}
              <div className="relative mt-5 flex flex-1 flex-col">
                <h3 className="font-display text-lg font-extrabold leading-snug drop-shadow-sm sm:text-xl">{p.title}</h3>
                <span className="mt-2 block h-1 w-8 rounded-full bg-white/80 transition-all duration-300 group-hover:w-16" />
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/90 sm:text-[15px]">{p.text}</p>
              </div>

              {/* bottom dotted rail */}
              <div className="relative mt-5 flex items-center gap-1.5" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                <span className="h-1.5 w-6 rounded-full bg-white/90 transition-all duration-300 group-hover:w-12" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              </div>
            </div>
          ))}
        </div>

        {/* live counts (only when data exists) */}
        {/* {live.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {live.map(({ icon: Icon, label, value }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white">
                  <Icon className="st-pop h-4 w-4" />
                </span>
                <span className="font-extrabold text-red-600">{value.toLocaleString("en-IN")}+</span> {label}
                <span className="relative ml-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </span>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
}