import React from "react";
import { PageShell } from "./_PageShell";
import { Accordion } from "../components/Accordion";
import { useI18n } from "../i18n/i18n";

export function FAQ(): JSX.Element {
  const { t, lang } = useI18n();

  const items =
    lang === "de"
      ? [
          { title: "Kann ich die Daten an eine API anbinden?", content: "Ja. Ersetze die Mock‑Daten in src/data/trips.ts durch API Calls (z. B. via React Query)." },
          { title: "Sind die Bilder lizenzfrei?", content: "Hier sind Unsplash‑Platzhalter. Bitte ersetze sie durch deine eigenen Assets/Quellen." },
          { title: "Wie erweitere ich Sprachen?", content: "Füge ein neues Dictionary in src/i18n hinzu und erweitere die Route sowie den Switch." },
        ]
      : [
          { title: "Can I connect this to an API?", content: "Yes. Replace mock data in src/data/trips.ts with API calls (e.g. via React Query)." },
          { title: "Are the images free to use?", content: "These are Unsplash placeholders. Replace them with your own assets/sources." },
          { title: "How do I add more languages?", content: "Add a new dictionary under src/i18n and extend routes + the language switch." },
        ];

  return (
    <PageShell title={t("faq.title")} subtitle={t("faq.subtitle")}>
      <Accordion items={items.map((x) => ({ title: x.title, content: <div>{x.content}</div> }))} />
    </PageShell>
  );
}
