import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import EmptyState from "@/components/EmptyState";
import CategoryFilter from "@/components/CategoryFilter";
import { getPublishedTools, getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description: "Handy browser-based tools — image compression, QR codes, password generation, and more. Free, no sign-up.",
};

export const revalidate = 300;

export default async function ToolsPage({ searchParams }: { searchParams: { category?: string } }) {
  const [categories, { items: tools }] = await Promise.all([
    getCategories("tool"),
    getPublishedTools({ categorySlug: searchParams.category }),
  ]);
  const categoryName = (id: string) => categories.find((c) => c.slug === id)?.name ?? id;

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">Free Online Tools</h1>
        <p className="mt-2 max-w-xl text-muted">Practical, fast, browser-based tools — no sign-up required.</p>

        <div className="mt-8">
          <CategoryFilter categories={categories} />
        </div>

        {tools.length === 0 ? (
          <EmptyState icon={Wrench} title="No tools found" body="Try a different category." />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {tools.map((t) => (
              <ToolCard key={t.id} title={t.title} slug={t.slug} category={categoryName(t.categoryId)} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
