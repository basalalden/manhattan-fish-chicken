'use client'

import Link from "next/link";
import type { Location } from "@/data/locations";
import { trackCall } from "@/lib/analytics";

function getOpenStatus(hours: Location['hours']): { isOpen: boolean; todayHours: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const h of hours) {
    const days = h.days.toLowerCase();
    let matches = false;

    if (days.includes('sunday') && day === 0) matches = true;
    if (days.includes('monday') && day === 1) matches = true;
    if (days.includes('tuesday') && day === 2) matches = true;
    if (days.includes('wednesday') && day === 3) matches = true;
    if (days.includes('thursday') && day === 4) matches = true;
    if (days.includes('friday') && day === 5) matches = true;
    if (days.includes('saturday') && day === 6) matches = true;

    // Handle ranges like "Monday–Saturday" or "Monday–Sunday"
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const rangeMatch = days.match(/(\w+)\s*[–-]\s*(\w+)/);
    if (rangeMatch) {
      const startIdx = dayNames.indexOf(rangeMatch[1].toLowerCase());
      const endIdx = dayNames.indexOf(rangeMatch[2].toLowerCase());
      if (startIdx !== -1 && endIdx !== -1) {
        if (startIdx <= endIdx) {
          matches = day >= startIdx && day <= endIdx;
        } else {
          matches = day >= startIdx || day <= endIdx;
        }
      }
    }

    if (matches) {
      const openMin = parseTime(h.open);
      const closeMin = parseTime(h.close);
      const isOpen = closeMin > openMin
        ? currentMinutes >= openMin && currentMinutes < closeMin
        : currentMinutes >= openMin || currentMinutes < closeMin; // handles past midnight
      return { isOpen, todayHours: `${h.open} – ${h.close}` };
    }
  }

  return { isOpen: false, todayHours: 'Closed today' };
}

function parseTime(t: string): number {
  const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hrs = parseInt(match[1]);
  const mins = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hrs !== 12) hrs += 12;
  if (ampm === 'AM' && hrs === 12) hrs = 0;
  return hrs * 60 + mins;
}

export default function LocationCard({ location }: { location: Location }) {
  const { isOpen, todayHours } = getOpenStatus(location.hours);

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
      <p className="text-sm font-medium text-[#1a1a1a]/50">{location.crossStreets}</p>

      {/* Open/Closed indicator */}
      <div className="mt-3 flex items-center gap-2">
        {location.badge === 'Coming Soon' ? (
          <>
            <span className="h-2 w-2 rounded-full bg-[#D4A843]" />
            <span className="text-xs font-semibold text-[#D4A843]">Coming Soon</span>
          </>
        ) : (
          <>
            <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className={`text-xs font-semibold ${isOpen ? 'text-green-600' : 'text-red-400'}`}>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
            <span className="text-xs text-[#1a1a1a]/40">
              — Today: {todayHours}
            </span>
          </>
        )}
      </div>

      {/* Address */}
      <p className="mt-3 text-sm text-[#1a1a1a]/70">{location.address}</p>

      {/* Big call button */}
      {location.badge === 'Coming Soon' ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#D4A843]/20 px-5 py-3 text-base font-bold text-[#D4A843]">
          Coming Soon
        </div>
      ) : (
        <a
          href={`tel:${location.phoneRaw}`}
          onClick={() => trackCall(location.name, location.phone)}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#2ABFBF] px-5 py-3 text-base font-bold text-white transition-colors hover:bg-[#229e9e]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {location.phone}
        </a>
      )}

      {/* Details link */}
      <Link
        href={`/locations/${location.slug}`}
        className="mt-3 block text-center text-xs font-semibold text-[#2ABFBF] transition-colors hover:text-[#229e9e] group-hover:underline"
      >
        View Details &rarr;
      </Link>
    </div>
  );
}
