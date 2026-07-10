"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Bell } from "lucide-react";
import clsx from "clsx";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/Toast";
import NavIcon from "./NavIcon";

export default function DashboardShell({ nav, user, brand = "NextGen", children }) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try { await api.post("/api/auth/logout", {}); } catch {}
    toast.success("Signed out");
    router.replace("/login");
    router.refresh();
  };

  const Logo = ({ mobile }) => (
    <Link
      href="/"
      className={clsx(
        "flex items-center gap-2.5 px-5 py-5",
        mobile && "flex-1"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-sm font-extrabold text-navy">
        NG
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-extrabold text-white">{brand}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Olympiad</span>
      </span>
    </Link>
  );

  const SignOutButton = () => (
    <button
      onClick={logout}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/65 transition-colors hover:bg-white/10 hover:text-white"
    >
      <LogOut color="#fff" className="h-4 w-4" /> Sign out
    </button>
  );

  const NavList = () => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {nav.map((group) => (
        <div key={group.label} className="mb-4">
          <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-white/40">
            {group.label}
          </div>
          {group.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-gold text-navy shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <NavIcon name={item.icon} className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {/* Sign out — sits directly under the last nav item, not pinned to sidebar bottom */}
      <div className="mt-2 border-t border-white/10 pt-2">
        <SignOutButton />
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-cloud">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink lg:flex">
        <Logo />
        <NavList />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-ink shadow-2xl">
            <div className="flex items-center border-b border-white/10">
              <Logo mobile />
              <button
                onClick={() => setOpen(false)}
                className="mr-3 rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavList />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-ink/5 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="shrink-0 rounded-lg p-2 text-ink hover:bg-sky lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate text-sm font-bold text-ink">{brand} Panel</span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={user?.role === "school" ? "/school/notifications" : "/admin/notifications"}
              className="rounded-lg p-2 text-ink hover:bg-sky"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>
              <div className="hidden text-right sm:block">
                <div className="max-w-[140px] truncate text-xs font-bold text-ink">{user?.name}</div>
                <div className="text-[11px] capitalize text-ink-soft">{user?.role?.replace("_", " ")}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}