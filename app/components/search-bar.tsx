"use client";

import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Car,
  Calendar,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [focused, setFocused] = useState<string | null>(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [type, setType] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const handleSearch = () => {
    // Create search params object
    const searchParams = {
      make: make,
      model: model,
      startYear: startYear,
      endYear: endYear,
      type: type,
    };

    // Log the search parameters for now
    console.log("Searching with params:", searchParams);
    // TODO: Implement actual search functionality
  };

  const carTypes = [
    "HATCHBACK",
    "SEDAN",
    "KOMBI",
    "COUPE",
    "SPORTS",
    "LIMOUSINE",
    "SUV",
    "CONVERTIBLE",
    "PICKUP",
    "OFF-ROAD",
    "BUS",
    "CLASSIC",
    "CAMPERS",
  ];

  return (
    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-full max-w-3xl px-4">
      <div className="mx-auto bg-white rounded-2xl shadow-lg p-4 w-full">
        <div className="space-y-4">
          {/* Make and Model */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Car className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Make"
                className={cn(
                  "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black text-sm",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "make" ? "border-blue-500" : "border-gray-100"
                )}
                onFocus={() => setFocused("make")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
                className={cn(
                  "w-full px-3 py-2 rounded-lg border-2 bg-white text-black text-sm",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "model" ? "border-blue-500" : "border-gray-100"
                )}
                onFocus={() => setFocused("model")}
                onBlur={() => setFocused(null)}
              />
            </div>
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black text-sm appearance-none",
                  "transition-all duration-300 ease-in-out",
                  focused === "startYear"
                    ? "border-blue-500"
                    : "border-gray-100"
                )}
                onFocus={() => setFocused("startYear")}
                onBlur={() => setFocused(null)}
              >
                <option value="">From Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border-2 bg-white text-black text-sm appearance-none",
                  "transition-all duration-300 ease-in-out",
                  focused === "endYear" ? "border-blue-500" : "border-gray-100"
                )}
                onFocus={() => setFocused("endYear")}
                onBlur={() => setFocused(null)}
              >
                <option value="">To Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Settings2 className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={cn(
                "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black text-sm appearance-none",
                "transition-all duration-300 ease-in-out",
                focused === "type" ? "border-blue-500" : "border-gray-100"
              )}
              onFocus={() => setFocused("type")}
              onBlur={() => setFocused(null)}
            >
              <option value="">Select Type</option>
              {carTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Find it now Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full px-4 py-3 rounded-lg font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Find it now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
