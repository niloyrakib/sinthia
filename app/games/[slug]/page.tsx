import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getAllGameSlugs } from "@/services/games.service";
import { GamePlayer, GameMeta, RelatedGames } from "@/features/games/components";
import { GameJsonLd } from "@/features/games/components/GameJsonLd";
import { Breadcrumbs } from "@/components/shared";

interface GamePageProps {
  params: { slug: string };
}

export const revalidate = 3600; // ISR: regenerate at most once an hour

export async function generateStaticParams() {
  const slugs = await getAllGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = await getGameBySlug(params.slug);
  if (!game) return {};

  return {
    title: `${game.title} — Play Free Online`,
    description: game.description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} — Play Free Online`,
      description: game.description,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug);
  if (!game) notFound();

  return (
    <main className="container-page py-8 sm:py-12">
      <GameJsonLd game={game} />
      <Breadcrumbs
        items={[
          { label: "Games", href: "/games" },
          { label: game.category, href: `/games?category=${game.categorySlug}` },
          { label: game.title, href: `/games/${game.slug}` },
        ]}
      />

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {game.title}
      </h1>

      <div className="mt-5 max-w-4xl">
        <GamePlayer game={game} />
        <GameMeta game={game} />
      </div>

      <RelatedGames current={game} />
    </main>
  );
}
