import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { schoolNav } from "@/components/dashboard/nav";

export const dynamic = "force-dynamic";
export const metadata = { title: "School Dashboard • NextGen Olympiad", robots: { index: false, follow: false } };

export default async function SchoolLayout({ children }) {
  const user = await getSession();
  if (!user) redirect("/login?next=/school");
  if (user.role !== "school") redirect("/admin");
  return <DashboardShell nav={schoolNav} user={user} brand="School">{children}</DashboardShell>;
}
