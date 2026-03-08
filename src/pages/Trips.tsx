// src/pages/Trips.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Container } from "../components/Container";
import { SearchHero } from "../components/SearchHero";
import { TripCard } from "../components/TripCard";
import { TripFilters, type TripQuery } from "../components/TripFilters";
import { Pagination } from "../components/Pagination";
import { Select } from "../components/Select";
import { useI18n } from "../i18n/i18n";
import { TRIPS, type Trip } from "../data/trips";
import { useFavorites } from "../components/FavoriteButton";

type Sort = "relevance" | "priceLow" | "priceHigh" | "durationShort" | "durationLong";

function toInt(v: string): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function matches(trip: Trip, q: TripQuery): boolean {
  // Reisen only
  if (trip.group) return false;

  const month = q.month ? toInt(q.month) : null;
  if (month && !trip.months.includes(month)) return false;

  if (q.what) {
    const token = q.what.toLowerCase();
    const inExp = trip.experiences.some((x) => x.toLowerCase() === token);
    const inReg = trip.regions.some((x) => x.toLowerCase().includes(token));
    if (!inExp && !inReg) return false;
  }

  if (q.days) {
    const d = toInt(q.days);
    if (d === 3 && trip.durationDays > 4) return false;
    if (d === 5 && (trip.durationDays < 5 || trip.durationDays > 7)) return false;
    if (d === 8 && trip.durationDays < 8) return false;
  }

  const min = q.min ? toInt(q.min) : null;
  const max = q.max ? toInt(q.max) : null;
  if (min != null && trip.priceFromCHF < min) return false;
  if (max != null && trip.priceFromCHF > max) return false;

  return true;
}

function sortTrips(trips: Trip[], sort: Sort): Trip[] {
  const copy = [...trips];
  switch (sort) {
    case "priceLow":
      return copy.sort((a, b) => a.priceFromCHF - b.priceFromCHF);
    case "priceHigh":
      return copy.sort((a, b) => b.priceFromCHF - a.priceFromCHF);
    case "durationShort":
      return copy.sort((a, b) => a.durationDays - b.durationDays);
    case "durationLong":
      return copy.sort((a, b) => b.durationDays - a.durationDays);
    case "relevance":
    default:
      return copy.sort((a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)));
  }
}

const DEFAULT_QUERY: TripQuery = { month: "", what: "", days: "", min: "", max: "" };

function buildSearchParams(next: TripQuery): URLSearchParams {
  const nextSp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) nextSp.set(k, v);
  return nextSp;
}

function countActiveFilters(q: TripQuery): number {
  return Object.values(q).filter((v) => Boolean(v)).length;
}

export function Trips(): JSX.Element {
  const { t, lang } = useI18n();
  const fav = useFavorites();

  const [sp, setSp] = useSearchParams();
  const [sort, setSort] = React.useState<Sort>("relevance");
  const [page, setPage] = React.useState(1);

  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<TripQuery>(DEFAULT_QUERY);

  const q: TripQuery = {
    month: sp.get("month") ?? "",
    what: sp.get("what") ?? "",
    days: sp.get("days") ?? "",
    min: sp.get("min") ?? "",
    max: sp.get("max") ?? "",
  };

  const filtered = React.useMemo(() => TRIPS.filter((trip) => matches(trip, q)), [q]);
  const sorted = React.useMemo(() => sortTrips(filtered, sort), [filtered, sort]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const items = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const activeFilters = countActiveFilters(q);

  React.useEffect(() => {
    setPage(1);
  }, [sp, sort]);

  React.useEffect(() => {
    if (!filtersOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  const openFilters = () => {
    setDraft(q);
    setFiltersOpen(true);
  };

  const applyFilters = () => {
    setSp(buildSearchParams(draft), { replace: true });
    setFiltersOpen(false);
  };

  const resetFilters = () => setDraft(DEFAULT_QUERY);

  const clearAll = () => setSp(new URLSearchParams(), { replace: true });

  const ui = {
    filters: lang === "de" ? "Filter" : "Filters",
    apply: lang === "de" ? "Anwenden" : "Apply",
    close: lang === "de" ? "Schließen" : "Close",
    reset: lang === "de" ? "Zurücksetzen" : "Reset",
    clear: lang === "de" ? "Alles löschen" : "Clear all",
    active: lang === "de" ? "aktiv" : "active",
  };

  return (
    <div>
      <SearchHero to="reisen" initial={{ month: q.month, what: q.what, days: q.days }} />

      <Container className="pb-12">
        {/* Top bar (sticky) */}
        <div className="sticky top-20 z-30 -mx-1 px-1">
          <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-soft ring-1 ring-slate-200 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold">
                {filtered.length} {t("common.results")}
              </div>

              {activeFilters > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-bold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                >
                  {ui.clear}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={openFilters}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-soft hover:bg-slate-800"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {ui.filters}
                {activeFilters > 0 && (
                  <span className="ml-1 inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-xs font-extrabold">
                    {activeFilters} {ui.active}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-slate-600">{t("common.sortBy")}:</div>
                <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10">
                  <option value="relevance">{t("common.relevance")}</option>
                  <option value="priceLow">{t("common.priceLow")}</option>
                  <option value="priceHigh">{t("common.priceHigh")}</option>
                  <option value="durationShort">{t("common.durationShort")}</option>
                  <option value="durationLong">{t("common.durationLong")}</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-4">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-white/90 p-8 text-center text-sm text-slate-600 shadow-soft ring-1 ring-slate-200 backdrop-blur">
              {t("common.empty")}
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  favoriteActive={fav.isFav(trip.id)}
                  onToggleFavorite={() => fav.toggle(trip.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
        </div>
      </Container>

      {/* Filters Modal */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="text-sm font-extrabold tracking-tight">{ui.filters}</div>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label={ui.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-5">
                <TripFilters value={draft} onChange={setDraft} onReset={resetFilters} />
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-11 rounded-xl bg-slate-100 px-4 text-sm font-extrabold text-slate-800 hover:bg-slate-200"
                >
                  {ui.reset}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="h-11 flex-1 rounded-xl bg-white px-4 text-sm font-extrabold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    {ui.close}
                  </button>
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="h-11 flex-1 rounded-xl bg-rose-600 px-4 text-sm font-extrabold text-white hover:bg-rose-700"
                  >
                    {ui.apply}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}