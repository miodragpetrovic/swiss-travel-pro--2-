import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "./Container";
import { Input } from "./Input";
import { Button } from "./Button";
import { useI18n } from "../i18n/i18n";

export function Footer(): JSX.Element {
  const { t } = useI18n();
  const { lang } = useParams();
  const prefix = `/${lang ?? "de"}`;

  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="text-sm font-extrabold tracking-tight">switzerland travel pro</div>
            <p className="max-w-md text-sm text-slate-600">{t("footer.note")}</p>

            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="text-sm font-bold">{t("footer.newsletter")}</div>
              <p className="mt-1 text-sm text-slate-600">{t("footer.newsletterHint")}</p>
              <div className="mt-3 flex gap-2">
                <Input placeholder="you@example.com" />
                <Button type="button">{t("footer.subscribe")}</Button>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-bold">Explore</div>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/reisen`}>
              {t("nav.reisen")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/gruppenreisen`}>
              {t("nav.gruppenreisen")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/themen`}>
              {t("nav.themen")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/reiseinfos`}>
              {t("nav.reiseinfos")}
            </Link>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-bold">Legal</div>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/impressum`}>
              {t("legal.impressum")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/datenschutz`}>
              {t("legal.privacy")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/agb`}>
              {t("legal.terms")}
            </Link>
            <Link className="block text-slate-600 hover:text-slate-900" to={`${prefix}/kontakt`}>
              {t("nav.contact")}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200/70 pt-6 text-xs text-slate-500 md:flex-row">
          <div>© {new Date().getFullYear()} Switzerland Travel Pro</div>
          <div className="flex gap-3">
            <span>TailwindCSS</span>
            <span>React</span>
            <span>Vite</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
