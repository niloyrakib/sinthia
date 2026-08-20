import { SectionHeader } from "@/components/shared/SectionHeader";
import { ToolCard } from "@/components/shared/ToolCard";
import { Reveal } from "@/components/shared/Reveal";
import { getTools } from "@/services/tools.service";

export async function FeaturedTools() {
  const { items } = await getTools({ perPage: 12 });
  const tools = items.filter((t) => t.isFeatured).slice(0, 4);

  return (
    <section className="container-page py-10 sm:py-14">
      <SectionHeader
        title="Featured Tools"
        subtitle="Free web tools that do one job, well"
        viewAllHref="/tools"
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tools.map((tool, i) => (
          <Reveal key={tool.id} delay={i * 0.06}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
