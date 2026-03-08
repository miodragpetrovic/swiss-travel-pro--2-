// ==============================
// FILE: src/data/hotels.ts
// ==============================
export type Hotel = {
  id: string;
  name: string;
  city: string;
  region: string;
  stars: 3 | 4 | 5;
  priceFromCHF: number;
  tags: string[];
  imageUrl: string;
  website?: string;
};

/**
 * Stable Unsplash CDN URLs (non-random) for testing.
 * Replace later with your own hosted images.
 */
const IMAGES = {
  zurich1:
    "https://images.unsplash.com/photo-1573137785546-9d19e4f33f87?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8enVyaWNoJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  zurich2:
    "https://images.unsplash.com/photo-1685950527843-2725241f4f39?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8enVyaWNoJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  zurich3:
    "https://images.unsplash.com/photo-1681501405878-c9a6ef47aa9f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8enVyaWNoJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  zurich4:
    "https://images.unsplash.com/photo-1657137436880-e906b111b040?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8enVyaWNoJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  zurich5:
    "https://images.unsplash.com/photo-1742626301229-2436b0b440e9?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHp1cmljaCUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",

  lucerne1:
    "https://images.unsplash.com/photo-1706400053771-5483dc9125ae?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHVjZXJuZSUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",
  lucerne2:
    "https://images.unsplash.com/photo-1685015274383-e74eca5a5672?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHVjZXJuZSUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",
  lucerne3:
    "https://images.unsplash.com/photo-1684871640048-f298aaa8b03c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHVjZXJuZSUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",
  lucerne4:
    "https://images.unsplash.com/photo-1663782196173-5a6874125665?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHVjZXJuZSUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",

  geneva1:
    "https://images.unsplash.com/photo-1574904935745-7e40279f589d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXZhJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  geneva2:
    "https://images.unsplash.com/photo-1550913052-56eb528b8e7c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2VuZXZhJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  geneva3:
    "https://images.unsplash.com/photo-1627943721274-a28eae8d7658?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2VuZXZhJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",
  geneva4:
    "https://images.unsplash.com/photo-1667758682790-c58fa23dc76f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2VuZXZhJTIwc3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=80&w=1600",

  bern1:
    "https://images.unsplash.com/photo-1597947967084-339b2116a030?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVybnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
  bern2:
    "https://images.unsplash.com/photo-1658738795717-3fd594f4e1a9?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVybnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
  bern3:
    "https://images.unsplash.com/photo-1594093880970-7b4295e8b6c3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVybnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",

  basel1:
    "https://images.unsplash.com/photo-1657123794046-7db308b52535?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFzZWwlMjBzd2l0emVybGFuZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
  basel2:
    "https://images.unsplash.com/photo-1657123793819-698e5ebf1823?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFzZWwlMjBzd2l0emVybGFuZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",

  zermatt1:
    "https://images.unsplash.com/photo-1605750454112-f2f3f696eeb0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8emVybWF0dCUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",
  interlaken1:
    "https://images.unsplash.com/photo-1612215864092-355d4b25083f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJsYWtlbiUyMHN3aXR6ZXJsYW5kfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1600",
};

