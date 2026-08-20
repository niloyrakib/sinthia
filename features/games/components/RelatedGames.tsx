import { SectionHeader } from "@/components/shared/SectionHeader";
import { GameCard } from "@/components/shared/GameCard";
import { Reveal } from "@/components/shared/Reveal";
import { getGames } from "@/services/games.service";
import type { Game } from "@/types/content";

export async function RelatedGames({ current }: { current: Game }) {
  const { items } = await getGames({ category: current.categorySlug, perPage: 5 });
  const related = items.filter((g) => g.id !== current.id).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader
        title="Related Games"
        viewAllHref={`/games?category=${current.categorySlug}`}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((game, i) => (
          <Reveal key={game.id} delay={i * 0.06}>
            <GameCard game={game} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
