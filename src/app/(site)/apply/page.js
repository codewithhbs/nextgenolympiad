import { CrestDivider } from "@/components/ui";
import ApplyClient from "@/components/site/registration/ApplyClient";
import { getSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  let s = {};
  try { s = await getSettings(); } catch {}
  return buildMetadata({
    title: `Register School • ${s.siteName || "NextGen Olympiad Foundation"}`,
    description: "Register your school for the NextGen Olympiad 2026–27 — Classes I–X and Wonder Kids (Bal Vatika).",
    path: "/apply",
    siteName: s.siteName,
  });
}

export default function ApplyPage() {
  return (
    <div className="bg-parchment py-14">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">School Registration · 2026–27</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-navy md:text-4xl">Register your school</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate">Choose the programme to begin. You can complete the form in a few guided steps and submit online.</p>
          <CrestDivider className="mt-6" />
        </div>
        <ApplyClient />
      </div>
    </div>
  );
}
