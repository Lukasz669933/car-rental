"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CarImageSwiper from "./car-image-swiper";

export interface Car {
  id: number;
  name: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  mileage: number;
  engineSize: string;
  description: string;
}

interface CarCardProps {
  car: Car;
  viewMode: "grid" | "list";
}

export default function CarCard({ car, viewMode }: CarCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random location data
  const locations = [
    "Los Angeles, USA",
    "Paris, France",
    "Tokyo, Japan",
    "Dubai, UAE",
    "London, UK",
    "Sydney, Australia",
  ];
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];

  // Generate random car type
  const carTypes = ["SUV", "Sport", "Sedan", "Hatchback", "Coupe"];
  const randomType = carTypes[Math.floor(Math.random() * carTypes.length)];

  // Generate random user
  const users = ["azmi", "yousri", "sarah", "john", "alex"];
  const randomUser = users[Math.floor(Math.random() * users.length)];

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        {/* Always use a horizontal layout for list view, even on mobile */}
        <div className="flex flex-row h-full">
          {/* Image container - smaller on all screen sizes for list view */}
          <div className="w-1/3 min-w-[120px] max-w-[330px] relative h-auto">
            {isMounted && <CarImageSwiper images={car.images} carId={car.id} />}
          </div>

          {/* Content container */}
          <div className="p-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center w-full justify-between gap-2 mb-1 flex-wrap">
                {/* <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  {randomType}
                </Badge> */}
                <h3 className="text-base sm:text-xl font-bold mb-1 line-clamp-1">
                  {car.name}
                </h3>
                <span className="text-[11px] sm:text-sm text-muted-foreground">
                  {randomLocation}
                </span>
              </div>

              <p className="text-sm mb-6 text-gray-600 mb-2 line-clamp-2">
                Experience luxury and performance in this meticulously
                maintained vehicle.
              </p>

              <div className="grid grid-cols-3 gap-x-4 gap-y-1 my-1">
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Year:</span>{" "}
                  {car?.year || "N/A"}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Fuel:</span>{" "}
                  {car?.fuel || "N/A"}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Engine:</span>{" "}
                  {car?.engineSize || "N/A"}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Transmission:</span>{" "}
                  {car?.transmission || "N/A"}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Mileage:</span>{" "}
                  {car?.engineSize || "1000km"}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-sm">
                  <span className="font-medium">Condition:</span>{" "}
                  {car?.transmission || "New"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <div className="flex items-center gap-1 sm:gap-2">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`}
                  />
                  <AvatarFallback>{randomUser[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-[11px] sm:text-sm">{randomUser}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-base sm:text-xl font-bold text-blue-600">
                  {car?.price?.toLocaleString()} zl
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white text-[14px] px-2 py-1 h-auto sm:h-9 sm:px-4"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {isMounted && <CarImageSwiper images={car.images} carId={car.id} />}
      <div className="p-4">
        {/* <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {randomLocation}
          </span>
        </div> */}

        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold">{car.name}</h3>
          <div className="text-right">
            <span className="font-bold text-lg text-blue-600">
              {car?.price?.toLocaleString()} zl
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">Year:</span> {car?.year || "N/A"}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">Fuel:</span> {car?.fuel || "N/A"}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">Engine:</span>{" "}
            {car?.engineSize || "N/A"}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">Transmission:</span>{" "}
            {car?.transmission || "N/A"}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`}
              />
              <AvatarFallback>{randomUser[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{randomUser}</span>
          </div>
          <Button size="sm" className="bg-blue-600 text-white">
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
