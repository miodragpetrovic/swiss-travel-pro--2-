import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Card } from "./Card";
import { Select } from "./Select";
import { Input } from "./Input";
import { Button } from "./Button";
import { useI18n } from "../i18n/i18n";

export type TripQuery = {
  month: string;
  what: string;
  days: string;
  min: string;
  max: string;
};

const MONTHS = [
  { value: "", de: "Alle", en: "All" },
  { value: "1", de: "Januar", en: "January" },
  { value: "2", de: "Februar", en: "February" },
  { value: "3", de: "März", en: "March" },
  { value: "4", de: "April", en: "April" },
  { value: "5", de: "Mai", en: "May" },
  { value: "6", de: "Juni", en: "June" },
  { value: "7", de: "Juli", en: "July" },
  { value: "8", de: "August", en: "August" },
  { value: "9", de: "September", en: "September" },
  { value: "10", de: "Oktober", en: "October" },
  { value: "11", de: "November", en: "November" },
  { value: "12", de: "Dezember", en: "December" },
] as const;

const WHAT = [
  { value: "", de: "Alles", en: "All" },
  { value: "Panorama", de: "Panorama", en: "Panorama" },
  { value: "Luxury", de: "Luxus", en: "Luxury" },
  { value: "Mountains", de: "Berge", en: "Mountains" },
  { value: "Lakes", de: "Seen", en: "Lakes" },
  { value: "Winter", de: "Winter", en: "Winter" },
  { value: "Group", de: "Gruppe", en: "Group" },
] as const;

export function TripFilters({
  value,
  onChange,
  onReset,
}: {
  value: TripQuery;
  onChange: (next: TripQuery) => void;
  onReset: () => void;
}): JSX.Element {
  const { t, lang } = useI18n();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-extrabold">
          <SlidersHorizontal className="h-4 w-4" />
          {t("common.filters")}
        </div>
        <Button variant="ghost" onClick={onReset} className="h-9 px-3">
          {t("common.reset")}
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="px-1 text-xs font-bold text-slate-600">{t("common.month")}</div>
          <Select value={value.month} onChange={(e) => onChange({ ...value, month: e.target.value })}>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {lang === "de" ? m.de : m.en}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <div className="px-1 text-xs font-bold text-slate-600">{t("common.was")}</div>
          <Select value={value.what} onChange={(e) => onChange({ ...value, what: e.target.value })}>
            {WHAT.map((w) => (
              <option key={w.value} value={w.value}>
                {lang === "de" ? w.de : w.en}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <div className="px-1 text-xs font-bold text-slate-600">{t("common.duration")}</div>
          <Select value={value.days} onChange={(e) => onChange({ ...value, days: e.target.value })}>
            <option value="">{t("common.all")}</option>
            <option value="3">3–4</option>
            <option value="5">5–7</option>
            <option value="8">8+</option>
          </Select>
        </div>

        <div>
          <div className="px-1 text-xs font-bold text-slate-600">{t("common.priceRange")}</div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder={t("common.min")} inputMode="numeric" value={value.min} onChange={(e) => onChange({ ...value, min: e.target.value })} />
            <Input placeholder={t("common.max")} inputMode="numeric" value={value.max} onChange={(e) => onChange({ ...value, max: e.target.value })} />
          </div>
        </div>
      </div>
    </Card>
  );
}
