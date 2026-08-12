"use client";

import * as React from "react";
import { Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

/**
 * Generating a QR code offline requires shipping a full QR-encoding library.
 * Instead this calls a public QR image API at request time (goqr.me) — real,
 * working output, no bundle-size cost. Swap for a self-hosted encoder
 * (e.g. `qrcode` npm package) if offline generation becomes a requirement.
 */
function buildQrUrl(text: string, size = 320) {
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`;
}

export function QrCodeGeneratorApp() {
  const [value, setValue] = React.useState("https://sinthia.top");
  const debouncedValue = useDebounce(value, 400);
  const qrUrl = debouncedValue ? buildQrUrl(debouncedValue) : null;

  return (
    <div className="rounded-card-lg border border-border bg-white p-5 shadow-soft">
      <label htmlFor="qr-input" className="mb-1.5 block text-sm font-medium text-ink">
        Text or URL
      </label>
      <input
        id="qr-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://example.com"
        className="h-11 w-full rounded-card border border-border bg-white px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-200"
      />

      <div className="mt-6 flex flex-col items-center gap-4 rounded-card bg-primary-50/30 p-6">
        {qrUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external, dynamic, runtime-generated image; not a build-time asset
          <img
            src={qrUrl}
            alt={`QR code for ${debouncedValue}`}
            width={220}
            height={220}
            className="h-[220px] w-[220px] rounded-card bg-white p-2 shadow-soft"
          />
        ) : (
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded-card border border-dashed border-border">
            <QrCode className="size-8 text-ink-muted" />
          </div>
        )}

        <Button
          variant="primary"
          size="sm"
          disabled={!qrUrl}
          onClick={() => qrUrl && window.open(qrUrl, "_blank")}
        >
          <Download className="size-3.5" />
          Download PNG
        </Button>
      </div>
    </div>
  );
}
