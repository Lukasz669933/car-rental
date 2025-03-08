import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TurnCarIntoCash() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center py-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CTA.png"
          alt="Car background"
          fill
          className="object-cover brightness-[0.2]"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Sell Your Car for Top Dollar
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Listing your car on Ojest is a great way to get the best price. We
          connect you with thousands of potential buyers.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">List Your Car</Button>
      </div>
    </section>
  );
}
