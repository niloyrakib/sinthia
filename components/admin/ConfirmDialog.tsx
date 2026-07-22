"use client";

import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  danger = true,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/40 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-cardHover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${danger ? "bg-rose-100 text-rose-600" : "bg-brand-violet/10 text-brand-violet"}`}>
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm text-muted">{body}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink/20">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${danger ? "bg-rose-600 hover:bg-rose-700" : "bg-brand-gradient"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
