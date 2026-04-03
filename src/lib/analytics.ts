declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(action: string, params: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

export function trackCall(locationName: string, phone: string) {
  trackEvent('call_click', {
    event_category: 'engagement',
    event_label: locationName,
    phone_number: phone,
  })
}

export function trackMenuPdf() {
  trackEvent('menu_pdf_open', {
    event_category: 'engagement',
    event_label: 'PDF Menu',
  })
}

export function trackGetDirections(locationName: string) {
  trackEvent('get_directions', {
    event_category: 'engagement',
    event_label: locationName,
  })
}

export function trackUseMyLocation() {
  trackEvent('use_my_location', {
    event_category: 'engagement',
    event_label: 'GPS Location Finder',
  })
}
