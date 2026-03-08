import React from "react";
import { Link, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Trip } from "../data/trips";
import { useI18n } from "../i18n/i18n";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { FavoriteButton } from "./FavoriteButton";
import { formatCHF } from "../utils/format";

export function TripCard({
  trip,
  favoriteActive,
  onToggleFavorite,
}: {
  trip: Trip;
  favoriteActive: boolean;
  onToggleFavorite: () => void;
}): JSX.Element {
  const { t, lang } = useI18n();
  const { lang: routeLang } = useParams();
  const prefix = `/${routeLang ?? "de"}`;

  return (
    <Link to={`${prefix}/reisen/${trip.slug}`} className="block">
      <Card className="group overflow-hidden">
        <div className="grid gap-0 md:grid-cols-12">
          <div className="relative md:col-span-4">
            <img
              src={trip.imageUrl}
              alt={trip.title[lang]}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02] md:h-full"
              loading="lazy"
            />
            <div className="absolute left-3 top-3">
              {trip.bestseller && (
                <Badge>
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("common.bestseller")}
                </Badge>
              )}
            </div>
          </div>

          <div className="relative p-4 md:col-span-8 md:p-5">
            <div className="absolute right-4 top-4">
              <FavoriteButton active={favoriteActive} onToggle={onToggleFavorite} />
            </div>

            <div className="text-xs font-semibold text-slate-500">{trip.type === "zugreise" ? "Zugreise" : "Rundreise"}</div>
            <div className="mt-1 pr-12 text-lg font-extrabold tracking-tight md:text-xl">{trip.title[lang]}</div>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {trip.bullets[lang].slice(0, 3).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="mt-5 grid gap-3 md:grid-cols-12 md:items-center">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 md:col-span-5">
                <div className="text-xs font-semibold text-slate-500">
                  {trip.durationDays} {t("common.days")} / {trip.nights} {t("common.nights")}
                </div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight">
                  {t("common.from")} {formatCHF(trip.priceFromCHF)}
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-500">{t("common.travelPeriod")}</div>
                <div className="text-sm font-semibold text-slate-700">{trip.travelPeriod[lang]}</div>
              </div>

              <div className="md:col-span-7">
                <div className="flex flex-wrap gap-2">
                  {trip.experiences.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft">
                  {t("common.details")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
