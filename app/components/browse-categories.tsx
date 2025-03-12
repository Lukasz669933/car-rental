"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CAR_BRANDS = [
  {
    id: 1,
    name: "Toyota",
    logo: "/toyota.png",
    discount: "2K",
  },
  {
    id: 2,
    name: "BMW",
    logo: "/BMW.png",
  },
  {
    id: 3,
    name: "Chevrolet",
    logo: "/chevrolet.png",
  },
  {
    id: 4,
    name: "Honda",
    logo: "/honda.png",
  },
  {
    id: 5,
    name: "Ford",
    logo: "/ford.png",
  },
  {
    id: 6,
    name: "Audi",
    logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
  },
  {
    id: 7,
    name: "Acura",
    logo: "/acura.png",
  },
  {
    id: 8,
    name: "Hyundai",
    logo: "/hyundai.png",
  },
  {
    id: 9,
    name: "Dodge",
    logo: "/dodge.png",
    discount: "1K",
  },
  {
    id: 10,
    name: "Mercedes-Benz",
    logo: "/Mercedes.png",
    discount: "5.5K",
  },
  {
    id: 11,
    name: "Kia",
    logo: "/kia.png",
  },
  {
    id: 12,
    name: "Lexus",
    logo: "/lexus.png",
  },
];

export function BrowseCategories() {
  const [carType, setCarType] = useState<"new" | "used">("new");
  const [showAll, setShowAll] = useState(false);

  const displayedBrands = showAll ? CAR_BRANDS : CAR_BRANDS.slice(0, 12);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Shop your favorite brand
        </h2>

        {/* Toggle between New and Used Cars */}
        {/* <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border overflow-hidden">
            <button
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                carType === "new" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setCarType("new")}
            >
              {carType === "new" && <Check className="mr-2 h-4 w-4 inline" />}
              New Cars
            </button>
            <button
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                carType === "used" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setCarType("used")}
            >
              {carType === "used" && <Check className="mr-2 h-4 w-4 inline" />}
              Used Cars
            </button>
          </div>
        </div> */}

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.name.toLowerCase()}`}
              className="relative bg-white border border-gray-400 rounded-lg shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              {brand.discount && (
                <div className="absolute top-0 left-0 bg-teal-100 text-teal-800 py-1 px-3 rounded-tl-lg rounded-br-lg text-xs font-medium">
                  Save ${brand.discount}
                </div>
              )}
              <div className="relative w-12 h-12">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-medium">{brand.name}</span>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="rounded-full px-8"
            onClick={() => setShowAll(!showAll)}
          >
            See more
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
