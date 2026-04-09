import { ImageResponse } from 'next/og'

export const alt =
  'Manhattan Fish & Chicken — Fresh Fish, Poultry & Seafood Market'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1FA3A3 0%, #2ABFBF 50%, #1FA3A3 100%)',
          padding: '60px',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '4px',
            background: '#D4A843',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        />

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          Manhattan Fish &amp; Chicken
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: '30px',
            color: '#F5F0E8',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Fresh Fish, Poultry &amp; Seafood Market
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '4px',
            background: '#D4A843',
            borderRadius: '2px',
            marginBottom: '32px',
          }}
        />

        {/* Info line */}
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#F5F0E8',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          7 Locations &nbsp;|&nbsp; Metro Detroit &nbsp;|&nbsp; 25+ Years
        </div>
      </div>
    ),
    { ...size }
  )
}
