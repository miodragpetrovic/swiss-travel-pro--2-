import React from "react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { useI18n } from "../i18n/i18n";

export function About(): JSX.Element {
  const { t, lang } = useI18n();

  return (
    <PageShell
      title={t("about.title")}
      subtitle={
        lang === "de"
          ? "Massgeschneiderte Schweiz-Reisen mit Fokus auf Qualität, Klarheit und persönlichem Service."
          : "Tailor-made journeys through Switzerland with a focus on quality, clarity, and personal service."
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-extrabold">
            {lang === "de" ? "Wer wir sind" : "Who we are"}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {lang === "de"
              ? "Wir entwickeln stilvolle und zuverlässig organisierte Reiseerlebnisse in der Schweiz – von ikonischen Panoramazugfahrten bis zu individuell zusammengestellten Rundreisen. Unser Anspruch ist es, Planung einfach, transparent und hochwertig zu machen."
              : "We create elegant and reliably organized travel experiences across Switzerland — from iconic panoramic train journeys to carefully curated round trips. Our goal is to make travel planning simple, transparent, and premium."}
          </p>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-extrabold">
            {lang === "de" ? "Wofür wir stehen" : "What we stand for"}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {lang === "de"
              ? "Klare Angebote, sorgfältig ausgewählte Routen, passende Hotels und ein modernes Nutzererlebnis. Wir verbinden inspirierende Reiseideen mit einer strukturierten Präsentation, damit Kundinnen und Kunden schnell das passende Angebot finden."
              : "Clear offers, carefully selected routes, fitting hotels, and a modern user experience. We combine inspiring travel ideas with a structured presentation so travelers can quickly find the option that suits them best."}
          </p>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-extrabold">
            {lang === "de" ? "Was du erwarten kannst" : "What you can expect"}
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
            <li>
              {lang === "de"
                ? "Professionell aufbereitete Reisen mit klaren Leistungen"
                : "Professionally presented trips with clearly defined inclusions"}
            </li>
            <li>
              {lang === "de"
                ? "Zweisprachige Inhalte für den internationalen Einsatz"
                : "Bilingual content for international use"}
            </li>
            <li>
              {lang === "de"
                ? "Moderne Struktur für Suche, Übersicht und Detailseiten"
                : "A modern structure for search, overview, and detail pages"}
            </li>
            <li>
              {lang === "de"
                ? "Eine solide Basis für spätere Buchungs- und CMS-Anbindungen"
                : "A solid foundation for future booking and CMS integrations"}
            </li>
          </ul>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-extrabold">
            {lang === "de" ? "Unser Anspruch" : "Our approach"}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {lang === "de"
              ? "Reiseprodukte sollen nicht nur gut aussehen, sondern Vertrauen schaffen. Deshalb setzen wir auf hochwertige Inhalte, klare Sprache und eine ruhige, elegante Darstellung – ideal für Marken, die Kompetenz und Qualität vermitteln möchten."
              : "Travel products should not only look good, but also build trust. That is why we focus on high-quality content, clear language, and a calm, elegant presentation — ideal for brands that want to communicate expertise and quality."}
          </p>
        </Card>
      </div>
    </PageShell>
  );
}