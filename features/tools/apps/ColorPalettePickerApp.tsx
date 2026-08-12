"use client";

import * as React from "react";
import { Upload, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Swatch {
  hex: string;
  count: number;
}

/** Quantizes to a coarse grid and buckets by frequency — fast, no dependencies. */
function extractPalette(imageData: ImageData, maxSwatches = 6): Swatch[] {
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();
  const step = 24; // quantization step per channel
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4 * 8) {
    // sample every 8th pixel for speed
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;
    const alpha = data[i + 3] ?? 0;
    if (alpha < 200) continue;

    const key = `${Math.round(r / step)}-${Math.round(g / step)}-${Math.round(b / step)}`;
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  return [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, maxSwatches)
    .map((b) => ({
      hex: `#${[b.r, b.g, b.b].map((c) => c.toString(16).padStart(2, "0")).join("")}`,
      count: b.count,
    }));
}

export function ColorPalettePickerApp() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [palette, setPalette] = React.useState<Swatch[]>([]);
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  function handleFile(file: File) {
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const maxDim = 240;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPalette(extractPalette(data));
      setProcessing(false);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  async function copyHex(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      toast.success(`Copied ${hex}`);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  }

  return (
    <div className="rounded-card-lg border border-border bg-white p-5 shadow-soft">
      <label
        htmlFor="palette-upload"
        className="flex cursor-pointer flex-col items-center gap-2 rounded-card border-2 border-dashed border-border bg-primary-50/20 p-8 text-center transition-colors hover:border-primary-300 hover:bg-primary-50/40"
      >
        <Upload className="size-6 text-primary-600" />
        <span className="text-sm font-medium text-ink">
          {imageSrc ? "Choose a different image" : "Click to upload an image"}
        </span>
        <span className="text-xs text-ink-muted">
          PNG or JPG, processed entirely in your browser
        </span>
        <input
          id="palette-upload"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </label>

      <canvas ref={canvasRef} className="hidden" />

      {imageSrc && (
        <div className="mt-5 flex flex-col gap-5 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL, never a static/build asset */}
          <img
            src={imageSrc}
            alt="Uploaded preview"
            className="h-40 w-full rounded-card object-cover shadow-soft sm:w-40"
          />

          <div className="flex-1">
            {processing ? (
              <div className="skeleton h-32 w-full" />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => copyHex(swatch.hex)}
                    className="group flex flex-col items-center gap-1.5 rounded-card border border-border p-2 text-xs transition-transform hover:scale-105"
                  >
                    <span
                      className="h-12 w-full rounded-card shadow-soft"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className={cn("flex items-center gap-1 font-mono text-ink")}>
                      {copiedHex === swatch.hex ? (
                        <Check className="size-3 text-success" />
                      ) : (
                        <Copy className="size-3 text-ink-muted" />
                      )}
                      {swatch.hex}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
