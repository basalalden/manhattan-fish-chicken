'use client'

import { trackCall, trackGetDirections, trackMenuPdf } from '@/lib/analytics'

export function TrackedCallButton({
  phone,
  phoneRaw,
  locationName,
  className,
  children,
}: {
  phone: string
  phoneRaw: string
  locationName: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={`tel:${phoneRaw}`}
      onClick={() => trackCall(locationName, phone)}
      className={className}
    >
      {children || phone}
    </a>
  )
}

export function TrackedDirectionsButton({
  address,
  locationName,
  className,
  children,
}: {
  address: string
  locationName: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackGetDirections(locationName)}
      className={className}
    >
      {children}
    </a>
  )
}

export function TrackedMenuPdfLink({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href="/manhattan-fish-chicken-menu.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackMenuPdf()}
      className={className}
    >
      {children}
    </a>
  )
}
