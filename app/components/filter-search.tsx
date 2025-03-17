"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Car makes and models data (using existing data from search-bar.tsx)
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
  {
    name: "Nissan",
    models: ["Altima", "Rogue", "Sentra", "Kicks", "Pathfinder"],
  },
];

// Car types
const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Truck",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Hatchback",
];

// Generate years for dropdown
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) =>
  (currentYear - i).toString()
);

export function FilterSearch() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  // Get models for selected make
  const availableModels =
    CAR_MAKES.find((carMake) => carMake.name === make)?.models || [];

  const handleSearch = () => {
    console.log("Searching with params:", {
      make,
      model,
      type,
      startYear,
      endYear,
    });
    // TODO: Implement actual search functionality
  };

  const validateEndDate = (endDate: string) => {
    if (startYear && endDate < startYear) {
      setEndYear("");
    }
  };

  const handleReset = () => {
    setMake("");
    setModel("");
    setType("");
    setStartYear("");
    setEndYear("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 space-y-3">
            {/* Make Dropdown */}
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel(""); // Reset model when make changes
              }}
              className="w-full h-10 px-3 border rounded-md bg-white text-black font-medium text-sm"
              disabled={type !== ""}
            >
              <option value="" disabled>
                Make
              </option>
              {CAR_MAKES.map((carMake) => (
                <option key={carMake.name} value={carMake.name}>
                  {carMake.name}
                </option>
              ))}
            </select>

            {/* Model Dropdown */}
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
              className="w-full h-10 px-3 border rounded-md bg-white text-black font-medium text-sm"
              disabled={!make || type !== ""}
            >
              <option value="" disabled>
                Model
              </option>
              {availableModels.map((modelOption) => (
                <option key={modelOption} value={modelOption}>
                  {modelOption}
                </option>
              ))}
            </select>

            {/* Type Dropdown */}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setMake("");
                setModel("");
                setStartYear("");
                setEndYear("");
              }}
              className="w-full h-10 px-3 border rounded-md bg-white text-black font-medium text-sm"
            >
              <option value="" disabled>
                Type
              </option>
              {CAR_TYPES.map((carType) => (
                <option key={carType} value={carType}>
                  {carType}
                </option>
              ))}
            </select>

            {/* Year Range - 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full h-10 px-3 border rounded-md bg-white text-black font-medium text-sm"
                disabled={type !== ""}
              >
                <option value="" disabled>
                  Start Year
                </option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                  validateEndDate(e.target.value);
                }}
                className="w-full h-10 px-3 border rounded-md bg-white text-black font-medium text-sm"
                disabled={type !== ""}
              >
                <option value="" disabled>
                  End Year
                </option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Search
            </button>
            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Top row: Make, Model, Type */}
          <div className="grid grid-cols-3">
            {/* Make Dropdown */}
            <div className="border-r h-full">
              <select
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel(""); // Reset model when make changes
                }}
                className="w-full h-full px-4 py-6 border-0 bg-white text-black font-medium focus:ring-0 focus:outline-none"
                disabled={type !== ""}
              >
                <option value="" disabled>
                  Make
                </option>
                {CAR_MAKES.map((carMake) => (
                  <option key={carMake.name} value={carMake.name}>
                    {carMake.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div className="border-r h-full">
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                className="w-full h-full px-4 py-6 border-0 bg-white text-black font-medium focus:ring-0 focus:outline-none"
                disabled={!make || type !== ""}
              >
                <option value="" disabled>
                  Model
                </option>
                {availableModels.map((modelOption) => (
                  <option key={modelOption} value={modelOption}>
                    {modelOption}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="h-full">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setMake("");
                  setModel("");
                  setStartYear("");
                  setEndYear("");
                }}
                className="w-full h-full px-4 py-6 border-0 bg-white text-black font-medium focus:ring-0 focus:outline-none"
              >
                <option value="" disabled>
                  Type
                </option>
                {CAR_TYPES.map((carType) => (
                  <option key={carType} value={carType}>
                    {carType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom row: Start Year, End Year, Button */}
          <div className="grid grid-cols-3 border-t">
            {/* Start Year Dropdown */}
            <div className="border-r h-full">
              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full h-full px-4 py-6 border-0 bg-white text-black font-medium focus:ring-0 focus:outline-none"
                disabled={type !== ""}
              >
                <option value="" disabled>
                  Start Year
                </option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* End Year Dropdown */}
            <div className="border-r h-full">
              <select
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                  validateEndDate(e.target.value);
                }}
                className="w-full h-full px-4 py-6 border-0 bg-white text-black font-medium focus:ring-0 focus:outline-none"
                disabled={type !== ""}
              >
                <option value="" disabled>
                  End Year
                </option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex ">
              <button
                onClick={handleSearch}
                className="w-full h-full py-6 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full h-full py-6 bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition-colors border-l"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
