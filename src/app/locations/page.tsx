import type { Metadata } from 'next'
import LocationsGrid from '@/components/LocationsGrid'
import CallBanner from '@/components/CallBanner'
import JsonLd from '@/components/JsonLd'
import { locations } from '@/data/locations'

export const metadata: Metadata = {
  title: 'Locations | Manhattan Fish & Chicken — 7 Locations in Metro Detroit',
  description:
    'Find a Manhattan Fish & Chicken near you. 7 locations in Roseville, Farmington Hills, Redford, Southfield, Ferndale, Detroit, and Dearborn Heights. Fresh fish market and carry-out restaurant.',
  keywords: [
    'Manhattan Fish and Chicken locations',
    'fish restaurant near me',
    'Detroit fish market',
    'Metro Detroit seafood',
  ],
}

export default function LocationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': locations.map((loc) => ({
      '@type': 'Restaurant',
      name: `Manhattan Fish & Chicken — ${loc.name}`,
      telephone: loc.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address.split(',')[0],
        addressLocality: loc.city,
        addressRegion: 'MI',
        postalCode: loc.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: loc.coordinates.lat,
        longitude: loc.coordinates.lng,
      },
      url: `https://www.manhattanchicken.com/locations/${loc.slug}`,
      servesCuisine: ['Seafood', 'American', 'Soul Food'],
      priceRange: '$$',
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero Header */}
      <section className="bg-[#1a1a1a] py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold text-[#F5F0E8] md:text-5xl">
            Our Locations
          </h1>
          <p className="mt-4 text-lg text-[#D4A843]">
            7 locations serving Metro Detroit
          </p>
          <p className="mt-2 text-sm text-white/60">
            Open daily including all holidays!
          </p>
        </div>
      </section>

      {/* Locations Grid with Zip Search */}
      <section className="bg-[#F5F0E8] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <LocationsGrid locations={locations} />
        </div>
      </section>

      {/* Delivery Note */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">
            Delivery Available
          </h2>
          <p className="mt-4 text-[#1a1a1a]/70">
            Can&apos;t make it in? Order delivery through our partners:
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-lg font-semibold text-[#2ABFBF]">
            <span>DoorDash</span>
            <span className="text-[#1a1a1a]/20">|</span>
            <span>UberEats</span>
          </div>
          <p className="mt-3 text-sm text-[#1a1a1a]/50">
            Availability varies by location. Check each app for details.
          </p>
        </div>
      </section>

      <CallBanner />
    </>
  )
}
