import type { MenuCategory } from '@/data/menu'

export default function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-28">
      <h2 className="mb-2 border-b-2 border-[#D4A843] pb-2 text-xl font-bold text-[#1a1a1a] sm:text-2xl">
        {category.name}
      </h2>
      {category.description && (
        <p className="mb-4 text-sm text-[#1a1a1a]/50">{category.description}</p>
      )}

      <div className="grid gap-1">
        {category.items.map((item) => (
          <div key={item.name} className="group">
            {/* Item with variants (multi-size pricing) */}
            {item.variants ? (
              <div className="rounded-lg px-3 py-2.5 transition-colors group-hover:bg-[#F5F0E8]">
                <span className="text-[15px] font-medium text-[#1a1a1a] sm:text-base">
                  {item.name}
                </span>
                {item.description && (
                  <span className="ml-2 text-sm text-[#1a1a1a]/50">
                    {item.description}
                  </span>
                )}
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                  {item.variants.map((v) => (
                    <span key={v.label} className="text-sm text-[#1a1a1a]/70">
                      {v.label}{' '}
                      <span className="font-semibold text-[#2ABFBF]">
                        ${v.price}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* Single-price or description-only item */
              <div className="flex items-baseline justify-between gap-2 rounded-lg px-3 py-2.5 transition-colors group-hover:bg-[#F5F0E8]">
                <div className="min-w-0">
                  <span className="text-[15px] font-medium text-[#1a1a1a] sm:text-base">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="ml-2 text-sm text-[#1a1a1a]/50">
                      {item.description}
                    </span>
                  )}
                </div>
                {item.price && (
                  <span className="shrink-0 text-[15px] font-semibold text-[#2ABFBF] sm:text-base">
                    ${item.price}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
