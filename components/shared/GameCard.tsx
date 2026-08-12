import Link from "next/link";
import { Gamepad2, Play, Star } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { FavoriteButton } from "./FavoriteButton";
import { formatCompactNumber } from "@/lib/utils";
import type { Game } from "@/types/content";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="card-interactive group block overflow-hidden rounded-card-lg border border-border bg-white shadow-soft"
    >
      <div className="relative aspect-[4/3]">
        <ImagePlaceholder icon={Gamepad2} accent={game.accent} className="size-full" />

        {(game.isNew || game.isTrending) && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-700 shadow-soft">
            {game.isNew ? "New" : "Trending"}
          </span>
        )}

        <div className="absolute right-2 top-2">
          <FavoriteButton namespace="games" id={game.id} size="sm" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-200 group-hover:bg-ink/25 group-hover:opacity-100">
          <span className="flex size-11 items-center justify-center rounded-full bg-white shadow-soft-lg">
            <Play className="ml-0.5 size-4 fill-primary text-primary" />
          </span>
        </div>
      </div>

      <div className="p-3.5">
        <p className="truncate text-sm font-semibold text-ink">{game.title}</p>
        <div className="mt-1.5 flex items-center justify-between text-xs text-ink-muted">
          <span>{game.category}</span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-warning text-warning" />
            {game.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-ink-muted">
          {formatCompactNumber(game.plays)} plays
        </p>
      </div>
    </Link>
  );
}
