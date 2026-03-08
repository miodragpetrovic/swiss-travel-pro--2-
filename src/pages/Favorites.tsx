import React from "react";
import { Container } from "../components/Container";
import { TripCard } from "../components/TripCard";
import { PageShell } from "./_PageShell";
import { useI18n } from "../i18n/i18n";
import { TRIPS } from "../data/trips";
import { useFavorites } from "../components/FavoriteButton";
import { useParams } from "react-router-dom";

export function Favorites(): JSX.Element {
  const { t } = useI18n();
  const fav = useFavorites();
  const { lang } = useParams();
  const prefix = `/${lang ?? "de"}`;

  const items = TRIPS.filter((x) => fav.all.includes(x.id));

  return (
    <PageShell
      title={t("common.favorites")}
      subtitle={lang === "de" ? "Deine gespeicherten Reisen." : "Your saved trips."}
      breadcrumbs={[{ label: "Home", to: prefix }, { label: t("common.favorites") }]}
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-600 shadow-soft ring-1 ring-slate-200">
            {lang === "de" ? "Noch keine Favoriten." : "No favorites yet."}
          </div>
        ) : (
          items.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              favoriteActive={fav.isFav(trip.id)}
              onToggleFavorite={() => fav.toggle(trip.id)}
            />
          ))
        )}
      </div>
    </PageShell>
  );
}
