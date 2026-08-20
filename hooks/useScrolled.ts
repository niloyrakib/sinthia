"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Drives the header's transparent-on-top -> solid+blur-on-scroll behavior.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
