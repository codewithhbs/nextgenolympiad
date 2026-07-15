import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight, Lightbulb, Brain, Trophy, Heart, Globe, ShieldCheck, BarChart3,
} from "lucide-react";

const PILLARS = [
    { icon: Lightbulb, ring: "bg-leaf", title: "Curiosity", sub: "Explored" },
    { icon: Brain, ring: "bg-[var(--brand)]", title: "Thinking", sub: "Strengthened" },
    { icon: Trophy, ring: "bg-saffron", title: "Excellence", sub: "Achieved" },
    { icon: Heart, ring: "bg-grape", title: "Learning", sub: "Enjoyed" },
];

const STRIP = [
    { icon: Globe, a: "National-Level", b: "Olympiad" },
    { icon: ShieldCheck, a: "Secure & Fair", b: "" },
    { icon: BarChart3, a: "For Classes I–X", b: "& Wonder Kids (Bal Vatika)" },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* faint bg watermarks */}
            <Lightbulb className="pointer-events-none absolute left-[40%] top-10 h-16 w-16 text-ink/[0.04]" aria-hidden />
            <Trophy className="pointer-events-none absolute right-10 top-8 h-16 w-16 text-ink/[0.04]" aria-hidden />
            <span className="pointer-events-none absolute left-[38%] top-1/2 select-none text-7xl font-black text-ink/[0.04]" aria-hidden>?</span>

            <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-24 pt-8 md:grid-cols-2 md:px-6 md:pb-28">
                {/* LEFT */}
                <div className="animate-fade-up">

                    <h1 className="mt-6 text-3xl font-black leading-snug text-ink md:text-[2.6rem] md:leading-[1.2]">
                        National-Level Olympiad for{" "}
                        <span className="text-[var(--brand)]">Classes I–X</span>{" "}

                        &{" "}
                        <span className="text-leaf">Wonder Kids</span>{" "}
                        <span className="text-saffron">(Bal Vatika)</span>
                    </h1>

                    <p className="mt-4 max-w-xl text-lg text-ink-soft">
                        Inspiring curiosity, analytical thinking, and joyful learning for every student.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link href="/register"
                            className="inline-flex items-center gap-3 rounded-full bg-[var(--brand)] py-3 pl-6 pr-2 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[var(--brand-deep)]">
                            Register Now
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" /></span>
                        </Link>
                        <Link href="/about"
                            className="inline-flex items-center rounded-full border-2 border-[var(--brand)]/40 px-7 py-3 font-bold text-[var(--brand)] transition hover:bg-[var(--brand)]/5">
                            Know More
                        </Link>
                    </div>

                    <div className="mt-10 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
                        {PILLARS.map((p) => (
                            <div key={p.title} className="text-center sm:text-left">
                                <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full ${p.ring} text-white shadow-soft`}>
                                    <p.icon className="h-6 w-6" />
                                </div>
                                <div className="text-sm font-black text-ink">{p.title}</div>
                                <div className="text-xs text-ink-soft">{p.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — your scene png */}
                <div className="relative animate-fade-up">
                    <Image src="/brand/hero-scene.png" alt="Students taking a NextGen Olympiad quiz with their teacher"
                        width={1000} height={900} className="h-auto w-full object-contain" priority />
                </div>
            </div>


        </section>
    );
}