import { Gamepad2, Wrench, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import GameCard from "@/components/GameCard";
import ToolCard from "@/components/ToolCard";
import BlogPostItem from "@/components/BlogPostItem";
import BenefitsSection from "@/components/BenefitsSection";
import { popularGames, usefulTools, latestPosts } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <section className="container-page grid grid-cols-1 gap-10 pb-14 lg:grid-cols-3 lg:gap-8">
          {/* Popular Games */}
          <div>
            <SectionHeader icon={Gamepad2} title="Popular Games" href="/games" />
            <div className="grid grid-cols-2 gap-4">
              {popularGames.map((g) => (
                <GameCard key={g.id} title={g.title} slug={g.slug} thumbnail={g.thumbnail} category={g.categoryId} />
              ))}
            </div>
          </div>

          {/* Useful Tools */}
          <div>
            <SectionHeader icon={Wrench} title="Useful Tools" href="/tools" accent="text-brand-blue" />
            <div className="grid grid-cols-2 gap-4">
              {usefulTools.map((t) => (
                <ToolCard key={t.id} title={t.title} slug={t.slug} category={t.categoryId} />
              ))}
            </div>
          </div>

          {/* Latest Blog Posts */}
          <div>
            <SectionHeader icon={FileText} title="Latest Blog Posts" href="/blog" accent="text-emerald-600" />
            <div className="space-y-1 rounded-xl2 border border-line bg-white p-2 shadow-card">
              {latestPosts.map((p) => (
                <BlogPostItem
                  key={p.id}
                  title={p.title}
                  slug={p.slug}
                  publishedAt={p.publishedAt}
                  author={p.authorId}
                />
              ))}
            </div>
          </div>
        </section>

        <BenefitsSection />
      </main>
      <Footer />
    </>
  );
}
