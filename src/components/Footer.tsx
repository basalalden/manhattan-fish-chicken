import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon-mark.png"
                alt="Manhattan Fish & Chicken"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full"
              />
              <p className="text-xl font-extrabold tracking-tight">
                Manhattan{' '}
                <span className="text-[#2ABFBF]">Fish</span>
                {' & '}
                <span className="text-[#D32F2F]">Chicken</span>
              </p>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Fresh Fish Market & Carry-Out Restaurant
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2ABFBF]/15 px-3 py-1.5 text-xs font-semibold text-[#2ABFBF]">
              Open on All Holidays!
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-white/70 hover:text-white">Home</Link></li>
              <li><Link href="/menu" className="text-sm text-white/70 hover:text-white">Menu</Link></li>
              <li><Link href="/locations" className="text-sm text-white/70 hover:text-white">Locations</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
              Order by Phone
            </h3>
            <p className="text-sm text-white/60">
              No online ordering — call your nearest location to place an order!
            </p>
            <Link
              href="/locations"
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#2ABFBF] hover:underline"
            >
              Find Your Location &rarr;
            </Link>
          </div>

          {/* Delivery & Payment */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
              Delivery Partners
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">DoorDash</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">UberEats</span>
            </div>
            <h3 className="mb-2 mt-4 text-sm font-bold uppercase tracking-widest text-white/40">
              Payment
            </h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Visa</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Mastercard</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Amex</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Manhattan Fish & Chicken. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
