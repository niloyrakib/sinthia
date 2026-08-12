import { Star, Eye } from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import type { Game } from "@/types/content";

export function GameMeta({ game }: { game: Game }) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Star className="size-4 fill-warning text-warning" />
          {game.rating.toFixed(1)} rating
        </span>
        <span className="flex items-center gap-1.5">
          <Eye className="size-4" />
          {formatCompactNumber(game.plays)} plays
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
        {game.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
