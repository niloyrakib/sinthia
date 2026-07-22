import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GameCard from "@/components/GameCard";
import ToolCard from "@/components/ToolCard";
import BlogPostItem from "@/components/BlogPostItem";
import EmptyState from "@/components/EmptyState";
import { getCategoryBySlug, getPublishedGames, getPublishedTools, getPublishedPosts } from "@/lib/queries";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};
  return { title: `${category.name} — Category`, description: category.description };
}

export const revalidate = 300;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }, { label: category.name }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">{category.name}</h1>

        {category.type === "game" && <GameResults categoryId={category.slug} categoryName={category.name} />}
        {category.type === "tool" && <ToolResults categoryId={category.slug} categoryName={category.name} />}
        {category.type === "post" && <PostResults categoryId={category.slug} />}
      </main>
      <Footer />
    </>
  );
}

async function GameResults({ categoryId, categoryName }: { categoryId: string; categoryName: string }) {
  const { items } = await getPublishedGames({ categorySlug: categoryId });
  if (items.length === 0) return <EmptyState title="No games in this category yet" />;
  return (
    <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((g) => (
        <GameCard key={g.id} title={g.title} slug={g.slug} thumbnail={g.thumbnail} category={categoryName} />
      ))}
    </div>
  );
}

async function ToolResults({ categoryId, categoryName }: { categoryId: string; categoryName: string }) {
  const { items } = await getPublishedTools({ categorySlug: categoryId });
  if (items.length === 0) return <EmptyState title="No tools in this category yet" />;
  return (
    <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((t) => (
        <ToolCard key={t.id} title={t.title} slug={t.slug} category={categoryName} />
      ))}
    </div>
  );
}

async function PostResults({ categoryId }: { categoryId: string }) {
  const { items } = await getPublishedPosts({ categorySlug: categoryId });
  if (items.length === 0) return <EmptyState title="No posts in this category yet" />;
  return (
    <div className="mt-8 space-y-1 rounded-xl2 border border-line bg-white p-2 shadow-card">
      {items.map((p) => (
        <BlogPostItem key={p.id} title={p.title} slug={p.slug} publishedAt={p.publishedAt} author={p.authorId} />
      ))}
    </div>
  );
}
