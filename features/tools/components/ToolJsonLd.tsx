import { SITE } from "@/constants/design-tokens";
import type { Tool } from "@/types/content";

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    url: `${SITE.url}/tools/${tool.slug}`,
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
