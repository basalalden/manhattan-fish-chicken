import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MenuSection from '@/components/MenuSection'
import MenuNav from '@/components/MenuNav'
import CallBanner from '@/components/CallBanner'
import JsonLd from '@/components/JsonLd'
import { menuCategories } from '@/data/menu'

export const metadata: Metadata = {
  title: 'Menu | Manhattan Fish & Chicken — Fresh Fish Market & Carry-Out',
  description:
    'Full menu for Manhattan Fish & Chicken. Fresh fish plates, chicken wings, shrimp, family meals, combos, sides, and more. 7 locations in Metro Detroit. Call to order!',
  keywords: [
    'fish menu',
    'chicken menu',
    'Detroit fish restaurant',
    'carry out menu',
    'fish plates',
    'chicken wings',
    'seafood menu',
    'Manhattan Fish and Chicken menu',
  ],
  openGraph: {
    title: 'Menu | Manhattan Fish & Chicken',
    description:
      'Fresh fish plates, chicken wings, shrimp, family meals & more. View our full menu and call to order!',
    url: 'https://www.manhattanchicken.com/menu',
    siteName: 'Manhattan Fish & Chicken',
    type: 'website',
  },
}

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Manhattan Fish & Chicken Menu',
  description:
    'Full menu for Manhattan Fish & Chicken fresh fish market and carry-out restaurant',
  url: 'https://www.manhattanchicken.com/manhattan-fish-chicken-menu.pdf',
  hasMenuSection: [
    {
      '@type': 'MenuSection',
      name: 'Fish Plates',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Whiting (4pc)', offers: { '@type': 'Offer', price: '8.49', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Catfish (4pc)', offers: { '@type': 'Offer', price: '8.49', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Ocean Perch (4pc)', offers: { '@type': 'Offer', price: '8.49', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Tilapia (4pc)', offers: { '@type': 'Offer', price: '8.49', priceCurrency: 'USD' } },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Whole Wings or Dark Meat',
      hasMenuItem: [
        { '@type': 'MenuItem', name: '5pc Wings', offers: { '@type': 'Offer', price: '8.99', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: '10pc Wings', offers: { '@type': 'Offer', price: '14.99', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: '50pc Wings', offers: { '@type': 'Offer', price: '74.99', priceCurrency: 'USD' } },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Family Meals',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Family Meal 1 (8pc Fish + Large Fries)', offers: { '@type': 'Offer', price: '16.99', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Family Meal 2 (10pc Fish + 10pc Chicken + 10pc Shrimp)', offers: { '@type': 'Offer', price: '39.99', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Family Meal 3 (20pc Fish + 20pc Chicken + 20pc Shrimp)', offers: { '@type': 'Offer', price: '69.99', priceCurrency: 'USD' } },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Fish & Chicken Combo',
      hasMenuItem: [
        { '@type': 'MenuItem', name: '4 Wings & 5 Shrimp', offers: { '@type': 'Offer', price: '12.99', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: '3 Pc Fish & 4 Wings', offers: { '@type': 'Offer', price: '13.99', priceCurrency: 'USD' } },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Sides',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Fries (Sm)', offers: { '@type': 'Offer', price: '3.49', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Mac & Cheese (Sm)', offers: { '@type': 'Offer', price: '3.49', priceCurrency: 'USD' } },
        { '@type': 'MenuItem', name: 'Collard Greens (Sm)', offers: { '@type': 'Offer', price: '3.49', priceCurrency: 'USD' } },
      ],
    },
  ],
}

const sectionGroups = [
  { heading: 'Specials', ids: ['our-specials', 'family-meals', 'lunch-specials', 'dinner-specials', 'monday-thursday-specials'] },
  { heading: 'Fish & Seafood', ids: ['fish-plates', 'fish-bucket', 'shrimp', 'oyster', 'lobster-crab'] },
  { heading: 'Chicken', ids: ['whole-wings', 'flavored-wing-dings', 'jumbo-popcorn-chicken', 'tenders', 'chicken-gizzard'] },
  { heading: 'Combos', ids: ['fish-chicken-combo'] },
  { heading: 'Appetizers', ids: ['appetizers'] },
  { heading: 'Sides', ids: ['sides'] },
  { heading: 'Desserts & Beverages', ids: ['desserts-beverages'] },
]

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuJsonLd} />

      {/* ── Page Header ──────────────────────────────────── */}
      <header className="bg-[#1a1a1a] pb-8 pt-16 text-center sm:pb-12 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Menu
          </h1>
          <p className="mt-3 text-lg text-[#F5F0E8]/80">
            Fresh fish, chicken, shrimp &amp; more — made to order
          </p>
          <p className="mt-2 text-sm text-[#D4A843]">
            Prices subject to market change. Plus tax.
          </p>
          <a
            href="/manhattan-fish-chicken-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4A843] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#c0963b]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View / Download PDF Menu
          </a>
        </div>
      </header>

      {/* ── Menu Images ──────────────────────────────────── */}
      <section className="bg-[#F5F0E8] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/menu-page-1.jpg"
                alt="Manhattan Fish & Chicken Menu — Front: Locations, Specials, Lunch & Dinner Deals"
                width={4608}
                height={2798}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/menu-page-2.jpg"
                alt="Manhattan Fish & Chicken Menu — Back: Fish Plates, Chicken Wings, Shrimp, Sides, Appetizers"
                width={4608}
                height={2798}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Category Nav ──────────────────────────── */}
      <MenuNav />

      {/* ── Full Text Menu ───────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="space-y-14">
          {sectionGroups.map((group) => {
            const categories = group.ids
              .map((id) => menuCategories.find((c) => c.id === id))
              .filter(Boolean)

            if (categories.length === 0) return null

            return (
              <div key={group.heading}>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="shrink-0 text-sm font-bold uppercase tracking-widest text-[#D4A843]">
                    {group.heading}
                  </h2>
                  <div className="h-px flex-1 bg-[#D4A843]/20" />
                </div>

                <div className="space-y-10">
                  {categories.map((cat) => (
                    <MenuSection key={cat!.id} category={cat!} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Notes Section ────────────────────────────────── */}
        <aside className="mt-16 rounded-2xl border border-[#D4A843]/20 bg-[#F5F0E8] p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-bold text-[#1a1a1a]">
            Good to Know
          </h3>
          <ul className="space-y-2.5 text-sm text-[#1a1a1a]/80 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
              All raw and fresh meat pricing are subject to market change
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
              Open on All Holidays!
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
              We Deliver — available through DoorDash and UberEats
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
              Available Sauces: Honey BBQ, Spicy BBQ, Honey Garlic, Buffalo
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
              Payment: Visa, Mastercard, American Express accepted
            </li>
          </ul>
        </aside>

        {/* ── Bottom PDF link ─────────────────────────────── */}
        <div className="mt-10 text-center">
          <a
            href="/manhattan-fish-chicken-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2ABFBF] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#229e9e]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View / Download PDF Menu
          </a>
        </div>
      </main>

      <CallBanner />
    </>
  )
}
