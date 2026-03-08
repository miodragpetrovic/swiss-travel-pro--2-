import React from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  asChild,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; asChild?: boolean }): JSX.Element {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    primary: "bg-rose-600 text-white shadow-soft hover:bg-rose-700",
    secondary: "bg-white text-slate-900 shadow-soft ring-1 ring-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
    danger: "bg-slate-900 text-white hover:bg-slate-800",
  };

  if (asChild) {
    // Why: keeps API small; use <a className=...> when needed.
    return <button {...props} className={cn(base, variants[variant], className)} />;
  }

  return <button {...props} className={cn(base, variants[variant], className)} />;
}
