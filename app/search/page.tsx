"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, Gamepad2, Wrench, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import ToolCard from "@/components/ToolCard";
import BlogPostItem from "@/components/BlogPostItem";
import EmptyState from "@/components/EmptyState";
import { searchAll } from "@/lib/queries";
import type { Game, Tool, Post } from "@/lib/types";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<{ games: Game[]; tools: Tool[]; posts: Post[] } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;
    startTransition(() => {
      searchAll(q).then(setResults);
    });
  }, [searchParams]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  const hasResults = results && (results.games.length || results.tools.length || results.posts.length);

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <h1 className="font-display text-3xl font-extrabold text-ink">Search</h1>

        <form onSubmit={onSubmit} className="relative mt-6 max-w-xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="search"
            placeholder="Search games, tools, posts..."
            className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 text-sm focus:border-brand-violet focus:bg-white focus:outline-none"
          />
        </form>

        <div className="mt-10">
          {isPending && <p className="text-sm text-muted">Searching...</p>}

          {!isPending && !results && <p className="text-sm text-muted">Start typing to search Sinthia.</p>}

          {!isPending && results && !hasResults && (
            <EmptyState icon={SearchIcon} title="No results" body={`Nothing matched "${searchParams.get("q")}".`} />
          )}

          {results && results.games.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Gamepad2 className="h-5 w-5 text-brand-violet" /> Games
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {results.games.map((g) => (
                  <GameCard key={g.id} title={g.title} slug={g.slug} thumbnail={g.thumbnail} category={g.categoryId} />
                ))}
              </div>
            </section>
          )}

          {results && results.tools.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Wrench className="h-5 w-5 text-brand-blue" /> Tools
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {results.tools.map((t) => (
                  <ToolCard key={t.id} title={t.title} slug={t.slug} category={t.categoryId} />
                ))}
              </div>
            </section>
          )}

          {results && results.posts.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <FileText className="h-5 w-5 text-emerald-600" /> Blog Posts
              </h2>
              <div className="space-y-1 rounded-xl2 border border-line bg-white p-2 shadow-card">
                {results.posts.map((p) => (
                  <BlogPostItem key={p.id} title={p.title} slug={p.slug} publishedAt={p.publishedAt} author={p.authorId} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
