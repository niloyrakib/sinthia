"use client";

import * as React from "react";
import { Copy, Sparkles, Minimize2, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SAMPLE = `{
  "site": "SINTHIA",
  "sections": ["games", "tools", "blog"],
  "active": true
}`;

export function JsonFormatterApp() {
  const [input, setInput] = React.useState(SAMPLE);
  const [error, setError] = React.useState<string | null>(null);

  function format(spacing: number | null) {
    try {
      const parsed = JSON.parse(input);
      setInput(
        spacing === null ? JSON.stringify(parsed) : JSON.stringify(parsed, null, spacing),
      );
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn't copy");
    }
  }

  return (
    <div className="rounded-card-lg border border-border bg-white p-5 shadow-soft">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        spellCheck={false}
        rows={14}
        className={cn(
          "w-full resize-y rounded-card border bg-primary-50/10 p-4 font-mono text-sm text-ink focus:outline-none focus:ring-2",
          error
            ? "border-danger focus:ring-red-200"
            : "border-border focus:ring-primary-200",
        )}
      />

      <div className="mt-3 flex items-center gap-2 text-sm">
        {error ? (
          <span className="flex items-center gap-1.5 text-danger">
            <XCircle className="size-4" />
            {error}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-success">
            <CheckCircle2 className="size-4" />
            Valid JSON
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={() => format(2)}>
          <Sparkles className="size-3.5" />
          Beautify
        </Button>
        <Button variant="outline" size="sm" onClick={() => format(null)}>
          <Minimize2 className="size-3.5" />
          Minify
        </Button>
        <Button variant="ghost" size="sm" onClick={copyText}>
          <Copy className="size-3.5" />
          Copy
        </Button>
      </div>
    </div>
  );
}
