import React from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "./_PageShell";
import { Button } from "../components/Button";

export function NotFound(): JSX.Element {
  const { lang } = useParams();
  const prefix = `/${lang ?? "de"}`;

  return (
    <PageShell title="404" subtitle={lang === "de" ? "Seite nicht gefunden." : "Page not found."}>
      <Link to={prefix}>
        <Button>Home</Button>
      </Link>
    </PageShell>
  );
}
