import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center">
      {/* 404 badge */}
      <span className="inline-block rounded-full bg-[#2ABFBF]/10 px-4 py-1.5 text-sm font-semibold text-[#2ABFBF] mb-6">
        404
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-4">
        Page Not Found
      </h1>

      <p className="text-lg text-[#1a1a1a]/60 max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[#2ABFBF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1FA3A3] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-lg bg-[#D32F2F] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B71C1C] transition-colors"
        >
          View Menu
        </Link>
        <Link
          href="/locations"
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#D4A843] px-6 py-3 text-sm font-semibold text-[#D4A843] hover:bg-[#D4A843] hover:text-white transition-colors"
        >
          Find a Location
        </Link>
      </div>
    </section>
  )
}
