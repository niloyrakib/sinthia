import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES, getIcon } from "@/lib/icon-map";
import type { MegaMenuCategory } from "@/types/navigation";

export function CategoryCard({ category }: { category: MegaMenuCategory }) {
  const Icon = getIcon(category.icon);
  const colors = ACCENT_CLASSES[category.accent];

  return (
    <Link
      href={category.href}
      className="card-interactive group flex flex-col gap-3 rounded-card-lg border border-border bg-white p-5 shadow-soft"
    >
      <span
        className={cn("flex size-11 items-center justify-center rounded-card", colors.bg)}
      >
        {Icon && <Icon className={cn("size-5", colors.text)} />}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{category.label}</p>
        <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{category.description}</p>
      </div>
      <span
        className={cn(
          "mt-auto flex items-center gap-1 text-xs font-semibold",
          colors.text,
        )}
      >
        Explore
        <ArrowRight className="size-3.5 transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
