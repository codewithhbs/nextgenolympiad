"use client";
import CrudManager from "@/components/dashboard/CrudManager";

export default function AdminAnnouncementsPage() {
  return (
    <CrudManager
      title="Announcements" subtitle="Scrolling ticker on the homepage — exam dates, results, registration notices"
      endpoint="/api/announcements" empty="No announcements yet"
      fields={[
        { name: "text", label: "Announcement text", required: true },
        { name: "tag", label: "Tag", placeholder: "Exam / Result / Registration" },
        { name: "link", label: "Link (optional)", placeholder: "/results" },
        { name: "order", label: "Order", type: "number" },
      ]}
      render={(item) => (
        <div>
          <span className="mr-2 rounded-full bg-gold-soft px-2 py-0.5 text-xs font-bold text-gold-ink">{item.tag || "Update"}</span>
          <span className="font-semibold text-ink">{item.text}</span>
          {item.link && <span className="ml-2 text-xs text-ink-soft">→ {item.link}</span>}
        </div>
      )}
    />
  );
}
