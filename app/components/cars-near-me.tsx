import Image from "next/image";
import { Star, Gauge, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CARS = [
  {
    id: 1,
    name: "Toyota RAV4",
    image:
      "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2067&auto=format&fit=crop",
    price: 28500,
    rating: 4.8,
    reviews: 124,
    seats: 5,
    transmission: "Auto",
    fuel: "Hybrid",
    year: 2023,
    mileage: 12500,
  },
  {
    id: 2,
    name: "Ford Mustang",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2070&auto=format&fit=crop",
    price: 42800,
    rating: 4.9,
    reviews: 87,
    seats: 4,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2022,
    mileage: 8700,
  },
  {
    id: 3,
    name: "Lamborghini Huracan",
    image:
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
    price: 215000,
    rating: 5.0,
    reviews: 32,
    seats: 2,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2023,
    mileage: 3200,
  },
  {
    id: 4,
    name: "Toyota Supra",
    image:
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
    price: 58900,
    rating: 4.7,
    reviews: 56,
    seats: 2,
    transmission: "Manual",
    fuel: "Petrol",
    year: 2022,
    mileage: 15600,
  },
];

export function CarsNearMe() {
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
              <div className="relative h-48">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-blue-600">
                  Popular
                </Badge>
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

                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{car.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({car.reviews} reviews)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Year:</span>
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="font-medium">Mileage:</span>
                    <span>{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Gauge className="h-4 w-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Fuel className="h-4 w-4" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
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
