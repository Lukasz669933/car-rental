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
    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 w-full max-w-2xl px-4">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-3 w-full">
        <div className="space-y-3">
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
                  "w-full pl-8 pr-2 py-1.5 rounded-lg border-2 bg-white text-black font-medium text-base",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "make" ? "border-blue-500" : "border-gray-100"
                )}
              />
              {showMakeSuggestions && (
                <div
                  className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto z-10"
                  style={{
                    height: `${
                      Math.min(
                        make ? filteredMakes.length : CAR_MAKES.length,
                        4
                      ) * 40
                    }px`,
                  }}
                >
                  {(make ? filteredMakes : CAR_MAKES).map((carMake) => (
                    <div
                      key={carMake.name}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0 flex items-center justify-between"
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
                  "w-full px-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-base",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  !make && "bg-gray-50 cursor-not-allowed",
                  focused === "model" ? "border-blue-500" : "border-gray-100"
                )}
              />
              {showModelSuggestions && make && filteredModels.length > 0 && (
                <div
                  className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto z-10"
                  style={{
                    height: `${Math.min(filteredModels.length, 4) * 40}px`,
                  }}
                >
                  {filteredModels.map((carModel) => (
                    <div
                      key={carModel}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
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
              )}
            </div>
          </div>

          {/* Year Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={startYear}
                readOnly
                placeholder="From Year"
                onClick={() => setFocused("startYear")}
                className={cn(
                  "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-base cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "startYear"
                    ? "border-blue-500"
                    : "border-gray-100"
                )}
              />
              {focused === "startYear" && (
                <div
                  className="absolute bottom-full mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto z-10"
                  style={{
                    height: `${Math.min(4, years.length) * 40}px`,
                  }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                      onClick={() => {
                        setStartYear(year.toString());
                        setFocused(null);
                      }}
                    >
                      <span className="text-gray-900 font-medium">{year}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                value={endYear}
                readOnly
                placeholder="To Year"
                onClick={() => setFocused("endYear")}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-base cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  "placeholder:text-gray-400",
                  focused === "endYear" ? "border-blue-500" : "border-gray-100"
                )}
              />
              {focused === "endYear" && (
                <div
                  className="absolute bottom-full mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto z-10"
                  style={{
                    height: `${Math.min(4, years.length) * 40}px`,
                  }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                      onClick={() => {
                        setEndYear(year.toString());
                        setFocused(null);
                      }}
                    >
                      <span className="text-gray-900 font-medium">{year}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Settings2 className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={type}
              readOnly
              placeholder="Select Type"
              onClick={() => setFocused("type")}
              className={cn(
                "w-full pl-9 pr-3 py-2 rounded-lg border-2 bg-white text-black font-medium text-base cursor-pointer",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-gray-400",
                focused === "type" ? "border-blue-500" : "border-gray-100"
              )}
            />
            {focused === "type" && (
              <div
                className="absolute bottom-full mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto z-10"
                style={{
                  height: `${Math.min(4, carTypes.length) * 40}px`,
                }}
              >
                {carTypes.map((carType) => (
                  <div
                    key={carType}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                    onClick={() => {
                      setType(carType.toLowerCase());
                      setFocused(null);
                    }}
                  >
                    <span className="text-gray-900 font-medium">{carType}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Find it now Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Find it now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
