import React from "react";
import { Link, useParams } from "react-router-dom";
import { Mountain, TrainFront, Snowflake, Sparkles, Waves, Users } from "lucide-react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { useI18n } from "../i18n/i18n";

export function Themen(): JSX.Element {
  const { t, lang } = useI18n();
  const { lang: routeLang } = useParams();
  const prefix = `/${routeLang ?? "de"}`;

  const tiles = [
    { icon: <TrainFront className="h-5 w-5" />, key: "Panorama", desc: lang === "de" ? "Züge, Fensterplätze, Wow‑Views." : "Trains, window seats, wow views." },
    { icon: <Sparkles className="h-5 w-5" />, key: "Luxury", desc: lang === "de" ? "Excellence, Premium, Genuss." : "Excellence, premium, comfort." },
    { icon: <Mountain className="h-5 w-5" />, key: "Mountains", desc: lang === "de" ? "Gipfel, Pässe, Top of Europe." : "Peaks, passes, top of Europe." },
    { icon: <Waves className="h-5 w-5" />, key: "Lakes", desc: lang === "de" ? "Seen, Riviera‑Feeling, Boot." : "Lakes, riviera vibes, boats." },
    { icon: <Snowflake className="h-5 w-5" />, key: "Winter", desc: lang === "de" ? "Schnee, Zermatt, Wintersonne." : "Snow, Zermatt, winter sun." },
    { icon: <Users className="h-5 w-5" />, key: "Group", desc: lang === "de" ? "Gemeinsam reisen, Guide." : "Travel together, guided." },
  ];

  return (
    <PageShell
      title={lang === "de" ? "Themen" : "Themes"}
      subtitle={lang === "de" ? "Filtere Reisen nach Interessen." : "Filter trips by interests."}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t2) => (
          <Link key={t2.key} to={`${prefix}/reisen?what=${encodeURIComponent(t2.key)}`} className="block">
            <Card className="group p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-soft">{t2.icon}</div>
                <div>
                  <div className="text-sm font-extrabold">{t2.key}</div>
                  <div className="text-sm text-slate-600">{t2.desc}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
