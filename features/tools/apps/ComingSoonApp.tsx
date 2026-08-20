import { Hammer } from "lucide-react";
import type { Tool } from "@/types/content";
export function ComingSoonApp({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card-lg border border-dashed border-border bg-primary-50/20 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary-50">
        <Hammer className="size-5 text-primary-600" />
      </span>
      <p className="text-sm font-medium text-ink">{tool.title} is coming soon</p>
      <p className="max-w-xs text-xs text-ink-muted">We&apos;re working on it.</p>
    </div>
  );
}
