"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import CarImageSwiper from "./car-image-swiper"

export interface Car {
  id: number
  name: string
  images: string[]
  price: number
  rating: number
  reviews: number
  seats: number
  transmission: string
  fuel: string
  year: number
  mileage: number
  engineSize: string
}

interface CarCardProps {
  car: Car
  viewMode: "grid" | "list"
}

export default function CarCard({ car, viewMode }: CarCardProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate random location data
  const locations = [
    "Los Angeles, USA",
    "Paris, France",
    "Tokyo, Japan",
    "Dubai, UAE",
    "London, UK",
    "Sydney, Australia",
  ]
  const randomLocation = locations[Math.floor(Math.random() * locations.length)]

  // Generate random car type
  const carTypes = ["SUV", "Sport", "Sedan", "Hatchback", "Coupe"]
  const randomType = carTypes[Math.floor(Math.random() * carTypes.length)]

  // Generate random price per day with null check
  const pricePerDay = car && car.price ? Math.floor(car.price / 100) : 0

  // Generate random user
  const users = ["azmi", "yousri", "sarah", "john", "alex"]
  const randomUser = users[Math.floor(Math.random() * users.length)]

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">{isMounted && <CarImageSwiper images={car.images} carId={car.id} />}</div>
          <div className="p-4 md:p-6 flex-1">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    {randomType}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{randomLocation}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {car?.year || "N/A"} model with {car?.mileage ? car.mileage.toLocaleString() : "N/A"} miles.
                  {car?.fuel || "N/A"} engine with {car?.transmission || "N/A"} transmission.
                </p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div className="text-2xl font-bold text-blue-600">${pricePerDay}/Day</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Year:</span> {car?.year || "N/A"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Fuel:</span> {car?.fuel || "N/A"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Engine:</span> {car?.engineSize || "N/A"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Transmission:</span> {car?.transmission || "N/A"}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`} />
                  <AvatarFallback>{randomUser[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{randomUser}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <MessageCircle size={16} className="mr-1" />
                  Chat
                </Button>
                <Button size="sm">View details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {isMounted && <CarImageSwiper images={car.images} carId={car.id} />}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            {randomType}
          </Badge>
          <span className="text-sm text-muted-foreground">{randomLocation}</span>
        </div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold">{car.name}</h3>
          <div className="text-right">
            <span className="font-bold text-lg text-blue-600">${pricePerDay}/Day</span>
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
            <span className="font-medium">Engine:</span> {car?.engineSize || "N/A"}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">Transmission:</span> {car?.transmission || "N/A"}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`} />
              <AvatarFallback>{randomUser[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{randomUser}</span>
          </div>
          <Button size="sm">View details</Button>
        </div>
      </div>
    </div>
  )
}

