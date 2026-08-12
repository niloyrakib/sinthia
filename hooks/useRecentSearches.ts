"use client";

import { useCallback, useEffect, useState } from "react";
import type { RecentSearch } from "@/types/navigation";

const STORAGE_KEY = "sinthia:recent-searches";
const MAX_ITEMS = 6;

export function useRecentSearches() {
  const [items, setItems] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage unavailable (private mode, SSR) — fail silently
    }
  }, []);

  const add = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setItems((prev) => {
      const next = [
        { term: trimmed, timestamp: Date.now() },
        ...prev.filter((i) => i.term.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_ITEMS);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { items, add, clear };
}
