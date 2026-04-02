'use client'

import { useEffect, useState } from 'react'

const navItems = [
  { id: 'our-specials', label: 'Specials' },
  { id: 'family-meals', label: 'Family Meals' },
  { id: 'lunch-specials', label: '$10 Lunch' },
  { id: 'dinner-specials', label: '$14 Dinner' },
  { id: 'monday-thursday-specials', label: 'Mon-Thu' },
  { id: 'fish-plates', label: 'Fish' },
  { id: 'fish-bucket', label: 'Bucket' },
  { id: 'shrimp', label: 'Shrimp' },
  { id: 'lobster-crab', label: 'Lobster/Crab' },
  { id: 'whole-wings', label: 'Wings' },
  { id: 'flavored-wing-dings', label: 'Wing Dings' },
  { id: 'jumbo-popcorn-chicken', label: 'Popcorn' },
  { id: 'tenders', label: 'Tenders' },
  { id: 'fish-chicken-combo', label: 'Combos' },
  { id: 'appetizers', label: 'Apps' },
  { id: 'sides', label: 'Sides' },
  { id: 'desserts-beverages', label: 'Desserts' },
]

export default function MenuNav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    )

    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="menu-nav sticky top-[57px] z-40 border-b border-[#1a1a1a]/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl overflow-x-auto px-4">
        <div className="flex gap-1 py-2.5" role="tablist">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              role="tab"
              aria-selected={activeId === item.id}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeId === item.id
                  ? 'bg-[#2ABFBF] text-white'
                  : 'text-[#1a1a1a]/70 hover:bg-[#F5F0E8] hover:text-[#1a1a1a]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
