"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  function select(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => select(null)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          !active ? "border-transparent bg-brand-gradient text-white" : "border-line text-ink/70 hover:border-ink/20"
        }`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => select(c.slug)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            active === c.slug
              ? "border-transparent bg-brand-gradient text-white"
              : "border-line text-ink/70 hover:border-ink/20"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
