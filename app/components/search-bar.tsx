"use client";

import { useState } from "react";
import { MapPin, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false); // Toggle for modal on small screens
  const [focused, setFocused] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const SearchForm = () => (
    <div className="space-y-4">
      {/* Location Field */}
      <div className="space-y-1 md:space-y-2 md:hidden">
        <label className="block text-blue-500 text-sm font-medium">
          Location
        </label>
        <div className="relative group">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused(null)}
            placeholder="Find Location"
            className={cn(
              "w-full pl-10 pr-4 py-2 md:py-3 rounded-full border-2 bg-white text-black",
              "transition-all duration-300 ease-in-out",
              "placeholder:text-gray-400",
              focused === "location"
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-gray-100 group-hover:border-gray-200"
            )}
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {/* Location Field */}
        <div className="space-y-1 md:space-y-2 hidden md:block">
          <label className="block text-blue-500 text-sm font-medium">
            Location
          </label>
          <div className="relative group">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused(null)}
              placeholder="Find Location"
              className={cn(
                "w-full pl-10 pr-4 py-2 md:py-3 rounded-full border-2 bg-white text-black",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-gray-400",
                focused === "location"
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 group-hover:border-gray-200"
              )}
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* Start Year Field */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-blue-500 text-sm font-medium">
            From Year
          </label>
          <div className="relative group">
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              onFocus={() => setFocused("startYear")}
              onBlur={() => setFocused(null)}
              className={cn(
                "w-full px-4 py-2 md:py-3 rounded-full border-2 bg-white appearance-none text-black",
                "transition-all duration-300 ease-in-out",
                focused === "startYear"
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 group-hover:border-gray-200"
              )}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* End Year Field */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-blue-500 text-sm font-medium">
            To Year
          </label>
          <div className="relative group">
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              onFocus={() => setFocused("endYear")}
              onBlur={() => setFocused(null)}
              className={cn(
                "w-full px-4 py-2 md:py-3 rounded-full border-2 bg-white appearance-none text-black",
                "transition-all duration-300 ease-in-out",
                focused === "endYear"
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 group-hover:border-gray-200"
              )}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Make Field */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-blue-500 text-sm font-medium">
            Make
          </label>
          <div className="relative group">
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              onFocus={() => setFocused("make")}
              onBlur={() => setFocused(null)}
              placeholder="Enter Make"
              className={cn(
                "w-full px-4 py-2 md:py-3 rounded-full border-2 bg-white text-black",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-gray-400",
                focused === "make"
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 group-hover:border-gray-200"
              )}
            />
          </div>
        </div>

        {/* Model Field */}
        <div className="space-y-1 md:space-y-2">
          <label className="block text-blue-500 text-sm font-medium">
            Model
          </label>
          <div className="relative group">
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onFocus={() => setFocused("model")}
              onBlur={() => setFocused(null)}
              placeholder="Enter Model"
              className={cn(
                "w-full px-4 py-2 md:py-3 rounded-full border-2 bg-white text-black",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-gray-400",
                focused === "model"
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 group-hover:border-gray-200"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Desktop: Full Search Bar */}
      <div className="hidden md:block bg-white rounded-3xl shadow-lg p-8">
        <SearchForm />
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-4 rounded-full font-medium 
                   transition-all duration-300 hover:bg-blue-600 
                   flex items-center justify-center gap-2 group mt-6"
        >
          Search now
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Mobile: Compact Trigger + Modal */}
      <div className="md:hidden">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full bg-white text-blue-500 py-3 rounded-full font-medium 
                   border-2 border-blue-500 shadow-md
                   flex items-center justify-center gap-2 
                   transition-all duration-300 hover:bg-blue-50"
        >
          <Search className="h-5 w-5" />
          Search Filters
        </button>

        {/* Modal/Dropdown */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)} // Close on backdrop click
          >
            <div
              className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className=" flex  justify-end ">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className=" text-gray-500   hover:text-gray-800"
                >
                  X
                </button>
              </div>
              <SearchForm />
              <button
                type="button"
                onClick={() => setIsOpen(false)} // Close after search (or submit logic here)
                className="w-full bg-blue-500 text-white py-3 rounded-full font-medium 
                         transition-all duration-300 hover:bg-blue-600 
                         flex items-center justify-center gap-2 group mt-4"
              >
                Search now
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
