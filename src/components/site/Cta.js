import Link from "next/link";
import { Button } from "@/components/ui";
import {
  School2, FileText, Sparkles, Trophy, Medal, Star, GraduationCap, BookOpen,
  Calculator, Rocket, ArrowRight, Download,
} from "lucide-react";

/* ================= animation css ================= */
const ANIM_CSS = `
@keyframes ct-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ct-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(6deg)}}
@keyframes ct-swing{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
@keyframes ct-pop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-5px) scale(1.1)}60%{transform:translateY(0) scale(.95)}}
@keyframes ct-spin{to{transform:rotate(360deg)}}
@keyframes ct-rocket{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(4px,-6px) rotate(-6deg)}}
@keyframes ct-glow{0%,100%{filter:drop-shadow(0 0 0 rgba(251,191,36,0))}50%{filter:drop-shadow(0 0 10px rgba(251,191,36,.95))}}
@keyframes ct-shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes ct-blob{0%,100%{border-radius:42% 58% 63% 37%/41% 44% 56% 59%}50%{border-radius:61% 39% 35% 65%/58% 62% 38% 42%}}
@keyframes ct-drop{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes ct-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
@keyframes ct-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
@keyframes ct-confetti{0%{transform:translateY(-20px) rotate(0);opacity:0}10%{opacity:1}100%{transform:translateY(420px) rotate(540deg);opacity:0}}
.ct-float{animation:ct-float 3.2s ease-in-out infinite}
.ct-wiggle{animation:ct-wiggle 2.4s ease-in-out infinite}
.ct-swing{animation:ct-swing 2.2s ease-in-out infinite;transform-origin:50% 0}
.ct-pop{animation:ct-pop 1.8s ease-in-out infinite}
.ct-spin{animation:ct-spin 8s linear infinite}
.ct-spin-slow{animation:ct-spin 30s linear infinite}
.ct-rocket{animation:ct-rocket 1.2s ease-in-out infinite}
.ct-glow{animation:ct-glow 2s ease-in-out infinite}
.ct-shine{background-size:200% 100%;animation:ct-shine 3.5s linear infinite}
.ct-blob{animation:ct-blob 10s ease-in-out infinite}
.ct-drop{animation:ct-drop 1s ease-in-out infinite}
.ct-nudge{animation:ct-nudge 1.2s ease-in-out infinite}
.ct-dot{animation:ct-dot 1.4s ease-in-out infinite}
.ct-confetti{animation:ct-confetti linear infinite}
@media (prefers-reduced-motion:reduce){[class*="ct-"]{animation:none!important}}
`;

/* orbiting icons around trophy */
const ORBIT = [
  { icon: GraduationCap, grad: "from-sky-500 to-indigo-500", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { icon: Medal, grad: "from-amber-400 to-orange-500", pos: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" },
  { icon: BookOpen, grad: "from-emerald-500 to-teal-500", pos: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2" },
  { icon: Calculator, grad: "from-pink-500 to-rose-500", pos: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
];

const CONFETTI = [
  { l: "8%", c: "bg-amber-400", d: "7s", dl: "0s", s: "h-2 w-3" },
  { l: "18%", c: "bg-pink-400", d: "9s", dl: "2s", s: "h-3 w-2" },
  { l: "30%", c: "bg-sky-400", d: "8s", dl: "4s", s: "h-2 w-2 rounded-full" },
  { l: "46%", c: "bg-emerald-400", d: "10s", dl: "1s", s: "h-2 w-3" },
  { l: "62%", c: "bg-amber-300", d: "7.5s", dl: "3s", s: "h-3 w-2" },
  { l: "74%", c: "bg-violet-300", d: "9.5s", dl: "5s", s: "h-2 w-2 rounded-full" },
  { l: "88%", c: "bg-rose-400", d: "8.5s", dl: "1.5s", s: "h-2 w-3" },
];

export default function Cta() {
  return (
    <section className="relative w-full px-4 pb-20 sm:px-6 lg:px-10 xl:px-14">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div className="mx-auto w-full max-w-[1600px]">
        {/* gradient border wrapper */}
        <div className="ct-shine rounded-[2.6rem] bg-gradient-to-r from-amber-300 via-pink-500 to-amber-300 p-[3px] shadow-[0_45px_100px_-45px_rgba(76,29,149,0.9)]">
          <div
            className="relative overflow-hidden rounded-[2.45rem] px-6 py-14 sm:px-12 sm:py-16 lg:py-20"
            style={{ backgroundImage: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 45%,#be185d 100%)" }}
          >
            {/* decor */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="ct-blob absolute -right-24 -top-24 h-80 w-80 bg-amber-400/25 blur-3xl" />
              <div className="ct-blob absolute -left-20 bottom-0 h-72 w-72 bg-sky-400/25 blur-3xl" />
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              {CONFETTI.map((c, i) => (
                <span key={i} className={`ct-confetti absolute -top-4 ${c.s} ${c.c}`} style={{ left: c.l, animationDuration: c.d, animationDelay: c.dl }} />
              ))}
              <Sparkles className="ct-glow absolute left-[6%] top-10 h-6 w-6 text-amber-300" />
              <Star className="ct-pop absolute right-[42%] bottom-8 h-4 w-4 fill-white/60 text-white/60" />
            </div>

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
              {/* ============ text ============ */}
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  Registrations Open · 2026–27
                </span>

                <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
                  Bring{" "}
                  <span className="ct-shine bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent">NextGen</span>
                  <br className="hidden sm:block" /> to Your School{" "}
                  <Rocket className="ct-rocket inline-block h-8 w-8 text-amber-300 sm:h-10 sm:w-10" />
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg lg:mx-0">
                  Give your students a platform to think deeply, compete fairly and shine on a national stage.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Link href="/apply" className="group">
                    <Button variant="gold" size="lg" className="w-full gap-2 shadow-lg shadow-amber-500/40 sm:w-auto">
                      <School2 className="ct-pop h-5 w-5" /> Register School
                      <ArrowRight className="ct-nudge h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/brand/brochure.pdf" target="_blank" className="group">
                    <Button
                      size="lg"
                      className="w-full gap-2 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20 sm:w-auto"
                      style={{ border: "2px solid rgba(255,255,255,0.35)" }}
                    >
                      <FileText className="h-5 w-5" /> Download Brochure
                      <Download className="ct-drop h-4 w-4 text-amber-300" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* ============ visual ============ */}
              <div className="relative mx-auto hidden aspect-square w-full max-w-[340px] sm:block">
                {/* rings */}
                <div className="ct-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-white/25" />
                <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-amber-300/30 to-pink-500/30 blur-xl" />
                <div className="absolute inset-[18%] rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur" />

                {/* trophy */}
                <div className="absolute inset-[26%] grid place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-[0_0_70px_-10px_rgba(251,191,36,0.9)]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/30" style={{ animationDuration: "2.6s" }} />
                  <Trophy className="ct-wiggle relative h-1/2 w-1/2 text-violet-900" strokeWidth={1.6} />
                </div>

                {/* orbit */}
                <div className="ct-spin-slow absolute inset-0">
                  {ORBIT.map(({ icon: Icon, grad, pos }, i) => (
                    <span key={i} className={`absolute ${pos}`}>
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-lg ring-4 ring-white/20`}
                        style={{ animation: "ct-spin 30s linear infinite reverse" }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                    </span>
                  ))}
                </div>

                {/* badge */}
                <div className="ct-float absolute -bottom-2 left-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-extrabold text-violet-900 shadow-xl" style={{ translate: "-50% 0" }}>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  Classes Bal Vatika – X
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}