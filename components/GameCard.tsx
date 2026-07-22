import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

const THUMB_STYLES: Record<string, string> = {
  space: "from-indigo-900 via-violet-800 to-blue-900",
  racing: "from-zinc-900 via-rose-950 to-zinc-900",
  puzzle: "from-slate-900 via-cyan-950 to-slate-900",
  zombie: "from-zinc-950 via-emerald-950 to-zinc-900",
};

export default function GameCard({
  title,
  slug,
  thumbnail,
  category,
}: {
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
}) {
  return (
    <Link
      href={`/games/${slug}`}
      className="group block overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
    >
      <div
        className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${
          THUMB_STYLES[thumbnail] ?? "from-ink to-brand-violet"
        } transition duration-300 group-hover:scale-[1.03]`}
      >
        <Gamepad2 className="h-8 w-8 text-white/70" strokeWidth={1.5} />
      </div>
      <div className="p-3.5">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <div className="mt-1.5">
          <CategoryBadge label={category} />
        </div>
      </div>
    </Link>
  );
}
