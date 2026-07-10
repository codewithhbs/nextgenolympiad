"use client";
import CrudManager from "@/components/dashboard/CrudManager";

export default function AdminFaqsPage() {
  return (
    <CrudManager
      title="FAQs" subtitle="Manage frequently asked questions" endpoint="/api/faqs"
      empty="No FAQs yet"
      fields={[
        { name: "question", label: "Question", required: true },
        { name: "answer", label: "Answer", type: "textarea", required: true },
        { name: "category", label: "Category", placeholder: "general" },
        { name: "order", label: "Order", type: "number" },
      ]}
      render={(item) => (
        <div>
          <div className="font-bold text-ink">{item.question}</div>
          <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{item.answer}</p>
        </div>
      )}
    />
  );
}
