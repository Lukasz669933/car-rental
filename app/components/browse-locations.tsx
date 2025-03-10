"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const CAR_TYPES = [
  {
    id: 1,
    name: "SEDANS",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "SUVS",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "TRUCKS",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "VANS",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "ELECTRIC VEHICLES",
    subtitle: "(EV)",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "HYBRIDS",
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2942&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "PLUG-IN HYBRIDS",
    subtitle: "(PHEV)",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "HATCHBACKS",
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2942&auto=format&fit=crop",
  },
];

export function BrowseLocations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hidden md:block py-16">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Top-rated cars by type
        </h2>

        <div className="relative group">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CAR_TYPES.map((type) => (
              <Link
                key={type.id}
                href={`/cars/${type.name.toLowerCase()}`}
                className="flex-none w-[150px] group/item transition-all duration-300 hover:w-[270px]"
              >
                <div className=" overflow-hidden bg-white h-full">
                  <div className="relative rounded-xl h-[350px] w-full overflow-hidden">
                    <Image
                      src={type.image || "/placeholder.svg"}
                      alt={type.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center py-4 px-2">
                    <h3 className="font-medium text-sm tracking-wide">
                      {type.name}
                      {type.subtitle && (
                        <span className="block text-sm text-gray-600 mt-0.5">
                          {type.subtitle}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
