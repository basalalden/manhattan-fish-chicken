import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CallBanner from '@/components/CallBanner'
import JsonLd from '@/components/JsonLd'
import { locations, getLocationBySlug } from '@/data/locations'

export async function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}

  return {
    title: `Manhattan Fish & Chicken ${location.name} — Fresh Fish Market & Carry-Out | ${location.city}, MI`,
    description: `Manhattan Fish & Chicken in ${location.name}. Fresh fish, poultry, seafood market and carry-out restaurant at ${location.address}. Call ${location.phone} to order. Open daily.`,
    keywords: [
      `Manhattan Fish and Chicken ${location.city}`,
      `fish restaurant ${location.city} MI`,
      `seafood ${location.name}`,
      `carry out ${location.city}`,
    ],
    openGraph: {
      title: `Manhattan Fish & Chicken — ${location.name}`,
      description: `Fresh fish market & carry-out at ${location.address}. Call ${location.phone}`,
      url: `https://www.manhattanchicken.com/locations/${location.slug}`,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) notFound()

  const otherLocations = locations.filter((loc) => loc.slug !== slug)
  const streetAddress = location.address.split(',')[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `Manhattan Fish & Chicken — ${location.name}`,
    description: `Fresh fish market and carry-out restaurant in ${location.city}, MI. Serving fried fish, shrimp, chicken, and more.`,
    url: `https://www.manhattanchicken.com/locations/${location.slug}`,
    telephone: location.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: location.city,
      addressRegion: 'MI',
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    servesCuisine: ['Seafood', 'American', 'Soul Food'],
    hasMenu: 'https://www.manhattanchicken.com/menu',
    acceptsReservations: false,
    paymentAccepted: 'Visa, Mastercard, American Express',
    priceRange: '$$',
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="bg-[#F5F0E8] px-4 py-3" aria-label="Breadcrumb">
        <div className="mx-auto max-w-6xl">
          <ol className="flex items-center gap-2 text-sm text-[#1a1a1a]/60">
            <li>
              <Link href="/" className="hover:text-[#2ABFBF]">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/locations" className="hover:text-[#2ABFBF]">Locations</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1a1a1a]">{location.name}</li>
          </ol>
        </div>
      </nav>

      {/* Location Header */}
      <section className="bg-[#1a1a1a] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-extrabold text-[#F5F0E8] md:text-4xl">
              {location.name}
            </h1>
            {location.badge && (
              <span className="rounded-full bg-[#2ABFBF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {location.badge}
              </span>
            )}
          </div>
          <p className="mt-2 text-base text-white/60">{location.crossStreets}</p>
          <p className="mt-2 text-lg text-[#D4A843]">{location.address}</p>
        </div>
      </section>

      <div className="bg-[#F5F0E8] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column: Details */}
            <div className="space-y-6">
              {/* Click-to-Call */}
              <a
                href={`tel:${location.phoneRaw}`}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#2ABFBF] px-8 py-5 text-xl font-bold text-white shadow-lg transition-all hover:bg-[#229e9e] hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {location.phone}
              </a>

              {/* Hours */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold text-[#1a1a1a]">Hours</h2>
                <table className="w-full">
                  <tbody>
                    {location.hours.map((h, i) => (
                      <tr key={i} className="border-b border-[#F5F0E8] last:border-0">
                        <td className="py-2.5 font-medium text-[#1a1a1a]">{h.days}</td>
                        <td className="py-2.5 text-right text-[#1a1a1a]/70">
                          {h.open} &ndash; {h.close}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-center text-sm font-semibold text-[#2ABFBF]">
                  Open on All Holidays!
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow-md">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                    Available Sauces
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Honey BBQ', 'Spicy BBQ', 'Honey Garlic', 'Buffalo'].map((s) => (
                      <span key={s} className="rounded-full bg-[#F5F0E8] px-3 py-1 text-xs text-[#1a1a1a]">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white p-5 shadow-md">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                    Payment
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F5F0E8] px-3 py-1 text-xs">Visa</span>
                    <span className="rounded-full bg-[#F5F0E8] px-3 py-1 text-xs">Mastercard</span>
                    <span className="rounded-full bg-[#F5F0E8] px-3 py-1 text-xs">Amex</span>
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="rounded-xl bg-white p-5 shadow-md">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                  Delivery Partners
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['DoorDash', 'UberEats'].map((p) => (
                    <span key={p} className="rounded-full bg-[#2ABFBF]/10 px-3 py-1 text-sm font-medium text-[#2ABFBF]">{p}</span>
                  ))}
                </div>
              </div>

              {/* View Menu Link */}
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#D4A843] px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-[#c0963b] hover:shadow-lg"
              >
                View Our Menu
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right Column: Map */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl shadow-md">
                <iframe
                  title={`Map of Manhattan Fish & Chicken ${location.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#2ABFBF] bg-white px-6 py-3 font-bold text-[#2ABFBF] transition-colors hover:bg-[#2ABFBF] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Other Locations */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#1a1a1a]">
            Other Locations
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-xl border border-[#F5F0E8] p-4 transition-all hover:border-[#2ABFBF] hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#2ABFBF]">
                    {loc.name}
                  </h3>
                  {loc.badge && (
                    <span className="rounded-full bg-[#2ABFBF] px-2 py-0.5 text-[9px] font-bold uppercase text-white">{loc.badge}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#1a1a1a]/60">{loc.address}</p>
                <p className="mt-1 text-sm font-medium text-[#2ABFBF]">{loc.phone}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallBanner />
    </>
  )
}
