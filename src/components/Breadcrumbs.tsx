import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
      {items.map((it, idx) => (
        <React.Fragment key={`${it.label}-${idx}`}>
          {idx > 0 && <ChevronRight className="h-4 w-4" />}
          {it.to ? (
            <Link className="hover:text-slate-900" to={it.to}>
              {it.label}
            </Link>
          ) : (
            <span className="text-slate-700">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
