"use client";
import CrudManager from "@/components/dashboard/CrudManager";

export default function AdminGalleryPage() {
  return (
    <CrudManager
      title="Gallery" subtitle="Event photos shown on the website" endpoint="/api/gallery"
      empty="No images yet" uploadFolder="nextgen/gallery"
      fields={[
        { name: "title", label: "Title" },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "category", label: "Category", placeholder: "events" },
        { name: "order", label: "Order", type: "number" },
      ]}
      render={(item) => (
        <div>
          {item.image?.url && <img src={item.image.url} alt={item.title || ""} className="mb-2 h-36 w-full rounded-xl object-cover" />}
          <div className="font-bold text-ink">{item.title || "Untitled"}</div>
          <div className="text-xs text-ink-soft">{item.category}</div>
        </div>
      )}
    />
  );
}
