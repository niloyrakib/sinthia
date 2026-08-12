"use client";

import * as React from "react";
import { MessageCircle, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

function formatRelativeTime(ts: number): string {
  const diffMin = Math.round((Date.now() - ts) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

export function CommentsSection({ postSlug }: { postSlug: string }) {
  const storageKey = `sinthia:comments:${postSlug}`;
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setComments(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [storageKey]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const next: Comment[] = [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
      },
      ...comments,
    ];
    setComments(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore write failures
    }
    setMessage("");
    toast.success("Comment posted");
  }

  return (
    <section className="mt-12 max-w-2xl">
      <h2 className="mb-1 flex items-center gap-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
        <MessageCircle className="size-5 text-primary-600" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>
      <p className="mb-4 text-xs text-ink-muted">
        Comments are saved to this browser for now — full account-based comments arrive
        with the WordPress integration.
      </p>

      <form
        onSubmit={submit}
        className="rounded-card-lg border border-border bg-white p-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="mb-2 h-10 w-full rounded-card border border-border bg-white px-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a comment..."
          required
          rows={3}
          className="mb-3 w-full resize-none rounded-card border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <Button type="submit" variant="primary" size="sm">
          <Send className="size-3.5" />
          Post Comment
        </Button>
      </form>

      <div className="mt-5 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
              {c.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-ink">{c.name}</span>{" "}
                <span className="text-xs text-ink-muted">
                  {formatRelativeTime(c.timestamp)}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-ink-muted">{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
