"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [focused, setFocused] = useState<string | null>(null);
  const [make, setMake] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const makes = [
    "Audi",
    "BMW",
    "Chevrolet",
    "Dodge",
    "Ferrari",
    "Ford",
    "Honda",
    "Hyundai",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Mazda",
    "Mercedes-Benz",
    "Nissan",
    "Porsche",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];

  return (
    <div className="w-full border-4  mb-4 border-white rounded-3xl bg-[#2563EB] py-8 md:py-12 flex flex-col items-center justify-center">
      <h2 className="text-sm md:text-2xl md:font-semibold text-white mb-6 md:mb-8">
        FIND THE PERFECT COLLECTOR CAR
      </h2>

      <div className="w-full max-w-5xl flex flex-wrap justify-center gap-4 px-4">
        {/* Makes Dropdown */}
        <div className="w-full max-w-xs">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className={cn(
              "w-full px-4 py-4 rounded-md border-0 bg-white text-gray-700 text-base appearance-none",
              "transition-all duration-300 ease-in-out",
              focused === "make" ? "ring-2 ring-black" : ""
            )}
            onFocus={() => setFocused("make")}
            onBlur={() => setFocused(null)}
          >
            <option value="">Makes</option>
            {makes.map((makeName) => (
              <option key={makeName} value={makeName.toLowerCase()}>
                {makeName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          {/* Start Year */}
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className={cn(
              "w-24 md:w-32 px-4 py-4 rounded-l-md border-0 bg-white text-gray-700 text-base appearance-none",
              "transition-all duration-300 ease-in-out",
              focused === "startYear" ? "ring-2 ring-black" : ""
            )}
            onFocus={() => setFocused("startYear")}
            onBlur={() => setFocused(null)}
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* TO label */}
          <div className="bg-white px-4 py-4 text-gray-700 font-medium">TO</div>

          {/* End Year */}
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className={cn(
              "w-24 md:w-32 px-4 py-4 rounded-r-md border-0 bg-white text-gray-700 text-base appearance-none",
              "transition-all duration-300 ease-in-out",
              focused === "endYear" ? "ring-2 ring-black" : ""
            )}
            onFocus={() => setFocused("endYear")}
            onBlur={() => setFocused(null)}
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Find It Now Button */}
        <button
          type="button"
          className="bg-black text-white font-bold px-8 py-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          FIND IT NOW!
        </button>
      </div>

      {/* View All Vehicles Button */}
      <button
        type="button"
        className="mt-8 hidden md:block bg-white bg-opacity-10 text-white font-medium px-8 py-3 rounded-md hover:bg-opacity-20 transition-colors"
      >
        VIEW ALL VEHICLE LISTINGS
      </button>
    </div>
  );
}
