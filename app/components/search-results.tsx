"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, ChevronUp, ArrowLeft, X } from "lucide-react";
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

// Custom utility for hiding scrollbars while maintaining scroll functionality
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
  
  /* Increase size of all form elements on mobile */
  @media (max-width: 768px) {
    .mobile-large-select [data-radix-select-trigger] {
      min-height: 4rem;
      font-size: 1.25rem;
      padding: 1rem 1.25rem;
    }
    
    .mobile-large-select [data-radix-select-content] {
      font-size: 1.25rem;
    }
    
    .mobile-large-select [data-radix-select-item] {
      padding: 1rem 1.25rem;
      min-height: 3.5rem;
    }
    
    .mobile-large-checkbox {
      width: 2rem !important;
      height: 2rem !important;
      margin-right: 1rem !important;
    }
    
    .mobile-large-text {
      font-size: 1.25rem !important;
    }
    
    .mobile-large-input {
      min-height: 4rem;
      font-size: 1.25rem;
    }

    /* Make accordion triggers larger */
    .accordion-trigger {
      font-size: 1.25rem !important;
      padding: 1rem 0 !important;
    }
  }
`;

// Add these styles at the top of the file after imports
const drawerStyles = `
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 85%;
    max-width: 425px;
    background: white;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .drawer.open {
    transform: translateX(0);
  }

  .drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
  }

  .drawer-overlay.open {
    opacity: 1;
    visibility: visible;
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
  const [searchRadius, setSearchRadius] = useState([50]);
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
    setOpenAccordionItems((prev) => (prev.includes(value) ? [] : [value]));
  };

  // Update the clearFilters function to include the new filters (around line 120)
  const clearFilters = () => {
    setMinPrice("0");
    setMaxPrice("150");
    setSearchRadius([50]);
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

  // Custom AccordionTrigger to prevent scroll position reset
  const CustomAccordionTrigger = ({ className, children, ...props }) => {
    const handleClick = (e) => {
      // Store current scroll position immediately on click
      if (filterContentRef.current) {
        setLastScrollPosition(filterContentRef.current.scrollTop);
      }
    };

    return (
      <AccordionTrigger
        className={`md:text-base font-medium py-4 text-lg mobile-large-text accordion-trigger ${className}`}
        onClick={handleClick}
        {...props}
      >
        {children}
      </AccordionTrigger>
    );
  };

  // Save scroll position when options are selected
  useEffect(() => {
    if (filterContentRef.current) {
      // Store the current scroll position in a variable to prevent any race conditions
      const currentScrollPos = lastScrollPosition;

      // Use a more aggressive approach with multiple attempts to restore scroll position
      const restoreScroll = () => {
        if (filterContentRef.current) {
          filterContentRef.current.scrollTop = currentScrollPos;

          // Schedule additional attempts to ensure it sticks
          setTimeout(() => {
            if (filterContentRef.current) {
              filterContentRef.current.scrollTop = currentScrollPos;
            }
          }, 50);

          setTimeout(() => {
            if (filterContentRef.current) {
              filterContentRef.current.scrollTop = currentScrollPos;
            }
          }, 150);
        }
      };

      restoreScroll();
      requestAnimationFrame(restoreScroll);
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
      className="space-y-6 mobile-large-select"
      ref={filterContentRef}
      onScroll={(e) => setLastScrollPosition(e.currentTarget.scrollTop)}
    >
      {/* Location - Outside accordion as requested */}
      <div className="space-y-4">
        <h3 className="text-sm md:text-base font-medium mobile-large-text">
          Location
        </h3>
        <div>
          <label
            htmlFor="location"
            className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
          >
            Search Location
          </label>
          <Input
            id="location"
            type="text"
            placeholder="Enter city, state or zip"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mobile-large-input"
          />
        </div>
        <div>
          <label
            htmlFor="radius"
            className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
          >
            Search Radius
          </label>
          <Select
            value={searchRadius[0].toString()}
            onValueChange={(value) => setSearchRadius([Number.parseInt(value)])}
          >
            <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
              <SelectValue placeholder="Select radius" className="" />
            </SelectTrigger>
            <SelectContent className="text-lg">
              <SelectItem value="50" className="py-3 text-lg">
                50 km
              </SelectItem>
              <SelectItem value="100" className="py-3 text-lg ">
                100 km
              </SelectItem>
              <SelectItem value="200" className="py-3 text-lg">
                200 km
              </SelectItem>
              <SelectItem value="500" className="py-3 text-lg">
                500 km
              </SelectItem>
              <SelectItem value="1000" className="py-3 text-lg">
                1000 km
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* All other filters in accordions */}
      <Accordion
        type="single"
        className="w-full"
        value={openAccordionItems[0]}
        onValueChange={(value) => setOpenAccordionItems(value ? [value] : [])}
        collapsible
      >
        {/* Make and Model */}
        <AccordionItem value="vehicle">
          <CustomAccordionTrigger>Vehicle</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Make
                </label>
                <Select
                  value={make}
                  onValueChange={(value) => {
                    setMake(value);
                    setOpenAccordionItems(["vehicle"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any make" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="toyota" className="py-3 text-lg">
                      Toyota
                    </SelectItem>
                    <SelectItem value="honda" className="py-3 text-lg   ">
                      Honda
                    </SelectItem>
                    <SelectItem value="ford" className="py-3 text-lg">
                      Ford
                    </SelectItem>
                    <SelectItem value="bmw" className="py-3  text-lg">
                      BMW
                    </SelectItem>
                    <SelectItem value="mercedes" className="py-3 text-lg">
                      Mercedes-Benz
                    </SelectItem>
                    <SelectItem value="audi" className="py-3 text-lg">
                      Audi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Model
                </label>
                <Select
                  value={model}
                  onValueChange={(value) => {
                    setModel(value);
                    setOpenAccordionItems(["vehicle"]);
                  }}
                  disabled={!make}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue
                      placeholder={make ? "Select model" : "Select make first"}
                    />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {make === "toyota" && (
                      <>
                        <SelectItem value="camry" className="py-3 text-lg">
                          Camry
                        </SelectItem>
                        <SelectItem value="corolla" className="py-3 text-lg ">
                          Corolla
                        </SelectItem>
                        <SelectItem value="rav4" className="py-3 text-lg">
                          RAV4
                        </SelectItem>
                      </>
                    )}
                    {make === "honda" && (
                      <>
                        <SelectItem value="civic" className="py-3 text-lg">
                          Civic
                        </SelectItem>
                        <SelectItem value="accord" className="py-3 text-lg">
                          Accord
                        </SelectItem>
                        <SelectItem value="crv" className="py-3 text-lg">
                          CR-V
                        </SelectItem>
                      </>
                    )}
                    {make === "ford" && (
                      <>
                        <SelectItem value="f150" className="py-3 text-lg">
                          F-150
                        </SelectItem>
                        <SelectItem value="mustang" className="py-3 text-lg">
                          Mustang
                        </SelectItem>
                        <SelectItem value="escape" className="py-3 text-lg">
                          Escape
                        </SelectItem>
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
                  <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                    Trim
                  </label>
                  <Select
                    value={trim}
                    onValueChange={(value) => {
                      setTrim(value);
                      setOpenAccordionItems(["vehicle"]);
                    }}
                  >
                    <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                      <SelectValue placeholder="Select trim" />
                    </SelectTrigger>
                    <SelectContent className="text-base">
                      {model === "f150" && (
                        <>
                          <SelectItem value="xl" className="py-3 text-lg">
                            XL
                          </SelectItem>
                          <SelectItem value="xlt" className="py-3 text-lg">
                            XLT
                          </SelectItem>
                          <SelectItem value="lariat" className="py-3 text-lg">
                            Lariat
                          </SelectItem>
                          <SelectItem value="platinum" className="py-3 text-lg">
                            Platinum
                          </SelectItem>
                        </>
                      )}
                      {model === "mustang" && (
                        <>
                          <SelectItem value="ecoboost" className="py-3 text-lg">
                            EcoBoost
                          </SelectItem>
                          <SelectItem value="gt" className="py-3 text-lg">
                            GT
                          </SelectItem>
                          <SelectItem value="mach1" className="py-3 text-lg">
                            Mach 1
                          </SelectItem>
                        </>
                      )}
                      {model === "civic" && (
                        <>
                          <SelectItem value="lx" className="py-3 text-lg">
                            LX
                          </SelectItem>
                          <SelectItem value="ex" className="py-3 text-lg  ">
                            EX
                          </SelectItem>
                          <SelectItem value="sport" className="py-3 text-lg">
                            Sport
                          </SelectItem>
                          <SelectItem value="touring" className="py-3 text-lg">
                            Touring
                          </SelectItem>
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
          <CustomAccordionTrigger>Year Range</CustomAccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  From
                </label>
                <Select
                  value={yearRange[0].toString()}
                  onValueChange={(val) => {
                    setYearRange([Number.parseInt(val), yearRange[1]]);
                    setOpenAccordionItems(["year-range"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                      (year) => (
                        <SelectItem
                          key={year}
                          value={year.toString()}
                          className="py-3"
                        >
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  To
                </label>
                <Select
                  value={yearRange[1].toString()}
                  onValueChange={(val) => {
                    setYearRange([yearRange[0], Number.parseInt(val)]);
                    setOpenAccordionItems(["year-range"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                      (year) => (
                        <SelectItem
                          key={year}
                          value={year.toString()}
                          disabled={year < yearRange[0]}
                          className="py-3"
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
          <CustomAccordionTrigger>Condition</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="new"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("new")}
                  onChange={() => {
                    handleConditionChange("new");
                    setOpenAccordionItems(["condition"]);
                  }}
                />
                <label htmlFor="new" className="text-base mobile-large-text">
                  New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="used"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("used")}
                  onChange={() => {
                    handleConditionChange("used");
                    setOpenAccordionItems(["condition"]);
                  }}
                />
                <label htmlFor="used" className="text-base mobile-large-text">
                  Used
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="demo"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("demo")}
                  onChange={() => {
                    handleConditionChange("demo");
                    setOpenAccordionItems(["condition"]);
                  }}
                />
                <label htmlFor="demo" className="text-base mobile-large-text">
                  Demo
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price-range">
          <CustomAccordionTrigger>Price Range</CustomAccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label
                  htmlFor="min-price"
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    id="min-price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setOpenAccordionItems(["price-range"]);
                    }}
                    className="pl-7 mobile-large-input"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="max-price"
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    id="max-price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setOpenAccordionItems(["price-range"]);
                    }}
                    className="pl-7 mobile-large-input"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mileage Range */}
        <AccordionItem value="mileage-range">
          <CustomAccordionTrigger>Mileage Range</CustomAccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
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
                    setOpenAccordionItems(["mileage-range"]);
                  }}
                  min="0"
                  className="mobile-large-input"
                />
              </div>
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
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
                    setOpenAccordionItems(["mileage-range"]);
                  }}
                  min="0"
                  className="mobile-large-input"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Drivetrain */}
        <AccordionItem value="drivetrain">
          <CustomAccordionTrigger>Drivetrain</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="front"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("front")}
                  onChange={() => {
                    handleDrivetrainChange("front");
                    setOpenAccordionItems(["drivetrain"]);
                  }}
                />
                <label htmlFor="front" className="text-base mobile-large-text">
                  Front-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rear"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("rear")}
                  onChange={() => {
                    handleDrivetrainChange("rear");
                    setOpenAccordionItems(["drivetrain"]);
                  }}
                />
                <label htmlFor="rear" className="text-base mobile-large-text">
                  Rear-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="4x4"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("4x4")}
                  onChange={() => {
                    handleDrivetrainChange("4x4");
                    setOpenAccordionItems(["drivetrain"]);
                  }}
                />
                <label htmlFor="4x4" className="text-base mobile-large-text">
                  4x4
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="awd"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("awd")}
                  onChange={() => {
                    handleDrivetrainChange("awd");
                    setOpenAccordionItems(["drivetrain"]);
                  }}
                />
                <label htmlFor="awd" className="text-base mobile-large-text">
                  All-wheel drive
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transmission */}
        <AccordionItem value="transmission">
          <CustomAccordionTrigger>Transmission</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={transmission.includes("auto")}
                  onChange={() => {
                    handleTransmissionChange("auto");
                    setOpenAccordionItems(["transmission"]);
                  }}
                />
                <label htmlFor="auto" className="text-base mobile-large-text">
                  Automatic
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manual"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={transmission.includes("manual")}
                  onChange={() => {
                    handleTransmissionChange("manual");
                    setOpenAccordionItems(["transmission"]);
                  }}
                />
                <label htmlFor="manual" className="text-base mobile-large-text">
                  Manual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="semi-auto"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={transmission.includes("semi-auto")}
                  onChange={() => {
                    handleTransmissionChange("semi-auto");
                    setOpenAccordionItems(["transmission"]);
                  }}
                />
                <label
                  htmlFor="semi-auto"
                  className="text-base mobile-large-text"
                >
                  Semi-Automatic
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fuel Type */}
        <AccordionItem value="fuel-type">
          <CustomAccordionTrigger>Fuel type</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="petrol"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("petrol")}
                  onChange={() => {
                    handleFuelTypeChange("petrol");
                    setOpenAccordionItems(["fuel-type"]);
                  }}
                />
                <label htmlFor="petrol" className="text-base mobile-large-text">
                  Petrol
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diesel"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("diesel")}
                  onChange={() => {
                    handleFuelTypeChange("diesel");
                    setOpenAccordionItems(["fuel-type"]);
                  }}
                />
                <label htmlFor="diesel" className="text-base mobile-large-text">
                  Diesel
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hybrid"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("hybrid")}
                  onChange={() => {
                    handleFuelTypeChange("hybrid");
                    setOpenAccordionItems(["fuel-type"]);
                  }}
                />
                <label htmlFor="hybrid" className="text-base mobile-large-text">
                  Hybrid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="electric"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("electric")}
                  onChange={() => {
                    handleFuelTypeChange("electric");
                    setOpenAccordionItems(["fuel-type"]);
                  }}
                />
                <label
                  htmlFor="electric"
                  className="text-base mobile-large-text"
                >
                  Electric
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lpg"
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("lpg")}
                  onChange={() => {
                    handleFuelTypeChange("lpg");
                    setOpenAccordionItems(["fuel-type"]);
                  }}
                />
                <label htmlFor="lpg" className="text-base mobile-large-text">
                  LPG
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Engine */}
        <AccordionItem value="engine">
          <CustomAccordionTrigger>Engine</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Engine Size
                </label>
                <Select
                  value={engineSize}
                  onValueChange={(value) => {
                    setEngineSize(value);
                    setOpenAccordionItems(["engine"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any size" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="upto1000" className="py-3 text-lg">
                      Up to 1000cc
                    </SelectItem>
                    <SelectItem value="upto1500" className="py-3 text-lg">
                      Up to 1500cc
                    </SelectItem>
                    <SelectItem value="upto2000" className="py-3 text-lg">
                      Up to 2000cc
                    </SelectItem>
                    <SelectItem value="upto2500" className="py-3 text-lg">
                      Up to 2500cc
                    </SelectItem>
                    <SelectItem value="upto3000" className="py-3 text-lg">
                      Up to 3000cc
                    </SelectItem>
                    <SelectItem value="above3000" className="py-3 text-lg">
                      Above 3000cc
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Horsepower
                </label>
                <Select
                  value={horsepower}
                  onValueChange={(value) => {
                    setHorsepower(value);
                    setOpenAccordionItems(["engine"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any horsepower" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="upto100" className="py-3 text-lg">
                      Up to 100 HP
                    </SelectItem>
                    <SelectItem value="upto150" className="py-3 text-lg">
                      Up to 150 HP
                    </SelectItem>
                    <SelectItem value="upto200" className="py-3 text-lg">
                      Up to 200 HP
                    </SelectItem>
                    <SelectItem value="upto250" className="py-3 text-lg">
                      Up to 250 HP
                    </SelectItem>
                    <SelectItem value="upto300" className="py-3 text-lg">
                      Up to 300 HP
                    </SelectItem>
                    <SelectItem value="above300" className="py-3 text-lg">
                      Above 300 HP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Vehicle History */}
        <AccordionItem value="history">
          <CustomAccordionTrigger>Vehicle History</CustomAccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Accident History
                </label>
                <Select
                  value={accident}
                  onValueChange={(value) => {
                    setAccident(value);
                    setOpenAccordionItems(["history"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="no" className="py-3 text-lg">
                      No Accidents
                    </SelectItem>
                    <SelectItem value="yes" className="py-3 text-lg">
                      Has Accident History
                    </SelectItem>
                    <SelectItem value="any" className="py-3 text-lg">
                      Any
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Service History
                </label>
                <Select
                  value={serviceHistory}
                  onValueChange={(value) => {
                    setServiceHistory(value);
                    setOpenAccordionItems(["history"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="full" className="py-3 text-lg">
                      Full Service History
                    </SelectItem>
                    <SelectItem value="partial" className="py-3 text-lg">
                      Partial Service History
                    </SelectItem>
                    <SelectItem value="none" className="py-3 text-lg">
                      No Service History
                    </SelectItem>
                    <SelectItem value="any" className="py-3 text-lg">
                      Any
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Registration Status
                </label>
                <Select
                  value={registered}
                  onValueChange={(value) => {
                    setRegistered(value);
                    setOpenAccordionItems(["history"]);
                  }}
                >
                  <SelectTrigger className="w-full text-base py-3 min-h-[3rem]">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="registered" className="py-3 text-lg">
                      Registered
                    </SelectItem>
                    <SelectItem value="unregistered" className="py-3 text-lg  ">
                      Not Registered
                    </SelectItem>
                    <SelectItem value="any" className="py-3 text-lg">
                      Any
                    </SelectItem>
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
        ${drawerStyles}
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
            Find your dream car easily with advanced search filters.
          </h1>
        </div>
      </section>

      {/* Mobile filters toggle and sort - sticky at the top */}
      <div className="lg:hidden bg-white sticky top-0 z-10 bg-background py-3 border-b flex justify-between items-center">
        <Button
          variant="outline"
          onClick={toggleMobileFilters}
          className="flex items-center gap-2 text-base py-2 px-4"
        >
          Filters
          <ChevronUp
            size={16}
            className={mobileFiltersOpen ? "" : "rotate-180"}
          />
        </Button>
        <div className="flex items-center  justify-between gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[120px] h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-10 w-10 md:block hidden"
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-10 w-10 md:block hidden"
            >
              <LayoutList size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <div className="lg:hidden">
        <div
          className={`drawer-overlay ${mobileFiltersOpen ? "open" : ""}`}
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div className={`drawer ${mobileFiltersOpen ? "open" : ""}`}>
          <div className="sticky top-0 z-10 bg-white p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Filters</h2>
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
                size="icon"
                onClick={() => setMobileFiltersOpen(false)}
                className="h-8 w-8"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            <div className="p-6">
              <FilterContent />
            </div>
          </div>

          {/* Sticky footer with apply button */}
          <div className="sticky bottom-0 z-10 bg-white p-4 border-t">
            <Button
              className="w-full bg-blue-600 text-white text-lg py-6"
              onClick={() => {
                setCurrentPage(1);
                setMobileFiltersOpen(false);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

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
