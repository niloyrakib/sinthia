"use client";

import type { SEOFields as SEOFieldsType } from "@/lib/types";

export default function SEOFields({
  value,
  onChange,
}: {
  value: SEOFieldsType;
  onChange: (next: SEOFieldsType) => void;
}) {
  return (
    <div className="space-y-4 rounded-xl2 border border-line bg-white p-5">
      <h3 className="font-display text-sm font-bold text-ink">SEO</h3>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">SEO Title</label>
        <input
          value={value.seoTitle ?? ""}
          onChange={(e) => onChange({ ...value, seoTitle: e.target.value })}
          className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Meta Description</label>
        <textarea
          rows={2}
          value={value.metaDescription ?? ""}
          onChange={(e) => onChange({ ...value, metaDescription: e.target.value })}
          className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Canonical URL</label>
        <input
          value={value.canonicalUrl ?? ""}
          onChange={(e) => onChange({ ...value, canonicalUrl: e.target.value })}
          placeholder="https://sinthia.top/..."
          className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Open Graph Image URL</label>
        <input
          value={value.ogImage ?? ""}
          onChange={(e) => onChange({ ...value, ogImage: e.target.value })}
          className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
        />
      </div>
    </div>
  );
}
