import type { Metadata } from 'next'
import Link from 'next/link'
import { locations } from '@/data/locations'
import { getOpenStatus } from '@/lib/hours'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Design Preview — Detroit Diner direction',
  description: 'Internal design preview. Not for public consumption.',
  robots: { index: false, follow: false },
}

/* ── Design tokens for this mock ─────────────────────────────
 * brick     — deep red, primary
 * mustard   — warm gold, secondary
 * coffee    — dark warm brown, ink
 * cream     — warm off-white, background
 * cream-deep — slightly deeper cream, cards
 * ──────────────────────────────────────────────────────────── */

const BRICK = '#A23B23'
const BRICK_DARK = '#7A2A18'
const MUSTARD = '#C6952D'
const MUSTARD_DARK = '#8E6A1F'
const COFFEE = '#2E1F18'
const COFFEE_LIGHT = '#6F5A4E'
const CREAM = '#FBF6EC'
const CREAM_DEEP = '#F1E6D0'

export default function PreviewHome() {
  const callable = locations.filter((l) => l.badge !== 'Coming Soon')

  return (
    <div
      className="font-sans"
      style={{ background: CREAM, color: COFFEE }}
    >
      {/* ── Preview banner ──────────────────────────────── */}
      <div
        className="sticky top-0 z-50 border-b px-4 py-2 text-center text-xs"
        style={{
          background: COFFEE,
          color: CREAM,
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <span className="font-display italic">Design preview</span>
        <span className="mx-2 opacity-40">·</span>
        <span>&ldquo;Detroit Diner&rdquo; direction — not production</span>
        <span className="mx-2 opacity-40">·</span>
        <Link href="/" className="underline decoration-dotted underline-offset-2">
          back to live site
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 pb-24 pt-20 sm:pb-32 sm:pt-28"
        style={{ background: CREAM }}
      >
        {/* Decorative paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Decorative asymmetric brushstroke */}
        <svg
          className="absolute -right-20 top-24 hidden h-64 w-64 opacity-10 md:block"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={BRICK}
            strokeWidth="3"
            strokeDasharray="8 14"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider"
            style={{
              borderColor: MUSTARD,
              color: MUSTARD_DARK,
              background: `${MUSTARD}1A`,
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: MUSTARD }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: MUSTARD }}
              />
            </span>
            OPEN ON ALL HOLIDAYS · 7 LOCATIONS
          </div>

          <h1
            className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ color: COFFEE }}
          >
            Fresh Fish &amp; Chicken,
            <br />
            <span
              className="italic"
              style={{ color: BRICK }}
            >
              the Detroit way.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg sm:text-xl"
            style={{ color: COFFEE_LIGHT }}
          >
            A family fish market frying it fresh since 2001. Buy it raw or
            we&apos;ll fry it for you — open every day, even the holidays.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: BRICK }}
            >
              View the menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5"
              style={{
                borderColor: COFFEE,
                color: COFFEE,
              }}
            >
              Find a location
            </Link>
          </div>
        </div>

        {/* Decorative stamp */}
        <div
          className="absolute bottom-8 right-4 hidden rotate-[-8deg] text-center leading-none md:block"
          aria-hidden="true"
        >
          <div
            className="rounded-sm border-2 px-3 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ borderColor: BRICK, color: BRICK }}
          >
            Est. 2001
          </div>
        </div>
      </section>

      {/* ── Social proof strip ──────────────────────────── */}
      <section
        className="border-y px-4 py-8"
        style={{
          background: COFFEE,
          color: CREAM,
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 text-center sm:gap-16">
          <div>
            <div
              className="font-display text-4xl font-black sm:text-5xl"
              style={{ color: MUSTARD }}
            >
              25<span className="text-2xl">+</span>
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Years open
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: 'rgba(255,255,255,0.15)' }} aria-hidden="true" />
          <div>
            <div className="font-display text-4xl font-black sm:text-5xl" style={{ color: MUSTARD }}>
              7
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Metro Detroit
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: 'rgba(255,255,255,0.15)' }} aria-hidden="true" />
          <div>
            <div className="font-display text-4xl font-black sm:text-5xl" style={{ color: MUSTARD }}>
              365
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Days a year
            </div>
          </div>
          <div className="h-10 w-px hidden sm:block" style={{ background: 'rgba(255,255,255,0.15)' }} aria-hidden="true" />
          <div>
            <div className="font-display text-4xl font-black italic sm:text-5xl" style={{ color: MUSTARD }}>
              Family
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Owned &amp; run
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular dishes ──────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div
                className="mb-2 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: MUSTARD_DARK }}
              >
                What people order
              </div>
              <h2
                className="font-display text-4xl font-black sm:text-5xl"
                style={{ color: COFFEE }}
              >
                Customer favorites
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4 sm:inline-flex"
              style={{ color: BRICK }}
            >
              Full menu
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <DishCard
              name="Whiting Fish Plate"
              blurb="Four golden-fried fillets, hand-breaded, crispy edges. With fries."
              price="8.49"
              badge="Most popular"
              gradientFrom="#E5A947"
              gradientTo="#6B3A0F"
            />
            <DishCard
              name="10pc Wings"
              blurb="Whole wings, tossed in Honey BBQ, Spicy BBQ, Honey Garlic, or Buffalo."
              price="14.99"
              badge="Customer favorite"
              gradientFrom="#C54A1F"
              gradientTo="#5A1A07"
            />
            <DishCard
              name="Family Meal #2"
              blurb="10pc fish · 10pc chicken · 10pc shrimp — feeds the whole table."
              price="39.99"
              badge="Great for 4+"
              gradientFrom="#D08543"
              gradientTo="#3E1E0E"
            />
          </div>
        </div>
      </section>

      {/* ── Buy raw or fried ────────────────────────────── */}
      <section
        className="px-4 py-20 sm:py-24"
        style={{ background: CREAM_DEEP }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureBlock
              label="The market"
              title="Buy it raw."
              body="Fresh fish, poultry, and seafood priced daily. Plus dairy, grains, bread, and frozen veggies — everything to build dinner at home."
              accent={BRICK}
            />
            <FeatureBlock
              label="The fry station"
              title="Or we'll fry it."
              body="Pick your cut and have it fried up hot — fish plates, chicken wings, shrimp baskets, family meals. Ready when you pull in."
              accent={MUSTARD_DARK}
            />
          </div>
        </div>
      </section>

      {/* ── Our story ───────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
            style={{
              background: `linear-gradient(135deg, ${MUSTARD} 0%, ${BRICK} 60%, ${COFFEE} 100%)`,
            }}
            aria-hidden="true"
          >
            {/* Simulated vintage photo feel */}
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='.6'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 font-display italic text-white/90">
              (photo placeholder: storefront or family behind counter)
            </div>
          </div>
          <div>
            <div
              className="mb-2 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: MUSTARD_DARK }}
            >
              Our story
            </div>
            <h2
              className="font-display text-4xl font-black leading-tight sm:text-5xl"
              style={{ color: COFFEE }}
            >
              A Detroit fish market,
              <br />
              <span className="italic" style={{ color: BRICK }}>
                done right.
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg" style={{ color: COFFEE_LIGHT }}>
              <p>
                We opened our first counter on the east side in 2001 with one rule:
                fresh fish, fresh oil, fresh every day. Twenty-five years later, that
                hasn&apos;t changed.
              </p>
              <p>
                Seven locations across Metro Detroit. Same family. Same recipes.
                Same people frying your order the way they&apos;d fry it for their own.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div
                className="h-px w-12"
                style={{ background: BRICK }}
                aria-hidden="true"
              />
              <div
                className="font-display text-sm italic"
                style={{ color: COFFEE_LIGHT }}
              >
                — The Manhattan family
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations preview ───────────────────────────── */}
      <section
        className="px-4 py-20"
        style={{ background: COFFEE, color: CREAM }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div
              className="mb-2 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: MUSTARD }}
            >
              Find us
            </div>
            <h2 className="font-display text-4xl font-black sm:text-5xl">
              Seven spots across Metro Detroit
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {callable.map((loc) => {
              const status = getOpenStatus(loc.hours)
              return (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group relative overflow-hidden rounded-sm border p-5 transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold" style={{ color: CREAM }}>
                      {loc.name}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: status.isOpen
                          ? 'rgba(34,197,94,0.2)'
                          : 'rgba(239,68,68,0.2)',
                        color: status.isOpen ? '#86efac' : '#fca5a5',
                      }}
                    >
                      {status.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider opacity-60">
                    {loc.crossStreets}
                  </p>
                  <p className="mt-3 text-sm opacity-80">{loc.address}</p>
                  <p
                    className="mt-3 font-display text-lg font-bold"
                    style={{ color: MUSTARD }}
                  >
                    {loc.phone}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Big CTA ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 py-24 text-center"
        style={{ background: BRICK, color: CREAM }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-black italic sm:text-6xl">
            Hungry yet?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Call your nearest location. We&apos;ll have it hot when you get here.
          </p>
          <Link
            href="/locations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold shadow-xl transition-all hover:-translate-y-0.5"
            style={{ color: BRICK }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
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
            Find your nearest
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ── Components ───────────────────────────────────────── */

function DishCard({
  name,
  blurb,
  price,
  badge,
  gradientFrom,
  gradientTo,
}: {
  name: string
  blurb: string
  price: string
  badge?: string
  gradientFrom: string
  gradientTo: string
}) {
  return (
    <article
      className="group overflow-hidden rounded-sm transition-all hover:-translate-y-1"
      style={{ background: 'white' }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='.7'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23g)'/%3E%3C/svg%3E\")",
          }}
        />
        {badge && (
          <div
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: CREAM, color: COFFEE }}
          >
            {badge}
          </div>
        )}
        <div className="absolute bottom-3 right-3 font-display text-xs italic text-white/70">
          (photo placeholder)
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="font-display text-xl font-bold leading-tight"
            style={{ color: COFFEE }}
          >
            {name}
          </h3>
          <div
            className="shrink-0 font-display text-xl font-black"
            style={{ color: BRICK }}
          >
            ${price}
          </div>
        </div>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: COFFEE_LIGHT }}
        >
          {blurb}
        </p>
      </div>
    </article>
  )
}

function FeatureBlock({
  label,
  title,
  body,
  accent,
}: {
  label: string
  title: string
  body: string
  accent: string
}) {
  return (
    <div
      className="relative overflow-hidden rounded-sm bg-white p-8 sm:p-10"
    >
      <div
        className="absolute left-0 top-0 h-1 w-20"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div
        className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {label}
      </div>
      <h3
        className="font-display text-3xl font-black italic sm:text-4xl"
        style={{ color: COFFEE }}
      >
        {title}
      </h3>
      <p
        className="mt-4 text-base leading-relaxed sm:text-lg"
        style={{ color: COFFEE_LIGHT }}
      >
        {body}
      </p>
    </div>
  )
}
