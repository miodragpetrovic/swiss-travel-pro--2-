import React from "react";
import { PageShell } from "./_PageShell";
import { Accordion } from "../components/Accordion";
import { useI18n } from "../i18n/i18n";

export function FAQ(): JSX.Element {
  const { t, lang } = useI18n();

  const items =
    lang === "de"
      ? [
          {
            title: "Was ist in den Reisen inbegriffen?",
            content:
              "Die enthaltenen Leistungen sind jeweils direkt beim Angebot aufgeführt. Je nach Reise umfassen sie zum Beispiel Zugfahrten, Hotelübernachtungen, Frühstück, Reservationen oder ausgewählte Ausflüge.",
          },
          {
            title: "Kann ich meine Schweiz-Reise individuell anpassen?",
            content:
              "Ja. Viele Reisen lassen sich flexibel anpassen – etwa bei Reisedauer, Hotelkategorie, Zimmerwahl, Zusatznächten oder optionalen Erlebnissen. So kann die Reise besser auf persönliche Wünsche abgestimmt werden.",
          },
          {
            title: "Für wen sind diese Reisen geeignet?",
            content:
              "Das Angebot richtet sich an Einzelreisende, Paare, Freunde, Familien und kleine Gruppen. Je nach Reise liegt der Fokus auf Panorama, Genuss, Natur, Wintererlebnissen oder komfortablen Rundreisen durch die Schweiz.",
          },
        ]
      : [
          {
            title: "What is included in the trips?",
            content:
              "The included services are listed directly with each offer. Depending on the trip, they may include train journeys, hotel stays, breakfast, seat reservations, or selected excursions.",
          },
          {
            title: "Can I customize my Switzerland trip?",
            content:
              "Yes. Many trips can be adjusted flexibly — for example in terms of travel duration, hotel category, room type, extra nights, or optional experiences. This allows the journey to be tailored to personal preferences.",
          },
          {
            title: "Who are these trips suitable for?",
            content:
              "The offer is designed for solo travelers, couples, friends, families, and small groups. Depending on the trip, the focus may be on panorama, comfort, nature, winter experiences, or well-organized round trips through Switzerland.",
          },
        ];

  return (
    <PageShell title={t("faq.title")} subtitle={t("faq.subtitle")}>
      <Accordion items={items.map((x) => ({ title: x.title, content: <div>{x.content}</div> }))} />
    </PageShell>
  );
}