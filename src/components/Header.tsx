'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/locations', label: 'Locations' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <Link
            href="/locations"
            className="rounded-full bg-[#2ABFBF] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#229e9e]"
          >
            Call to Order
          </Link>
        </nav>

        {/* Mobile: Call + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/locations"
            className="rounded-full bg-[#2ABFBF] px-4 py-1.5 text-xs font-bold text-white"
          >
            Call Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1a1a1a] transition-colors hover:bg-[#F5F0E8]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
        </nav>
      )}
    </header>
  )
}
