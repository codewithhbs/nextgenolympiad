import Image from "next/image";
import { Sparkles, Star, ShieldCheck } from "lucide-react";

/* ⬇️ apne paths / text yahan set kar lena */
const LOGO_SRC = "/brand/logo-new.jpeg";

const LOGOS = [
  {
    src: "/brand/logo1.png",
    alt: "NCF 2023",
    title: "NCF 2023",
    caption: "In accordance with",
    grad: "linear-gradient(135deg,#f97316 0%,#fbbf24 100%)",
    tint: "#fff7ed",
  },
  {
    src: "/brand/logo2.png",
    alt: "NEP 2020",
    title: "NEP 2020",
    caption: "Aligned with",
    grad: "linear-gradient(135deg,#1e3a5f 0%,#3b82f6 100%)",
    tint: "#eff6ff",
  },
  {
    src: "/brand/logo3.png",
    alt: "UN SDG Goal 4",
    title: "UN SDG · Goal 4",
    caption: "Quality Education",
    grad: "linear-gradient(135deg,#be123c 0%,#f43f5e 100%)",
    tint: "#fff1f2",
  },
];

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes al-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes al-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes al-spin{to{transform:rotate(360deg)}}
@keyframes al-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 9px rgba(251,191,36,.95))}}
@keyframes al-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes al-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes al-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes al-pulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.9);opacity:0}}
@keyframes al-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes al-sweep{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(320%) skewX(-20deg)}}
.al-float{animation:al-float 3.4s ease-in-out infinite}
.al-pop{animation:al-pop 1.8s ease-in-out infinite}
.al-spin{animation:al-spin 26s linear infinite}
.al-glow{animation:al-glow 2s ease-in-out infinite}
.al-shine{background-size:200% 100%;animation:al-shine 3.5s linear infinite}
.al-blob{animation:al-blob 10s ease-in-out infinite}
.al-rise{animation:al-rise .8s ease-out both}
.al-pulse{animation:al-pulse 2.4s ease-out infinite}
.al-grow-l{transform-origin:right;animation:al-grow 1s ease-out both}
.al-grow-r{transform-origin:left;animation:al-grow 1s ease-out both}
.al-card:hover .al-sweep{animation:al-sweep 1s ease-out}
@media (prefers-reduced-motion:reduce){[class*="al-"]{animation:none!important}}
`;

export default function AlignmentSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-20"
      style={{ backgroundImage: "linear-gradient(160deg,#ffffff 0%,#fff7ed 45%,#eff6ff 100%)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="al-blob absolute -left-24 top-0 h-80 w-80 bg-amber-300/35 blur-3xl" />
        <div className="al-blob absolute -right-24 bottom-0 h-80 w-80 bg-blue-300/35 blur-3xl" />
        <div className="al-blob absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 bg-rose-300/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }}
        />
        <Star className="al-pop absolute left-[8%] top-12 h-5 w-5 fill-amber-400 text-amber-400" />
        <Star className="al-float absolute right-[9%] top-20 h-4 w-4 fill-blue-400 text-blue-400" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 text-center sm:px-6 lg:px-10 xl:px-14">
        {/* ===== logo ===== */}
        <div className="al-rise relative mx-auto w-full max-w-[240px] sm:max-w-[320px]">
          <div className="al-spin absolute inset-[-14%] rounded-full border-2 border-dashed border-amber-300/70" aria-hidden />
          <div className="absolute inset-[-4%] rounded-full bg-gradient-to-br from-amber-200/40 via-white to-blue-200/40 blur-2xl" aria-hidden />
          <div className="al-float relative">
            <Image
              src={LOGO_SRC}
              alt="Orange Global Olympiad"
              width={680}
              height={340}
              priority
              className="mx-auto h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,.18)]"
            />
          </div>
        </div>

        {/* ===== heading ===== */}
        <span className="al-rise mt-8 inline-flex items-center gap-3 rounded-full bg-white/85 py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-18px_rgba(15,23,42,.8)] ring-1 ring-blue-100 backdrop-blur">
          <span className="relative grid h-9 w-9 place-items-center rounded-full">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/40" style={{ animationDuration: "2.6s" }} />
            <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
              <ShieldCheck className="al-pop h-4 w-4" />
            </span>
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-blue-900 sm:text-xs">Recognised &amp; Aligned</span>
          <Sparkles className="al-glow h-4 w-4 text-amber-500" />
        </span>

        <h2 className="al-rise mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-[#1e3a5f] sm:text-5xl xl:text-6xl">
          Proudly In{" "}
          <span className="al-shine bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Alignment With
          </span>
        </h2>

        {/* ===== divider (pure CSS — har screen par sahi) ===== */}
        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center gap-2 sm:gap-3" aria-hidden>
          <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[#1e3a5f]" />
          <span className="al-grow-l h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#1e3a5f]/20 to-[#1e3a5f]" />
          <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full border-[3px] border-[#1e3a5f] bg-white">
            <span className="al-pulse absolute inset-0 rounded-full bg-orange-400/60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
          </span>
          <span className="al-grow-r h-[3px] flex-1 rounded-full bg-gradient-to-l from-[#1e3a5f]/20 to-[#1e3a5f]" />
          <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[#1e3a5f]" />
        </div>

        {/* ===== 3 logo cards ===== */}
        <div className="mx-auto mt-12 grid w-full max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {LOGOS.map((l, i) => (
            <div
              key={l.title}
              className={`al-card al-rise group relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-white/90 p-6 ring-1 ring-black/5 backdrop-blur transition duration-300 hover:-translate-y-2 sm:p-8 ${
                i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[420px] lg:col-span-1 lg:max-w-none" : ""
              }`}
              style={{ animationDelay: `${i * 0.12}s`, boxShadow: "0 25px 55px -35px rgba(15,23,42,.5)" }}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundImage: l.grad }} />
                <div
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: l.tint }}
                />
                <div className="al-sweep absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
              </div>

              {/* logo */}
              <div className="relative grid h-28 w-28 place-items-center rounded-full bg-white shadow-inner ring-1 ring-black/5 sm:h-32 sm:w-32">
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={200}
                  height={200}
                  className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
                />
              </div>

              <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">{l.caption}</p>
              <h3 className="relative mt-1 font-display text-xl font-extrabold leading-snug text-[#1e3a5f] sm:text-2xl">{l.title}</h3>
              <span className="relative mt-3 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-20" style={{ backgroundImage: l.grad }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}