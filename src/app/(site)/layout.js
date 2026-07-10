import { cookies, headers } from "next/headers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnnouncementTicker from "@/components/site/AnnouncementTicker";
import { getSettings } from "@/lib/seo";
import { getSession } from "@/lib/auth";

export default async function SiteLayout({ children }) {
  let settings = {};
  try { settings = await getSettings(); } catch { }
  const user = await getSession();



  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementTicker />
      <Header settings={settings} user={user} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}