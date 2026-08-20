"use client";

import * as React from "react";
import { Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { MobileBottomNav } from "./MobileBottomNav";

export function Header() {
  const scrolled = useScrolled();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 ease-premium",
          scrolled
            ? "border-b border-border bg-white/85 shadow-soft backdrop-blur-glass"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo />

          <DesktopNav />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden"
            >
              <Search className="size-5" />
            </Button>

            <Button
              variant="primary"
              size="md"
              className="hidden lg:inline-flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
              Search
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileBottomNav onSearch={() => setSearchOpen(true)} />
    </>
  );
}
