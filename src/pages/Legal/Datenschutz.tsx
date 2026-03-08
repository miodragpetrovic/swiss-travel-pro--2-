import React from "react";
import { PageShell } from "../_PageShell";
import { Card } from "../../components/Card";
import { useI18n } from "../../i18n/i18n";

export function Datenschutz(): JSX.Element {
  const { lang } = useI18n();
  return (
    <PageShell title={lang === "de" ? "Datenschutz" : "Privacy"}>
      <Card className="p-5">
        <div className="text-sm font-extrabold">{lang === "de" ? "Hinweis" : "Note"}</div>
        <div className="mt-2 text-sm text-slate-600">
          {lang === "de"
            ? "Demo‑Text. Wenn du Tracking, Newsletter oder Buchung integrierst, brauchst du eine echte Datenschutzerklärung."
            : "Demo text. If you add tracking, newsletters or booking, you’ll need a real privacy policy."}
        </div>
      </Card>
    </PageShell>
  );
}
