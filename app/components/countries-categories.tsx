"use client";

import Image from "next/image";
import Link from "next/link";

const COUNTRIES = [
  {
    id: 1,
    title: "GERMAN",
    flag: "https://flagcdn.com/w320/de.png",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "BMW",
        logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png",
      },
      {
        name: "Mercedes",
        logo: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
      },
      {
        name: "Porsche",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Audi",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
    ],
  },
  {
    id: 2,
    title: "JAPANESE",
    flag: "https://flagcdn.com/w320/jp.png",
    image:
      "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "Toyota",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Honda",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Lexus",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Nissan",
        logo: "https://www.carlogos.org/car-logos/nissan-logo-2020-black.png",
      },
    ],
  },
  {
    id: 3,
    title: "AMERICAN",
    flag: "https://flagcdn.com/w320/us.png",
    image:
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?q=80&w=2074&auto=format&fit=crop",
    brands: [
      {
        name: "Ford",
        logo: "https://www.carlogos.org/car-logos/ford-logo-2017.png",
      },
      {
        name: "Chevrolet",
        logo: "https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png",
      },
      {
        name: "Tesla",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Dodge",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
    ],
  },
  {
    id: 4,
    title: "ITALIAN",
    flag: "https://flagcdn.com/w320/it.png",
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "Ferrari",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Lamborghini",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Maserati",
        logo: "https://www.carlogos.org/car-logos/maserati-logo-2020.png",
      },
      {
        name: "Alfa Romeo",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
    ],
  },
  {
    id: 5,
    title: "BRITISH",
    flag: "https://flagcdn.com/w320/gb.png",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "Aston Martin",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Jaguar",
        logo: "https://www.carlogos.org/car-logos/jaguar-logo-2012.png",
      },
      {
        name: "Bentley",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "McLaren",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
    ],
  },
  {
    id: 6,
    title: "FRENCH",
    flag: "https://flagcdn.com/w320/fr.png",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "Renault",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Peugeot",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Citroën",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Bugatti",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
    ],
  },
  {
    id: 7,
    title: "KOREAN",
    flag: "https://flagcdn.com/w320/kr.png",
    image:
      "https://images.unsplash.com/photo-1669030508915-fd2e10daa9b3?q=80&w=2070&auto=format&fit=crop",
    brands: [
      {
        name: "Hyundai",
        logo: "https://www.carlogos.org/car-logos/hyundai-logo-2011.png",
      },
      {
        name: "Kia",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "Genesis",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "SsangYong",
        logo: "https://www.carlogos.org/car-logos/ssangyong-logo.png",
      },
    ],
  },
  {
    id: 8,
    title: "CHINESE",
    flag: "https://flagcdn.com/w320/cn.png",
    image:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2069&auto=format&fit=crop",
    brands: [
      {
        name: "BYD",
        logo: "https://www.carlogos.org/car-logos/byd-logo.png",
      },
      {
        name: "Geely",
        logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      },
      {
        name: "NIO",
        logo: "https://www.carlogos.org/car-logos/nio-logo.png",
      },
      {
        name: "Great Wall",
        logo: "https://www.carlogos.org/car-logos/great-wall-logo.png",
      },
    ],
  },
];

export function CountriesCategories() {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Cars by Countries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COUNTRIES.map((country) => (
            <div
              key={country.id}
              className="bg-zinc-800 rounded-xl overflow-hidden group"
            >
              {/* Header with flag and country name */}
              <div className="px-6 py-4 flex items-center gap-3 border-b border-zinc-700">
                <div className="w-8 h-6 relative rounded overflow-hidden">
                  <Image
                    src={country.flag}
                    alt={`${country.title} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {country.title} CARS
                </h3>
              </div>

              {/* Background Image */}
              <div className="relative h-48">
                <Image
                  src={country.image}
                  alt={country.title}
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-800" />
              </div>

              {/* Brands Grid */}
              <div className="p-6 grid grid-cols-2 gap-4">
                {country.brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={`/brands/${brand.name.toLowerCase()}`}
                    className="group/brand bg-zinc-700/50 hover:bg-zinc-700 rounded-lg p-4 transition-all duration-300"
                  >
                    <div className="relative h-12 w-full mb-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain brightness-0 invert opacity-75 group-hover/brand:opacity-100 transition-opacity"
                      />
                    </div>
                    <p className="text-white/80 text-sm text-center group-hover/brand:text-white">
                      {brand.name}
                    </p>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="px-6 py-4 border-t border-zinc-700">
                <Link
                  href={`/country/${country.title.toLowerCase()}`}
                  className="text-white/70 hover:text-white text-sm flex justify-between items-center group/link"
                >
                  <span>View all {country.title} cars</span>
                  <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
