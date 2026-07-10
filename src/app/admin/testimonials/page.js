"use client";
import CrudManager from "@/components/dashboard/CrudManager";

export default function AdminTestimonialsPage() {
  return (
    <CrudManager
      title="Testimonials" subtitle="Words from schools, teachers and parents" endpoint="/api/testimonials"
      empty="No testimonials yet" uploadFolder="nextgen/testimonials"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "role", label: "Role", placeholder: "Principal / Parent" },
        { name: "school", label: "School" },
        { name: "message", label: "Message", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "avatar", label: "Avatar", type: "image" },
        { name: "order", label: "Order", type: "number" },
      ]}
      render={(item) => (
        <div>
          <div className="flex items-center gap-3">
            {item.avatar?.url
              ? <img src={item.avatar.url} alt="" className="h-10 w-10 rounded-full object-cover" />
              : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron text-sm font-bold text-white">{item.name?.charAt(0)}</div>}
            <div>
              <div className="font-bold text-ink">{item.name}</div>
              <div className="text-xs text-ink-soft">{item.role}{item.school ? ` • ${item.school}` : ""}</div>
            </div>
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-ink-soft">"{item.message}"</p>
        </div>
      )}
    />
  );
}
