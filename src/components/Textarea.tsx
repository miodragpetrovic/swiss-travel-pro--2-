import React from "react";
import { cn } from "./cn";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[120px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100",
        props.className,
      )}
    />
  );
}
