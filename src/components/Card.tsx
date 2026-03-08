import React from "react";
import { cn } from "./cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("rounded-2xl bg-white shadow-soft ring-1 ring-slate-200/70", className)}>{children}</div>
  );
}
