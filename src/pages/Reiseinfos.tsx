import React from "react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { useI18n } from "../i18n/i18n";

export function Reiseinfos(): JSX.Element {
  const { lang } = useI18n();

  const blocks =
    lang === "de"
      ? [
          { title: "Bahnreisen in der Schweiz", text: "Reservationen, Klassen, Panoramazüge und saisonale Unterschiede." },
          { title: "Gepäck", text: "Gepäcktransport, Handgepäck, Tipps für Umstiege." },
          { title: "Wetter & Kleidung", text: "Schichten‑Prinzip, Höhenlagen, Sommer/Winter." },
          { title: "Zahlung & Währung", text: "CHF, Karten, Trinkgeld (optional)." },
        ]
      : [
          { title: "Rail travel in Switzerland", text: "Reservations, classes, panorama trains and seasonal differences." },
          { title: "Luggage", text: "Luggage transfer, carry-on, tips for transfers." },
          { title: "Weather & clothing", text: "Layering, altitude, summer/winter." },
          { title: "Payment & currency", text: "CHF, cards, tips (optional)." },
        ];

  return (
    <PageShell
      title={lang === "de" ? "Reiseinfos" : "Travel info"}
      subtitle={lang === "de" ? "Praktische Infos für eine stressfreie Reise." : "Practical tips for a smooth trip."}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map((b) => (
          <Card key={b.title} className="p-5">
            <div className="text-sm font-extrabold">{b.title}</div>
            <div className="mt-2 text-sm text-slate-600">{b.text}</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
