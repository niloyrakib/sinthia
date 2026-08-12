import { SectionHeader } from "@/components/shared/SectionHeader";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Reveal } from "@/components/shared/Reveal";
import { CATEGORIES_MENU } from "@/constants/navigation";

export function PopularCategories() {
  const categories = CATEGORIES_MENU[0]?.categories ?? [];

  return (
    <section className="container-page py-10 sm:py-14">
      <SectionHeader title="Popular Categories" viewAllHref="/categories" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 0.06}>
            <CategoryCard category={cat} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
