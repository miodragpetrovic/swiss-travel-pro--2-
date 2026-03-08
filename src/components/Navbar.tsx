// src/components/Navbar.tsx
import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Heart, Mail, Menu, X } from "lucide-react";
import { cn } from "./cn";
import { Container } from "./Container";
import { LanguageSwitch } from "./LanguageSwitch";
import { useI18n } from "../i18n/i18n";
import { Button } from "./Button";

type NavItem = { to: string; key: string };

export function Navbar(): JSX.Element {
  const { t } = useI18n();
  const { lang } = useParams();
  const location = useLocation();
  const prefix = `/${lang ?? "de"}`;

  const [open, setOpen] = React.useState(false);

  // Close mobile menu on any route change (including language switch)
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const items: NavItem[] = [
    { to: `${prefix}/reisen`, key: "nav.reisen" },
    { to: `${prefix}/gruppenreisen`, key: "nav.gruppenreisen" },
    { to: `${prefix}/tickets`, key: "nav.tickets" },
    { to: `${prefix}/hotels`, key: "nav.hotels" },
    { to: `${prefix}/themen`, key: "nav.themen" },
    { to: `${prefix}/reiseinfos`, key: "nav.reiseinfos" },
  ];

  const menuAriaLabel = open ? t("common.closeMenu") : t("common.openMenu");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to={prefix} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-600 shadow-soft">
              <div className="h-5 w-5 rounded-sm bg-white" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">switzerland</div>
              <div className="text-sm font-extrabold tracking-tight">travel pro</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100",
                    isActive && "bg-slate-900 text-white hover:bg-slate-900",
                  )
                }
              >
                {t(it.key)}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitch />
            <NavLink
              to={`${prefix}/favoriten`}
              className={({ isActive }) =>
                cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 hover:bg-slate-50",
                  isActive && "ring-rose-200",
                )
              }
              title={t("common.favorites")}
            >
              <Heart className="h-5 w-5" />
            </NavLink>
            <NavLink
              to={`${prefix}/kontakt`}
              className={({ isActive }) =>
                cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 hover:bg-slate-50",
                  isActive && "ring-rose-200",
                )
              }
              title={t("nav.contact")}
            >
              <Mail className="h-5 w-5" />
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={menuAriaLabel}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="mt-3 rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 lg:hidden">
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center justify-between gap-2 px-2 py-2">
                <LanguageSwitch />
                <Button variant="secondary" onClick={() => setOpen(false)} className="h-10">
                  {t("common.close")}
                </Button>
              </div>

              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100",
                      isActive && "bg-slate-900 text-white hover:bg-slate-900",
                    )
                  }
                >
                  {t(it.key)}
                </NavLink>
              ))}

              <NavLink to={`${prefix}/favoriten`} className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {t("common.favorites")}
              </NavLink>
              <NavLink to={`${prefix}/kontakt`} className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {t("nav.contact")}
              </NavLink>
              <NavLink to={`${prefix}/about`} className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {t("nav.about")}
              </NavLink>
              <NavLink to={`${prefix}/faq`} className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {t("nav.faq")}
              </NavLink>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}