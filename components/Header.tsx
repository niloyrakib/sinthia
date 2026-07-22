"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Moon, UserRound, ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-[68px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-medium text-ink/80 transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <button className="flex items-center gap-1 text-[15px] font-medium text-ink/80 transition hover:text-ink">
            Categories <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="hidden flex-1 max-w-sm items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search games, tools, posts..."
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-brand-violet focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink/70 transition hover:border-ink/20 hover:text-ink"
          >
            <Moon className="h-[18px] w-[18px]" />
          </button>
          <button className="hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:shadow-cardHover sm:flex">
            <UserRound className="h-4 w-4" /> Sign In
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-white px-5 pb-5 pt-3 lg:hidden">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search games, tools, posts..."
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-1">
            {[...NAV_LINKS, { href: "/category", label: "Categories" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/80 hover:bg-surface"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">
              <UserRound className="h-4 w-4" /> Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
