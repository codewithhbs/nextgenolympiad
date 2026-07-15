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
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((a) => {
        const inner = (
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-brand">
              {a.tag}
            </span>
            <span className="font-medium text-ink/80">{a.text}</span>
            <span className="h-1 w-1 rounded-full bg-line" />
          </span>
        );
        return a.link
          ? <Link key={String(a._id)} href={a.link} className="transition hover:text-brand">{inner}</Link>
          : <span key={String(a._id)}>{inner}</span>;
      })}
    </div>
  );

  return (
    <div className="border-b border-line bg-gradient-to-r from-brand-soft/60 via-surface to-gold-soft/50 text-sm text-ink">
      <div className="mx-auto flex max-w-7xl items-center px-4 md:px-6">
        <span className="mr-3 flex shrink-0 items-center gap-1.5 border-r border-line py-2.5 pr-3 text-xs font-bold uppercase tracking-wide text-brand">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <Megaphone className="h-4 w-4" />
          <span className="hidden sm:inline">Latest</span>
        </span>

        <div className="group relative flex-1 overflow-hidden py-2.5">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-gold-soft/50 to-transparent" />

          <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            <Row /><Row ariaHidden />
          </div>
        </div>
      </div>
    </div>
  );
}