import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          View All
          <ArrowRight className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
