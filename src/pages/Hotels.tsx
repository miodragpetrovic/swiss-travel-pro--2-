// src/pages/Hotels.tsx
import React from "react";
import { ExternalLink, MapPin, Search, Star } from "lucide-react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Pagination } from "../components/Pagination";
import { useI18n } from "../i18n/i18n";
import { HOTELS, type Hotel } from "../data/hotels";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function formatCHF(n: number): string {
  return `CHF ${n.toLocaleString("de-CH")}`;
}

function toNumberOrNaN(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : Number.NaN;
}

function matches(h: Hotel, q: { search: string; min: string; max: string }): boolean {
  const s = q.search.trim().toLowerCase();
  if (s) {
    const hay = `${h.name} ${h.city} ${h.region} ${h.tags.join(" ")}`.toLowerCase();
    if (!hay.includes(s)) return false;
  }

  const min = q.min ? toNumberOrNaN(q.min) : Number.NaN;
  const max = q.max ? toNumberOrNaN(q.max) : Number.NaN;

  if (Number.isFinite(min) && h.priceFromCHF < min) return false;
  if (Number.isFinite(max) && h.priceFromCHF > max) return false;

  return true;
}

export function Hotels(): JSX.Element {
  const { t, lang } = useI18n();

  const [search, setSearch] = React.useState("");
  const [min, setMin] = React.useState("");
  const [max, setMax] = React.useState("");
  const [page, setPage] = React.useState(1);

  const q = { search, min, max };

  const filtered = React.useMemo(() => HOTELS.filter((h) => matches(h, q)), [q]);

  // recommended ordering: higher stars first, then cheaper
  const ordered = React.useMemo(() => {
    const copy = [...filtered];
    return copy.sort((a, b) => b.stars - a.stars || a.priceFromCHF - b.priceFromCHF);
  }, [filtered]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(ordered.length / pageSize));
  const safePage = clamp(page, 1, totalPages);
  const items = ordered.slice((safePage - 1) * pageSize, safePage * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [search, min, max]);

  const ui = {
    reset: lang === "de" ? "Zurücksetzen" : "Reset",
    searchPlaceholder: lang === "de" ? "Hotel, Ort oder Region…" : "Hotel, city or region…",
    price: lang === "de" ? "Preis (CHF)" : "Price (CHF)",
    min: lang === "de" ? "Min" : "Min",
    max: lang === "de" ? "Max" : "Max",
    from: lang === "de" ? "ab" : "from",
    perNight: lang === "de" ? "pro Nacht" : "per night",
    website: lang === "de" ? "Website" : "Website",
  };

  return (
    <PageShell title={t("hotels.title")} subtitle={t("hotels.subtitle")}>
      {/* Filters */}
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-xs font-extrabold tracking-widest text-slate-500">{t("hotels.where")}</div>
            <div className="mt-2 flex gap-2">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className="h-11 w-full rounded-2xl bg-white pl-10 pr-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 outline-none transition focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                className="h-11 shrink-0"
                onClick={() => {
                  setSearch("");
                  setMin("");
                  setMax("");
                }}
              >
                {ui.reset}
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="text-xs font-extrabold tracking-widest text-slate-500">{ui.price}</div>
            <div className="mt-2 flex gap-2">
              <input
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder={ui.min}
                inputMode="numeric"
                className="h-11 w-full rounded-2xl bg-white px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 outline-none transition focus:ring-2 focus:ring-rose-500"
              />
              <input
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder={ui.max}
                inputMode="numeric"
                className="h-11 w-full rounded-2xl bg-white px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 outline-none transition focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="md:col-span-12">
            <div className="text-sm font-bold text-slate-700">
              {ordered.length} {t("hotels.results")}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-600">{t("hotels.empty")}</Card>
        ) : (
          items.map((h) => (
            <Card
              key={h.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-200/70 md:h-[280px]"
            >
              <div className="grid md:h-full md:grid-cols-12">
                {/* IMAGE (uniform) */}
                <div className="relative md:col-span-4 md:h-full">
                  <img
                    src={h.imageUrl}
                    alt={h.name}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-slate-950/10 to-transparent" />
                </div>

                {/* CONTENT (uniform height, buttons pinned to bottom) */}
                <div className="p-5 md:col-span-8 md:flex md:h-full md:flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="min-w-0">
                      <div className="text-base font-extrabold tracking-tight text-slate-900">
                        <span className="block max-w-[40ch] truncate" title={h.name}>
                          {h.name}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-700 ring-1 ring-slate-200">
                      {h.city} • {h.region}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-900 ring-1 ring-amber-200">
                      <Star className="h-3.5 w-3.5" />
                      {h.stars}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {h.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-xs font-semibold text-slate-500">{t("hotels.priceFrom")}</div>
                    <div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      {ui.from} {formatCHF(h.priceFromCHF)}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">{ui.perNight}</div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 md:mt-auto">
                    {h.website && (
                      <a
                        href={h.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {ui.website}
                      </a>
                    )}

                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(`${h.name} ${h.city}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <MapPin className="h-4 w-4" />
                      {t("hotels.map")}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="mt-8">
        <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
      </div>
    </PageShell>
  );
}