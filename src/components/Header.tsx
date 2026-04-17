'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState, useSyncExternalStore } from 'react'
import { locations, type Location } from '@/data/locations'
import { trackCall } from '@/lib/analytics'
import { NEAREST_SLUG_KEY } from '@/lib/nearestLocation'

function subscribeNearest(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function readNearestSlug(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(NEAREST_SLUG_KEY)
  } catch {
    return null
  }
}

function readNearestSlugServer(): string | null {
  return null
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/locations', label: 'Locations' },
]

function MobileCallNow({ nearest }: { nearest: Location | null }) {
  if (!nearest) {
    return (
      <Link
        href="/locations"
        className="rounded-full bg-[#2ABFBF] px-4 py-1.5 text-xs font-bold text-white"
      >
        Call Now
      </Link>
    )
  }
  return (
    <a
      href={`tel:${nearest.phoneRaw}`}
      onClick={() => trackCall(nearest.name, nearest.phone)}
      className="flex items-center gap-1 rounded-full bg-[#2ABFBF] px-3 py-1.5 text-xs font-bold text-white"
      aria-label={`Call Manhattan Fish & Chicken ${nearest.name} at ${nearest.phone}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      Call {nearest.name}
    </a>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const slug = useSyncExternalStore(
    subscribeNearest,
    readNearestSlug,
    readNearestSlugServer,
  )
  const nearest = useMemo<Location | null>(() => {
    if (!slug) return null
    const loc = locations.find((l) => l.slug === slug)
    return loc && loc.badge !== 'Coming Soon' ? loc : null
  }, [slug])

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a]/5 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icon-mark.png"
            alt="Manhattan Fish & Chicken"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-[#1a1a1a] sm:text-xl">
            Manhattan{' '}
            <span className="text-[#1FA3A3]">Fish</span>
            {' & '}
            <span className="text-[#D32F2F]">Chicken</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-[#1FA3A3]'
                  : 'text-[#1a1a1a]/80 hover:text-[#1a1a1a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/manhattan-fish-chicken-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#B8912E] transition-colors hover:text-[#9a7a25]"
          >
            PDF Menu
          </a>
          {nearest ? (
            <a
              href={`tel:${nearest.phoneRaw}`}
              onClick={() => trackCall(nearest.name, nearest.phone)}
              className="flex items-center gap-1.5 rounded-full bg-[#2ABFBF] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#229e9e]"
              aria-label={`Call Manhattan Fish & Chicken ${nearest.name} at ${nearest.phone}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call {nearest.name}
            </a>
          ) : (
            <Link
              href="/locations"
              className="rounded-full bg-[#2ABFBF] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#229e9e]"
            >
              Call to Order
            </Link>
          )}
        </nav>

        {/* Mobile: Call + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <MobileCallNow nearest={nearest} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1a1a1a] transition-colors hover:bg-[#F5F0E8]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="border-t border-[#1a1a1a]/5 bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-base font-medium ${
                pathname === link.href
                  ? 'text-[#1FA3A3]'
                  : 'text-[#1a1a1a]/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/manhattan-fish-chicken-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-base font-medium text-[#B8912E]"
          >
            PDF Menu
          </a>
          {nearest && (
            <Link
              href="/locations"
              onClick={() => setMobileOpen(false)}
              className="block border-t border-[#1a1a1a]/5 pt-3 text-sm font-medium text-[#1a1a1a]/70"
            >
              Change location ({nearest.name}) &rarr;
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
