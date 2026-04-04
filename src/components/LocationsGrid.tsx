'use client'

import { useState } from 'react'
import LocationCard from '@/components/LocationCard'
import ZipSearch from '@/components/ZipSearch'
import type { Location } from '@/data/locations'
import { trackUseMyLocation } from '@/lib/analytics'

export default function LocationsGrid({ locations }: { locations: Location[] }) {
  const [sorted, setSorted] = useState<Location[]>(locations)
  const [locating, setLocating] = useState(false)
  const [found, setFound] = useState(false)
  const [error, setError] = useState('')

  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3959
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }

  function handleUseMyLocation() {
    trackUseMyLocation()
    if (!navigator.geolocation) {
      setError('Geolocation not supported on this browser')
      return
    }
    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        setFound(true)
        const result = [...locations]
          .map((loc) => ({
            loc,
            dist: getDistance(pos.coords.latitude, pos.coords.longitude, loc.coordinates.lat, loc.coordinates.lng),
          }))
          .sort((a, b) => a.dist - b.dist)
          .map((item) => item.loc)
        setSorted(result)
      },
      () => {
        setLocating(false)
        setError('Could not get your location. Try entering a zip code below.')
      }
    )
  }

  function handleReset() {
    setFound(false)
    setError('')
    setSorted(locations)
  }

  return (
    <>
      {/* GPS Banner */}
      {!found && (
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#2ABFBF] to-[#1FA3A3] p-8 text-center shadow-lg">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Find Your Nearest Location
          </h2>
          <p className="mt-2 text-white/80">
            We&apos;ll sort all locations by distance from you
          </p>
          <button
            onClick={handleUseMyLocation}
            disabled={locating}
            className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-[#2ABFBF] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {locating ? 'Finding you...' : 'Use My Location'}
          </button>
          {error && (
            <p className="mt-3 text-sm text-white/80">{error}</p>
          )}
          <p className="mt-4 text-sm text-white/50">
            or search by zip code below
          </p>
        </div>
      )}

      {/* Found banner */}
      {found && (
        <div className="mb-10 flex items-center justify-center gap-3 rounded-2xl bg-green-50 p-4">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <p className="text-sm font-semibold text-green-700">Sorted by nearest to you</p>
          <button
            onClick={handleReset}
            className="text-sm text-green-600 underline hover:text-green-800"
          >
            Reset
          </button>
        </div>
      )}

      {/* Zip Search (secondary) */}
      <div className="mb-10">
        <ZipSearch
          locations={locations}
          onSort={setSorted}
          onReset={handleReset}
        />
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((location) => (
          <LocationCard key={location.slug} location={location} />
        ))}
      </div>
    </>
  )
}
