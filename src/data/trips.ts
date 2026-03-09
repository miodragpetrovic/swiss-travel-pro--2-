// src/data/trips.ts
import type { Lang } from "../i18n/i18n";

export type TripType = "zugreise" | "rundreise" | "hotel" | "ticket";

export type Trip = {
  id: string;
  slug: string;
  type: TripType;
  bestseller?: boolean;
  group?: boolean;
  durationDays: number;
  nights: number;
  priceFromCHF: number;
  travelPeriod: { de: string; en: string };
  months: number[];
  imageUrl: string;
  gallery: string[];
  title: { de: string; en: string };
  bullets: { de: string[]; en: string[] };
  overview: { de: string; en: string };
  highlights: { de: string[]; en: string[] };
  included: { de: string[]; en: string[] };
  itinerary: { de: { day: string; text: string }[]; en: { day: string; text: string }[] };
  regions: string[];
  experiences: string[];
};

const u = (path: string) => `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1600&q=80`;

// ✅ “stable” images (same strategy as Hotels: fixed images.unsplash.com photo IDs, no random endpoints)
const IMG = {
  hero1: u("photo-1548013146-72479768bada"),
  hero2: u("photo-1501785888041-af3ef285b470"),
  hero3: u("photo-1469474968028-56623f02e42e"),
  hero4: u("photo-1501555088652-021faa106b9b"),
  hero5: u("photo-1519681393784-d120267933ba"),
  hero6: u("photo-1500043357865-c6b8827edf8f"),
  g1: u("photo-1528909514045-2fa4ac7a08ba"),
  g2: u("photo-1526772662000-3f88f10405ff"),
  g3: u("photo-1500530855697-b586d89ba3ee"),
  g4: u("photo-1470770841072-f978cf4d019e"),
  g5: u("photo-1491553895911-0055eca6402d"),
  g6: u("photo-1539635278303-d4002c07eae3"),
  g7: u("photo-1516571748831-5d81767b788d"),
  g8: u("photo-1482192596544-9eb780fc7f66"),
};

