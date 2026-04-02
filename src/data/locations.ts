export interface LocationHours {
  days: string;
  open: string;
  close: string;
}

export interface Location {
  slug: string;
  name: string;
  crossStreets: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  hours: LocationHours[];
  isNew: boolean;
  badge?: string;
  coordinates: { lat: number; lng: number };
}

export const locations: Location[] = [
  {
    slug: "roseville",
    name: "Roseville",
    crossStreets: "Corner of Utica & Groesbeck",
    address: "16970 E Thirteen Mile Rd, Roseville, MI 48066",
    city: "Roseville",
    state: "MI",
    zip: "48066",
    phone: "(586) 252-2057",
    phoneRaw: "+15862522057",
    hours: [
      { days: "Monday–Saturday", open: "10:00 AM", close: "11:00 PM" },
      { days: "Sunday", open: "11:00 AM", close: "10:00 PM" },
    ],
    isNew: true,
    badge: "New",
    coordinates: { lat: 42.507, lng: -82.937 },
  },
  {
    slug: "farmington-hills",
    name: "Farmington Hills",
    crossStreets: "Middlebelt Rd",
    address: "22370 Middlebelt, Farmington Hills, MI 48336",
    city: "Farmington Hills",
    state: "MI",
    zip: "48336",
    phone: "(248) 482-8509",
    phoneRaw: "+12484828509",
    hours: [
      { days: "Monday–Saturday", open: "10:00 AM", close: "11:00 PM" },
      { days: "Sunday", open: "11:00 AM", close: "10:00 PM" },
    ],
    isNew: true,
    badge: "Coming Soon",
    coordinates: { lat: 42.462, lng: -83.378 },
  },
  {
    slug: "redford",
    name: "Redford Twp",
    crossStreets: "Six Mile Rd",
    address: "26137 Six Mile Rd, Redford Twp, MI 48240",
    city: "Redford Twp",
    state: "MI",
    zip: "48240",
    phone: "(313) 286-3026",
    phoneRaw: "+13132863026",
    hours: [
      { days: "Monday–Saturday", open: "10:00 AM", close: "11:00 PM" },
      { days: "Sunday", open: "11:00 AM", close: "10:00 PM" },
    ],
    isNew: false,
    coordinates: { lat: 42.392, lng: -83.296 },
  },
  {
    slug: "southfield",
    name: "Southfield",
    crossStreets: "10 Mile & Telegraph",
    address: "24030 W 10 Mile Rd, Southfield, MI 48033",
    city: "Southfield",
    state: "MI",
    zip: "48033",
    phone: "(248) 327-7401",
    phoneRaw: "+12483277401",
    hours: [
      { days: "Monday–Sunday", open: "10:00 AM", close: "11:00 PM" },
    ],
    isNew: false,
    coordinates: { lat: 42.474, lng: -83.288 },
  },
  {
    slug: "ferndale",
    name: "Ferndale",
    crossStreets: "8 Mile & Wyoming",
    address: "8892 Eight Mile W, Ferndale, MI 48220",
    city: "Ferndale",
    state: "MI",
    zip: "48220",
    phone: "(248) 307-7604",
    phoneRaw: "+12483077604",
    hours: [
      { days: "Monday–Sunday", open: "10:00 AM", close: "11:00 PM" },
    ],
    isNew: false,
    coordinates: { lat: 42.459, lng: -83.145 },
  },
  {
    slug: "detroit",
    name: "Detroit",
    crossStreets: "Davison & Livernois",
    address: "13325 Livernois, Detroit, MI 48238",
    city: "Detroit",
    state: "MI",
    zip: "48238",
    phone: "(313) 491-0094",
    phoneRaw: "+13134910094",
    hours: [
      { days: "Monday–Thursday", open: "10:00 AM", close: "11:00 PM" },
      { days: "Friday–Saturday", open: "10:00 AM", close: "12:00 AM" },
      { days: "Sunday", open: "10:00 AM", close: "11:00 PM" },
    ],
    isNew: false,
    coordinates: { lat: 42.389, lng: -83.114 },
  },
  {
    slug: "dearborn-heights",
    name: "Dearborn Hts",
    crossStreets: "Beechdaly & Joy",
    address: "25675 Joy Rd, Dearborn Hts, MI 48127",
    city: "Dearborn Hts",
    state: "MI",
    zip: "48127",
    phone: "(313) 228-5000",
    phoneRaw: "+13132285000",
    hours: [
      { days: "Monday–Sunday", open: "10:00 AM", close: "11:00 PM" },
    ],
    isNew: false,
    coordinates: { lat: 42.328, lng: -83.278 },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}
