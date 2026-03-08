// src/routes.tsx
import React from "react";
import { createBrowserRouter, Navigate, Outlet, useParams } from "react-router-dom";
import type { Lang } from "./i18n/i18n";
import { I18nProvider } from "./i18n/i18n";
import { getStoredLang } from "./components/LanguageSwitch";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Trips } from "./pages/Trips";
import { GroupTrips } from "./pages/GroupTrips";
import { TripDetail } from "./pages/TripDetail";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { FAQ } from "./pages/FAQ";
import { Themen } from "./pages/Themen";
import { Reiseinfos } from "./pages/Reiseinfos";
import { Tickets } from "./pages/Tickets";
import { Hotels } from "./pages/Hotels";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";
import { Impressum } from "./pages/Legal/Impressum";
import { Datenschutz } from "./pages/Legal/Datenschutz";
import { AGB } from "./pages/Legal/AGB";

function normalizeLang(raw: string | undefined): Lang | null {
  if (raw === "de") return "de";
  if (raw === "en") return "en";
  return null;
}

function LangLayout(): JSX.Element {
  const params = useParams();
  const lang = normalizeLang(params.lang);

  if (!lang) {
    const fallback = getStoredLang() ?? "de";
    return <Navigate to={`/${fallback}`} replace />;
  }

  return (
    <I18nProvider lang={lang}>
      <div className="min-h-dvh">
        <Navbar />
        <main className="min-h-[70dvh]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

function RootRedirect(): JSX.Element {
  const stored = getStoredLang();
  return <Navigate to={`/${stored ?? "de"}`} replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    path: "/:lang",
    element: <LangLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "reisen", element: <Trips /> },
      { path: "gruppenreisen", element: <GroupTrips /> },
      { path: "reisen/:slug", element: <TripDetail /> },
      { path: "favoriten", element: <Favorites /> },
      { path: "themen", element: <Themen /> },
      { path: "reiseinfos", element: <Reiseinfos /> },
      { path: "tickets", element: <Tickets /> },
      { path: "hotels", element: <Hotels /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQ /> },
      { path: "kontakt", element: <Contact /> },
      { path: "impressum", element: <Impressum /> },
      { path: "datenschutz", element: <Datenschutz /> },
      { path: "agb", element: <AGB /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={`/${getStoredLang() ?? "de"}`} replace />,
  },
]);