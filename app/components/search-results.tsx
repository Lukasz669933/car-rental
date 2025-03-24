"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, ChevronUp, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CarCard from "./car-card";
import { CARS } from "@/lib/data";
import Image from "next/image";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";

// Custom utility for hiding scrollbars while maintaining scroll functionality
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

// Extend the car data with more entries for pagination
const EXTENDED_CARS = [
  ...CARS,
  ...CARS.map((car) => ({ ...car, id: car.id + 100 })),
  ...CARS.map((car) => ({ ...car, id: car.id + 200 })),
  ...CARS.map((car) => ({ ...car, id: car.id + 300 })),
];

export function SearchResults() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("150");
  const [searchRadius, setSearchRadius] = useState([25]);
  const [engineSize, setEngineSize] = useState("");
  const [transmission, setTransmission] = useState<string[]>([]);
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Track open accordion items
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  // Add these new state variables after the existing state declarations (around line 70)
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);
  const [condition, setCondition] = useState<string[]>([]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([
    0, 200000,
  ]);
  const [drivetrain, setDrivetrain] = useState<string[]>([]);
  const [horsepower, setHorsepower] = useState("");
  const [accident, setAccident] = useState("");
  const [serviceHistory, setServiceHistory] = useState("");
  const [registered, setRegistered] = useState("");

  const itemsPerPage = 12;
  const totalPages = Math.ceil(EXTENDED_CARS.length / itemsPerPage);

  // Initialize pagination variables
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of results
    document
      .getElementById("results-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const handleTransmissionChange = (value: string) => {
    setTransmission((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleFuelTypeChange = (value: string) => {
    setFuelType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Add these handler functions after the existing handler functions (around line 110)
  const handleConditionChange = (value: string) => {
    setCondition((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleDrivetrainChange = (value: string) => {
    setDrivetrain((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle accordion toggle
  const handleAccordionToggle = (value: string) => {
    setOpenAccordionItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Update the clearFilters function to include the new filters (around line 120)
  const clearFilters = () => {
    setMinPrice("0");
    setMaxPrice("150");
    setSearchRadius([25]);
    setEngineSize("");
    setTransmission([]);
    setFuelType([]);
    setLocation("");
    setMake("");
    setModel("");
    setTrim("");
    setYearRange([2000, 2025]);
    setCondition([]);
    setMileageRange([0, 200000]);
    setDrivetrain([]);
    setHorsepower("");
    setAccident("");
    setServiceHistory("");
    setRegistered("");
  };

  // Get current items with sorting
  const filteredItems = [...EXTENDED_CARS];

  // Apply sorting
  if (sortOption === "price-low") {
    filteredItems.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === "price-high") {
    filteredItems.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortOption === "newest") {
    filteredItems.sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  // Update pagination variables after filtering
  indexOfLastItem = currentPage * itemsPerPage;
  indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Add this before the FilterContent component
  const filterContentRef = useRef<HTMLDivElement>(null);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Save scroll position when options are selected
  useEffect(() => {
    if (filterContentRef.current) {
      filterContentRef.current.scrollTop = lastScrollPosition;
    }
  }, [
    lastScrollPosition,
    openAccordionItems,
    make,
    model,
    trim,
    yearRange,
    condition,
    mileageRange,
    drivetrain,
    transmission,
    fuelType,
    engineSize,
    horsepower,
    accident,
    serviceHistory,
    registered,
  ]);

  // Replace the FilterContent component with this updated version that puts all filters in accordions except location
  const FilterContent = () => (
    <div
      className="space-y-6"
      ref={filterContentRef}
      onScroll={(e) => setLastScrollPosition(e.currentTarget.scrollTop)}
    >
      {/* Location - Outside accordion as requested */}
      <div className="space-y-4">
        <h3 className="text-sm md:text-base font-medium">Location</h3>
        <div>
          <label
            htmlFor="location"
            className="md:text-base text-muted-foreground mb-1 block"
          >
            Search Location
          </label>
          <Input
            id="location"
            type="text"
            placeholder="Enter city, state or zip"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="radius" className="text-sm text-muted-foreground">
              Search Radius
            </label>
            <span className="text-sm text-muted-foreground">
              {searchRadius[0]} miles
            </span>
          </div>
          <Slider
            id="radius"
            value={searchRadius}
            min={5}
            max={100}
            step={5}
            onValueChange={(value) => setSearchRadius(value as number[])}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5 mi</span>
            <span>100 mi</span>
          </div>
        </div> */}
      </div>

      {/* All other filters in accordions */}
      <Accordion
        type="multiple"
        className="w-full"
        value={openAccordionItems}
        onValueChange={setOpenAccordionItems}
      >
        {/* Make and Model */}
        <AccordionItem value="vehicle">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Vehicle
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-2">
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Make
                </label>
                <Select
                  value={make}
                  onValueChange={(value) => {
                    setMake(value);
                    if (!openAccordionItems.includes("vehicle")) {
                      setOpenAccordionItems((prev) => [...prev, "vehicle"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Model
                </label>
                <Select
                  value={model}
                  onValueChange={(value) => {
                    setModel(value);
                    if (!openAccordionItems.includes("vehicle")) {
                      setOpenAccordionItems((prev) => [...prev, "vehicle"]);
                    }
                  }}
                  disabled={!make}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={make ? "Select model" : "Select make first"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {make === "toyota" && (
                      <>
                        <SelectItem value="camry">Camry</SelectItem>
                        <SelectItem value="corolla">Corolla</SelectItem>
                        <SelectItem value="rav4">RAV4</SelectItem>
                      </>
                    )}
                    {make === "honda" && (
                      <>
                        <SelectItem value="civic">Civic</SelectItem>
                        <SelectItem value="accord">Accord</SelectItem>
                        <SelectItem value="crv">CR-V</SelectItem>
                      </>
                    )}
                    {make === "ford" && (
                      <>
                        <SelectItem value="f150">F-150</SelectItem>
                        <SelectItem value="mustang">Mustang</SelectItem>
                        <SelectItem value="escape">Escape</SelectItem>
                      </>
                    )}
                    {/* Add more models for other makes as needed */}
                  </SelectContent>
                </Select>
              </div>

              {/* Only show trim for models that have trim options */}
              {(model === "f150" ||
                model === "mustang" ||
                model === "civic") && (
                <div>
                  <label className="md:text-base text-muted-foreground mb-1 block">
                    Trim
                  </label>
                  <Select
                    value={trim}
                    onValueChange={(value) => {
                      setTrim(value);
                      if (!openAccordionItems.includes("vehicle")) {
                        setOpenAccordionItems((prev) => [...prev, "vehicle"]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trim" />
                    </SelectTrigger>
                    <SelectContent>
                      {model === "f150" && (
                        <>
                          <SelectItem value="xl">XL</SelectItem>
                          <SelectItem value="xlt">XLT</SelectItem>
                          <SelectItem value="lariat">Lariat</SelectItem>
                          <SelectItem value="platinum">Platinum</SelectItem>
                        </>
                      )}
                      {model === "mustang" && (
                        <>
                          <SelectItem value="ecoboost">EcoBoost</SelectItem>
                          <SelectItem value="gt">GT</SelectItem>
                          <SelectItem value="mach1">Mach 1</SelectItem>
                        </>
                      )}
                      {model === "civic" && (
                        <>
                          <SelectItem value="lx">LX</SelectItem>
                          <SelectItem value="ex">EX</SelectItem>
                          <SelectItem value="sport">Sport</SelectItem>
                          <SelectItem value="touring">Touring</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Year Range */}
        <AccordionItem value="year-range">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Year Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  From
                </label>
                <Select
                  value={yearRange[0].toString()}
                  onValueChange={(val) => {
                    setYearRange([Number.parseInt(val), yearRange[1]]);
                    if (!openAccordionItems.includes("year-range")) {
                      setOpenAccordionItems((prev) => [...prev, "year-range"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                      (year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  To
                </label>
                <Select
                  value={yearRange[1].toString()}
                  onValueChange={(val) => {
                    setYearRange([yearRange[0], Number.parseInt(val)]);
                    if (!openAccordionItems.includes("year-range")) {
                      setOpenAccordionItems((prev) => [...prev, "year-range"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                      (year) => (
                        <SelectItem
                          key={year}
                          value={year.toString()}
                          disabled={year < yearRange[0]}
                        >
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Condition */}
        <AccordionItem value="condition">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Condition
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="new"
                  className="mr-2 h-4 w-4"
                  checked={condition.includes("new")}
                  onChange={() => {
                    handleConditionChange("new");
                    if (!openAccordionItems.includes("condition")) {
                      setOpenAccordionItems((prev) => [...prev, "condition"]);
                    }
                  }}
                />
                <label htmlFor="new" className="md:text-base">
                  New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="used"
                  className="mr-2 h-4 w-4"
                  checked={condition.includes("used")}
                  onChange={() => {
                    handleConditionChange("used");
                    if (!openAccordionItems.includes("condition")) {
                      setOpenAccordionItems((prev) => [...prev, "condition"]);
                    }
                  }}
                />
                <label htmlFor="used" className="md:text-base">
                  Used
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="demo"
                  className="mr-2 h-4 w-4"
                  checked={condition.includes("demo")}
                  onChange={() => {
                    handleConditionChange("demo");
                    if (!openAccordionItems.includes("condition")) {
                      setOpenAccordionItems((prev) => [...prev, "condition"]);
                    }
                  }}
                />
                <label htmlFor="demo" className="md:text-base">
                  Demo
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price-range">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label
                  htmlFor="min-price"
                  className="md:text-base text-muted-foreground mb-1 block"
                >
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="min-price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      if (!openAccordionItems.includes("price-range")) {
                        setOpenAccordionItems((prev) => [
                          ...prev,
                          "price-range",
                        ]);
                      }
                    }}
                    className="pl-7"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="max-price"
                  className="md:text-base text-muted-foreground mb-1 block"
                >
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="max-price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      if (!openAccordionItems.includes("price-range")) {
                        setOpenAccordionItems((prev) => [
                          ...prev,
                          "price-range",
                        ]);
                      }
                    }}
                    className="pl-7"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mileage Range */}
        <AccordionItem value="mileage-range">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Mileage Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Min Mileage
                </label>
                <Input
                  type="number"
                  value={mileageRange[0]}
                  onChange={(e) => {
                    setMileageRange([
                      Number.parseInt(e.target.value) || 0,
                      mileageRange[1],
                    ]);
                    if (!openAccordionItems.includes("mileage-range")) {
                      setOpenAccordionItems((prev) => [
                        ...prev,
                        "mileage-range",
                      ]);
                    }
                  }}
                  min="0"
                />
              </div>
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Max Mileage
                </label>
                <Input
                  type="number"
                  value={mileageRange[1]}
                  onChange={(e) => {
                    setMileageRange([
                      mileageRange[0],
                      Number.parseInt(e.target.value) || 0,
                    ]);
                    if (!openAccordionItems.includes("mileage-range")) {
                      setOpenAccordionItems((prev) => [
                        ...prev,
                        "mileage-range",
                      ]);
                    }
                  }}
                  min="0"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Drivetrain */}
        <AccordionItem value="drivetrain">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Drivetrain
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="front"
                  className="mr-2 h-4 w-4"
                  checked={drivetrain.includes("front")}
                  onChange={() => {
                    handleDrivetrainChange("front");
                    if (!openAccordionItems.includes("drivetrain")) {
                      setOpenAccordionItems((prev) => [...prev, "drivetrain"]);
                    }
                  }}
                />
                <label htmlFor="front" className="md:text-base">
                  Front-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rear"
                  className="mr-2 h-4 w-4"
                  checked={drivetrain.includes("rear")}
                  onChange={() => {
                    handleDrivetrainChange("rear");
                    if (!openAccordionItems.includes("drivetrain")) {
                      setOpenAccordionItems((prev) => [...prev, "drivetrain"]);
                    }
                  }}
                />
                <label htmlFor="rear" className="md:text-base">
                  Rear-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="4x4"
                  className="mr-2 h-4 w-4"
                  checked={drivetrain.includes("4x4")}
                  onChange={() => {
                    handleDrivetrainChange("4x4");
                    if (!openAccordionItems.includes("drivetrain")) {
                      setOpenAccordionItems((prev) => [...prev, "drivetrain"]);
                    }
                  }}
                />
                <label htmlFor="4x4" className="md:text-base">
                  4x4
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="awd"
                  className="mr-2 h-4 w-4"
                  checked={drivetrain.includes("awd")}
                  onChange={() => {
                    handleDrivetrainChange("awd");
                    if (!openAccordionItems.includes("drivetrain")) {
                      setOpenAccordionItems((prev) => [...prev, "drivetrain"]);
                    }
                  }}
                />
                <label htmlFor="awd" className="md:text-base">
                  All-wheel drive
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transmission */}
        <AccordionItem value="transmission">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Transmission
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto"
                  className="mr-2 h-4 w-4"
                  checked={transmission.includes("auto")}
                  onChange={() => {
                    handleTransmissionChange("auto");
                    if (!openAccordionItems.includes("transmission")) {
                      setOpenAccordionItems((prev) => [
                        ...prev,
                        "transmission",
                      ]);
                    }
                  }}
                />
                <label htmlFor="auto" className="md:text-base">
                  Automatic
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manual"
                  className="mr-2 h-4 w-4"
                  checked={transmission.includes("manual")}
                  onChange={() => {
                    handleTransmissionChange("manual");
                    if (!openAccordionItems.includes("transmission")) {
                      setOpenAccordionItems((prev) => [
                        ...prev,
                        "transmission",
                      ]);
                    }
                  }}
                />
                <label htmlFor="manual" className="md:text-base">
                  Manual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="semi-auto"
                  className="mr-2 h-4 w-4"
                  checked={transmission.includes("semi-auto")}
                  onChange={() => {
                    handleTransmissionChange("semi-auto");
                    if (!openAccordionItems.includes("transmission")) {
                      setOpenAccordionItems((prev) => [
                        ...prev,
                        "transmission",
                      ]);
                    }
                  }}
                />
                <label htmlFor="semi-auto" className="md:text-base">
                  Semi-Automatic
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fuel Type */}
        <AccordionItem value="fuel-type">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Fuel type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="petrol"
                  className="mr-2 h-4 w-4"
                  checked={fuelType.includes("petrol")}
                  onChange={() => {
                    handleFuelTypeChange("petrol");
                    if (!openAccordionItems.includes("fuel-type")) {
                      setOpenAccordionItems((prev) => [...prev, "fuel-type"]);
                    }
                  }}
                />
                <label htmlFor="petrol" className="md:text-base">
                  Petrol
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diesel"
                  className="mr-2 h-4 w-4"
                  checked={fuelType.includes("diesel")}
                  onChange={() => {
                    handleFuelTypeChange("diesel");
                    if (!openAccordionItems.includes("fuel-type")) {
                      setOpenAccordionItems((prev) => [...prev, "fuel-type"]);
                    }
                  }}
                />
                <label htmlFor="diesel" className="md:text-base">
                  Diesel
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hybrid"
                  className="mr-2 h-4 w-4"
                  checked={fuelType.includes("hybrid")}
                  onChange={() => {
                    handleFuelTypeChange("hybrid");
                    if (!openAccordionItems.includes("fuel-type")) {
                      setOpenAccordionItems((prev) => [...prev, "fuel-type"]);
                    }
                  }}
                />
                <label htmlFor="hybrid" className="md:text-base">
                  Hybrid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="electric"
                  className="mr-2 h-4 w-4"
                  checked={fuelType.includes("electric")}
                  onChange={() => {
                    handleFuelTypeChange("electric");
                    if (!openAccordionItems.includes("fuel-type")) {
                      setOpenAccordionItems((prev) => [...prev, "fuel-type"]);
                    }
                  }}
                />
                <label htmlFor="electric" className="md:text-base">
                  Electric
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lpg"
                  className="mr-2 h-4 w-4"
                  checked={fuelType.includes("lpg")}
                  onChange={() => {
                    handleFuelTypeChange("lpg");
                    if (!openAccordionItems.includes("fuel-type")) {
                      setOpenAccordionItems((prev) => [...prev, "fuel-type"]);
                    }
                  }}
                />
                <label htmlFor="lpg" className="md:text-base">
                  LPG
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Engine */}
        <AccordionItem value="engine">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Engine
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Engine Size
                </label>
                <Select
                  value={engineSize}
                  onValueChange={(value) => {
                    setEngineSize(value);
                    if (!openAccordionItems.includes("engine")) {
                      setOpenAccordionItems((prev) => [...prev, "engine"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto1000">Up to 1000cc</SelectItem>
                    <SelectItem value="upto1500">Up to 1500cc</SelectItem>
                    <SelectItem value="upto2000">Up to 2000cc</SelectItem>
                    <SelectItem value="upto2500">Up to 2500cc</SelectItem>
                    <SelectItem value="upto3000">Up to 3000cc</SelectItem>
                    <SelectItem value="above3000">Above 3000cc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Horsepower
                </label>
                <Select
                  value={horsepower}
                  onValueChange={(value) => {
                    setHorsepower(value);
                    if (!openAccordionItems.includes("engine")) {
                      setOpenAccordionItems((prev) => [...prev, "engine"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any horsepower" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto100">Up to 100 HP</SelectItem>
                    <SelectItem value="upto150">Up to 150 HP</SelectItem>
                    <SelectItem value="upto200">Up to 200 HP</SelectItem>
                    <SelectItem value="upto250">Up to 250 HP</SelectItem>
                    <SelectItem value="upto300">Up to 300 HP</SelectItem>
                    <SelectItem value="above300">Above 300 HP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Vehicle History */}
        <AccordionItem value="history">
          <AccordionTrigger className="md:text-base font-medium py-2">
            Vehicle History
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Accident History
                </label>
                <Select
                  value={accident}
                  onValueChange={(value) => {
                    setAccident(value);
                    if (!openAccordionItems.includes("history")) {
                      setOpenAccordionItems((prev) => [...prev, "history"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No Accidents</SelectItem>
                    <SelectItem value="yes">Has Accident History</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Service History
                </label>
                <Select
                  value={serviceHistory}
                  onValueChange={(value) => {
                    setServiceHistory(value);
                    if (!openAccordionItems.includes("history")) {
                      setOpenAccordionItems((prev) => [...prev, "history"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Service History</SelectItem>
                    <SelectItem value="partial">
                      Partial Service History
                    </SelectItem>
                    <SelectItem value="none">No Service History</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-1 block">
                  Registration Status
                </label>
                <Select
                  value={registered}
                  onValueChange={(value) => {
                    setRegistered(value);
                    if (!openAccordionItems.includes("history")) {
                      setOpenAccordionItems((prev) => [...prev, "history"]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="unregistered">Not Registered</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <style jsx global>{`
        ${scrollbarHideStyles}
      `}</style>
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative h-[200px] md:h-[370px] w-[98%] mx-auto my-[10px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/results.jpg"
            alt="Car sales hero image"
            fill
            className="object-cover brightness-75 md:hidden"
            priority
          />
          <Image
            src="/results - Copy.jpg"
            alt="Car sales hero image"
            fill
            className="object-cover brightness-75 hidden md:block"
            priority
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute z-30 top-4 left-4 items-center gap-1 bg-blue-900/50 border border-blue-400 backdrop-blur-md rounded-md p-2 text-blue-400 hover:text-blue-400 hover:bg-blue-900/20"
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        <div className="relative z-10 container h-full flex flex-col justify-center items-end py-[90px] md:py-[120px] text-center text-white">
          <h1 className="text-xl md:text-5xl md:w-[55%] font-bold ">
            Find your dream car easily with advanced search filters.{" "}
          </h1>
        </div>
      </section>

      {/* Mobile filters toggle and sort - sticky at the top */}
      <div className="lg:hidden bg-white sticky top-0 z-10 bg-background py-3 border-b flex justify-between items-center">
        <Button
          variant="outline"
          onClick={toggleMobileFilters}
          className="flex items-center gap-2"
        >
          Filters
          <ChevronUp
            size={16}
            className={mobileFiltersOpen ? "" : "rotate-180"}
          />
        </Button>
        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-9 w-9"
          >
            <LayoutGrid size={18} />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-9 w-9"
          >
            <LayoutList size={18} />
          </Button>
        </div>
      </div>

      {/* Mobile filters modal */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="sm:max-w-[425px] w-[90%] h-[80vh] p-0 bg-white flex flex-col">
          <DialogHeader className="sticky top-0 z-10 bg-white p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base md:text-lg">
                  Filters
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2"
                >
                  Reset
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileFiltersOpen(false)}
                className="h-8 px-2"
              >
                X
              </Button>
            </div>
          </DialogHeader>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <FilterContent />
          </div>

          {/* Sticky footer with apply button */}
          <div className="sticky bottom-0 z-10 bg-white p-4 border-t mt-auto">
            <Button
              className="w-full bg-blue-600 text-white"
              onClick={() => {
                // This will trigger a re-render with the current filter values
                setCurrentPage(1); // Reset to first page when filters are applied
                setMobileFiltersOpen(false); // Close mobile filters modal
              }}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col lg:flex-row gap-8 py-6">
        {/* Desktop filters sidebar */}
        <div className="hidden lg:block lg:w-72 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border flex flex-col h-[calc(100vh-2rem)] sticky top-4">
            <div className="sticky top-0 z-10 bg-white p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={clearFilters}
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <FilterContent />
            </div>

            <div className="sticky bottom-0 z-10 bg-white p-4 border-t mt-auto">
              <Button
                className="w-full bg-blue-600 text-white"
                onClick={() => {
                  setCurrentPage(1); // Reset to first page when filters are applied
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1" id="results-top">
          {/* Desktop view controls and sort */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-9 w-9"
                >
                  <LayoutGrid size={18} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-9 w-9"
                >
                  <LayoutList size={18} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, EXTENDED_CARS.length)} of{" "}
                {EXTENDED_CARS.length} results
              </p>
            </div>
          </div>

          {/* Remove mobile sort dropdown since it's now in the sticky header */}

          {/* Results count - only shown on mobile, as desktop now has it in the header area */}
          <div className="mb-6 lg:hidden">
            <p className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, EXTENDED_CARS.length)} of{" "}
              {EXTENDED_CARS.length} results
            </p>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {currentItems.map((car) => (
              <CarCard key={car.id} car={car} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }).map(
                (_, index) => {
                  // Show pages around current page
                  let pageNum = index + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + index;
                  }
                  if (pageNum > totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNum)}
                      className="w-10 h-10"
                    >
                      {pageNum}
                    </Button>
                  );
                }
              )}

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
