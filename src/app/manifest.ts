import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manhattan Fish & Chicken',
    short_name: 'Manhattan F&C',
    description: 'Fresh Fish Market & Carry-Out Restaurant — 7 locations in Metro Detroit',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2ABFBF',
    icons: [
      {
        src: '/icon-mark.png',
        sizes: '1280x1280',
        type: 'image/png',
      },
    ],
  }
}
