import Link from "next/link";
import LocationCard from "@/components/LocationCard";
import CallBanner from "@/components/CallBanner";
import JsonLd from "@/components/JsonLd";
import { locations } from "@/data/locations";

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Manhattan Fish & Chicken",
  description:
    "Fresh fish, poultry and seafood market serving the Detroit metro area. Buy it raw or we'll fry it for you. Fresh fish, chicken, shrimp, dairy, grains, bread, and frozen vegetables & fruits.",
  servesCuisine: ["Seafood", "American", "Soul Food"],
  url: "https://www.manhattanchicken.com",
  numberOfLocations: 7,
  areaServed: "Detroit Metropolitan Area, Michigan",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  hasMenu: {
    "@type": "Menu",
    url: "https://www.manhattanchicken.com/menu",
  },
  acceptsReservations: false,
  paymentAccepted: "Visa, Mastercard, American Express",
  priceRange: "$$",
};

export default function Home() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a6b6b] via-[#2ABFBF] to-[#1a8a8a]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A843]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:py-32 lg:py-40">
          {/* Holiday badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#D4A843]/20 px-5 py-2 text-sm font-semibold text-white ring-1 ring-[#D4A843]/40 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A843] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4A843]" />
            </span>
            Open on All Holidays!
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Manhattan Fish
            <span className="block text-[#D4A843]">&amp; Chicken</span>
          </h1>

          <p className="mt-4 text-lg font-medium text-white/90 sm:text-xl">
            Fresh Fish, Poultry &amp; Seafood Market
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Fresh fish, poultry &amp; seafood — buy it raw or we&apos;ll fry it for you.
            Serving the Detroit metro area from 7 locations.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4A843] px-8 py-4 text-lg font-bold text-[#1a1a1a] shadow-lg transition-all duration-200 hover:bg-[#c49a3a] hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
            >
              View Our Menu
            </Link>
            <Link
              href="/locations"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-lg font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 sm:w-auto"
            >
              Find a Location
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z"
              fill="#F5F0E8"
            />
          </svg>
        </div>
      </section>

      {/* ── What We Offer ────────────────────────────────── */}
      <section className="bg-[#F5F0E8] py-20 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Headline + 25 years */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#2ABFBF]">
              Serving Metro Detroit for 25+ Years
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">
              Fresh Fish, Poultry &amp; Seafood Market
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1a1a1a]/60">
              Buy it raw or we&apos;ll fry it for you — fresh fish, poultry, seafood, dairy, grains, bread, and frozen veggies &amp; fruits. Open every day, including all holidays.
            </p>
          </div>

          {/* Two cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Fresh Market */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#1a1a1a]/5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2ABFBF] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a]">Fresh Market</h3>
              </div>
              <p className="text-[#1a1a1a]/70">
                Fresh fish, poultry, and seafood. Plus dairy, grains, bread, and frozen vegetables &amp; fruits. All raw and fresh meat priced daily.
              </p>
              <Link
                href="/locations"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#2ABFBF] hover:underline"
              >
                Visit a Location &rarr;
              </Link>
            </div>

            {/* We'll Fry It */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#1a1a1a]/5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D32F2F] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a]">We&apos;ll Fry It For You</h3>
              </div>
              <p className="text-[#1a1a1a]/70">
                Buy it raw or have us fry it up fresh for a small fee. Fish plates, chicken wings, shrimp, family meals &amp; more.
              </p>
              <Link
                href="/menu"
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#D32F2F] hover:underline"
              >
                View Our Menu &rarr;
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-center">
            <div>
              <p className="text-4xl font-extrabold text-[#2ABFBF]">25+</p>
              <p className="mt-1 text-sm font-medium text-[#1a1a1a]/50">Years</p>
            </div>
            <div className="h-10 w-px bg-[#1a1a1a]/10" />
            <div>
              <p className="text-4xl font-extrabold text-[#D32F2F]">7</p>
              <p className="mt-1 text-sm font-medium text-[#1a1a1a]/50">Locations</p>
            </div>
            <div className="h-10 w-px bg-[#1a1a1a]/10" />
            <div>
              <p className="text-4xl font-extrabold text-[#D4A843]">365</p>
              <p className="mt-1 text-sm font-medium text-[#1a1a1a]/50">Days Open</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Order Banner ──────────────────────────── */}
      <CallBanner />

      {/* ── Locations Preview ────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">
              7 Locations Across Metro Detroit
            </h2>
            <p className="mt-3 text-[#1a1a1a]/60">
              Find the Manhattan Fish &amp; Chicken nearest you
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full bg-[#2ABFBF] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#229e9e] hover:shadow-xl hover:-translate-y-0.5"
            >
              View All Locations
            </Link>
          </div>
        </div>
      </section>

      {/* ── JSON-LD Structured Data ──────────────────────── */}
      <JsonLd data={jsonLdData} />
    </>
  );
}
