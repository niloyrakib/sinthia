import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function SectionHeader({
  icon: Icon,
  title,
  href,
  accent = "text-brand-violet",
}: {
  icon: LucideIcon;
  title: string;
  href: string;
  accent?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
        <Icon className={`h-5 w-5 ${accent}`} /> {title}
      </h2>
      <Link href={href} className="text-sm font-semibold text-brand-violet hover:underline">
        View all
      </Link>
    </div>
  );
}
