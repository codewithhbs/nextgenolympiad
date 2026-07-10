"use client";
import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// HTML-producing rich text editor. value = HTML string, onChange(html).
export default function RichTextEditor({ value = "", onChange, placeholder = "Write content… (HTML allowed)", height = 260 }) {
  const ref = useRef(null);
  const config = useMemo(() => ({
    readonly: false,
    height,
    placeholder,
    toolbarAdaptive: false,
    buttons: ["bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "paragraph", "link", "|", "align", "|", "undo", "redo", "eraser", "source"],
    buttonsMD: ["bold", "italic", "ul", "ol", "link", "paragraph", "source"],
    buttonsSM: ["bold", "italic", "ul", "ol", "link"],
    style: { fontFamily: "inherit" },
  }), [height, placeholder]);

  return (
    <div className="jodit-wrap rounded-xl border-2 border-line focus-within:border-gold">
      <JoditEditor ref={ref} value={value} config={config}
        onBlur={(html) => onChange?.(html)} />
    </div>
  );
}
