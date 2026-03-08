import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, BadgeCheck, CalendarDays, Search, Users } from "lucide-react";
import { SearchHero } from "../components/SearchHero";
import { Container } from "../components/Container";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TRIPS } from "../data/trips";
import { useI18n } from "../i18n/i18n";
import { formatCHF } from "../utils/format";

export function Home(): JSX.Element {
  const { t, lang } = useI18n();
  const { lang: routeLang } = useParams();
  const prefix = `/${routeLang ?? "de"}`;

  const featured = TRIPS.filter((x) => !x.group).slice(0, 3);

  const benefitCards = [
    { title: t("home.benefit1.title"), text: t("home.benefit1.text") },
    { title: t("home.benefit2.title"), text: t("home.benefit2.text") },
    { title: t("home.benefit3.title"), text: t("home.benefit3.text") },
  ];

  const howItWorks = [
    { Icon: Search, title: t("home.how.step1.title"), text: t("home.how.step1.text") },
    { Icon: CalendarDays, title: t("home.how.step2.title"), text: t("home.how.step2.text") },
    { Icon: BadgeCheck, title: t("home.how.step3.title"), text: t("home.how.step3.text") },
  ];

  const GROUPS_IMAGE_URL =
  "/group-travel.jpg";

  return (
    <div>
      <SearchHero to="reisen" />

      <Container className="pb-12 pt-12">
        {/* Featured trips */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold">{t("home.cta")}</div>
            <div className="text-sm text-slate-600">{t("trips.subtitle")}</div>
          </div>
          <Link to={`${prefix}/reisen`}>
            <Button variant="secondary">
              {t("nav.reisen")} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((trip) => (
            <Link key={trip.id} to={`${prefix}/reisen/${trip.slug}`} className="block">
              <Card className="group overflow-hidden">
                <img
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  src={trip.imageUrl}
                  alt={trip.title[lang]}
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="text-sm font-extrabold tracking-tight">{trip.title[lang]}</div>
                  <div className="mt-2 text-sm text-slate-600">{trip.overview[lang]}</div>
                  <div className="mt-3 text-sm font-bold">
                    {t("common.from")} {formatCHF(trip.priceFromCHF)}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        

        {/* ✅ NEW SECTION 1: How it works */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-extrabold">{t("home.how.title")}</div>
              <div className="text-sm text-slate-600">{t("home.how.subtitle")}</div>
            </div>

            <Link to={`${prefix}/reiseinfos`}>
              <Button variant="secondary">
                {t("home.how.link")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.map(({ Icon, title, text }) => (
              <Card key={title} className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-extrabold">{title}</div>
                <div className="mt-2 text-sm text-slate-600">{text}</div>
              </Card>
            ))}
          </div>
        </div>


        <div className="mt-12">
          <Card className="relative overflow-hidden p-6 md:p-8">
            {/* Background must NOT be negative z-index (otherwise Card bg hides it) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 to-slate-900" />
            <div className="absolute inset-0 z-0 opacity-35">
              <div className="absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-rose-400/40 blur-3xl" />
              <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-amber-300/35 blur-3xl" />
              <div className="absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-sky-400/35 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-center">
              {/* Left content */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                  <Users className="h-4 w-4" />
                  {t("home.groups.badge")}
                </div>

                <div className="mt-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  {t("home.groups.title")}
                </div>

                <div className="mt-2 text-sm text-white/80 md:text-base">{t("home.groups.subtitle")}</div>

                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  <li>• {t("home.groups.point1")}</li>
                  <li>• {t("home.groups.point2")}</li>
                  <li>• {t("home.groups.point3")}</li>
                </ul>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link to={`${prefix}/gruppenreisen`}>
                    <Button className="w-full sm:w-auto">
                      {t("home.groups.cta1")} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`${prefix}/kontakt`}>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      {t("home.groups.cta2")}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right image slot */}
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/15">
                  <img
                    src={GROUPS_IMAGE_URL}
                    alt=""
                    aria-hidden="true"
                    className="h-56 w-full object-cover md:h-64"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/55 via-slate-950/10 to-transparent" />

                  {/* Info box on image */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                    <div className="text-sm font-extrabold text-white">{t("home.groups.boxTitle")}</div>
                    <div className="mt-1 text-sm text-white/80">{t("home.groups.boxText")}</div>
                    <div className="mt-3 text-xs font-semibold text-white/70">{t("home.groups.boxHint")}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}