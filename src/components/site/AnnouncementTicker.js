import Link from "next/link";
import { Megaphone } from "lucide-react";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";

async function getItems() {
  try {
    await connectDB();
    return await Announcement.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).limit(12).lean();
  } catch { return []; }
}

export default async function AnnouncementTicker() {
  const items = await getItems();
  if (!items.length) return null;

  const Row = ({ ariaHidden }) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((a) => {
        const inner = (
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-gold">{a.tag}</span>
            <span className="font-medium text-white/90">{a.text}</span>
          </span>
        );
        return a.link
          ? <Link key={String(a._id)} href={a.link} className="hover:text-gold">{inner}</Link>
          : <span key={String(a._id)}>{inner}</span>;
      })}
    </div>
  );

  return (
    <div className="border-b border-white/10 bg-navy-deep text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center px-4 md:px-6">
        <span className="mr-3 flex shrink-0 items-center gap-1.5 border-r border-white/15 py-2 pr-3 text-xs font-bold uppercase tracking-wide text-gold">
          <Megaphone className="h-4 w-4" /> Latest
        </span>
        <div className="group relative flex-1 overflow-hidden py-2">
          <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            <Row /><Row ariaHidden />
          </div>
        </div>
      </div>
    </div>
  );
}
