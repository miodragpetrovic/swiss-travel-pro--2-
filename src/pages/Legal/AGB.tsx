import React from "react";
import { PageShell } from "../_PageShell";
import { Card } from "../../components/Card";
import { useI18n } from "../../i18n/i18n";

export function AGB(): JSX.Element {
  const { lang } = useI18n();
  return (
    <PageShell title={lang === "de" ? "AGB" : "Terms"}>
      <Card className="p-5">
        <div className="text-sm font-extrabold">{lang === "de" ? "Allgemeine Geschäftsbedingungen" : "Terms & Conditions"}</div>
        <div className="mt-2 text-sm text-slate-600">
          {lang === "de"
            ? "Demo‑AGB. Bitte juristisch prüfen und ersetzen."
            : "Demo terms. Please replace with legally reviewed terms."}
        </div>
      </Card>
    </PageShell>
  );
}
