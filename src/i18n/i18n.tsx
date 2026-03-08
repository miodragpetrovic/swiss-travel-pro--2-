import React, { createContext, useContext, useMemo } from "react";
import { de } from "./de";
import { en } from "./en";

export type Lang = "de" | "en";
export type Dictionary = typeof de;

const dictionaries: Record<Lang, Dictionary> = { de, en };

type I18nValue = {
  lang: Lang;
  dict: Dictionary;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object" || !(p in cur)) return null;
    cur = cur[p];
  }
  return cur;
}

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }): JSX.Element {
  const dict = dictionaries[lang];

  const value = useMemo<I18nValue>(() => {
    const t = (path: string): string => {
      const v = getByPath(dict, path);
      return typeof v === "string" ? v : path;
    };
    return { lang, dict, t };
  }, [dict, lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