export const HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "Hotel Schweizerhof Zürich",
    city: "Zürich",
    region: "Zürich",
    stars: 5,
    priceFromCHF: 320,
    tags: ["City", "Luxury", "Spa"],
    imageUrl: IMAGES.zurich1,
    website: "https://example.com",
  },
  {
    id: "h2",
    name: "Lakeview Boutique Luzern",
    city: "Luzern",
    region: "Zentralschweiz",
    stars: 4,
    priceFromCHF: 210,
    tags: ["Lake", "Boutique", "Breakfast"],
    imageUrl: IMAGES.lucerne4,
    website: "https://example.com",
  },
  {
    id: "h3",
    name: "Alpine Lodge Zermatt",
    city: "Zermatt",
    region: "Wallis",
    stars: 4,
    priceFromCHF: 240,
    tags: ["Mountains", "Chalet", "Sauna"],
    imageUrl: IMAGES.zermatt1,
    website: "https://example.com",
  },
  {
    id: "h4",
    name: "Interlaken Panorama Resort",
    city: "Interlaken",
    region: "Berner Oberland",
    stars: 5,
    priceFromCHF: 290,
    tags: ["Panorama", "Resort", "Family"],
    imageUrl: IMAGES.interlaken1,
    website: "https://example.com",
  },
  {
    id: "h5",
    name: "Bern Old Town Hotel",
    city: "Bern",
    region: "Bern",
    stars: 4,
    priceFromCHF: 180,
    tags: ["Old Town", "City", "Business"],
    imageUrl: IMAGES.bern2,
    website: "https://example.com",
  },
  {
    id: "h6",
    name: "Basel Riverside Stay",
    city: "Basel",
    region: "Basel",
    stars: 4,
    priceFromCHF: 170,
    tags: ["River", "City", "Design"],
    imageUrl: IMAGES.basel2,
    website: "https://example.com",
  },
  {
    id: "h7",
    name: "Geneva Business Hotel",
    city: "Genève",
    region: "Genf",
    stars: 4,
    priceFromCHF: 220,
    tags: ["Business", "City", "Conference"],
    imageUrl: IMAGES.geneva2,
    website: "https://example.com",
  },
  {
    id: "h8",
    name: "Montreux Lakeside Suites",
    city: "Montreux",
    region: "Waadt",
    stars: 5,
    priceFromCHF: 340,
    tags: ["Lake", "Suites", "Luxury"],
    imageUrl: IMAGES.geneva1,
    website: "https://example.com",
  },
  {
    id: "h9",
    name: "Lausanne Urban Hotel",
    city: "Lausanne",
    region: "Waadt",
    stars: 4,
    priceFromCHF: 190,
    tags: ["City", "Modern", "Gym"],
    imageUrl: IMAGES.geneva3,
    website: "https://example.com",
  },
  {
    id: "h10",
    name: "St. Moritz Grand Alpine",
    city: "St. Moritz",
    region: "Graubünden",
    stars: 5,
    priceFromCHF: 480,
    tags: ["Luxury", "Ski", "Spa"],
    imageUrl: IMAGES.lucerne1,
    website: "https://example.com",
  },
  {
    id: "h11",
    name: "Lugano Lago Hotel",
    city: "Lugano",
    region: "Tessin",
    stars: 4,
    priceFromCHF: 200,
    tags: ["Lake", "Sun", "Relax"],
    imageUrl: IMAGES.lucerne2,
    website: "https://example.com",
  },
  {
    id: "h12",
    name: "Grindelwald Mountain Inn",
    city: "Grindelwald",
    region: "Berner Oberland",
    stars: 4,
    priceFromCHF: 230,
    tags: ["Mountains", "Hiking", "Views"],
    imageUrl: IMAGES.lucerne3,
    website: "https://example.com",
  },
  {
    id: "h13",
    name: "Davos Winter Lodge",
    city: "Davos",
    region: "Graubünden",
    stars: 4,
    priceFromCHF: 210,
    tags: ["Ski", "Wellness", "Cozy"],
    imageUrl: IMAGES.zurich2,
    website: "https://example.com",
  },
  {
    id: "h14",
    name: "Andermatt Chalet Collection",
    city: "Andermatt",
    region: "Uri",
    stars: 5,
    priceFromCHF: 360,
    tags: ["Chalet", "Ski", "Premium"],
    imageUrl: IMAGES.zurich3,
    website: "https://example.com",
  },
  {
    id: "h15",
    name: "Engelberg Family Hotel",
    city: "Engelberg",
    region: "Obwalden",
    stars: 3,
    priceFromCHF: 140,
    tags: ["Family", "Mountains", "Value"],
    imageUrl: IMAGES.zurich4,
    website: "https://example.com",
  },
  {
    id: "h16",
    name: "Saas-Fee Snow Boutique",
    city: "Saas-Fee",
    region: "Wallis",
    stars: 4,
    priceFromCHF: 260,
    tags: ["Ski", "Boutique", "Sauna"],
    imageUrl: IMAGES.zurich5,
    website: "https://example.com",
  },
  {
    id: "h17",
    name: "Thun Lake Apartments",
    city: "Thun",
    region: "Bern",
    stars: 3,
    priceFromCHF: 120,
    tags: ["Apartment", "Lake", "Budget"],
    imageUrl: IMAGES.bern1,
    website: "https://example.com",
  },
  {
    id: "h18",
    name: "Lauterbrunnen Valley Stay",
    city: "Lauterbrunnen",
    region: "Berner Oberland",
    stars: 3,
    priceFromCHF: 135,
    tags: ["Nature", "Hiking", "Valley"],
    imageUrl: IMAGES.bern3,
    website: "https://example.com",
  },
  {
    id: "h19",
    name: "Chur City Comfort",
    city: "Chur",
    region: "Graubünden",
    stars: 3,
    priceFromCHF: 110,
    tags: ["City", "Value", "Transit"],
    imageUrl: IMAGES.basel1,
    website: "https://example.com",
  },
  {
    id: "h20",
    name: "Locarno Sun Resort",
    city: "Locarno",
    region: "Tessin",
    stars: 4,
    priceFromCHF: 210,
    tags: ["Sun", "Pool", "Relax"],
    imageUrl: IMAGES.geneva4,
    website: "https://example.com",
  },
];

// ==============================
// OPTIONAL FIX (recommended):
// In your Hotels cards, REMOVE referrerPolicy="no-referrer" from <img>
// because some CDNs may reject it.
// ==============================
//
// <img
//   src={h.imageUrl}
//   alt={h.name}
//   className="..."
//   loading="lazy"
//   decoding="async"
// />