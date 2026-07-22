"use client";

import { useState } from "react";
import { Pencil, Eye } from "lucide-react";

export default function ContentEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-xl2 border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${tab === "write" ? "bg-surface text-ink" : "text-muted"}`}
          >
            <Pencil className="h-3.5 w-3.5" /> Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${tab === "preview" ? "bg-surface text-ink" : "text-muted"}`}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
        </div>
        <span className="text-xs text-muted">{words} words</span>
      </div>

      {tab === "write" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={16}
          placeholder="Write your content in Markdown..."
          className="w-full resize-none rounded-b-xl2 px-4 py-3 text-sm leading-relaxed focus:outline-none"
        />
      ) : (
        <div className="min-h-[280px] whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed text-ink/90">
          {value || <span className="text-muted">Nothing to preview yet.</span>}
        </div>
      )}
    </div>
  );
}
