"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import { ComingSoonApp } from "@/features/tools/apps/ComingSoonApp";
import type { Tool } from "@/types/content";

function ToolAppSkeleton() {
  return <div className="skeleton h-72 w-full rounded-card-lg" />;
}

/**
 * Each tool app is its own chunk, loaded only when that specific tool page
 * is visited — a /tools/word-counter visitor never downloads the QR
 * generator or the canvas-based color picker's code.
 */
const APP_MAP: Record<string, React.ComponentType> = {
  "word-counter": dynamic(
    () => import("@/features/tools/apps/WordCounterApp").then((m) => m.WordCounterApp),
    { loading: ToolAppSkeleton },
  ),
  "json-formatter": dynamic(
    () =>
      import("@/features/tools/apps/JsonFormatterApp").then((m) => m.JsonFormatterApp),
    { loading: ToolAppSkeleton },
  ),
  "qr-code-generator": dynamic(
    () =>
      import("@/features/tools/apps/QrCodeGeneratorApp").then(
        (m) => m.QrCodeGeneratorApp,
      ),
    { loading: ToolAppSkeleton },
  ),
  "color-palette-picker": dynamic(
    () =>
      import("@/features/tools/apps/ColorPalettePickerApp").then(
        (m) => m.ColorPalettePickerApp,
      ),
    { loading: ToolAppSkeleton },
  ),
};

export function ToolApp({ tool }: { tool: Tool }) {
  const { record } = useRecentlyUsed("tools");

  React.useEffect(() => {
    record(tool.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- record only when the tool identity changes
  }, [tool.id]);

  const App = APP_MAP[tool.slug];
  return App ? <App /> : <ComingSoonApp tool={tool} />;
}
