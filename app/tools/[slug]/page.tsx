import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { getToolBySlug, getCategoryBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle ?? tool.title,
    description: tool.metaDescription ?? tool.description,
    alternates: { canonical: tool.canonicalUrl ?? `/tools/${tool.slug}` },
  };
}

export const revalidate = 300;

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();
  const category = await getCategoryBySlug(tool.categoryId);

  return (
    <>
      <Header />
      <main className="container-page max-w-3xl py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: tool.title },
          ]}
        />

        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{tool.title}</h1>
        <p className="mt-2 text-muted">{tool.description}</p>

        {/* Actual tool UI would render here — e.g. <ImageCompressorTool /> */}
        <div className="mt-6 rounded-xl2 border border-dashed border-line bg-surface p-10 text-center text-sm text-muted">
          Interactive {tool.title} widget renders here.
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl2 border border-line p-4 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
          {tool.instructions}
        </div>

        <p className="mt-4 text-xs text-muted">
          {category?.name} · used {tool.usageCount.toLocaleString()} times
        </p>

        {tool.faq && tool.faq.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Frequently Asked Questions</h2>
            <FAQAccordion items={tool.faq} />
          </div>
        )}
      </main>
      <Footer />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.title,
          description: tool.description,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      {tool.faq && tool.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tool.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}
