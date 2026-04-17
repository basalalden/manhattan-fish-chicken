export const NEAREST_SLUG_KEY = 'mfc-nearest-slug'

export function saveNearestSlug(slug: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(NEAREST_SLUG_KEY, slug)
  } catch {
    // localStorage unavailable (privacy mode, etc.) — silently ignore
  }
}
