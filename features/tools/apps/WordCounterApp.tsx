"use client";

import * as React from "react";
import { Copy, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    ? (trimmed.match(/[.!?]+(?:\s|$)/g)?.length ?? (trimmed ? 1 : 0))
    : 0;
  const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMin = Math.max(1, Math.ceil(words / 200));

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMin };
}

const STATS: { key: keyof ReturnType<typeof analyze>; label: string }[] = [
  { key: "words", label: "Words" },
  { key: "characters", label: "Characters" },
  { key: "charactersNoSpaces", label: "Characters (no spaces)" },
  { key: "sentences", label: "Sentences" },
  { key: "paragraphs", label: "Paragraphs" },
  { key: "readingTimeMin", label: "Min read" },
];

export function WordCounterApp() {
  const [text, setText] = React.useState("");
  const stats = React.useMemo(() => analyze(text), [text]);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn't copy");
    }
  }

  return (
    <div className="rounded-card-lg border border-border bg-white p-5 shadow-soft">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={10}
        className="w-full resize-y rounded-card border border-border bg-white p-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-200"
      />

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={copyText} disabled={!text}>
          <Copy className="size-3.5" />
          Copy
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
          <Trash2 className="size-3.5" />
          Clear
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.key}
            className="rounded-card border border-border bg-primary-50/30 p-3"
          >
            <p className="text-xl font-extrabold tabular-nums text-ink">{stats[s.key]}</p>
            <p className="text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
