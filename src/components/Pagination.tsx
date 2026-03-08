import React from "react";
import { cn } from "./cn";
import { Button } from "./Button";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
}): JSX.Element {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    return Math.abs(p - page) <= 2 || p === 1 || p === totalPages;
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </Button>
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev != null && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {showEllipsis && <span className="px-2 text-sm text-slate-500">…</span>}
            <button
              type="button"
              onClick={() => onChange(p)}
              className={cn(
                "h-10 rounded-2xl px-4 text-sm font-semibold ring-1 ring-slate-200 transition hover:bg-white",
                p === page ? "bg-slate-900 text-white ring-slate-900" : "bg-white text-slate-700",
              )}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}
      <Button variant="secondary" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
