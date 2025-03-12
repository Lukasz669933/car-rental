"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Small delay to ensure smooth transition
    };

    // Check if document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-[300px] h-[180px]">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8"
          animate={{
            x: [-20, 20, -20],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 1000 600"
            className="w-[280px] h-auto"
            aria-label="Running horse"
          >
            {/* Body */}
            <motion.path
              d="M700,300 C700,250 650,220 600,220 C550,220 500,240 450,250 C400,260 350,270 300,270 C250,270 200,260 150,270 C100,280 80,320 100,350 C120,380 150,370 200,370 C250,370 300,360 350,360 C400,360 450,370 500,370 C550,370 600,360 650,340 C700,320 720,350 700,300 Z"
              fill="#783F04"
              stroke="#000"
              strokeWidth="3"
              animate={{
                scale: [1, 0.98, 1],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Neck */}
            <motion.path
              d="M150,270 C140,240 130,210 140,180 C150,150 180,130 200,150"
              fill="#783F04"
              stroke="#000"
              strokeWidth="3"
              animate={{
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Head */}
            <motion.path
              d="M140,180 C120,170 100,170 80,180 C60,190 50,210 60,230 C70,250 90,260 110,250 C130,240 140,220 140,180 Z"
              fill="#783F04"
              stroke="#000"
              strokeWidth="3"
              animate={{
                rotate: [-5, 0, -5],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Ears, Eye, Nostril, and Mouth remain static */}
            <path
              d="M120,150 C110,130 120,110 140,120 C160,130 140,150 120,150 Z"
              fill="#783F04"
              stroke="#000"
              strokeWidth="2"
            />
            <path
              d="M100,145 C90,125 100,105 120,115 C140,125 120,145 100,145 Z"
              fill="#783F04"
              stroke="#000"
              strokeWidth="2"
            />
            <ellipse cx="90" cy="200" rx="5" ry="7" fill="#000" />
            <ellipse cx="60" cy="220" rx="8" ry="5" fill="#500" />
            <path
              d="M60,230 C70,235 80,235 90,230"
              fill="none"
              stroke="#000"
              strokeWidth="2"
            />

            {/* Mane */}
            <motion.path
              d="M200,150 C210,130 220,110 200,90 C180,70 160,60 150,80 C140,100 130,120 130,140 C130,160 140,180 150,180"
              fill="#4A2511"
              stroke="#000"
              strokeWidth="2"
              animate={{
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Tail */}
            <motion.path
              d="M700,300 C730,290 750,270 760,240 C770,210 770,180 760,150 C750,120 730,100 710,90"
              fill="#4A2511"
              stroke="#000"
              strokeWidth="3"
              animate={{
                rotate: [-10, 10, -10],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Front legs */}
            <motion.path
              d="M200,370 C200,400 195,430 190,460 C185,490 180,520 190,550"
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: [30, -30, 30],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M300,370 C300,400 295,430 290,460 C285,490 280,520 290,550"
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: [-30, 30, -30],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.25,
              }}
            />

            {/* Back legs */}
            <motion.path
              d="M500,370 C500,390 510,410 520,430 C530,450 540,470 530,550"
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: [30, -30, 30],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.125,
              }}
            />
            <motion.path
              d="M650,340 C650,370 660,400 670,430 C680,460 690,490 680,550"
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: [-30, 30, -30],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.375,
              }}
            />

            {/* Hooves */}
            <motion.path
              d="M180,550 C185,560 195,560 200,550"
              fill="#000"
              stroke="#000"
              strokeWidth="3"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M280,550 C285,560 295,560 300,550"
              fill="#000"
              stroke="#000"
              strokeWidth="3"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.25,
              }}
            />
            <motion.path
              d="M520,550 C525,560 535,560 540,550"
              fill="#000"
              stroke="#000"
              strokeWidth="3"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.125,
              }}
            />
            <motion.path
              d="M670,550 C675,560 685,560 690,550"
              fill="#000"
              stroke="#000"
              strokeWidth="3"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.375,
              }}
            />
          </svg>
        </motion.div>

        {/* Ground/Road */}
        <motion.div
          className="absolute bottom-0 w-full h-1 bg-gray-300"
          animate={{
            backgroundPosition: ["0px 0px", "-100px 0px"],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #9ca3af, #9ca3af 10px, transparent 10px, transparent 20px)",
          }}
        />

        {/* Dust Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              bottom: `${8 + Math.random() * 10}px`,
              left: `${160 + i * 20}px`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5],
              x: [-10, 30],
              y: [0, -20],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.2,
            }}
          >
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex items-center justify-center space-x-2 mt-8"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.h2
          className="text-xl font-bold text-orange-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Sell or buy a car...
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLoader;
