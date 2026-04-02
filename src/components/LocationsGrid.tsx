'use client'

import { useState } from 'react'
import LocationCard from '@/components/LocationCard'
import ZipSearch from '@/components/ZipSearch'
import type { Location } from '@/data/locations'

export default function LocationsGrid({ locations }: { locations: Location[] }) {
  const [sorted, setSorted] = useState<Location[]>(locations)

  return (
    <>
      {/* Zip Search */}
      <div className="mb-10">
        <ZipSearch
          locations={locations}
          onSort={setSorted}
          onReset={() => setSorted(locations)}
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
