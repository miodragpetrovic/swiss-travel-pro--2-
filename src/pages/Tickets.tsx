import React from "react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { useI18n } from "../i18n/i18n";

export function Tickets(): JSX.Element {
  const { lang } = useI18n();
  return (
    <PageShell
      title={lang === "de" ? "Tickets" : "Tickets"}
      subtitle={lang === "de" ? "Platzhalterseite für Ticket‑Produkte." : "Placeholder page for ticket products."}
    >
      <Card className="p-5">
        <div className="text-sm font-extrabold">{lang === "de" ? "Ideen" : "Ideas"}</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>{lang === "de" ? "Swiss Travel Pass" : "Swiss Travel Pass"}</li>
          <li>{lang === "de" ? "Panorama‑Reservationen" : "Panorama reservations"}</li>
          <li>{lang === "de" ? "Bergbahnen (Jungfrau, Pilatus)" : "Mountain railways (Jungfrau, Pilatus)"}</li>
        </ul>
      </Card>
    </PageShell>
  );
}
