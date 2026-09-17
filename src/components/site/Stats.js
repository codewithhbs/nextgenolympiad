import { GraduationCap, Target, ShieldCheck, Sparkles, School, Trophy } from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes st-cap{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-6px) rotate(-12deg)}60%{transform:translateY(0) rotate(8deg)}}
@keyframes st-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}45%{transform:scale(1.12)}}
@keyframes st-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes st-twinkle{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.2)}}
@keyframes st-spin{to{transform:rotate(360deg)}}
@keyframes st-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes st-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes st-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.st-cap{animation:st-cap 2.4s ease-in-out infinite}
.st-beat{animation:st-beat 1.6s ease-in-out infinite}
.st-pop{animation:st-pop 1.8s ease-in-out infinite}
.st-twinkle{animation:st-twinkle 2.6s ease-in-out infinite}
.st-spin{animation:st-spin 14s linear infinite}
.st-blob{animation:st-blob 9s ease-in-out infinite}
.st-rise{animation:st-rise .8s ease-out both}
.st-card:hover .st-sweep{animation:st-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="st-"]{animation:none!important}}
`;

const PILLARS = [
  { icon: GraduationCap, anim: "st-cap", title: "For Classes I–X", text: "Age-appropriate assessment, Bal Vatika to Class 10.", bg: "linear-gradient(135deg,#ec4899 0%,#fb923c 100%)", glow: "rgba(236,72,153,0.55)" },
  { icon: Target, anim: "st-beat", title: "Benchmark, Not Rank", text: "Students grow against their own past self.", bg: "linear-gradient(135deg,#0ea5e9 0%,#22d3ee 100%)", glow: "rgba(14,165,233,0.55)" },
  { icon: ShieldCheck, anim: "st-pop", title: "All Boards Welcome", text: "One consistent standard across every board.", bg: "linear-gradient(135deg,#10b981 0%,#a3e635 100%)", glow: "rgba(16,185,129,0.55)" },
  { icon: Sparkles, anim: "st-twinkle", title: "9+ Subjects", text: "From core academics to computational thinking.", bg: "linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)", glow: "rgba(139,92,246,0.55)" },
];

export default function Stats({ schools = 0, results = 0 }) {
  const live = [
    schools > 0 && { icon: School, label: "Partner schools", value: schools },
    results > 0 && { icon: Trophy, label: "Results published", value: results },
  ].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`st-card st-rise group relative overflow-hidden rounded-[2rem] p-5 text-white transition duration-300 hover:-translate-y-2 sm:p-7`}
              style={{ backgroundImage: p.bg, animationDelay: `${i * 0.12}s`, boxShadow: `0 25px 50px -28px ${p.glow}` }}
            >
              {/* decor */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="st-blob absolute -right-8 -top-10 h-32 w-32 bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
                <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <div className="st-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="absolute right-4 top-3 font-display text-5xl font-extrabold text-white/15">0{i + 1}</span>
              </div>

              <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                {/* animated icon */}
                <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                  <svg className="st-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                    <circle cx="50" cy="50" r="46" stroke="white" strokeOpacity=".6" strokeWidth="2" strokeDasharray="40 18" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-2 grid place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white/35 group-hover:ring-white/70">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/25" style={{ animationDuration: "2.8s", animationDelay: `${i * 0.4}s` }} />
                    <p.icon className={`relative h-6 w-6 sm:h-8 sm:w-8 ${p.anim}`} strokeWidth={1.9} style={{ animationDelay: `${i * 0.3}s` }} />
                  </span>
                </div>

                <div className="mt-4 lg:mt-1">
                  <p className="font-display text-base font-extrabold leading-tight sm:text-xl">{p.title}</p>
                  <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-white/70 transition-all group-hover:w-16 lg:mx-0" />
                  <p className="mt-2 text-[11px] font-medium leading-snug text-white/90 sm:text-sm">{p.text}</p>
                </div>
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