import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}): JSX.Element {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={it.title} className="rounded-2xl bg-white ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => setOpen((p) => (p === idx ? null : idx))}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <div className="text-sm font-bold">{it.title}</div>
              <ChevronDown className={cn("h-5 w-5 transition", isOpen && "rotate-180")} />
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm text-slate-700">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
