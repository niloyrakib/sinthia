"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES_MENU } from "@/constants/navigation";
import { ACCENT_CLASSES, getIcon } from "@/lib/icon-map";

export function MegaMenu() {
  const [open, setOpen] = React.useState(false);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout>>();

  function openMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  }

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-card px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-50 hover:text-primary-700"
      >
        Categories
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200 ease-premium",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute left-1/2 top-full z-40 mt-2 w-[560px] -translate-x-1/2 rounded-card-lg border border-border bg-white p-4 shadow-soft-xl"
          >
            {CATEGORIES_MENU.map((group) => (
              <div key={group.heading}>
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {group.heading}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {group.categories.map((cat) => {
                    const Icon = getIcon(cat.icon);
                    const accent = ACCENT_CLASSES[cat.accent];
                    return (
                      <Link
                        key={cat.slug}
                        href={cat.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 rounded-card p-2.5 transition-colors hover:bg-primary-50/60"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-card",
                            accent.bg,
                          )}
                        >
                          {Icon && (
                            <Icon className={cn("h-[18px] w-[18px]", accent.text)} />
                          )}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            {cat.label}
                          </span>
                          <span className="line-clamp-1 block text-xs text-ink-muted">
                            {cat.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
