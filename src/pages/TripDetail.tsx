import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Accordion } from "../components/Accordion";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { FavoriteButton, useFavorites } from "../components/FavoriteButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { TRIPS } from "../data/trips";
import { useI18n } from "../i18n/i18n";
import { formatCHF } from "../utils/format";

function uniq(arr: string[]): string[] {
  return Array.from(new Set(arr.filter(Boolean)));
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function TripDetail(): JSX.Element {
  const { slug, lang: routeLang } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const fav = useFavorites();

  const trip = TRIPS.find((x) => x.slug === slug);

  const [inquiryOpen, setInquiryOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  if (!trip) {
    return (
      <Container className="py-10">
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-600 shadow-soft ring-1 ring-slate-200">
          Not found
        </div>
      </Container>
    );
  }

  const prefix = `/${routeLang ?? "de"}`;

  const images = React.useMemo(() => {
    const extra = Array.isArray(trip.gallery) ? trip.gallery : [];
    return uniq([trip.imageUrl, ...extra]);
  }, [trip.gallery, trip.imageUrl]);

  const hasLightbox = images.length > 2;

  const openLightbox = (idx: number) => {
    if (!hasLightbox) return;
    setLightboxIndex(clamp(idx, 0, images.length - 1));
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImg = () => setLightboxIndex((i) => (i + 1) % images.length);
  const prevImg = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);

  React.useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  const ui = {
    close: lang === "de" ? "Schließen" : "Close",
    prev: lang === "de" ? "Zurück" : "Previous",
    next: lang === "de" ? "Weiter" : "Next",
    photos: lang === "de" ? "Fotos" : "Photos",
    viewAll: lang === "de" ? "Alle ansehen" : "View all",
  };

  return (
    <div className="bg-slate-50">
      {/* HERO (darker overlay + readable top text) */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={trip.imageUrl} alt={trip.title[lang]} className="h-full w-full object-cover" />

          {/* Strong dark veil (prevents washed-out white) */}
          <div className="absolute inset-0 bg-slate-950/40" />

          {/* Depth: bottom darkest, top still readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/20" />

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_10%,rgba(255,255,255,0.10),transparent_60%)]" />
        </div>

        <Container className="relative min-h-[380px] py-8 md:min-h-[560px] md:py-12">
          {/* Force breadcrumbs readable */}
          <div className="text-white/85 [&_a]:text-white/85 [&_a:hover]:text-white [&_span]:text-white/70">
            <Breadcrumbs
              items={[
                { label: t("nav.reisen"), to: `${prefix}/reisen` },
                { label: trip.title[lang] },
              ]}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <div className="max-w-3xl text-white">
                <div className="text-xs font-semibold text-white/80">
                  {trip.type === "zugreise" ? "Zugreise" : "Rundreise"}
                </div>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">{trip.title[lang]}</h1>

                <p className="mt-3 text-base text-white/85 md:text-lg">{trip.overview[lang]}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trip.experiences.slice(0, 6).map((x) => (
                    <span
                      key={x}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
                    >
                      {x}
                    </span>
                  ))}
                </div>

                {/* Mobile actions */}
                <div className="mt-5 flex flex-wrap items-center gap-2 lg:hidden">
                  <FavoriteButton active={fav.isFav(trip.id)} onToggle={() => fav.toggle(trip.id)} className="bg-white" />
                  <Button variant="secondary" onClick={() => navigate(-1)} className="h-11">
                    <ArrowLeft className="h-4 w-4" /> {t("common.back")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:col-span-3 lg:flex lg:justify-end lg:gap-2">
              <FavoriteButton active={fav.isFav(trip.id)} onToggle={() => fav.toggle(trip.id)} className="bg-white" />
              <Button variant="secondary" onClick={() => navigate(-1)} className="h-11">
                <ArrowLeft className="h-4 w-4" /> {t("common.back")}
              </Button>
            </div>
          </div>
        </Container>

        {/* Spacer to allow overlap without white band */}
        <div className="h-12 md:h-16" />
      </header>

      {/* MAIN (overlaps hero -> removes empty strip) */}
      <Container className="relative -mt-16 pb-10 md:-mt-20">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card className="p-5">
              <div className="text-sm font-extrabold">{t("detail.highlights")}</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {trip.highlights[lang].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-extrabold">{t("detail.included")}</div>
              <ul className="mt-3 grid list-disc gap-x-8 gap-y-1 pl-5 text-sm text-slate-700 md:grid-cols-2">
                {trip.included[lang].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Card>

            <div>
              <div className="text-sm font-extrabold">{t("detail.itinerary")}</div>
              <div className="mt-3">
                <Accordion
                  items={trip.itinerary[lang].map((x) => ({
                    title: x.day,
                    content: <div>{x.text}</div>,
                  }))}
                />
              </div>
            </div>

            <Card className="p-5">
              <div className="text-sm font-extrabold">{t("detail.goodToKnow")}</div>
              <div className="mt-2 text-sm text-slate-700">
                {lang === "de"
                  ? "Hinweis: Diese Seite ist Demo. Buchung/Anfrage speichert lokal im Browser."
                  : "Note: This is a demo. Booking/inquiries are stored locally in your browser."}
              </div>
            </Card>

            {/* Gallery */}
            {images.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold">
                    {ui.photos} ({images.length})
                  </div>

                  {hasLightbox && (
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="text-xs font-extrabold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                    >
                      {ui.viewAll}
                    </button>
                  )}
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {images.slice(0, 6).map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => openLightbox(idx)}
                      className="group relative overflow-hidden rounded-3xl ring-1 ring-slate-200"
                    >
                      <img
                        src={img}
                        alt="Gallery"
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {hasLightbox && idx === 5 && images.length > 6 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-sm font-extrabold text-white">
                          +{images.length - 6}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking card sticky only on lg */}
          <div className="lg:col-span-4">
            <Card className="p-5 lg:sticky lg:top-24">
              <div className="text-xs font-semibold text-slate-500">
                {trip.durationDays} {t("common.days")} / {trip.nights} {t("common.nights")}
              </div>

              <div className="mt-2 text-3xl font-extrabold tracking-tight">
                {t("common.from")} {formatCHF(trip.priceFromCHF)}
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">{t("common.travelPeriod")}</div>
                <div className="text-sm font-bold text-slate-800">{trip.travelPeriod[lang]}</div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {trip.regions.join(" • ")}
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Button
                  onClick={() => {
                    setSent(false);
                    setInquiryOpen(true);
                  }}
                >
                  {t("common.request")}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSent(false);
                    setInquiryOpen(true);
                  }}
                >
                  {t("common.bookNow")}
                </Button>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                {lang === "de" ? "Preis pro Person. Verfügbarkeit abhängig vom Datum." : "Price per person. Availability depends on date."}
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {/* Inquiry modal */}
      <Modal open={inquiryOpen} title={t("detail.requestTitle")} onClose={() => setInquiryOpen(false)}>
        <p className="text-sm text-slate-600">{t("detail.requestHint")}</p>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const payload = Object.fromEntries(form.entries());
            const key = "stp_inquiries_v1";
            const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown[];
            window.localStorage.setItem(
              key,
              JSON.stringify([{ tripId: trip.id, createdAt: new Date().toISOString(), ...payload }, ...current])
            );
            setSent(true);
            (e.currentTarget as HTMLFormElement).reset();
          }}
        >
          <div className="grid gap-2 md:grid-cols-2">
            <Input name="name" required placeholder={t("detail.form.name")} />
            <Input name="email" required type="email" placeholder={t("detail.form.email")} />
          </div>
          <Input name="phone" placeholder={t("detail.form.phone")} />
          <Textarea name="message" placeholder={t("detail.form.message")} />
          <Button type="submit" className="w-full">
            {t("detail.form.send")}
          </Button>
          {sent && (
            <div className="rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
              {t("detail.form.success")}
            </div>
          )}
        </form>
      </Modal>

      {/* Lightbox */}
      {hasLightbox && lightboxOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeLightbox} aria-hidden="true" />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-black/30 ring-1 ring-white/10"
            >
              <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                  aria-label={ui.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative">
                <img
                  src={images[lightboxIndex]}
                  alt="Lightbox"
                  className="max-h-[78vh] w-full object-contain"
                  loading="eager"
                  decoding="async"
                />

                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                  aria-label={ui.prev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                  aria-label={ui.next}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold text-white ring-1 ring-white/15">
                  {lightboxIndex + 1} / {images.length}
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto bg-black/30 p-3">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={[
                      "relative overflow-hidden rounded-2xl ring-2 transition",
                      idx === lightboxIndex ? "ring-white" : "ring-white/10 hover:ring-white/30",
                    ].join(" ")}
                  >
                    <img src={img} alt="" aria-hidden="true" className="h-16 w-24 object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}