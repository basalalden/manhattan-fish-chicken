import Link from "next/link";

export default function CallBanner() {
  return (
    <section className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] py-16 px-4 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Order?
        </h2>
        <p className="mt-3 text-lg text-white/80">
          Call your nearest location or visit us in person. Fresh fish and hot
          carry-out ready when you are.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 rounded-full bg-[#2ABFBF] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#229e9e] hover:shadow-xl"
          >
            Find Your Location & Call
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-bold text-white transition-all hover:border-white hover:bg-white/10"
          >
            View Our Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
