import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode, useState } from "react";

export function PagedCards<T>({ items, keyOf, pageSize = 4, renderItem, className }: { items: T[]; keyOf: (item: T) => string; pageSize?: number; renderItem: (item: T) => ReactNode; className?: string }) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const [page, setPage] = useState(1);
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  const end = Math.min(start + pageSize, items.length);

  return (
    <div>
      <div className={className}>{items.slice(start, end).map((item) => <span key={keyOf(item)} className="contents">{renderItem(item)}</span>)}</div>
      {pageCount > 1 && (
        <nav className="mt-4 flex items-center justify-center gap-4" aria-label="Pages">
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1} aria-label="Previous page" className="vb-focus grid h-9 w-9 place-items-center rounded-full border border-[var(--sura-border)] bg-[var(--sura-paper)] text-[var(--sura-ink)] disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-xs font-bold tabular-nums text-[var(--sura-sand)]">{String(current).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
          <button type="button" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={current === pageCount} aria-label="Next page" className="vb-focus grid h-9 w-9 place-items-center rounded-full border border-[var(--sura-border)] bg-[var(--sura-paper)] text-[var(--sura-ink)] disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
        </nav>
      )}
    </div>
  );
}