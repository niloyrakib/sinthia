"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/types/content";

export function TableOfContents({ content }: { content: ContentBlock[] }) {
  const headings = content.filter((b) => b.type === "heading" && b.id);
  const [activeId, setActiveId] = React.useState<string | null>(headings[0]?.id ?? null);

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id!);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- headings derived from content prop, stable per article
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-w-[220px] lg:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors",
                activeId === h.id
                  ? "border-primary-600 font-medium text-primary-700"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
