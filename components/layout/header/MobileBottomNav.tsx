"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Wrench, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Games", href: "/games", icon: Gamepad2 },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Blog", href: "/blog", icon: FileText },
] as const;

export function MobileBottomNav({ onSearch }: { onSearch: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-glass lg:hidden"
    >
      {ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium"
          >
            <Icon
              className={cn("size-5", isActive ? "text-primary-600" : "text-ink-muted")}
            />
            <span className={isActive ? "text-primary-600" : "text-ink-muted"}>
              {label}
            </span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onSearch}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-ink-muted"
      >
        <Search className="size-5" />
        Search
      </button>
    </nav>
  );
}
