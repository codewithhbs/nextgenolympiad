import Link from "next/link";
import { Button } from "@/components/ui";
import { School2, FileText, Sparkles } from "lucide-react";

export default function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <div
        className="relative overflow-hidden rounded-[2rem] px-6 py-14 shadow-soft sm:px-10"
        style={{ backgroundImage: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 45%,#be185d 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-[15%] top-8 h-40 w-40 rotate-12 rounded-[2rem] bg-white/5 blur-xl" aria-hidden />
        <Sparkles className="pointer-events-none absolute left-[12%] top-10 h-6 w-6 text-gold/50" aria-hidden />
        <Sparkles className="pointer-events-none absolute right-[10%] bottom-10 h-5 w-5 text-white/30" aria-hidden />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
            Registrations Open · 2026–27
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-white md:text-4xl">
            Bring NextGen to your school
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">
            Give your students a platform to think deeply, compete fairly and shine on a national stage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply">
              <Button variant="gold" size="lg" className="gap-2"><School2 className="h-4 w-4" /> Register School</Button>
            </Link>
            <Link href="/brand/brochure.pdf" target="_blank">
              <Button
                size="lg"
                className="gap-2 !bg-transparent !text-white"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
              >
                <FileText className="h-4 w-4" /> Download Brochure
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}