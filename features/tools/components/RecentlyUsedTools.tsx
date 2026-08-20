"use client";

import * as React from "react";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import { getTools } from "@/services/tools.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ToolCard } from "@/components/shared/ToolCard";
import type { Tool } from "@/types/content";

export function RecentlyUsedTools() {
  const { ids, hydrated } = useRecentlyUsed("tools");
  const [tools, setTools] = React.useState<Tool[]>([]);

  React.useEffect(() => {
    if (!hydrated || ids.length === 0) {
      setTools([]);
      return;
    }
    let cancelled = false;
    // Recently-used tools can be real WP data, so resolve IDs through the
    // live service instead of the static mock array (matches whatever
    // source actually rendered the card the person used).
    getTools({ perPage: 100 }).then(({ items }) => {
      if (cancelled) return;
      const resolved = ids
        .map((id) => items.find((t) => t.id === id))
        .filter((t): t is Tool => Boolean(t))
        .slice(0, 4);
      setTools(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [ids, hydrated]);

  if (!hydrated || tools.length === 0) return null;

  return (
    <div className="mb-10">
      <SectionHeader title="Recently Used" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
