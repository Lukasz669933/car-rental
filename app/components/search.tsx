"use client"

import { useState } from "react"
import { MapPin, Car, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Search() {
  const [location, setLocation] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [priceRange, setPriceRange] = useState("")

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        <div className="p-4 border-b md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <Input
            type="text"
            placeholder="Enter location"
            className="border-0 p-0 h-8 focus-visible:ring-0 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="p-4 border-b md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 mb-1">
            <Car className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Make</span>
          </div>
          <Select onValueChange={setMake} value={make}>
            <SelectTrigger className="border-0 p-0 h-8 focus:ring-0 shadow-none text-sm">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 border-b md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 mb-1">
            <Car className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Model</span>
          </div>
          <Select onValueChange={setModel} value={model}>
            <SelectTrigger className="border-0 p-0 h-8 focus:ring-0 shadow-none text-sm">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {/* Models would be dynamically populated based on make */}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Price Range</span>
          </div>
          <Select onValueChange={setPriceRange} value={priceRange}>
            <SelectTrigger className="border-0 p-0 h-8 focus:ring-0 shadow-none text-sm">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10000">$0 - $10,000</SelectItem>
              <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
              <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
              <SelectItem value="30000-50000">$30,000 - $50,000</SelectItem>
              <SelectItem value="50000+">$50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Search for Cars</Button>
      </div>
    </div>
  )
}

