// src/i18n/i18n.tsx
import React from "react";
import { de } from "./de";
import { en } from "./en";

export type Lang = "de" | "en";

/**
 * We deliberately widen the dictionary type so DE/EN can differ freely.
 * No literal-type conflicts between languages.
 */
type Dictionary = Record<string, unknown>;

const dictionaries: Record<Lang, Dictionary> = {
  de: de as unknown as Dictionary,
  en: en as unknown as Dictionary,
};

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;

  for (const p of parts) {
    if (!cur || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export type TFunc = (key: string) => string;
type Ctx = { lang: Lang; t: TFunc };

const I18nContext = React.createContext<Ctx | null>(null);

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }): JSX.Element {
  const dict = dictionaries[lang];

  const t = React.useCallback<TFunc>(
    (key) => {
      const v = getByPath(dict, key);
      return typeof v === "string" ? v : key; // fallback shows key if missing
    },
    [dict]
  );

  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}