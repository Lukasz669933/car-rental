"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const MAKES = [
  {
    id: 1,
    name: "Toyota",
    logo: "/toyota.png",
    background:
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2071&auto=format&fit=crop",
    description: "Reliable Japanese engineering with innovative technology",
  },
  {
    id: 2,
    name: "BMW",
    logo: "/BMW.png",
    background:
      "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2427&auto=format&fit=crop",
    description: "The ultimate driving machines with luxury and performance",
  },
  {
    id: 3,
    name: "Mercedes",
    logo: "/Mercedes.png",
    background:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    description: "Luxury vehicles with cutting-edge technology and comfort",
  },
  {
    id: 4,
    name: "Audi",
    logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
    background:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    description:
      "Sophisticated design with advanced technology and performance",
  },
  {
    id: 5,
    name: "Porsche",
    logo: "/porsche.webp",
    background:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    description: "Precision German sports cars with unmatched performance",
  },
  {
    id: 6,
    name: "Tesla",
    logo: "/tesla.png",
    background:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    description:
      "Revolutionary electric vehicles redefining the automotive industry",
  },
  {
    id: 7,
    name: "Ford",
    logo: "/ford.png",
    background:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2070&auto=format&fit=crop",
    description:
      "American-made vehicles with a legacy of innovation and performance",
  },
  {
    id: 8,
    name: "Honda",
    logo: "/honda.png",
    background:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    description: "Reliable and efficient vehicles with excellent resale value",
  },
];

export function BrowseByMake() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    // Skip effect during SSR
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Calculate the scroll distance needed for the full horizontal scroll
    const calculateScrollDistance = () => {
      if (!container) return 0;
      // Total width of all items minus the viewport width
      return container.scrollWidth - window.innerWidth;
    };

    // Set up the scroll height to accommodate the horizontal scroll
    const setScrollHeight = () => {
      if (!section) return;
      // The extra height needed to scroll through all content horizontally
      const extraHeight = calculateScrollDistance() * 1.5; // Multiply by a factor to control scroll speed
      // Set a minimum height for the section to ensure pinning works
      section.style.height = `${window.innerHeight + extraHeight}px`;
    };

    // Handle scroll event
    const handleScroll = () => {
      if (!section || !container) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Start pinning when the section top reaches the top of the viewport
      if (sectionTop <= 0 && sectionTop > -sectionHeight + viewportHeight) {
        setIsPinned(true);

        // Calculate how far we've scrolled into the section
        const scrolledIntoSection = -sectionTop;
        const maxScroll = sectionHeight - viewportHeight;
        const progress = Math.min(scrolledIntoSection / maxScroll, 1);
        setScrollProgress(progress);

        // Apply horizontal scroll based on progress
        const scrollDistance = calculateScrollDistance();
        if (container) {
          container.style.transform = `translateX(-${
            progress * scrollDistance
          }px)`;
        }
      } else {
        setIsPinned(false);
      }
    };

    // Initialize
    setScrollHeight();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setScrollHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setScrollHeight);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div
        className={`sticky top-0 w-screen h-screen overflow-hidden ${
          isPinned ? "z-10" : ""
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20">
          <div
            className="h-full bg-blue-600 transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Title overlay */}
        <div className="absolute top-8 left-8 z-20">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            Browse by Make
          </h2>
        </div>

        {/* Horizontal scrollable content */}
        <div
          ref={containerRef}
          className="flex transition-transform duration-100 will-change-transform h-screen"
          style={{
            width: `${MAKES.length * 100}vw`,
          }}
        >
          {MAKES.map((make) => (
            <div key={make.id} className="w-screen h-screen flex-shrink-0">
              <div className="relative h-full w-full">
                {/* Full-screen background image */}
                <Image
                  src={make.background || "/placeholder.svg"}
                  alt={`${make.name} cars`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-white p-4">
                  <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl max-w-xl w-full text-center">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full p-4 mb-6 shadow-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src={make.logo || "/placeholder.svg"}
                          alt={make.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold mb-4">{make.name}</h3>
                    <p className="text-xl mb-8">{make.description}</p>
                    <Link
                      href={`/make/${make.name.toLowerCase()}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors text-lg"
                    >
                      View {make.name} Vehicles
                    </Link>
                  </div>
                </div>

                {/* Brand indicator */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                  {MAKES.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === MAKES.indexOf(make) ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
