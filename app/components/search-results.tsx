"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LayoutGrid, LayoutList, ChevronUp, ArrowUpDown } from "lucide-react";
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

// Extend the car data with more entries for pagination
const EXTENDED_CARS = [
  ...CARS,
  ...CARS.map((car) => ({ ...car, id: car.id + 100 })),
  ...CARS.map((car) => ({ ...car, id: car.id + 200 })),
  ...CARS.map((car) => ({ ...car, id: car.id + 300 })),
];

export function SearchResults() {
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

  const clearFilters = () => {
    setMinPrice("0");
    setMaxPrice("150");
    setSearchRadius([25]);
    setEngineSize("");
    setTransmission([]);
    setFuelType([]);
    setLocation("");
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

  // Filter content component to reuse in both desktop and mobile views
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="min-price"
              className="text-sm text-muted-foreground mb-1 block"
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
                onChange={(e) => setMinPrice(e.target.value)}
                className="pl-7"
                min="0"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="max-price"
              className="text-sm text-muted-foreground mb-1 block"
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
                onChange={(e) => setMaxPrice(e.target.value)}
                className="pl-7"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Location</h3>
        <div>
          <label
            htmlFor="location"
            className="text-sm text-muted-foreground mb-1 block"
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

      <div>
        <label className="text-sm font-medium mb-2 block">Engine Size</label>
        <Select value={engineSize} onValueChange={setEngineSize}>
          <SelectTrigger>
            <SelectValue placeholder="Any size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1.0">1.0L</SelectItem>
            <SelectItem value="1.5">1.5L</SelectItem>
            <SelectItem value="2.0">2.0L</SelectItem>
            <SelectItem value="2.5">2.5L</SelectItem>
            <SelectItem value="3.0">3.0L+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="transmission">
          <AccordionTrigger className="text-sm font-medium py-2">
            Transmission
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto"
                  className="mr-2"
                  checked={transmission.includes("auto")}
                  onChange={() => handleTransmissionChange("auto")}
                />
                <label htmlFor="auto">Automatic</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manual"
                  className="mr-2"
                  checked={transmission.includes("manual")}
                  onChange={() => handleTransmissionChange("manual")}
                />
                <label htmlFor="manual">Manual</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="semi-auto"
                  className="mr-2"
                  checked={transmission.includes("semi-auto")}
                  onChange={() => handleTransmissionChange("semi-auto")}
                />
                <label htmlFor="semi-auto">Semi-Automatic</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fuel-type">
          <AccordionTrigger className="text-sm font-medium py-2">
            Fuel type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="petrol"
                  className="mr-2"
                  checked={fuelType.includes("petrol")}
                  onChange={() => handleFuelTypeChange("petrol")}
                />
                <label htmlFor="petrol">Petrol</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diesel"
                  className="mr-2"
                  checked={fuelType.includes("diesel")}
                  onChange={() => handleFuelTypeChange("diesel")}
                />
                <label htmlFor="diesel">Diesel</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hybrid"
                  className="mr-2"
                  checked={fuelType.includes("hybrid")}
                  onChange={() => handleFuelTypeChange("hybrid")}
                />
                <label htmlFor="hybrid">Hybrid</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="electric"
                  className="mr-2"
                  checked={fuelType.includes("electric")}
                  onChange={() => handleFuelTypeChange("electric")}
                />
                <label htmlFor="electric">Electric</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative h-[370px] w-[98%] mx-auto my-[10px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/results.jpg"
            alt="Car sales hero image"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 container h-full flex flex-col justify-between py-[90px] md:py-[120px] items-center text-center text-white">
          <div>{/* Hero content */}</div>
        </div>
      </section>

      {/* Mobile filters toggle - sticky at the top */}
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
      </div>

      {/* Mobile filters modal */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="sm:max-w-[425px] w-[90%] max-h-[600px] p-0 bg-white flex flex-col">
          <DialogHeader className="sticky top-0 z-10 bg-white p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle>Filters</DialogTitle>
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
          <div className="flex-1 overflow-y-auto p-6 ">
            <FilterContent />
          </div>

          {/* Sticky footer with apply button */}
          <div className="sticky -bottom-[250px] z-10 bg-white p-4 border-t mt-auto">
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
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <div className="flex justify-between items-center mb-6">
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
            <FilterContent />
            <div className="mt-6">
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile sort dropdown */}
          <div className="lg:hidden mb-4">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">
                  <div className="flex items-center">
                    <ArrowUpDown size={16} className="mr-2" />
                    <span>Relevance</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-6">
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
