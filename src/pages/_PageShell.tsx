import React from "react";
import { Container } from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PageShell({
  title,
  subtitle,
  breadcrumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Container className="py-10">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-3xl text-base text-slate-600">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </Container>
  );
}
