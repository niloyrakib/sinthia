"use client";

import { useCallback, useEffect, useState } from "react";

const MAX_ITEMS = 8;

/**
 * Tracks recently used item IDs per namespace (e.g. "tools"). Most recent
 * first, deduplicated, capped at MAX_ITEMS.
 */
export function useRecentlyUsed(namespace: string) {
  const storageKey = `sinthia:recently-used:${namespace}`;
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

  const record = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS);
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore write failures
        }
        return next;
      });
    },
    [storageKey],
  );

  return { ids, record, hydrated };
}