export const TRIPS: Trip[] = [
  // =========================================================
  // EXISTING (unchanged)
  // =========================================================
  {
    id: "t1",
    slug: "glacier-express-excellence-class",
    type: "zugreise",
    bestseller: true,
    durationDays: 3,
    nights: 2,
    priceFromCHF: 1500,
    travelPeriod: { de: "Dezember bis Oktober", en: "December to October" },
    months: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    imageUrl: u("photo-1548013146-72479768bada"),
    gallery: [u("photo-1528909514045-2fa4ac7a08ba"), u("photo-1526772662000-3f88f10405ff"), u("photo-1500530855697-b586d89ba3ee")],
    title: { de: "Glacier Express Excellence Class", en: "Glacier Express Excellence Class" },
    bullets: {
      de: ["Luxuriöse Fahrt in der Excellence Class", "Übernachtungen in St. Moritz und Zermatt", "5-Gang-Menü mit Weinbegleitung im Panoramawagen"],
      en: ["Luxury ride in Excellence Class", "Overnights in St. Moritz and Zermatt", "5-course menu with wine pairing in the panorama coach"],
    },
    overview: {
      de: "Erlebe die berühmteste Panoramastrecke der Schweiz auf höchstem Niveau — inklusive feiner Kulinarik, persönlichem Service und ikonischen Aussichten.",
      en: "Experience Switzerland’s most iconic panorama route at the highest level — refined dining, personal service and unforgettable views.",
    },
    highlights: {
      de: ["Oberalppass & Rheinschlucht", "Premium-Service an Bord", "Zermatt mit Matterhornblick"],
      en: ["Oberalp Pass & Rhine Gorge", "Premium onboard service", "Zermatt with Matterhorn views"],
    },
    included: {
      de: ["Excellence-Class Ticket (1 Strecke)", "2 Hotelnächte inkl. Frühstück", "5-Gang-Menü & Getränkeauswahl", "Sitzplatzreservationen"],
      en: ["Excellence Class ticket (one way)", "2 hotel nights incl. breakfast", "5-course menu & selected drinks", "Seat reservations"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise nach St. Moritz, Check-in und freie Zeit im Engadin." },
        { day: "Tag 2", text: "Panoramafahrt im Glacier Express nach Zermatt mit kulinarischem Service an Bord." },
        { day: "Tag 3", text: "Freier Vormittag in Zermatt, individuelle Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrival in St. Moritz, hotel check-in and leisure time in Engadin." },
        { day: "Day 2", text: "Panorama ride on the Glacier Express to Zermatt with fine dining onboard." },
        { day: "Day 3", text: "Free morning in Zermatt, individual departure." },
      ],
    },
    regions: ["Graubünden", "Valais"],
    experiences: ["Panorama", "Luxury", "Train"],
  },
  {
    id: "t2",
    slug: "grand-train-tour-classic-jungfrau",
    type: "rundreise",
    bestseller: true,
    durationDays: 8,
    nights: 7,
    priceFromCHF: 1680,
    travelPeriod: { de: "April bis Oktober", en: "April to October" },
    months: [4, 5, 6, 7, 8, 9, 10],
    imageUrl: u("photo-1501785888041-af3ef285b470"),
    gallery: [u("photo-1519681393784-d120267933ba"), u("photo-1470770841072-f978cf4d019e")],
    title: { de: "Grand Train Tour of Switzerland – Klassiker Jungfrau", en: "Grand Train Tour of Switzerland – Classic Jungfrau" },
    bullets: {
      de: ["Panoramafahrt im Glacier Express, Bernina Express, GoldenPass und Gotthard", "Bergausflug aufs Jungfraujoch – Top of Europe", "Gepäcktransport buchbar"],
      en: ["Glacier Express, Bernina Express, GoldenPass and Gotthard Panorama ride", "Jungfraujoch – Top of Europe excursion", "Luggage transfer available"],
    },
    overview: {
      de: "Die Schweiz in einer Woche — mit den schönsten Zügen, Seen und Alpenpässen. Perfekt für Erstbesucher, die alles sehen wollen.",
      en: "Switzerland in one week — the most scenic trains, lakes and alpine passes. Ideal for first-timers who want to see it all.",
    },
    highlights: {
      de: ["Jungfraujoch – Top of Europe", "Bernina-Panoramastrecke", "Luzern & Vierwaldstättersee"],
      en: ["Jungfraujoch – Top of Europe", "Bernina panorama route", "Lucerne & Lake Lucerne"],
    },
    included: {
      de: ["Zugtickets & Reservationen gemäss Programm", "7 Hotelnächte inkl. Frühstück", "Bergbahnticket Jungfraujoch", "Reiseunterlagen & Support"],
      en: ["Train tickets & reservations per itinerary", "7 hotel nights incl. breakfast", "Jungfraujoch mountain ticket", "Travel documents & support"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise nach Zürich, Altstadt-Spaziergang." },
        { day: "Tag 2", text: "Weiterreise nach Luzern, Zeit am See." },
        { day: "Tag 3", text: "Fahrt nach Interlaken, Vorbereitung Jungfraujoch." },
        { day: "Tag 4", text: "Ausflug aufs Jungfraujoch, Rückkehr nach Interlaken." },
        { day: "Tag 5", text: "GoldenPass Richtung Montreux, Seepromenade." },
        { day: "Tag 6", text: "Bernina Express Erlebnisstrecke." },
        { day: "Tag 7", text: "Glacier Express Etappe." },
        { day: "Tag 8", text: "Rückreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrive in Zurich, old town walk." },
        { day: "Day 2", text: "Transfer to Lucerne, lake time." },
        { day: "Day 3", text: "Travel to Interlaken, prepare for Jungfraujoch." },
        { day: "Day 4", text: "Jungfraujoch excursion, back to Interlaken." },
        { day: "Day 5", text: "GoldenPass towards Montreux, lakeside stroll." },
        { day: "Day 6", text: "Bernina Express scenic route." },
        { day: "Day 7", text: "Glacier Express segment." },
        { day: "Day 8", text: "Return travel." },
      ],
    },
    regions: ["Zürich", "Luzern", "Bern", "Graubünden", "Vaud"],
    experiences: ["Panorama", "Round trip", "Mountains"],
  },
  
  {
    id: "t4",
    slug: "bernina-express-lake-como",
    type: "zugreise",
    durationDays: 4,
    nights: 3,
    priceFromCHF: 720,
    travelPeriod: { de: "März bis November", en: "March to November" },
    months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    imageUrl: u("photo-1501555088652-021faa106b9b"),
    gallery: [u("photo-1526772662000-3f88f10405ff")],
    title: { de: "Bernina Express & Comer See", en: "Bernina Express & Lake Como" },
    bullets: {
      de: ["Bernina Express Panorama nach Tirano", "1 Nacht am Comer See", "Beste Fotospots auf 2'253 m ü. M."],
      en: ["Bernina Express panorama to Tirano", "1 night at Lake Como", "Best photo stops at 2,253m altitude"],
    },
    overview: {
      de: "Von Gletschern zu Palmen: diese Reise verbindet alpine Dramatik mit italienischer Leichtigkeit.",
      en: "From glaciers to palms: combine alpine drama with Italian ease.",
    },
    highlights: {
      de: ["Landwasserviadukt", "Alp Grüm Aussicht", "Bellagio Ausflug (optional)"],
      en: ["Landwasser Viaduct", "Alp Grüm viewpoint", "Bellagio trip (optional)"],
    },
    included: {
      de: ["Panoramazug-Reservation", "3 Hotelnächte", "Transfers gemäss Programm", "Reiseunterlagen"],
      en: ["Panorama train reservation", "3 hotel nights", "Transfers per itinerary", "Travel documents"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise Chur, Einführung und Abend zur freien Verfügung." },
        { day: "Tag 2", text: "Bernina Express nach Tirano, Weiterfahrt an den Comer See." },
        { day: "Tag 3", text: "Freier Tag am See, optional Bootsausflug." },
        { day: "Tag 4", text: "Rückreise in die Schweiz." },
      ],
      en: [
        { day: "Day 1", text: "Arrive in Chur, briefing and free evening." },
        { day: "Day 2", text: "Bernina Express to Tirano, continue to Lake Como." },
        { day: "Day 3", text: "Free day at the lake, optional boat trip." },
        { day: "Day 4", text: "Return to Switzerland." },
      ],
    },
    regions: ["Graubünden", "Italy"],
    experiences: ["Panorama", "Train", "Lakes"],
  },
  {
    id: "t5",
    slug: "winter-magic-zermatt-group",
    type: "rundreise",
    group: true,
    bestseller: true,
    durationDays: 6,
    nights: 5,
    priceFromCHF: 1290,
    travelPeriod: { de: "Januar bis März", en: "January to March" },
    months: [1, 2, 3],
    imageUrl: u("photo-1519681393784-d120267933ba"),
    gallery: [u("photo-1548013146-72479768bada"), u("photo-1516571748831-5d81767b788d"), u("photo-1482192596544-9eb780fc7f66")],
    title: { de: "Winter-Magie Zermatt (Gruppe)", en: "Winter Magic Zermatt (Group)" },
    bullets: {
      de: ["Geführte Gruppe (max. 16 Personen)", "Gornergrat-Ausflug inklusive", "Hotel im Zentrum, Frühstück & Dinner-Option"],
      en: ["Guided group (max 16 guests)", "Gornergrat excursion included", "Central hotel, breakfast & dinner option"],
    },
    overview: {
      de: "Schnee, Sonne, Matterhorn: eine kleine Gruppe, ein erfahrener Guide und die besten Wintermomente in Zermatt.",
      en: "Snow, sun, Matterhorn: a small group, an experienced guide and the best winter moments in Zermatt.",
    },
    highlights: {
      de: ["Gornergrat Bahn", "Fondue-Abend (optional)", "Winterwanderwege"],
      en: ["Gornergrat railway", "Fondue night (optional)", "Winter hiking trails"],
    },
    included: {
      de: ["5 Hotelnächte inkl. Frühstück", "Welcome-Briefing & Guide", "Gornergrat Ticket", "ÖV-Pässe vor Ort"],
      en: ["5 hotel nights incl. breakfast", "Welcome briefing & guide", "Gornergrat ticket", "Local transport passes"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Ankunft, Begrüssung und gemeinsames Dinner (optional)." },
        { day: "Tag 2", text: "Zermatt entdecken, Fotospots und Winterspaziergang." },
        { day: "Tag 3", text: "Ausflug Gornergrat mit Matterhorn-Aussicht." },
        { day: "Tag 4", text: "Freier Tag: Ski, Wellness oder Winterwandern." },
        { day: "Tag 5", text: "Leichte Schneeschuh-Tour (optional) & Abschiedsabend." },
        { day: "Tag 6", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrival, welcome and group dinner (optional)." },
        { day: "Day 2", text: "Explore Zermatt, photo spots and winter walk." },
        { day: "Day 3", text: "Gornergrat excursion with Matterhorn views." },
        { day: "Day 4", text: "Free day: skiing, wellness or winter hiking." },
        { day: "Day 5", text: "Light snowshoe tour (optional) & farewell evening." },
        { day: "Day 6", text: "Departure." },
      ],
    },
    regions: ["Valais"],
    experiences: ["Group", "Winter", "Mountains"],
  },
  

  // =========================================================
  // ✅ ADDITIONAL 10 (images are from the same stable IMG pool)
  // =========================================================

  // --- Reisen (5) ---
  
  
  {
    id: "t9",
    slug: "jungfrau-highlights-escape",
    type: "rundreise",
    durationDays: 4,
    nights: 3,
    priceFromCHF: 690,
    travelPeriod: { de: "Ganzjährig", en: "Year-round" },
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    imageUrl: IMG.hero5,
    gallery: [IMG.hero2, IMG.hero3, IMG.g6],
    title: { de: "Jungfrau Highlights Escape", en: "Jungfrau Highlights Escape" },
    bullets: {
      de: ["Interlaken als Basis", "Aussichtspunkte & Bergbahnen flexibel", "Perfekt für 4 Tage Schweiz"],
      en: ["Interlaken as your base", "Flexible viewpoints & mountain railways", "Perfect 4-day Switzerland trip"],
    },
    overview: {
      de: "Ein kompakter Rundtrip mit Fokus auf Berge, Seen und ikonische Aussichtspunkte der Jungfrau-Region.",
      en: "A compact round trip focused on mountains, lakes and iconic viewpoints in the Jungfrau region.",
    },
    highlights: {
      de: ["Lauterbrunnen-Tal", "Panorama-Stops", "Optional: Jungfraujoch Upgrade"],
      en: ["Lauterbrunnen valley", "Panorama stops", "Optional: Jungfraujoch upgrade"],
    },
    included: {
      de: ["3 Hotelnächte inkl. Frühstück", "ÖV-Empfehlungen & Ticket-Tipps", "Reiseunterlagen", "Support"],
      en: ["3 hotel nights incl. breakfast", "Local transport tips", "Travel documents", "Support"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise Interlaken, Check-in und See-Spaziergang." },
        { day: "Tag 2", text: "Ausflug in Täler & Aussichtspunkte." },
        { day: "Tag 3", text: "Freie Wahl: Berge, See oder optionales Upgrade." },
        { day: "Tag 4", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrive in Interlaken, check-in and lakeside walk." },
        { day: "Day 2", text: "Explore valleys and viewpoints." },
        { day: "Day 3", text: "Choose: mountains, lake or optional upgrade." },
        { day: "Day 4", text: "Departure." },
      ],
    },
    regions: ["Bern"],
    experiences: ["Mountains", "Panorama", "Round trip"],
  },
 
  {
    id: "t11",
    slug: "swiss-cities-lakes-short-break",
    type: "rundreise",
    durationDays: 5,
    nights: 4,
    priceFromCHF: 650,
    travelPeriod: { de: "März bis November", en: "March to November" },
    months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    imageUrl: IMG.hero2,
    gallery: [IMG.hero6, IMG.hero3, IMG.g3],
    title: { de: "Schweizer Städte & Seen – Kurztrip", en: "Swiss Cities & Lakes – Short Break" },
    bullets: {
      de: ["Zürich & Luzern kompakt", "Seepausen und Altstadt-Momente", "Ideal als erste Schweiz-Reise"],
      en: ["Zurich & Lucerne compact", "Lakeside breaks and old-town moments", "Ideal as a first Switzerland trip"],
    },
    overview: {
      de: "Ein ausgewogener Kurztrip mit City-Vibes und See-Erholung — schnell, hochwertig, klar organisiert.",
      en: "A balanced short break with city vibes and lakeside relaxation — fast, premium, well-organized.",
    },
    highlights: {
      de: ["Altstadt-Spaziergänge", "Kapellbrücke Luzern", "Panorama-Stops unterwegs"],
      en: ["Old-town strolls", "Chapel Bridge in Lucerne", "Panorama stops en route"],
    },
    included: {
      de: ["4 Hotelnächte inkl. Frühstück", "Reiseunterlagen", "ÖV-Tipps & Kartenlinks", "Support"],
      en: ["4 hotel nights incl. breakfast", "Travel documents", "Local transport tips", "Support"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise Zürich, Check-in, Altstadt." },
        { day: "Tag 2", text: "Zeit in Zürich, optionale Ausflüge." },
        { day: "Tag 3", text: "Weiterreise nach Luzern, See & Altstadt." },
        { day: "Tag 4", text: "Freier Tag: Schiff, Museen oder Berge." },
        { day: "Tag 5", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrive in Zurich, check-in, old town." },
        { day: "Day 2", text: "Time in Zurich, optional excursions." },
        { day: "Day 3", text: "Transfer to Lucerne, lake & old town." },
        { day: "Day 4", text: "Free day: boat, museums or mountains." },
        { day: "Day 5", text: "Departure." },
      ],
    },
    regions: ["Zürich", "Luzern", "Vaud"],
    experiences: ["Lakes", "Round trip"],
  },

  // --- Gruppenreisen (5) ---
  {
    id: "t12",
    slug: "interlaken-adventure-group",
    type: "rundreise",
    group: true,
    durationDays: 5,
    nights: 4,
    priceFromCHF: 990,
    travelPeriod: { de: "Juni bis September", en: "June to September" },
    months: [6, 7, 8, 9],
    imageUrl: IMG.hero3,
    gallery: [IMG.hero2, IMG.hero5, IMG.g6],
    title: { de: "Interlaken Adventure (Gruppe)", en: "Interlaken Adventure (Group)" },
    bullets: {
      de: ["Aktive Tage in der Jungfrau-Region", "Optionale Outdoor-Erlebnisse", "Kleine Gruppe, klare Planung"],
      en: ["Active days in the Jungfrau region", "Optional outdoor experiences", "Small group, clear planning"],
    },
    overview: {
      de: "Für Teams & Freundesgruppen: Berge, Seen und optionale Aktivitäten — ohne Stress organisiert.",
      en: "For teams & friends: mountains, lakes and optional activities — organized without stress.",
    },
    highlights: {
      de: ["Aussichtspunkte & Täler", "Bootszeit am See", "Optionale Action-Module"],
      en: ["Viewpoints & valleys", "Lake time by boat", "Optional action modules"],
    },
    included: {
      de: ["4 Hotelnächte inkl. Frühstück", "Guide/Koordination vor Ort", "Transfers gemäss Programm", "Reiseunterlagen"],
      en: ["4 hotel nights incl. breakfast", "Local guide/coordination", "Transfers per itinerary", "Travel documents"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise & Check-in, kurzer Orientierungsspaziergang." },
        { day: "Tag 2", text: "Tal-Ausflug & Panorama-Stops." },
        { day: "Tag 3", text: "Freier Tag: Outdoor-Module optional." },
        { day: "Tag 4", text: "See-Tag, Fotospots und Abschlussabend." },
        { day: "Tag 5", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrival & check-in, short orientation walk." },
        { day: "Day 2", text: "Valley outing & panorama stops." },
        { day: "Day 3", text: "Free day: optional outdoor modules." },
        { day: "Day 4", text: "Lake day, photo spots and farewell evening." },
        { day: "Day 5", text: "Departure." },
      ],
    },
    regions: ["Bern"],
    experiences: ["Group", "Mountains", "Lakes"],
  },
  
  {
    id: "t14",
    slug: "davos-ski-week-group",
    type: "rundreise",
    group: true,
    bestseller: true,
    durationDays: 7,
    nights: 6,
    priceFromCHF: 1490,
    travelPeriod: { de: "Dezember bis März", en: "December to March" },
    months: [12, 1, 2, 3],
    imageUrl: IMG.hero5,
    gallery: [IMG.g7, IMG.g8, IMG.hero1],
    title: { de: "Davos Ski Week (Gruppe)", en: "Davos Ski Week (Group)" },
    bullets: {
      de: ["Winterwoche für Gruppen", "Optionale Ski- & Wellness-Pakete", "Top-Basis in Graubünden"],
      en: ["Winter week for groups", "Optional ski & wellness packages", "Great base in Graubünden"],
    },
    overview: {
      de: "Eine Winterwoche für Teams & Freunde — mit klarer Organisation, viel Freiheit und optionalen Aktivitäten.",
      en: "A winter week for teams & friends — clear organization, plenty of freedom, optional activities.",
    },
    highlights: {
      de: ["Winterpanorama", "Optionale Ski-Tage", "Entspannter Abschlussabend"],
      en: ["Winter panorama", "Optional ski days", "Relaxed farewell evening"],
    },
    included: {
      de: ["6 Hotelnächte inkl. Frühstück", "Gruppenkoordination vor Ort", "ÖV-Tipps", "Reiseunterlagen & Support"],
      en: ["6 hotel nights incl. breakfast", "Local group coordination", "Local transport tips", "Travel documents & support"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise, Check-in und Briefing." },
        { day: "Tag 2", text: "Ski/Wintertag (optional) oder Wellness." },
        { day: "Tag 3", text: "Freier Tag: Aktivitäten nach Wahl." },
        { day: "Tag 4", text: "Gemeinsamer Ausflug & Panorama-Spots." },
        { day: "Tag 5", text: "Ski/Wintertag (optional) oder Dorf-Bummel." },
        { day: "Tag 6", text: "Abschlussabend." },
        { day: "Tag 7", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrival, check-in and briefing." },
        { day: "Day 2", text: "Ski/winter day (optional) or wellness." },
        { day: "Day 3", text: "Free day: activities of your choice." },
        { day: "Day 4", text: "Group excursion & panorama spots." },
        { day: "Day 5", text: "Ski/winter day (optional) or village stroll." },
        { day: "Day 6", text: "Farewell evening." },
        { day: "Day 7", text: "Departure." },
      ],
    },
    regions: ["Graubünden"],
    experiences: ["Group", "Winter", "Mountains"],
  },
  
  {
    id: "t16",
    slug: "panorama-coach-classic-group",
    type: "zugreise",
    group: true,
    durationDays: 3,
    nights: 2,
    priceFromCHF: 640,
    travelPeriod: { de: "April bis Oktober", en: "April to October" },
    months: [4, 5, 6, 7, 8, 9, 10],
    imageUrl: IMG.hero1,
    gallery: [IMG.g1, IMG.g2, IMG.g3],
    title: { de: "Panorama-Zug Klassiker (Gruppe)", en: "Panorama Train Classic (Group)" },
    bullets: {
      de: ["Panoramazug-Erlebnis im Team", "Kompakte Organisation", "Perfekt für Firmen & Vereine"],
      en: ["Panorama train experience as a team", "Compact organization", "Perfect for companies & clubs"],
    },
    overview: {
      de: "Eine kurze Gruppen-Zugreise mit starken Aussichten — ideal für gemeinsame Zeit ohne Aufwand.",
      en: "A short group rail trip with big views — ideal shared time with minimal effort.",
    },
    highlights: {
      de: ["Panorama-Abschnitte", "Fotostopps", "Gemeinsame Zeit an Bord"],
      en: ["Panorama segments", "Photo stops", "Shared onboard time"],
    },
    included: {
      de: ["Zugtickets & Reservationen", "2 Hotelnächte inkl. Frühstück", "Gruppen-Support", "Reiseunterlagen"],
      en: ["Train tickets & reservations", "2 hotel nights incl. breakfast", "Group support", "Travel documents"],
    },
    itinerary: {
      de: [
        { day: "Tag 1", text: "Anreise, Check-in, Briefing." },
        { day: "Tag 2", text: "Panoramazug-Tag, Fotostopps & gemeinsame Zeit." },
        { day: "Tag 3", text: "Abreise." },
      ],
      en: [
        { day: "Day 1", text: "Arrival, check-in, briefing." },
        { day: "Day 2", text: "Panorama train day, photo stops & shared time." },
        { day: "Day 3", text: "Departure." },
      ],
    },
    regions: ["Zürich", "Bern"],
    experiences: ["Group", "Panorama", "Train"],
  },
];

export const EXPERIENCES = ["Panorama", "Luxury", "Train", "Mountains", "Lakes", "Round trip", "Winter", "Group"] as const;

export const REGIONS = ["Zürich", "Luzern", "Bern", "Vaud", "Valais", "Graubünden", "Tessin", "Italy"] as const;

export function getTripTitle(trip: Trip, lang: Lang): string {
  return trip.title[lang];
}