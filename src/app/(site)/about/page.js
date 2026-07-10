import Image from "next/image";
import Link from "next/link";
import {
  Eye, ShieldCheck, Users, Target, Sparkles, Trophy, Medal, Award,
  GraduationCap, BookOpen, HeartHandshake, ArrowRight,
} from "lucide-react";
import { Badge, Button, CrestDivider } from "@/components/ui";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `About Us • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "NextGen Olympiad Foundation — a veteran of national education olympiads with over a decade of experience, nurturing learners from Bal Vatika to Class X.",
    keywords: ["about nextgen olympiad", "olympiad foundation india", "wonder kids olympiad", "school olympiad"],
    path: "/about",
    siteName: s.siteName,
    image: s.seoDefaults?.ogImage,
  });
}

const VISION = [
  { icon: Eye, title: "Our Vision", text: "To empower students and teachers for a future-ready educational system, and to see Bharat as the Vishwaguru — discovering learners' potential by opening new opportunities and strengthening their knowledge base and confidence." },
  { icon: ShieldCheck, title: "A Registered Trust", text: "NextGen Olympiad Foundation is a trust registered by the Govt. of NCT of Delhi, headquartered in New Delhi, dedicated to promoting learning beyond the school curriculum for Classes Bal Vatika I to X." },
  { icon: Users, title: "In Partnership", text: "We are proud to associate with esteemed, future-ready institutions in spreading quality education — reckoned as the organiser of one of the biggest and most popular national olympiads." },
];

const GAINS = [
  { icon: Award, title: "Skills that last a lifetime", text: "Beyond certificates and medals — real understanding students carry forward." },
  { icon: Target, title: "Measurable improvement", text: "See interpretational improvement in specific areas over time." },
  { icon: Sparkles, title: "Powered potential", text: "Strong assessment tools and reports that reveal each learner's strengths." },
];

const AWARDS = [
  { medal: "Gold", grade: "text-gold-dark", label: "Gold Medal & Certificate of Distinction", note: "Class toppers scoring 85% and above." },
  { medal: "Silver", grade: "text-slate", label: "Silver Medal of Excellence", note: "Students scoring 80% to 84.99%." },
  { medal: "Bronze", grade: "text-crimson", label: "Bronze Medal of Excellence", note: "Students scoring 75% to 79.99%." },
  { medal: "SPR", grade: "text-navy", label: "Student Progress Report", note: "A detailed SPR for every participant." },
  { medal: "All", grade: "text-navy", label: "Certificate of Participation", note: "Awarded to all participants." },
];

const SCHOLARSHIPS = [
  { icon: HeartHandshake, title: "Girl Child Scholarship (SGCS)", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving, academically meritorious girl students from economically weaker sections across India.", tagline: "Educate a girl, empower a generation." },
  { icon: GraduationCap, title: "Academic Excellence Scholarship", text: "One-time scholarships of ₹5,000 each awarded to 100 deserving students — a source of motivation to strive for greater academic success.", tagline: "Rewarding excellence today, building a better tomorrow." },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative bg-navy-deep py-20 text-white">
        <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-navy/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
            Learn • Compete • Excel
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold md:text-5xl">A veteran of national education olympiads</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            NextGen Olympiad Foundation brings more than a decade of experience, excellence and popularity — designing olympiads that reward reasoning over rote.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-soft">
            <Image src="/brand/about-scene.png" alt="Young learners with a teacher" width={1000} height={800} className="h-auto w-full rounded-2xl object-contain" />
          </div>
          <div>
            <Badge tone="gold">About the Foundation</Badge>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Who we are</h2>
            <p className="mt-4 text-slate">
              We partner with schools across India to conduct olympiads in English, Computational Thinking, Mathematics, EVS and STEM. Our papers are crafted by educators to test conceptual clarity, application and creative problem-solving — not memorisation.
            </p>
            <p className="mt-4 text-slate">
              Beyond ranks and medals, our goal is to spark a lifelong love of learning. Every participant receives a certificate and a detailed progress report, while top performers earn recognition at school, zonal and national levels.
            </p>
          </div>
        </div>
      </section>

      {/* VISION / TRUST / PARTNERSHIP */}
      <section className="bg-parchment py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {VISION.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold"><v.icon className="h-6 w-6" /></div>
                <h3 className="font-display text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-slate">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENCHMARK PHILOSOPHY */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl border border-line bg-navy-deep p-8 text-white shadow-soft md:p-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">We believe</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">Ranking ends the conversation. Benchmark starts it.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/75">
              NextGen focuses on creating a benchmark for each participant, where students compete against their own self rather than lakhs of others. It's not about who did better than whom — it's about self-growth and understanding each learner better.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {GAINS.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-navy-deep"><g.icon className="h-5 w-5" /></div>
                <h3 className="font-bold text-white">{g.title}</h3>
                <p className="mt-1.5 text-sm text-white/65">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WONDER KIDS */}
      <section className="bg-parchment py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Badge tone="gold">Wonder Kids · Bal Vatika I, II & III</Badge>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Joyful foundations for early learners</h2>
              <p className="mt-4 text-slate">
                Aligned with NEP 2020, which recognises Early Childhood Care and Education as the foundational stage, the Wonder Kids Olympiad fosters curiosity, creativity and joyful discovery through activity- and play-based learning.
              </p>
              <p className="mt-4 text-slate">
                The aim is never to burden young learners, but to gently introduce structured thinking and problem-solving in a motivating way — building a strong base in literacy, numeracy and critical thinking.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["English", "Mathematics", "EVS", "Hindi", "Drawing"].map((s) => (
                  <span key={s} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-navy">{s}</span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-soft">
              <Image src="/brand/wonderkids.png" alt="Wonder Kids Olympiad" width={1000} height={800} className="h-auto w-full rounded-2xl object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <Badge tone="gold">Awards & Recognition</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Celebrating excellence at every level</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate">Meritorious students are awarded trophies, medals, certificates and special recognition prizes at national, zonal and school levels — and every participant is appreciated.</p>
          <CrestDivider className="mt-6" />
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-3xl border border-line bg-white shadow-card">
          {AWARDS.map((a) => (
            <div key={a.label} className="flex items-center gap-4 p-5">
              <Medal className={`h-8 w-8 shrink-0 ${a.grade}`} />
              <div>
                <div className="font-display font-bold text-navy">{a.label}</div>
                <div className="text-sm text-slate">{a.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="bg-navy-deep py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Scholarships</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">Supporting inclusivity and quality education</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SCHOLARSHIPS.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy-deep"><s.icon className="h-6 w-6" /></div>
                <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
                <p className="mt-4 text-sm font-semibold italic text-gold">{s.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <Trophy className="mx-auto h-10 w-10 text-gold" />
        <h2 className="mt-4 font-display text-3xl font-extrabold text-navy">Let's build a strong academic foundation together</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate">Register your school for the NextGen Olympiad 2026–27 and give every learner a fair, insightful benchmark.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/apply"><Button variant="gold" size="lg" className="gap-2">Register School <ArrowRight className="h-4 w-4" /></Button></Link>
          <Link href="/contact"><Button variant="outline" size="lg">Talk to us</Button></Link>
        </div>
      </section>
    </div>
  );
}
