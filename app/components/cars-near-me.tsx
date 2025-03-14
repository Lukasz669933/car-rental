"use client";
import Image from "next/image";
import { Star, Gauge, Fuel, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CARS = [
  {
    id: 1,
    name: "Toyota RAV4",
    images: [
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2067&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 28500,
    rating: 4.8,
    reviews: 124,
    seats: 5,
    transmission: "Auto",
    fuel: "Hybrid",
    year: 2023,
    mileage: 12500,
    engineSize: "2.5L",
  },
  {
    id: 2,
    name: "Ford Mustang",
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547245324-d777c6f05e80?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 42800,
    rating: 4.9,
    reviews: 87,
    seats: 4,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2022,
    mileage: 8700,
    engineSize: "5.0L",
  },
  {
    id: 3,
    name: "Lamborghini Huracan",
    images: [
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517994112540-009c47ea476b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 215000,
    rating: 5.0,
    reviews: 32,
    seats: 2,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2023,
    mileage: 3200,
    engineSize: "5.2L",
  },
  {
    id: 4,
    name: "Toyota Supra",
    images: [
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2072&auto=format&fit=crop",
    ],
    price: 58900,
    rating: 4.7,
    reviews: 56,
    seats: 2,
    transmission: "Manual",
    fuel: "Petrol",
    year: 2022,
    mileage: 15600,
    engineSize: "3.0L",
  },
];

export function CarsNearMe() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [isAnimating, setIsAnimating] = useState<{ [key: number]: boolean }>(
    {}
  );

  const nextImage = (carId: number) => {
    if (isAnimating[carId]) return;
    setIsAnimating((prev) => ({ ...prev, [carId]: true }));

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [carId]: Math.min((prev[carId] || 0) + 1, 2),
    }));

    setTimeout(() => {
      setIsAnimating((prev) => ({ ...prev, [carId]: false }));
    }, 300);
  };

  const prevImage = (carId: number) => {
    if (isAnimating[carId]) return;
    setIsAnimating((prev) => ({ ...prev, [carId]: true }));

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [carId]: Math.max((prev[carId] || 0) - 1, 0),
    }));

    setTimeout(() => {
      setIsAnimating((prev) => ({ ...prev, [carId]: false }));
    }, 300);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Cars For Sale Near Me</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARS.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out absolute w-[300%] h-full"
                  style={{
                    transform: `translateX(-${
                      (currentImageIndexes[car.id] || 0) * 33.333
                    }%)`,
                  }}
                >
                  {car.images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <Image
                        src={image}
                        alt={`${car.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => prevImage(car.id)}
                    disabled={
                      (currentImageIndexes[car.id] || 0) === 0 ||
                      isAnimating[car.id]
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => nextImage(car.id)}
                    disabled={
                      (currentImageIndexes[car.id] || 0) === 2 ||
                      isAnimating[car.id]
                    }
                  >
                    {(currentImageIndexes[car.id] || 0) === 2 ? (
                      <span className="text-xs">More</span>
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        (currentImageIndexes[car.id] || 0) === index
                          ? "bg-white"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 ">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{car.name}</h3>
                  <div className="text-right">
                    <span className="font-bold text-lg">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{car.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({car.reviews} reviews)
                  </span>
                </div> */}

                <div className="grid grid-cols-2 gap-2 my-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Year:</span>
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Fuel:</span>
                    <span>{car.fuel.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Engine:</span>
                    <span>{car.engineSize}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Transmission:</span>
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 items-center">
                    {[1].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="User avatar"
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                    <p className="text-sm font-medium">Charles</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
