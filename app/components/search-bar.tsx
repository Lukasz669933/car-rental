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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Handle scroll to expand search
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-full max-w-3xl px-4">
      <div
        className={cn(
          "mx-auto bg-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "w-full" : " w-[160px] hover:w-full",
          "group"
        )}
      >
        {/* Main Search Bar */}
        <div className="relative flex items-center p-3">
          {/* Search Icon */}
          <div
            className={cn(
              "absolute left-3 transition-all duration-300",
              isExpanded ? "opacity-100" : "opacity-100 group-hover:opacity-100"
            )}
          >
            <Search className="h-5 w-5 ml-3 text-blue-500" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for cars..."
            className={cn(
              "w-full pl-10 pr-24 py-2 rounded-xl outline-none border-2 bg-white text-black",
              "transition-all duration-300 ease-in-out",
              "placeholder:text-gray-400",
              focused === "search" ? "border-blue-500" : "border-gray-100"
            )}
            onFocus={() => {
              setFocused("search");
              setIsExpanded(true);
            }}
            onBlur={() => setFocused(null)}
          />

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "absolute right-3 px-3 mr-3 py-1.5 rounded-lg font-medium text-sm",
              "transition-all duration-300 flex items-center gap-2",
              showFilters
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span
              className={cn(
                "transition-all duration-300 ",
                isExpanded ? "opacity-100" : " group-hover:opacity-100"
              )}
            >
              Filters
            </span>
          </button>
        </div>

        {/* Filters Section */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            showFilters ? "max-h-80" : "max-h-0"
          )}
        >
          <div className="p-4 pt-0 space-y-4">
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
                    focused === "endYear"
                      ? "border-blue-500"
                      : "border-gray-100"
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
          </div>
        </div>
      </div>
    </div>
  );
}
