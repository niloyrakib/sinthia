import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gamepad2, Keyboard, User, Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameCard from "@/components/GameCard";
import JsonLd from "@/components/JsonLd";
import { getGameBySlug, getRelatedGames, getCategoryBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = await getGameBySlug(params.slug);
  if (!game) return {};
  return {
    title: game.seoTitle ?? game.title,
    description: game.metaDescription ?? game.description,
    alternates: { canonical: game.canonicalUrl ?? `/games/${game.slug}` },
    openGraph: { images: game.ogImage ? [game.ogImage] : undefined },
  };
}

export const revalidate = 300;

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug);
  if (!game) notFound();

  const [related, category] = await Promise.all([
    getRelatedGames(game.categoryId, game.id),
    getCategoryBySlug(game.categoryId),
  ]);

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Games", href: "/games" },
            { label: game.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex aspect-video w-full items-center justify-center rounded-xl2 border border-line bg-gradient-to-br from-ink to-brand-violet">
              <a
                href={game.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-cardHover"
              >
                <Play className="h-4 w-4 fill-current" /> Play {game.title}
              </a>
            </div>

            <h1 className="mt-6 font-display text-2xl font-extrabold text-ink sm:text-3xl">{game.title}</h1>
            <p className="mt-2 text-muted">{game.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl2 border border-line p-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Gamepad2 className="h-4 w-4 text-brand-violet" /> How to Play
                </h2>
                <p className="mt-1.5 text-sm text-muted">{game.instructions}</p>
              </div>
              <div className="rounded-xl2 border border-line p-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Keyboard className="h-4 w-4 text-brand-blue" /> Controls
                </h2>
                <p className="mt-1.5 text-sm text-muted">{game.controls}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <User className="h-4 w-4" /> Developed by {game.developer} · {game.playCount.toLocaleString()} plays
            </div>
          </div>

          {related.length > 0 && (
            <aside>
              <h2 className="mb-4 font-display text-sm font-bold text-ink">More {category?.name ?? ""} Games</h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                {related.map((g) => (
                  <GameCard key={g.id} title={g.title} slug={g.slug} thumbnail={g.thumbnail} category={category?.name ?? ""} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          description: game.description,
          genre: category?.name,
          author: { "@type": "Organization", name: game.developer },
          applicationCategory: "Game",
          operatingSystem: "Web Browser",
        }}
      />
    </>
  );
}
