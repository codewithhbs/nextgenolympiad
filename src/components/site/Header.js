"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Olympiad", href: "/quiz" },
  { label: "Resources", href: "/resources" },
  { label: "Results", href: "/results" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ settings, user }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mark = settings?.logo?.url || "/brand/crest.png";
  const name = settings?.siteName || "NextGen";
  const phone = settings?.contact?.phone;

  const isLoggedIn = !!user;
  const dashboardHref = user?.role === "school" ? "/school" : "/admin";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        {/* Brand — crest mark left, name right */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={mark} alt={name} width={120} height={120} priority
            className="h-14 w-auto object-contain md:h-16" />
          <span className="leading-none">
            <span className="block font-display text-2xl font-extrabold tracking-tight text-navy md:text-[1.7rem]">
              NextGen
            </span>
            <span className="mt-0.5 block text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold-dark md:text-xs">
              Olympiad Foundation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active ? "text-gold-dark" : "text-navy/75 hover:bg-mist hover:text-navy"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <Link href={dashboardHref}>
              <Button variant="gold" size="sm">
                <LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login"><Button variant="outline" size="sm">School Login</Button></Link>
              <Link href="/apply"><Button className={"bg-[#177422] text-white shadow-none hover:bg-[#70da7c]"} variant="gold" size="sm">Register School</Button></Link>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ivory px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy hover:bg-mist">{n.label}</Link>
            ))}
            {phone && (
              <a href={`tel:${phone}`} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gold-dark">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            )}
            <div className="mt-2 flex gap-2">
              {isLoggedIn ? (
                <Link href={dashboardHref} className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="gold" className="w-full shadow-none">
                    <LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/apply" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="gold" className="w-full shadow-none">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}