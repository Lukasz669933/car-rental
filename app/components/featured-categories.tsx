"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORIES = [
  {
    id: 1,
    title: "LUXURY CARS",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
    description: "Experience ultimate comfort and style",
  },
  {
    id: 2,
    title: "SPORTS CARS",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2564&auto=format&fit=crop",
    description: "Feel the thrill of performance",
  },
  {
    id: 3,
    title: "CLASSIC CARS",
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2942&auto=format&fit=crop",
    description: "Timeless elegance on wheels",
  },
];

export function FeaturedCategories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the scrolling text
    const textElements = textRef.current?.querySelectorAll(".scroll-text");
    textElements?.forEach((text) => {
      gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="py-16 bg-black" ref={containerRef}>
      {/* Scrolling Typography */}
      <div className="overflow-hidden mb-16" ref={textRef}>
        <div className="scroll-text whitespace-nowrap text-[150px] font-bold text-white opacity-20">
          FIND YOUR DREAM CAR &nbsp; • &nbsp; SELL YOUR CAR &nbsp; • &nbsp; FIND
          YOUR DREAM CAR &nbsp; • &nbsp; SELL YOUR CAR &nbsp; • &nbsp;
        </div>
      </div>

      {/* Featured Categories Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.title.toLowerCase()}`}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:opacity-60" />

              {/* Border Frame */}
              <div className="absolute inset-4 border-2 border-white/50 transition-all duration-700 group-hover:inset-6" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="transform translate-y-8 transition-transform duration-700 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/80 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    {category.description}
                  </p>
                </div>

                <div className="transform translate-y-8 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-block border-b-2 border-white pb-1">
                    Explore More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
