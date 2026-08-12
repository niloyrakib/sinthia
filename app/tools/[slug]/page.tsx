import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES, ICON_MAP } from "@/lib/icon-map";
import { getToolBySlug, getAllToolSlugs, getTools } from "@/services/tools.service";
import { ToolApp } from "@/features/tools/components/ToolApp";
import { ToolJsonLd } from "@/features/tools/components/ToolJsonLd";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ToolCard } from "@/components/shared/ToolCard";
import { Breadcrumbs } from "@/components/shared";

interface ToolPageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return {};

  return {
    title: `${tool.title} — Free Online Tool`,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.title} — Free Online Tool`,
      description: tool.description,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();

  const Icon = ICON_MAP[tool.icon];
  const colors = ACCENT_CLASSES[tool.accent];
  const { items: categoryTools } = await getTools({
    category: tool.categorySlug,
    perPage: 4,
  });
  const related = categoryTools.filter((t) => t.id !== tool.id).slice(0, 3);

  return (
    <main className="container-page py-8 sm:py-12">
      <ToolJsonLd tool={tool} />
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.category, href: `/tools?category=${tool.categorySlug}` },
          { label: tool.title, href: `/tools/${tool.slug}` },
        ]}
      />

      <div className="mb-6 flex items-start gap-4">
        <span
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-card",
            colors.bg,
          )}
        >
          {Icon && <Icon className={cn("size-6", colors.text)} />}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {tool.title}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-muted">{tool.description}</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <ToolApp tool={tool} />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <SectionHeader
            title="Related Tools"
            viewAllHref={`/tools?category=${tool.categorySlug}`}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
