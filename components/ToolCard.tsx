import Link from "next/link";
import { ImageIcon, QrCode, Lock, Type, type LucideIcon } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

const ICONS: Record<string, LucideIcon> = {
  "image-compressor": ImageIcon,
  "qr-code-generator": QrCode,
  "password-generator": Lock,
  "text-counter": Type,
};

const ICON_COLORS: Record<string, string> = {
  "image-compressor": "bg-blue-100 text-blue-600",
  "qr-code-generator": "bg-brand-violet/10 text-brand-violet",
  "password-generator": "bg-emerald-100 text-emerald-600",
  "text-counter": "bg-amber-100 text-amber-600",
};

export default function ToolCard({
  title,
  slug,
  category,
}: {
  title: string;
  slug: string;
  category: string;
}) {
  const Icon = ICONS[slug] ?? Type;
  return (
    <Link
      href={`/tools/${slug}`}
      className="group block rounded-xl2 border border-line bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          ICON_COLORS[slug] ?? "bg-surface text-muted"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3.5 text-sm font-semibold leading-snug text-ink">{title}</h3>
      <div className="mt-2">
        <CategoryBadge label={category} />
      </div>
    </Link>
  );
}
