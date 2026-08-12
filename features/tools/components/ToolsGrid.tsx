import { Wrench } from "lucide-react";
import { ToolCard } from "@/components/shared/ToolCard";
import { Reveal } from "@/components/shared/Reveal";
import type { Tool } from "@/types/content";

export function ToolsGrid({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card-lg border border-dashed border-border py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-50">
          <Wrench className="size-5 text-primary-600" />
        </span>
        <p className="text-sm font-medium text-ink">No tools match your filters</p>
        <p className="text-xs text-ink-muted">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {tools.map((tool, i) => (
        <Reveal key={tool.id} delay={(i % 9) * 0.05}>
          <ToolCard tool={tool} />
        </Reveal>
      ))}
    </div>
  );
}
