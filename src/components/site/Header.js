"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "NextGen Olympiad",
    href: "/olympiad/nextgen",
    children: [
      { label: "About NextGen", href: "/olympiad/nextgen", desc: "Classes I–X · 9+ subjects" },
      {
        label: "Subjects", href: "/olympiad/nextgen/subjects",
        children: [
          { label: "English" },
          { label: "Maths" },
          { label: "STEM" },
          { label: "Computational Thinking" },
        ]
      },
    ],
  },
  {
    label: "Wonder Kids Olympiad",
    href: "/olympiad/wonder-kids",
    children: [
      { label: "About Wonder Kids", href: "/olympiad/wonder-kids", desc: "Bal Vatika I, II & III" },
      { label: "Bal Vatika I", href: "/olympiad/wonder-kids/bal-vatika-1" },
      { label: "Bal Vatika II", href: "/olympiad/wonder-kids/bal-vatika-2" },
      { label: "Bal Vatika III", href: "/olympiad/wonder-kids/bal-vatika-3" },
    ],
  },
  { label: "Awards & Certification", href: "/awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header({ settings, user }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const [subDrop, setSubDrop] = useState(null); // NEW: tracks open nested submenu (desktop)
  const [mDrop, setMDrop] = useState(null);
  const [mSubDrop, setMSubDrop] = useState(null); // NEW: tracks open nested submenu (mobile)
  const pathname = usePathname();
  const ref = useRef(null);

  useEffect(() => { setOpen(false); setDrop(null); setSubDrop(null); setMDrop(null); setMSubDrop(null); }, [pathname]);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setDrop(null); setSubDrop(null); } };
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
                  className={`rounded-lg text-nowrap px-3 py-2 font-[700] transition text-[14px] ${active ? "bg-brand-soft text-brand" : "text-ink hover:bg-brand-soft hover:text-brand"}`}>
                  {n.label}
                </Link>
              );
            }
            const isOpen = drop === n.label;
            return (
              <div key={n.label} className="relative" onMouseEnter={() => setDrop(n.label)} onMouseLeave={() => { setDrop(null); setSubDrop(null); }}>
                <button onClick={() => setDrop(isOpen ? null : n.label)} aria-expanded={isOpen}
                  className={`flex items-center text-nowrap gap-1 rounded-lg px-3 py-2 font-bold transition text-[14px] ${active ? "bg-brand-soft text-brand" : "text-ink hover:bg-brand-soft hover:text-brand"}`}>
                  {n.label} <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full z-50 w-72 overflow-visible rounded-2xl border border-line bg-white p-2 shadow-soft">
                    {n.children.map((c) =>
                      c.children ? (
                        // NEW: item with nested children renders its own hover-triggered submenu
                        <div key={c.label} className="relative" onMouseEnter={() => setSubDrop(c.label)} onMouseLeave={() => setSubDrop(null)}>
                          <div className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-brand-soft cursor-pointer">
                            <div>
                              <span className="block text-[0.95rem] font-bold text-brand">{c.label}</span>
                              {c.desc && <span className="mt-0.5 block text-xs font-semibold text-slate">{c.desc}</span>}
                            </div>
                            <ChevronDown className={`h-4 w-4 -rotate-90 transition ${subDrop === c.label ? "text-brand" : "text-slate"}`} />
                          </div>
                          {subDrop === c.label && (
                            <div className="absolute left-full top-0 z-50 w-64 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-soft">
                              {c.children.map((sc) =>
                                sc.href ? (
                                  <Link key={sc.href} href={sc.href} onClick={() => { setDrop(null); setSubDrop(null); }}
                                    className="block text-nowrap rounded-xl px-3 py-2.5 text-[0.95rem] font-bold text-brand transition hover:bg-brand-soft">
                                    {sc.label}
                                  </Link>
                                ) : (
                                  <span key={sc.label}
                                    className="block text-nowrap rounded-xl px-3 py-2.5 text-[0.95rem] font-bold text-slate">
                                    {sc.label}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link key={c.href} href={c.href} onClick={() => setDrop(null)}
                          className="block text-nowrap rounded-xl px-3 py-2.5 transition hover:bg-brand-soft">
                          <span className="block text-[0.95rem] font-bold text-brand">{c.label}</span>
                          <span className="mt-0.5 block text-xs font-semibold text-slate">{c.desc}</span>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {isLoggedIn ? (
            <Link href={dashboardHref}>
              <Button variant="primary" size="sm"><LayoutDashboard className="mr-1.5 h-4 w-4 text-nowrap" /> Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login"><Button variant="outline" className="text-nowrap" size="sm">School Login</Button></Link>

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
                      {n.children.map((c) =>
                        c.children ? (
                          // NEW: nested accordion level for mobile
                          <div key={c.label}>
                            <button onClick={() => setMSubDrop(mSubDrop === c.label ? null : c.label)}
                              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[0.95rem] font-bold text-brand hover:bg-brand-soft">
                              {c.label}
                              <ChevronDown className={`h-4 w-4 transition ${mSubDrop === c.label ? "rotate-180" : ""}`} />
                            </button>
                            {mSubDrop === c.label && (
                              <div className="ml-3 border-l-2 border-line pl-3">
                                {c.children.map((sc) =>
                                  sc.href ? (
                                    <Link key={sc.href} href={sc.href} onClick={() => { setDrop(null); setSubDrop(null); }}
                                      className="block text-nowrap rounded-xl px-3 py-2.5 text-[0.95rem] font-bold text-brand transition hover:bg-brand-soft">
                                      {sc.label}
                                    </Link>
                                  ) : (
                                    <span key={sc.label}
                                      className="block text-nowrap rounded-xl px-3 py-2.5 text-[0.95rem] font-bold text-slate">
                                      {sc.label}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-bold text-brand hover:bg-brand-soft">
                            {c.label}
                          </Link>
                        )
                      )}
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