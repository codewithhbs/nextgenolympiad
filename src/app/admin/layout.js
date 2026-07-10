
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { adminNav } from "@/components/dashboard/nav";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Panel • NextGen Olympiad", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }) {
  const user = await getSession();
  if (!user) redirect("/login?next=/admin");
  if (!["admin", "super_admin"].includes(user.role)) redirect("/school");
  return (
    <DashboardShell nav={adminNav} user={user} brand="Admin">
      {children}
    </DashboardShell>
  );
}
