import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const SOCIALS = [
  { key: "facebook", icon: Facebook },
  { key: "instagram", icon: Instagram },
  { key: "youtube", icon: Youtube },
  { key: "twitter", icon: Twitter },
  { key: "linkedin", icon: Linkedin },
];

const isValidUrl = (u) => typeof u === "string" && /^https?:\/\/.+\..+/.test(u.trim());

export default function Footer({ settings }) {
  const c = settings?.contact || {};
  const social = settings?.social || {};
  const year = new Date().getFullYear();
  // Only show socials the admin has explicitly enabled AND set a real URL for.
  const socialsOn = settings?.socialEnabled === true;
  const activeSocials = socialsOn ? SOCIALS.filter((s) => isValidUrl(social[s.key])) : [];

  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image src={settings?.logo?.url || "/brand/crest.png"} alt={settings?.siteName || "NextGen"} width={80} height={80} className="h-14 w-auto object-contain" />
            <span className="leading-none">
              <span className="block font-display text-xl font-extrabold text-white">NextGen</span>
              <span className="mt-0.5 block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-gold">Olympiad Foundation</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {settings?.footerText || "Learn • Compete • Excel. A national-level Olympiad for Classes I–X and Wonder Kids (Bal Vatika)."}
          </p>
          {activeSocials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {activeSocials.map((s) => (
                <a key={s.key} href={social[s.key]} target="_blank" rel="noopener noreferrer" aria-label={s.key}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy-deep">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/quiz" className="hover:text-white">Olympiad</Link></li>
            <li><Link href="/resources" className="hover:text-white">Study Resources</Link></li>
            <li><Link href="/results" className="hover:text-white">Results</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/apply" className="hover:text-white">Register School</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Legal</h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wide text-gold">Reach Us</h4>
          <ul className="space-y-3.5 text-sm text-white/65">
            {c.address && <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{c.address}</span></li>}
            {c.phone && <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={`tel:${c.phone}`} className="hover:text-white">{c.phone}</a></li>}
            {c.email && <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a></li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        {settings?.copyright || `© ${year} NextGen Olympiad Foundation. All rights reserved.`}
      </div>
    </footer>
  );
}
