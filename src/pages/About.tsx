import React from "react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { useI18n } from "../i18n/i18n";

export function About(): JSX.Element {
  const { t, lang } = useI18n();

  return (
    <PageShell title={t("about.title")} subtitle={t("about.subtitle")}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-extrabold">{lang === "de" ? "Warum dieses Template?" : "Why this template?"}</div>
          <p className="mt-2 text-sm text-slate-600">
            {lang === "de"
              ? "Du bekommst ein sauberes, modernes Grundgerüst: Suche → Ergebnisse → Detail, Favoriten, Kontakt und rechtliche Seiten. Daten sind lokal und leicht ersetzbar."
              : "You get a clean, modern foundation: search → results → detail, favorites, contact and legal pages. Data is local and easy to replace."}
          </p>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-extrabold">{lang === "de" ? "Nächste Schritte" : "Next steps"}</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>{lang === "de" ? "API anbinden (CMS/DB)" : "Connect an API (CMS/DB)"}</li>
            <li>{lang === "de" ? "Checkout/Buchung integrieren" : "Integrate booking/checkout"}</li>
            <li>{lang === "de" ? "SEO, Analytics, Tracking" : "SEO, analytics, tracking"}</li>
            <li>{lang === "de" ? "Designsystem weiter ausbauen" : "Expand the design system"}</li>
          </ul>
        </Card>
      </div>
    </PageShell>
  );
}
