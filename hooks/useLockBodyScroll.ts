"use client";

import { useLayoutEffect } from "react";

/**
 * Prevents background scroll while a mobile menu / search overlay is open,
 * without causing a layout shift from the disappearing scrollbar.
 */
export function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
