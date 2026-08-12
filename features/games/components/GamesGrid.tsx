import { Gamepad2 } from "lucide-react";
import { GameCard } from "@/components/shared/GameCard";
import { Reveal } from "@/components/shared/Reveal";
import type { Game } from "@/types/content";

export function GamesGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card-lg border border-dashed border-border py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-50">
          <Gamepad2 className="size-5 text-primary-600" />
        </span>
        <p className="text-sm font-medium text-ink">No games match your filters</p>
        <p className="text-xs text-ink-muted">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {games.map((game, i) => (
        <Reveal key={game.id} delay={(i % 8) * 0.05}>
          <GameCard game={game} />
        </Reveal>
      ))}
    </div>
  );
}
