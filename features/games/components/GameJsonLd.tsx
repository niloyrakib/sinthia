import { SITE } from "@/constants/design-tokens";
import type { Game } from "@/types/content";

export function GameJsonLd({ game }: { game: Game }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    genre: game.category,
    url: `${SITE.url}/games/${game.slug}`,
    applicationCategory: "Game",
    operatingSystem: "Any (Web Browser)",
    aggregateRating:
      game.rating > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: game.rating,
            bestRating: 5,
            ratingCount: Math.max(1, Math.round(game.plays / 50)),
          }
        : undefined,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
