import Link from "next/link";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES, ICON_MAP } from "@/lib/icon-map";
import { FavoriteButton } from "./FavoriteButton";
import type { Tool } from "@/types/content";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = ICON_MAP[tool.icon];
  const colors = ACCENT_CLASSES[tool.accent];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="card-interactive group flex flex-col gap-3 rounded-card-lg border border-border bg-white p-5 shadow-soft"
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-card",
            colors?.bg,
          )}
        >
          {Icon && <Icon className={cn("size-5", colors?.text)} />}
        </span>
        <div className="flex items-center gap-1.5">
          {tool.isTrending && (
            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-700">
              Trending
            </span>
          )}
          <FavoriteButton namespace="tools" id={tool.id} size="sm" />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">{tool.title}</p>
        <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{tool.description}</p>
      </div>

      <span className="mt-auto text-xs font-medium text-ink-muted">{tool.category}</span>
    </Link>
  );
}
