"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  {
    id: 1,
    title: "German",
    flag: "https://flagcdn.com/w320/de.png",
  },
  {
    id: 2,
    title: "Japanese",
    flag: "https://flagcdn.com/w320/jp.png",
  },
  {
    id: 3,
    title: "American",
    flag: "https://flagcdn.com/w320/us.png",
  },
  {
    id: 4,
    title: "Italian",
    flag: "https://flagcdn.com/w320/it.png",
  },
  {
    id: 5,
    title: "British",
    flag: "https://flagcdn.com/w320/gb.png",
  },
  {
    id: 6,
    title: "French",
    flag: "https://flagcdn.com/w320/fr.png",
  },
  {
    id: 7,
    title: "Korean",
    flag: "https://flagcdn.com/w320/kr.png",
  },
  {
    id: 8,
    title: "Chinese",
    flag: "https://flagcdn.com/w320/cn.png",
  },
];

export function CountriesCategories() {
  const [showAll, setShowAll] = useState(false);
  const displayedCountries = showAll ? COUNTRIES : COUNTRIES.slice(0, 12);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Country</h2>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedCountries.map((country) => (
            <Link
              key={country.id}
              href={`/country/${country.title.toLowerCase()}`}
              className="relative bg-white border border-gray-400 rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="relative w-12 h-12">
                <Image
                  src={country.flag}
                  alt={country.title}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <span className="text-lg font-medium">{country.title}</span>
            </Link>
          ))}
        </div>

        {/* See More Button */}
        {COUNTRIES.length > 12 && (
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
        )}
      </div>
    </section>
  );
}
