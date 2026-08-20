"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export function useFullscreen(ref: RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(document.fullscreenElement === ref.current);
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [ref]);

  const toggle = useCallback(async () => {
    if (!ref.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await ref.current.requestFullscreen();
      }
    } catch {
      // Fullscreen API unsupported or permission denied — fail silently,
      // the play experience still works windowed.
    }
  }, [ref]);

  return { isFullscreen, toggle };
}
