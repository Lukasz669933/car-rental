"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  Car,
  Calendar,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Car makes and models data
const CAR_MAKES = [
  {
    name: "Toyota",
    models: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
  },
  { name: "BMW", models: ["3 Series", "5 Series", "X3", "X5", "M3", "M5"] },
  { name: "Mercedes", models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"] },
  { name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"] },
  { name: "Ford", models: ["F-150", "Mustang", "Explorer", "Escape", "Edge"] },
  { name: "Audi", models: ["A3", "A4", "A6", "Q3", "Q5", "Q7"] },
  { name: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
  { name: "Lexus", models: ["RX", "NX", "ES", "IS", "GX"] },
  { name: "Chevrolet", models: ["Silverado", "Equinox", "Malibu", "Tahoe"] },
  { name: "Porsche", models: ["911", "Cayenne", "Macan", "Panamera"] },
];

export function SearchBar() {
  const [focused, setFocused] = useState<string | null>(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [type, setType] = useState("");
  const [showMakeSuggestions, setShowMakeSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const makeRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  // Filter makes based on input
  const filteredMakes = CAR_MAKES.filter((carMake) =>
    carMake.name.toLowerCase().includes(make.toLowerCase())
  );

  // Get models for selected make
  const availableModels =
    CAR_MAKES.find(
      (carMake) => carMake.name.toLowerCase() === make.toLowerCase()
    )?.models || [];

  // Filter models based on input
  const filteredModels = availableModels.filter((carModel) =>
    carModel.toLowerCase().includes(model.toLowerCase())
  );

  // Handle click outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (makeRef.current && !makeRef.current.contains(event.target as Node)) {
        setShowMakeSuggestions(false);
      }
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setShowModelSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div className="relative" ref={makeRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Car className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                onFocus={() => {
                  setFocused("make");
                  setShowMakeSuggestions(true);
                }}
                placeholder="Select Make"
                className={cn(
                  "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-sm",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "make" ? "border-blue-500" : "border-gray-100"
                )}
              />
              {showMakeSuggestions && (
                <>
                  <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setShowMakeSuggestions(false)}
                  />
                  <div
                    className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto z-50"
                    style={{
                      height: `${
                        Math.min(
                          make ? filteredMakes.length : CAR_MAKES.length,
                          4
                        ) * 46
                      }px`,
                    }}
                  >
                    {(make ? filteredMakes : CAR_MAKES).map((carMake) => (
                      <div
                        key={carMake.name}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0 flex items-center justify-between"
                        onClick={() => {
                          setMake(carMake.name);
                          setShowMakeSuggestions(false);
                          setModel(""); // Reset model when make changes
                        }}
                      >
                        <span className="text-gray-900 font-medium">
                          {carMake.name}
                        </span>
                        <span className="text-gray-600 text-xs">
                          ({carMake.models.length})
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="relative" ref={modelRef}>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                onFocus={() => {
                  setFocused("model");
                  if (make) setShowModelSuggestions(true);
                }}
                placeholder={make ? "Select Model" : "First Select Make"}
                disabled={!make}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-sm",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  !make && "bg-gray-50 cursor-not-allowed",
                  focused === "model" ? "border-blue-500" : "border-gray-100"
                )}
              />
              {showModelSuggestions && make && filteredModels.length > 0 && (
                <>
                  <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setShowModelSuggestions(false)}
                  />
                  <div
                    className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto z-50"
                    style={{
                      height: `${Math.min(filteredModels.length, 4) * 46}px`,
                    }}
                  >
                    {filteredModels.map((carModel) => (
                      <div
                        key={carModel}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                        onClick={() => {
                          setModel(carModel);
                          setShowModelSuggestions(false);
                        }}
                      >
                        <span className="text-gray-900 font-medium">
                          {carModel}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
