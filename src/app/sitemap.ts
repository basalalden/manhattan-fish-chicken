import type { MetadataRoute } from 'next'
import { locations } from '@/data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const locationPages = locations.map((loc) => ({
    url: `https://www.manhattanchicken.com/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.manhattanchicken.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.manhattanchicken.com/menu',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.manhattanchicken.com/locations',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...locationPages,
  ]
}
