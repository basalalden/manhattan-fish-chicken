'use client'

import { useState } from 'react'
import type { Location } from '@/data/locations'
import { trackUseMyLocation } from '@/lib/analytics'

// Approximate distance using Haversine formula
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // miles
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

// Approximate zip code center coordinates for Metro Detroit area
// This is a simple lookup — covers major zip codes in the area
const ZIP_COORDS: Record<string, [number, number]> = {
  // Detroit
  '48201': [42.346, -83.056], '48202': [42.375, -83.073], '48203': [42.406, -83.107],
  '48204': [42.364, -83.130], '48205': [42.433, -82.982], '48206': [42.383, -83.107],
  '48207': [42.350, -83.018], '48208': [42.347, -83.095], '48209': [42.303, -83.116],
  '48210': [42.331, -83.128], '48211': [42.382, -83.047], '48212': [42.410, -83.061],
  '48213': [42.398, -83.017], '48214': [42.368, -82.995], '48215': [42.387, -82.948],
  '48216': [42.327, -83.081], '48217': [42.273, -83.152], '48218': [42.271, -83.133],
  '48219': [42.430, -83.255], '48220': [42.460, -83.145], '48221': [42.428, -83.153],
  '48223': [42.396, -83.248], '48224': [42.410, -82.949], '48225': [42.434, -82.924],
  '48226': [42.331, -83.046], '48227': [42.390, -83.192], '48228': [42.357, -83.212],
  '48229': [42.265, -83.154], '48230': [42.380, -82.910], '48233': [42.332, -83.050],
  '48234': [42.433, -83.067], '48235': [42.428, -83.192], '48236': [42.414, -82.890],
  '48238': [42.389, -83.137], '48239': [42.393, -83.275], '48240': [42.392, -83.296],
  // Suburbs
  '48009': [42.546, -83.212], '48012': [42.546, -83.212], '48017': [42.548, -83.149],
  '48021': [42.471, -82.949], '48025': [42.524, -83.268], '48026': [42.471, -82.945],
  '48030': [42.481, -83.103], '48033': [42.474, -83.288], '48034': [42.498, -83.248],
  '48035': [42.508, -82.910], '48036': [42.523, -82.913], '48037': [42.474, -83.288],
  '48038': [42.513, -82.937], '48066': [42.507, -82.937], '48067': [42.462, -83.125],
  '48068': [42.462, -83.125], '48069': [42.481, -83.103], '48070': [42.488, -83.182],
  '48071': [42.487, -83.102], '48073': [42.516, -83.185], '48075': [42.460, -83.222],
  '48076': [42.491, -83.222], '48080': [42.460, -82.889], '48081': [42.479, -82.889],
  '48082': [42.509, -82.889], '48083': [42.527, -83.122], '48084': [42.530, -83.170],
  '48085': [42.552, -83.122], '48086': [42.460, -83.222], '48088': [42.540, -82.933],
  '48089': [42.455, -82.970], '48091': [42.455, -83.020], '48092': [42.509, -83.027],
  '48093': [42.514, -83.056], '48098': [42.527, -83.170],
  // Dearborn / Dearborn Heights
  '48120': [42.302, -83.240], '48121': [42.302, -83.214], '48124': [42.302, -83.240],
  '48125': [42.277, -83.275], '48126': [42.322, -83.177], '48127': [42.328, -83.278],
  '48128': [42.317, -83.253],
  // Farmington / Farmington Hills
  '48331': [42.506, -83.378], '48332': [42.486, -83.378], '48333': [42.486, -83.378],
  '48334': [42.506, -83.345], '48335': [42.462, -83.378], '48336': [42.462, -83.378],
  // Livonia / Redford
  '48150': [42.368, -83.353], '48151': [42.368, -83.353], '48152': [42.398, -83.377],
  '48153': [42.368, -83.353], '48154': [42.388, -83.353],
}

interface ZipSearchProps {
  locations: Location[]
  onSort: (sorted: Location[]) => void
  onReset: () => void
}

export default function ZipSearch({ locations, onSort, onReset }: ZipSearchProps) {
  const [zip, setZip] = useState('')
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [locating, setLocating] = useState(false)

  function sortByCoords(lat: number, lng: number, label: string) {
    const sorted = [...locations]
      .map((loc) => ({
        loc,
        dist: getDistance(lat, lng, loc.coordinates.lat, loc.coordinates.lng),
      }))
      .sort((a, b) => a.dist - b.dist)
      .map((item) => item.loc)

    setError('')
    setSearched(true)
    setZip(label)
    onSort(sorted)
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
        sortByCoords(pos.coords.latitude, pos.coords.longitude, 'My Location')
      },
      () => {
        setLocating(false)
        setError('Could not get your location. Try entering a zip code.')
      }
    )
  }

  function handleSearch() {
    const cleaned = zip.trim()
    if (!/^\d{5}$/.test(cleaned)) {
      setError('Enter a 5-digit zip code')
      return
    }

    const coords = ZIP_COORDS[cleaned]
    if (!coords) {
      setError('Zip code not in our service area — showing all locations')
      setSearched(false)
      onReset()
      return
    }

    sortByCoords(coords[0], coords[1], cleaned)
  }

  function handleReset() {
    setZip('')
    setError('')
    setSearched(false)
    onReset()
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip === 'My Location' ? '' : zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ''))
            setError('')
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter your zip code"
          className="flex-1 rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-base text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:border-[#2ABFBF] focus:outline-none focus:ring-2 focus:ring-[#2ABFBF]/20"
        />
        <button
          onClick={handleSearch}
          className="rounded-xl bg-[#2ABFBF] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#229e9e]"
        >
          Find
        </button>
      </div>
      {error && (
        <p className="mt-2 text-center text-sm text-red-400">{error}</p>
      )}
      {searched && !error && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <p className="text-sm text-[#2ABFBF] font-medium">Sorted by nearest to {zip === 'My Location' ? 'you' : zip}</p>
          <button
            onClick={handleReset}
            className="text-sm text-[#1a1a1a]/40 underline hover:text-[#1a1a1a]/70"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}
