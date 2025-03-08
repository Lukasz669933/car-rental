import Image from "next/image"
import Link from "next/link"

export function AppPromotion() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Find your perfect car</h2>
            <h3 className="text-2xl font-bold mb-4">Buying Experience</h3>
            <p className="text-gray-600 mb-6">Ojest is now available at your fingertip.</p>
            <div className="flex gap-4">
              <Link href="#" className="block">
                <Image
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" className="block">
                <Image
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Google Play"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
              alt="Mobile app screenshot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

