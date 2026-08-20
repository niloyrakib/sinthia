"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Namespaced favorites store, e.g. useFavorites("games") / useFavorites("tools").
 * Kept generic so the Tools module (Phase 6) can reuse it without changes.
 */
export function useFavorites(namespace: string) {
  const storageKey = `sinthia:favorites:${namespace}`;
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore — private mode / unavailable storage
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback(
    (next: string[]) => {
      setIds(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
    },
    [storageKey],
  );

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);
    },
    [ids, persist],
  );

  return { ids, isFavorite, toggle, hydrated };
}
