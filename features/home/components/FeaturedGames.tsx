import { SectionHeader } from "@/components/shared/SectionHeader";
import { GameCard } from "@/components/shared/GameCard";
import { Reveal } from "@/components/shared/Reveal";
import { getGames } from "@/services/games.service";

export async function FeaturedGames() {
  const { items: games } = await getGames({ perPage: 5, sort: "popular" });

  return (
    <section className="bg-primary-50/30 py-10 sm:py-14">
      <div className="container-page">
        <SectionHeader
          title="Featured Games"
          subtitle="Hand-picked instant games, no download required"
          viewAllHref="/games"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {games.map((game, i) => (
            <Reveal key={game.id} delay={i * 0.06}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
