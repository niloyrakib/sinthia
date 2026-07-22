"use client";

import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import EmptyState from "@/components/EmptyState";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export default function DataTable<T extends { id: string }>({
  rows,
  columns,
  searchKeys,
  loading,
  pageSize = 10,
  bulkActions,
  emptyTitle = "Nothing here yet",
}: {
  rows: T[];
  columns: DataTableColumn<T>[];
  searchKeys?: (keyof T)[];
  loading?: boolean;
  pageSize?: number;
  bulkActions?: (selectedIds: string[], clearSelection: () => void) => React.ReactNode;
  emptyTitle?: string;
}) {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!term.trim() || !searchKeys) return rows;
    const needle = term.toLowerCase();
    return rows.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(needle))
    );
  }, [rows, term, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allSelected = paged.length > 0 && paged.every((r) => selected.includes(r.id));

  function toggleAll() {
    setSelected(allSelected ? selected.filter((id) => !paged.some((r) => r.id === id)) : [...new Set([...selected, ...paged.map((r) => r.id)])]);
  }
  function toggleOne(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <div className="rounded-xl2 border border-line bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
        {searchKeys && (
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-3 text-sm focus:border-brand-violet focus:bg-white focus:outline-none"
            />
          </div>
        )}
        {selected.length > 0 && bulkActions && (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-ink">{selected.length} selected</span>
            {bulkActions(selected, () => setSelected([]))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-10 text-center text-sm text-muted">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="p-8">
          <EmptyState title={emptyTitle} />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
                  {bulkActions && (
                    <th className="w-10 px-4 py-3">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded border-line" />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((row) => (
                  <tr key={row.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                    {bulkActions && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(row.id)}
                          onChange={() => toggleOne(row.id)}
                          className="h-4 w-4 rounded border-line"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-line p-4 text-sm text-muted">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-line disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-line disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
