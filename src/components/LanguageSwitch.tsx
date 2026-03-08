import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Lang } from "../i18n/i18n";
import { readLocalStorage, writeLocalStorage } from "../utils/storage";
import { cn } from "./cn";

const STORAGE_KEY = "stp_lang";

export function getStoredLang(): Lang | null {
  return readLocalStorage<Lang | null>(STORAGE_KEY, null);
}

export function storeLang(lang: Lang): void {
  writeLocalStorage(STORAGE_KEY, lang);
}

export function LanguageSwitch(): JSX.Element {
  const params = useParams();
  const lang = (params.lang === "en" ? "en" : "de") satisfies Lang;
  const navigate = useNavigate();

  return (
    <div className="flex items-center rounded-2xl bg-white/70 p-1 ring-1 ring-slate-200 backdrop-blur">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            storeLang(l);
            const path = window.location.pathname.replace(/^\/(de|en)/, `/${l}`);
            navigate(`${path}${window.location.search}`, { replace: true });
          }}
          className={cn(
            "rounded-2xl px-3 py-1.5 text-xs font-semibold transition",
            l === lang ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
