import React from "react";
import { PageShell } from "../_PageShell";
import { Card } from "../../components/Card";
import { useI18n } from "../../i18n/i18n";

export function Impressum(): JSX.Element {
  const { lang } = useI18n();
  return (
    <PageShell title={lang === "de" ? "Impressum" : "Imprint"}>
      <Card className="p-5">
        <div className="text-sm font-extrabold">Switzerland Travel Pro</div>
        <div className="mt-2 text-sm text-slate-600">
          {lang === "de"
            ? "Demo‑Impressum. Bitte durch deine Firmendaten ersetzen."
            : "Demo imprint. Replace with your company details."}
        </div>
      </Card>
    </PageShell>
  );
}
