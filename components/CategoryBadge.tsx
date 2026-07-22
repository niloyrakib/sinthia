const PALETTE: Record<string, string> = {
  Adventure: "bg-brand-violet/10 text-brand-violet",
  Racing: "bg-rose-100 text-rose-600",
  Puzzle: "bg-amber-100 text-amber-700",
  Action: "bg-emerald-100 text-emerald-700",
  Image: "bg-blue-100 text-blue-700",
  Generator: "bg-brand-violet/10 text-brand-violet",
  Security: "bg-emerald-100 text-emerald-700",
  Text: "bg-amber-100 text-amber-700",
};

export default function CategoryBadge({ label }: { label: string }) {
  const cls = PALETTE[label] ?? "bg-surface text-muted";
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}
