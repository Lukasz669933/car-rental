"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  LayoutList,
  ChevronUp,
  ArrowLeft,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowDownUp,
  ArrowDown,
  ArrowUp,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import CarCard from "./car-card";
import { CARS } from "@/lib/data";
import Image from "next/image";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import { CustomAccordion } from "./custom-accordion";

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

    /* Style for native selects on mobile */
    .mobile-select {
      min-height: 3.5rem;
      font-size: 1.25rem;
      padding: 0.75rem 1rem;
      background-position: right 0.75rem center;
      background-size: 1.5rem;
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
    width: 100%;
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
  
  /* Custom styles for sort icon button */
  .sort-icon-select {
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .sort-icon-select:focus {
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
    outline: none;
  }
  
  /* Style for dropdown options */
  option {
    font-size: 16px;
    padding: 8px;
    background-color: white;
    color: black;
  }
  
  /* Smaller devices adjustments */
  @media (max-width: 640px) {
    .mobile-controls {
      padding: 0.5rem;
      margin: 0 0.5rem;
    }
    
    .mobile-controls button, 
    .mobile-controls .sort-icon-select {
      height: 2.5rem;
      width: 2.5rem;
    }
    
    /* Ensure dropdown options are large enough on mobile */
    select option {
      font-size: 16px;
      padding: 12px 8px;
    }
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
  const [openAccordionItem, setOpenAccordionItem] = useState<string | null>(
    "location"
  );

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

  // Refs for desktop and mobile filter containers
  const desktopFilterContentRef = useRef<HTMLDivElement>(null);
  const mobileFilterContentRef = useRef<HTMLDivElement>(null);
  const [desktopScrollPosition, setDesktopScrollPosition] = useState(0);
  const [mobileScrollPosition, setMobileScrollPosition] = useState(0);

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
    // The useEffect hook will handle toggling body scroll based on state
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
  const toggleAccordion = (value: string) => {
    setOpenAccordionItem(openAccordionItem === value ? null : value);

    // Save current scroll position before toggling
    if (desktopFilterContentRef.current) {
      setDesktopScrollPosition(desktopFilterContentRef.current.scrollTop);
    }
    if (mobileFilterContentRef.current) {
      setMobileScrollPosition(mobileFilterContentRef.current.scrollTop);
    }
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

  // Restore scroll position after accordion changes
  useEffect(() => {
    // For desktop
    if (desktopFilterContentRef.current) {
      const restoreDesktopScroll = () => {
        if (desktopFilterContentRef.current) {
          desktopFilterContentRef.current.scrollTop = desktopScrollPosition;
        }
      };

      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        requestAnimationFrame(restoreDesktopScroll);
      });
    }

    // For mobile
    if (mobileFilterContentRef.current) {
      const restoreMobileScroll = () => {
        if (mobileFilterContentRef.current) {
          mobileFilterContentRef.current.scrollTop = mobileScrollPosition;
        }
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(restoreMobileScroll);
      });
    }
  }, [desktopScrollPosition, mobileScrollPosition, openAccordionItem]);

  // Add a dedicated effect for managing body scroll based on filter drawer state
  useEffect(() => {
    // Apply or remove body scroll lock based on filter drawer state
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  useEffect(() => {
    return () => {
      // Ensure body scroll is re-enabled when component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  // Replace custom Select with native select
  const NativeSelect = ({
    value,
    onValueChange,
    placeholder,
    options,
    disabled = false,
    className = "",
  }) => {
    return (
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          disabled={disabled}
          className={`w-full border rounded-md px-3 py-2 text-base md:py-2 appearance-none
           ${className}`}
          style={{ height: "auto" }}
        >
          <option value="" disabled={value !== ""}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Create separate filter content components for desktop and mobile
  const createFilterContent = (isMobile: boolean) => {
    const ref = isMobile ? mobileFilterContentRef : desktopFilterContentRef;
    const setScrollPosition = isMobile
      ? setMobileScrollPosition
      : setDesktopScrollPosition;

    return (
      <div
        className="space-y-6 mobile-large-select"
        ref={ref}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollTop)}
      >
        {/* All filters in accordions */}
        <div className="w-full">
          {/* Location */}
          <CustomAccordion
            title="Location"
            isOpen={openAccordionItem === "location"}
            onToggle={() => toggleAccordion("location")}
          >
            <div className="space-y-4 mt-3">
              <div>
                <label
                  htmlFor={`location-${isMobile ? "mobile" : "desktop"}`}
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Search Location
                </label>
                <Input
                  id={`location-${isMobile ? "mobile" : "desktop"}`}
                  type="text"
                  placeholder="Enter city, state or zip"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="mobile-large-input"
                />
              </div>
              <div>
                <label
                  htmlFor={`radius-${isMobile ? "mobile" : "desktop"}`}
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Search Radius
                </label>
                <NativeSelect
                  value={searchRadius[0].toString()}
                  onValueChange={(value) => {
                    setSearchRadius([Number.parseInt(value)]);
                  }}
                  placeholder="Select radius"
                  options={[
                    { value: "50", label: "50 km" },
                    { value: "100", label: "100 km" },
                    { value: "200", label: "200 km" },
                    { value: "500", label: "500 km" },
                    { value: "1000", label: "1000 km" },
                  ]}
                />
              </div>
            </div>
          </CustomAccordion>

          {/* Make and Model */}
          <CustomAccordion
            title="Vehicle"
            isOpen={openAccordionItem === "vehicle"}
            onToggle={() => toggleAccordion("vehicle")}
          >
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Make
                </label>
                <NativeSelect
                  value={make}
                  onValueChange={(value) => {
                    setMake(value);
                  }}
                  placeholder="Any make"
                  options={[
                    { value: "toyota", label: "Toyota" },
                    { value: "honda", label: "Honda" },
                    { value: "ford", label: "Ford" },
                    { value: "bmw", label: "BMW" },
                    { value: "mercedes", label: "Mercedes-Benz" },
                    { value: "audi", label: "Audi" },
                  ]}
                />
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Model
                </label>
                <NativeSelect
                  value={model}
                  onValueChange={(value) => {
                    setModel(value);
                  }}
                  disabled={!make}
                  placeholder={make ? "Select model" : "Select make first"}
                  options={
                    make === "toyota"
                      ? [
                          { value: "camry", label: "Camry" },
                          { value: "corolla", label: "Corolla" },
                          { value: "rav4", label: "RAV4" },
                        ]
                      : make === "honda"
                      ? [
                          { value: "civic", label: "Civic" },
                          { value: "accord", label: "Accord" },
                          { value: "crv", label: "CR-V" },
                        ]
                      : make === "ford"
                      ? [
                          { value: "f150", label: "F-150" },
                          { value: "mustang", label: "Mustang" },
                          { value: "escape", label: "Escape" },
                        ]
                      : []
                  }
                />
              </div>

              {/* Only show trim for models that have trim options */}
              {(model === "f150" ||
                model === "mustang" ||
                model === "civic") && (
                <div>
                  <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                    Trim
                  </label>
                  <NativeSelect
                    value={trim}
                    onValueChange={(value) => {
                      setTrim(value);
                    }}
                    placeholder="Select trim"
                    options={
                      model === "f150"
                        ? [
                            { value: "xl", label: "XL" },
                            { value: "xlt", label: "XLT" },
                            { value: "lariat", label: "Lariat" },
                            { value: "platinum", label: "Platinum" },
                          ]
                        : model === "mustang"
                        ? [
                            { value: "ecoboost", label: "EcoBoost" },
                            { value: "gt", label: "GT" },
                            { value: "mach1", label: "Mach 1" },
                          ]
                        : model === "civic"
                        ? [
                            { value: "lx", label: "LX" },
                            { value: "ex", label: "EX" },
                            { value: "sport", label: "Sport" },
                            { value: "touring", label: "Touring" },
                          ]
                        : []
                    }
                  />
                </div>
              )}
            </div>
          </CustomAccordion>

          {/* Year Range */}
          <CustomAccordion
            title="Year Range"
            isOpen={openAccordionItem === "year-range"}
            onToggle={() => toggleAccordion("year-range")}
          >
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  From
                </label>
                <NativeSelect
                  value={yearRange[0].toString()}
                  onValueChange={(val) => {
                    setYearRange([Number.parseInt(val), yearRange[1]]);
                  }}
                  placeholder="Select year"
                  options={Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                    (year) => ({
                      value: year.toString(),
                      label: year.toString(),
                    })
                  )}
                />
              </div>
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  To
                </label>
                <NativeSelect
                  value={yearRange[1].toString()}
                  onValueChange={(val) => {
                    setYearRange([yearRange[0], Number.parseInt(val)]);
                  }}
                  placeholder="Select year"
                  options={Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                    (year) => ({
                      value: year.toString(),
                      label: year.toString(),
                      disabled: year < yearRange[0],
                    })
                  )}
                />
              </div>
            </div>
          </CustomAccordion>

          {/* Condition */}
          <CustomAccordion
            title="Condition"
            isOpen={openAccordionItem === "condition"}
            onToggle={() => toggleAccordion("condition")}
          >
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`new-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("new")}
                  onChange={() => {
                    handleConditionChange("new");
                  }}
                />
                <label
                  htmlFor={`new-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`used-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("used")}
                  onChange={() => {
                    handleConditionChange("used");
                  }}
                />
                <label
                  htmlFor={`used-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Used
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`demo-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={condition.includes("demo")}
                  onChange={() => {
                    handleConditionChange("demo");
                  }}
                />
                <label
                  htmlFor={`demo-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Demo
                </label>
              </div>
            </div>
          </CustomAccordion>

          {/* Price Range */}
          <CustomAccordion
            title="Price Range"
            isOpen={openAccordionItem === "price-range"}
            onToggle={() => toggleAccordion("price-range")}
          >
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label
                  htmlFor={`min-price-${isMobile ? "mobile" : "desktop"}`}
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    id={`min-price-${isMobile ? "mobile" : "desktop"}`}
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                    }}
                    className="pl-7 mobile-large-input"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={`max-price-${isMobile ? "mobile" : "desktop"}`}
                  className="md:text-base text-muted-foreground mb-2 block mobile-large-text"
                >
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    id={`max-price-${isMobile ? "mobile" : "desktop"}`}
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                    }}
                    className="pl-7 mobile-large-input"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </CustomAccordion>

          {/* Mileage Range */}
          <CustomAccordion
            title="Mileage Range"
            isOpen={openAccordionItem === "mileage-range"}
            onToggle={() => toggleAccordion("mileage-range")}
          >
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
                  }}
                  min="0"
                  className="mobile-large-input"
                />
              </div>
            </div>
          </CustomAccordion>

          {/* Drivetrain */}
          <CustomAccordion
            title="Drivetrain"
            isOpen={openAccordionItem === "drivetrain"}
            onToggle={() => toggleAccordion("drivetrain")}
          >
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`front-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("front")}
                  onChange={() => {
                    handleDrivetrainChange("front");
                  }}
                />
                <label
                  htmlFor={`front-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Front-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`rear-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("rear")}
                  onChange={() => {
                    handleDrivetrainChange("rear");
                  }}
                />
                <label
                  htmlFor={`rear-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Rear-wheel drive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`4x4-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={drivetrain.includes("4x4")}
                  onChange={() => {
                    handleDrivetrainChange("4x4");
                  }}
                />
                <label
                  htmlFor={`4x4-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  4x4
                </label>
              </div>
            </div>
          </CustomAccordion>

          {/* Transmission */}
          <CustomAccordion
            title="Transmission"
            isOpen={openAccordionItem === "transmission"}
            onToggle={() => toggleAccordion("transmission")}
          >
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`auto-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={transmission.includes("auto")}
                  onChange={() => {
                    handleTransmissionChange("auto");
                  }}
                />
                <label
                  htmlFor={`auto-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Automatic
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`manual-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={transmission.includes("manual")}
                  onChange={() => {
                    handleTransmissionChange("manual");
                  }}
                />
                <label
                  htmlFor={`manual-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Manual
                </label>
              </div>
            </div>
          </CustomAccordion>

          {/* Fuel Type */}
          <CustomAccordion
            title="Fuel type"
            isOpen={openAccordionItem === "fuel-type"}
            onToggle={() => toggleAccordion("fuel-type")}
          >
            <div className="space-y-3 mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`petrol-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("petrol")}
                  onChange={() => {
                    handleFuelTypeChange("petrol");
                  }}
                />
                <label
                  htmlFor={`petrol-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Petrol
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`diesel-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("diesel")}
                  onChange={() => {
                    handleFuelTypeChange("diesel");
                  }}
                />
                <label
                  htmlFor={`diesel-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Diesel
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`hybrid-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("hybrid")}
                  onChange={() => {
                    handleFuelTypeChange("hybrid");
                  }}
                />
                <label
                  htmlFor={`hybrid-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Hybrid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`electric-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("electric")}
                  onChange={() => {
                    handleFuelTypeChange("electric");
                  }}
                />
                <label
                  htmlFor={`electric-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  Electric
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`lpg-${isMobile ? "mobile" : "desktop"}`}
                  className="mr-3 h-6 w-6 mobile-large-checkbox"
                  checked={fuelType.includes("lpg")}
                  onChange={() => {
                    handleFuelTypeChange("lpg");
                  }}
                />
                <label
                  htmlFor={`lpg-${isMobile ? "mobile" : "desktop"}`}
                  className="text-base mobile-large-text"
                >
                  LPG
                </label>
              </div>
            </div>
          </CustomAccordion>

          {/* Engine */}
          <CustomAccordion
            title="Engine"
            isOpen={openAccordionItem === "engine"}
            onToggle={() => toggleAccordion("engine")}
          >
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Engine Size
                </label>
                <NativeSelect
                  value={engineSize}
                  onValueChange={(value) => {
                    setEngineSize(value);
                  }}
                  placeholder="Any size"
                  options={[
                    { value: "upto1000", label: "Up to 1000cc" },
                    { value: "upto1500", label: "Up to 1500cc" },
                    { value: "upto2000", label: "Up to 2000cc" },
                    { value: "upto2500", label: "Up to 2500cc" },
                    { value: "upto3000", label: "Up to 3000cc" },
                    { value: "above3000", label: "Above 3000cc" },
                  ]}
                />
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Horsepower
                </label>
                <NativeSelect
                  value={horsepower}
                  onValueChange={(value) => {
                    setHorsepower(value);
                  }}
                  placeholder="Any horsepower"
                  options={[
                    { value: "upto100", label: "Up to 100 HP" },
                    { value: "upto150", label: "Up to 150 HP" },
                    { value: "upto200", label: "Up to 200 HP" },
                    { value: "upto250", label: "Up to 250 HP" },
                    { value: "upto300", label: "Up to 300 HP" },
                    { value: "above300", label: "Above 300 HP" },
                  ]}
                />
              </div>
            </div>
          </CustomAccordion>

          {/* Vehicle History */}
          <CustomAccordion
            title="Vehicle History"
            isOpen={openAccordionItem === "history"}
            onToggle={() => toggleAccordion("history")}
          >
            <div className="space-y-4 mt-3">
              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Accident History
                </label>
                <NativeSelect
                  value={accident}
                  onValueChange={(value) => {
                    setAccident(value);
                  }}
                  placeholder="Any"
                  options={[
                    { value: "no", label: "No Accidents" },
                    { value: "yes", label: "Has Accident History" },
                    { value: "any", label: "Any" },
                  ]}
                />
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Service History
                </label>
                <NativeSelect
                  value={serviceHistory}
                  onValueChange={(value) => {
                    setServiceHistory(value);
                  }}
                  placeholder="Any"
                  options={[
                    { value: "full", label: "Full Service History" },
                    { value: "partial", label: "Partial Service History" },
                    { value: "none", label: "No Service History" },
                    { value: "any", label: "Any" },
                  ]}
                />
              </div>

              <div>
                <label className="md:text-base text-muted-foreground mb-2 block mobile-large-text">
                  Registration Status
                </label>
                <NativeSelect
                  value={registered}
                  onValueChange={(value) => {
                    setRegistered(value);
                  }}
                  placeholder="Any"
                  options={[
                    { value: "registered", label: "Registered" },
                    { value: "unregistered", label: "Not Registered" },
                    { value: "any", label: "Any" },
                  ]}
                />
              </div>
            </div>
          </CustomAccordion>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <style jsx global>{`
        ${scrollbarHideStyles}
        ${drawerStyles}
      `}</style>
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[370px] w-[98%] mx-auto my-[10px] rounded-2xl overflow-hidden">
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

        <div className="relative z-10 container h-full flex flex-col justify-center items-end py-[90px] md:py-[120px] text-center text-white">
          <h1 className="text-xl md:text-5xl md:w-[55%] mt-20 md:mt-0 font-bold ">
            Find your dream car easily with advanced search filters.
          </h1>
        </div>
      </section>

      {/* Mobile filters toggle and sort - sticky at the top */}
      <div className="lg:hidden sticky top-20 left-5 right-5 z-10 bg-background py-3 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={toggleMobileFilters}
          className="flex items-center gap-2 bg-white text-base py-2 px-4"
        >
          <SlidersHorizontal size={20} />
          <span className="md:inline hidden">Filters</span>
        </Button>
        <div className="flex items-center justify-between gap-3 mobile-controls">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-[40px] md:w-[40px] h-[40px] appearance-none bg-white border rounded-md text-transparent sort-icon-select"
              aria-label="Sort options"
            >
              <option value="relevance" className="text-black">
                Relevance
              </option>
              <option value="price-low" className="text-black">
                Price: Low to High
              </option>
              <option value="price-high" className="text-black">
                Price: High to Low
              </option>
              <option value="newest" className="text-black">
                Newest First
              </option>
            </select>
            <div className="absolute inset-0 text-black flex items-center justify-center pointer-events-none">
              {sortOption === "relevance" && <ArrowUpDown size={20} />}
              {sortOption === "price-low" && <ArrowDown size={20} />}
              {sortOption === "price-high" && <ArrowUp size={20} />}
              {sortOption === "newest" && <Clock size={20} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <div className="lg:hidden">
        <div
          className={`drawer-overlay ${mobileFiltersOpen ? "open" : ""}`}
          onClick={() => {
            setMobileFiltersOpen(false);
          }}
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
                onClick={() => {
                  setMobileFiltersOpen(false);
                }}
                className="h-8 w-8"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            <div className="p-6">{createFilterContent(true)}</div>
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
              {createFilterContent(false)}
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
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-[180px] appearance-none bg-transparent border rounded-md p-2 pr-8"
                    aria-label="Sort options"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    {sortOption === "relevance" && <ArrowUpDown size={18} />}
                    {sortOption === "price-low" && <ArrowDown size={18} />}
                    {sortOption === "price-high" && <ArrowUp size={18} />}
                    {sortOption === "newest" && <Clock size={18} />}
                  </div>
                </div>
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
    </div>
  );
}
