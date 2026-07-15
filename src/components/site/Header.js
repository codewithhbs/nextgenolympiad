"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Olympiad",
    href: "/quiz",
    children: [
   
      { label: "NextGen Olympiad", href: "/olympiad/nextgen", desc: "Classes I–X · 9+ subjects" },
      { label: "Wonder Kids", href: "/olympiad/wonder-kids", desc: "Bal Vatika I, II & III" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Awards & Certification", href: "/awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header({ settings, user }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const [mDrop, setMDrop] = useState(null);
  const pathname = usePathname();
  const ref = useRef(null);

  useEffect(() => { setOpen(false); setDrop(null); setMDrop(null); }, [pathname]);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setDrop(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const mark = settings?.logo?.url || "/brand/crest.png";
  const name = settings?.siteName || "NextGen";
  const phone = settings?.contact?.phone;
  const isLoggedIn = !!user;
  const dashboardHref = user?.role === "school" ? "/school" : "/admin";

  const isActive = (n) =>
    n.href === "/" ? pathname === "/"
      : pathname.startsWith(n.href) || (n.children || []).some((c) => pathname.startsWith(c.href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-16px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6" ref={ref}>
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={mark} alt={name} width={120} height={120} priority className="w-auto object-contain" style={{ height: "var(--logo-h)" }} />
          <span className="leading-none">
            <span className="block font-display text-2xl font-extrabold tracking-tight text-ink md:text-[1.7rem]">Next<span className="text-brand">Gen</span></span>
            <span className="mt-0.5 block text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-gold-dark md:text-xs">
              Olympiad Foundation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => {
            const active = isActive(n);
            if (!n.children) {
              return (
                <Link key={n.href} href={n.href}
                  className={`rounded-lg px-3 py-2 font-[600] transition ${active ? "bg-brand-soft text-brand" : "text-ink hover:bg-brand-soft hover:text-brand"}`} style={{ fontSize: "var(--fs-nav)" }}>
                  {n.label}
                </Link>
              );
            }
            const isOpen = drop === n.label;
            return (
              <div key={n.label} className="relative" onMouseEnter={() => setDrop(n.label)} onMouseLeave={() => setDrop(null)}>
                <button onClick={() => setDrop(isOpen ? null : n.label)} aria-expanded={isOpen} style={{ fontSize: "var(--fs-nav)" }}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 font-bold transition ${active ? "bg-brand-soft text-brand" : "text-ink hover:bg-brand-soft hover:text-brand"}`}>
                  {n.label} <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-soft">
                    {n.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setDrop(null)}
                        className="block rounded-xl px-3 py-2.5 transition hover:bg-brand-soft">
                        <span className="block text-[0.95rem] font-bold text-brand">{c.label}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-slate">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {isLoggedIn ? (
            <Link href={dashboardHref}>
              <Button variant="primary" size="sm"><LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login"><Button variant="outline" size="sm">School Login</Button></Link>
              
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-brand xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label}>
                  <button onClick={() => setMDrop(mDrop === n.label ? null : n.label)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-bold text-ink hover:bg-brand-soft" style={{ fontSize: "var(--fs-nav)" }}>
                    {n.label}
                    <ChevronDown className={`h-4 w-4 transition ${mDrop === n.label ? "rotate-180" : ""}`} />
                  </button>
                  {mDrop === n.label && (
                    <div className="ml-3 border-l-2 border-line pl-3">
                      {n.children.map((c) => (
                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-bold text-brand hover:bg-brand-soft">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[0.95rem] font-bold text-ink hover:bg-brand-soft">{n.label}</Link>
              )
            )}
            {phone && (
              <a href={`tel:${phone}`} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-[0.95rem] font-bold text-gold-dark">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            )}
            <div className="mt-2 flex gap-2">
              {isLoggedIn ? (
                <Link href={dashboardHref} className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="gold" className="w-full"><LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/apply" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="primary" className="w-full">Register</Button>
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
