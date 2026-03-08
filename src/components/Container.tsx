import React from "react";
import { cn } from "./cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>{children}</div>;
}
