import Link from 'next/link'
import type { Location } from '@/data/locations'
import { getOpenStatus } from '@/lib/hours'
import { TrackedCallButton } from '@/components/TrackedLinks'

export default function LocationCard({ location }: { location: Location }) {
  const isComingSoon = location.badge === 'Coming Soon'
  const status = isComingSoon ? null : getOpenStatus(location.hours)

  return (
    <div className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#1a1a1a]/5 transition-all duration-300 hover:shadow-lg hover:ring-[#2ABFBF]/30 hover:-translate-y-1">
      {/* Name + badge */}
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-lg font-bold text-[#1a1a1a]">{location.name}</h3>
        {location.badge && (
          <span className="rounded-full bg-[#2ABFBF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {location.badge}
          </span>
        )}
      </div>
      {!isComingSoon && (
        <p className="text-sm font-medium text-[#1a1a1a]/70">{location.crossStreets}</p>
      )}

      {/* Open/Closed indicator */}
      <div className="mt-3 flex h-5 items-center gap-2">
        {isComingSoon ? (
          <>
            <span
              className="h-2 w-2 rounded-full bg-[#D4A843]"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold text-[#B8912E]">Coming Soon</span>
          </>
        ) : status ? (
          <>
            <span
              className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
              aria-hidden="true"
            />
            <span
              className={`text-xs font-semibold ${status.isOpen ? 'text-green-700' : 'text-red-600'}`}
            >
              {status.isOpen ? 'Open Now' : 'Closed'}
            </span>
            <span className="text-xs text-[#1a1a1a]/60">
              — Today: {status.todayHours}
            </span>
          </>
        ) : null}
      </div>

      {/* Address */}
      {!isComingSoon && (
        <p className="mt-3 text-sm text-[#1a1a1a]/80">{location.address}</p>
      )}

      {/* Big call button */}
      {isComingSoon ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#D4A843]/20 px-5 py-3 text-base font-bold text-[#B8912E]">
          Coming Soon
        </div>
      ) : (
        <TrackedCallButton
          phone={location.phone}
          phoneRaw={location.phoneRaw}
          locationName={location.name}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#2ABFBF] px-5 py-3 text-base font-bold text-white transition-colors hover:bg-[#229e9e]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {location.phone}
        </TrackedCallButton>
      )}

      {/* Details link */}
      {!isComingSoon && (
        <Link
          href={`/locations/${location.slug}`}
          className="mt-3 block text-center text-xs font-semibold text-[#1FA3A3] transition-colors hover:text-[#2ABFBF] group-hover:underline"
        >
          View Details &rarr;
        </Link>
      )}
    </div>
  )
}
