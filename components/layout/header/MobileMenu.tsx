"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { PRIMARY_NAV, SECONDARY_NAV, CATEGORIES_MENU } from "@/constants/navigation";
import { ACCENT_CLASSES, ICON_MAP } from "@/lib/icon-map";
import { Logo } from "./Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-soft-xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <Logo withTagline={false} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-card p-2 text-ink-muted hover:bg-primary-50"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex flex-col p-3">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-card p-3 text-base font-medium text-ink hover:bg-primary-50"
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => setCategoriesOpen((v) => !v)}
                aria-expanded={categoriesOpen}
                className="flex items-center justify-between rounded-card p-3 text-base font-medium text-ink hover:bg-primary-50"
              >
                Categories
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    categoriesOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {categoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {CATEGORIES_MENU[0]?.categories.map((cat) => {
                      const Icon = ICON_MAP[cat.icon];
                      const accent = ACCENT_CLASSES[cat.accent];
                      return (
                        <Link
                          key={cat.slug}
                          href={cat.href}
                          onClick={onClose}
                          className="ml-2 flex items-center gap-3 rounded-card px-3 py-2.5 text-sm text-ink hover:bg-primary-50"
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-card",
                              accent.bg,
                            )}
                          >
                            {Icon && <Icon className={cn("size-4", accent.text)} />}
                          </span>
                          {cat.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2 border-t border-border pt-2">
                {SECONDARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-card p-3 text-base font-medium text-ink hover:bg-primary-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
