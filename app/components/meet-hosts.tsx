import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const SELLERS = [
  {
    id: 1,
    name: "Jessica",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    cars: 12,
    isSuper: true,
  },
  {
    id: 2,
    name: "Squadra",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    cars: 24,
    isSuper: true,
  },
  {
    id: 3,
    name: "Michael",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    cars: 8,
    isSuper: true,
  },
  {
    id: 4,
    name: "Luxury Cars",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop",
    cars: 32,
    isSuper: false,
  },
  {
    id: 5,
    name: "Amanda",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    cars: 5,
    isSuper: false,
  },
  {
    id: 6,
    name: "David",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    cars: 15,
    isSuper: true,
  },
]

export function MeetHosts() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Top Verified Sellers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SELLERS.map((seller) => (
            <Link
              key={seller.id}
              href={`/seller/${seller.id}`}
              className="group relative h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={seller.image || "/placeholder.svg"}
                alt={seller.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                {seller.isSuper && <Badge className="self-start mb-2 bg-blue-600">Verified Seller</Badge>}
                <h3 className="text-white font-semibold text-lg">{seller.name}</h3>
                <p className="text-white/80 text-sm">{seller.cars} cars for sale</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

