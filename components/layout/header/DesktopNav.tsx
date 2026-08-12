"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/constants/navigation";
import { MegaMenu } from "./MegaMenu";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {PRIMARY_NAV.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-card px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700",
              isActive ? "text-primary-700" : "text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}

      <MegaMenu />

      {SECONDARY_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-card px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-50 hover:text-primary-700"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
