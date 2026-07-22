import type { Metadata } from "next";
import { Gamepad2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameCard from "@/components/GameCard";
import EmptyState from "@/components/EmptyState";
import CategoryFilter from "@/components/CategoryFilter";
import { getPublishedGames, getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Free Online Games",
  description: "Play free browser games — no download, no sign-up. Adventure, racing, puzzle, and action titles.",
};

export const revalidate = 300;

export default async function GamesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [categories, { items: games }] = await Promise.all([
    getCategories("game"),
    getPublishedGames({ categorySlug: searchParams.category }),
  ]);
  const categoryName = (id: string) => categories.find((c) => c.slug === id)?.name ?? id;

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Games" }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">Free Online Games</h1>
        <p className="mt-2 max-w-xl text-muted">
          Play instantly in your browser — no downloads, no accounts required.
        </p>

        <div className="mt-8">
          <CategoryFilter categories={categories} />
        </div>

        {games.length === 0 ? (
          <EmptyState icon={Gamepad2} title="No games found" body="Try a different category." />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {games.map((g) => (
              <GameCard key={g.id} title={g.title} slug={g.slug} thumbnail={g.thumbnail} category={categoryName(g.categoryId)} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
