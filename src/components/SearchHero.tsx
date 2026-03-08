import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Search } from "lucide-react";
import { Container } from "./Container";
import { Card } from "./Card";
import { Select } from "./Select";
import { Button } from "./Button";
import { useI18n } from "../i18n/i18n";

const HERO_BG_URL = "/travel.jpg";

const WHAT = [
  { value: "", de: "Alles", en: "Anything" },
  { value: "Panorama", de: "Panorama", en: "Panorama" },
  { value: "Luxury", de: "Luxus", en: "Luxury" },
  { value: "Mountains", de: "Berge", en: "Mountains" },
  { value: "Lakes", de: "Seen", en: "Lakes" },
  { value: "Winter", de: "Winter", en: "Winter" },
] as const;

export type SearchState = {
  what: string;
  days: string;
  start: string; // YYYY-MM-DD
  month: string; // derived for existing filters
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function getTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function monthFromISO(dateISO: string): string {
  const m = dateISO.split("-")[1];
  return m ? String(Number(m)) : "";
}

function DateInput({
  value,
  onChange,
  min,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  min?: string;
  label: string;
}): JSX.Element {
  return (
    <div className="relative">
      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-11 w-full rounded-2xl bg-white pl-10 pr-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 outline-none transition focus:ring-2 focus:ring-rose-500"
      />
    </div>
  );
}

export function SearchHero({
  initial,
  to,
}: {
  initial?: Partial<SearchState>;
  to: "reisen" | "gruppenreisen";
}): JSX.Element {
  const { t, lang } = useI18n();
  const params = useParams();
  const navigate = useNavigate();
  const prefix = `/${params.lang ?? "de"}`;

  const todayISO = React.useMemo(() => getTodayISO(), []);

  const [start, setStart] = React.useState(initial?.start ?? "");
  const [what, setWhat] = React.useState(initial?.what ?? "");
  const [days, setDays] = React.useState(initial?.days ?? "");

  React.useEffect(() => {
    if (start) return;
    const m = initial?.month ? Number(initial.month) : null;
    if (!m || m < 1 || m > 12) return;
    const y = new Date().getFullYear();
    setStart(`${y}-${pad2(m)}-01`);
  }, [initial?.month, start]);

  const labels = {
    travelDate: lang === "de" ? "Anreisedatum" : "Start date",
    duration: lang === "de" ? "Dauer" : "Duration",
  };

  const submit = () => {
    const sp = new URLSearchParams();

    if (start) {
      sp.set("start", start);
      sp.set("month", monthFromISO(start));
    }
    if (what) sp.set("what", what);
    if (days) sp.set("days", days);

    navigate(`${prefix}/${to}?${sp.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={HERO_BG_URL} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/15 to-white/80" />
        <div className="absolute -top-32 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />
      </div>

      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
              {t("home.trust")}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {t("home.headline")}
            </h1>
            <p className="mt-3 text-base text-white/85 md:text-lg">{t("home.sub")}</p>
          </div>
        </div>

        <Card className="mt-8 p-3 md:p-4">
          {/* ✅ Tip text is moved OUT of the WANN column so everything stays aligned */}
          <div className="grid gap-3 md:grid-cols-12 md:items-end">
            {/* WANN */}
            <div className="md:col-span-5">
              <div className="px-2 text-[11px] font-extrabold tracking-widest text-slate-500">{t("common.wann")}</div>

              {/* more balanced widths for date vs duration */}
              <div className="mt-2 grid gap-2 sm:grid-cols-[1.2fr_1fr]">
                <DateInput value={start} onChange={setStart} min={todayISO} label={labels.travelDate} />
                <Select value={days} onChange={(e) => setDays(e.target.value)} className="h-11">
                  <option value="">{labels.duration}</option>
                  <option value="3">{lang === "de" ? "3–4 Tage" : "3–4 days"}</option>
                  <option value="5">{lang === "de" ? "5–7 Tage" : "5–7 days"}</option>
                  <option value="8">{lang === "de" ? "8+ Tage" : "8+ days"}</option>
                </Select>
              </div>
            </div>

            {/* WAS */}
            <div className="md:col-span-4">
              <div className="px-2 text-[11px] font-extrabold tracking-widest text-slate-500">{t("common.was")}</div>
              <div className="mt-2">
                <Select value={what} onChange={(e) => setWhat(e.target.value)} className="h-11">
                  {WHAT.map((w) => (
                    <option key={w.value} value={w.value}>
                      {lang === "de" ? w.de : w.en}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-3">
              <div
                aria-hidden="true"
                className="px-2 text-[11px] font-extrabold tracking-widest text-slate-500 opacity-0 select-none"
              >
                {t("common.was")}
              </div>
              <div className="mt-2">
                <Button onClick={submit} className="h-11 w-full">
                  {t("common.search")} <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tip below, full width (does NOT affect alignment) */}
            <div className="md:col-span-12 px-2 pt-1 text-xs font-semibold text-slate-600">
              {lang === "de"
                ? "Tipp: Datum ist optional — ohne Datum werden alle Monate angezeigt."
                : "Tip: Date is optional — without a date we show all months."}
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}