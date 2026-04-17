import type { LocationHours } from '@/data/locations'

const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

const CANONICAL_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function parseTimeToMinutes(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!m) return 0
  let h = parseInt(m[1], 10)
  const mins = parseInt(m[2], 10)
  const ampm = m[3].toUpperCase()
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return h * 60 + mins
}

export function time12To24(t: string): string {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!m) return t
  let h = parseInt(m[1], 10)
  const mins = parseInt(m[2], 10)
  const ampm = m[3].toUpperCase()
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export function dayRangeToIndices(days: string): number[] {
  const lower = days.toLowerCase()

  const rangeMatch = lower.match(/([a-z]+)\s*[–-]\s*([a-z]+)/)
  if (rangeMatch) {
    const start = DAY_NAMES.indexOf(rangeMatch[1] as (typeof DAY_NAMES)[number])
    const end = DAY_NAMES.indexOf(rangeMatch[2] as (typeof DAY_NAMES)[number])
    if (start !== -1 && end !== -1) {
      const indices: number[] = []
      if (start <= end) {
        for (let i = start; i <= end; i++) indices.push(i)
      } else {
        for (let i = start; i < 7; i++) indices.push(i)
        for (let i = 0; i <= end; i++) indices.push(i)
      }
      return indices
    }
  }

  const singles: number[] = []
  DAY_NAMES.forEach((d, i) => {
    const re = new RegExp(`\\b${d}\\b`, 'i')
    if (re.test(lower)) singles.push(i)
  })
  return singles
}

export function getDetroitNow(now: Date = new Date()): {
  dayOfWeek: number
  minutes: number
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Detroit',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const weekday =
    parts.find((p) => p.type === 'weekday')?.value.toLowerCase() ?? ''
  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '0'
  const minuteStr = parts.find((p) => p.type === 'minute')?.value ?? '0'
  const hour = parseInt(hourStr, 10) % 24
  const minute = parseInt(minuteStr, 10)
  const dayOfWeek = DAY_NAMES.indexOf(weekday as (typeof DAY_NAMES)[number])
  return { dayOfWeek, minutes: hour * 60 + minute }
}

export interface OpenStatus {
  isOpen: boolean
  todayHours: string
}

export function getOpenStatus(
  hours: LocationHours[],
  now: Date = new Date(),
): OpenStatus {
  const { dayOfWeek, minutes } = getDetroitNow(now)

  for (const h of hours) {
    const indices = dayRangeToIndices(h.days)
    if (!indices.includes(dayOfWeek)) continue
    const openMin = parseTimeToMinutes(h.open)
    const closeMin = parseTimeToMinutes(h.close)
    const isOpen =
      closeMin > openMin
        ? minutes >= openMin && minutes < closeMin
        : minutes >= openMin || minutes < closeMin
    return { isOpen, todayHours: `${h.open} – ${h.close}` }
  }

  return { isOpen: false, todayHours: 'Closed today' }
}

export function daysToSchemaDayOfWeek(days: string): string[] {
  return dayRangeToIndices(days).map((i) => CANONICAL_DAYS[i])
}
