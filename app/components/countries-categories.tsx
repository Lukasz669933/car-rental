"use client";

import Image from "next/image";
import Link from "next/link";

const COUNTRIES = [
  {
    id: 1,
    title: "GERMAN CARS",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
    description: "BMW, Mercedes, Porsche, Audi",
    brands: ["BMW", "Mercedes", "Porsche", "Audi"],
  },
  {
    id: 2,
    title: "JAPANESE CARS",
    image:
      "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=2070&auto=format&fit=crop",
    description: "Toyota, Honda, Lexus, Nissan",
    brands: ["Toyota", "Honda", "Lexus", "Nissan"],
  },
  {
    id: 3,
    title: "AMERICAN CARS",
    image:
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?q=80&w=2074&auto=format&fit=crop",
    description: "Ford, Chevrolet, Tesla, Dodge",
    brands: ["Ford", "Chevrolet", "Tesla", "Dodge"],
  },
];

export function CountriesCategories() {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Cars by Countries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUNTRIES.map((country) => (
            <Link
              key={country.id}
              href={`/country/${country.title.toLowerCase()}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={country.image}
                alt={country.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:opacity-60" />

              {/* Border Frame */}
              <div className="absolute inset-4 border-2 border-white/50 transition-all duration-700 group-hover:inset-6" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="transform translate-y-8 transition-transform duration-700 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-2">{country.title}</h3>
                  <p className="text-white/80 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    {country.description}
                  </p>
                </div>

                <div className="transform translate-y-8 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-block border-b-2 border-white pb-1">
                    View Collection
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
