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
      className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-white dark:bg-gray-900 "
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-64 h-24 mb-8">
        {/* Car body */}
        <motion.div
          className="absolute bottom-0 w-48 h-10 bg-blue-600 rounded-t-3xl rounded-b-lg"
          style={{ left: "30px" }}
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Car top */}
        <motion.div
          className="absolute w-28 h-8 bg-blue-600 rounded-t-3xl"
          style={{ bottom: "10px", left: "40px" }}
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front window */}
        <motion.div
          className="absolute w-10 h-7 bg-blue-300 rounded-tr-xl"
          style={{ bottom: "10px", left: "40px" }}
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rear window */}
        <motion.div
          className="absolute w-10 h-7 bg-blue-300 rounded-tl-xl"
          style={{ bottom: "10px", right: "58px" }}
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front wheel */}
        <motion.div
          className="absolute w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-300"
          style={{ bottom: "-5px", left: "42px" }}
          animate={{
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Rear wheel */}
        <motion.div
          className="absolute w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-300"
          style={{ bottom: "-5px", right: "42px" }}
          animate={{
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Road */}
        <motion.div
          className="absolute bottom-0 w-full h-1 bg-gray-600"
          animate={{
            backgroundPosition: ["0px 0px", "100px 0px"],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, white, white 10px, transparent 10px, transparent 20px)",
          }}
        />

        {/* Headlight beam */}
        <motion.div
          className="absolute w-16 h-4 bg-yellow-100 rounded-r-full opacity-60"
          style={{ bottom: "2px", left: "78px" }}
          animate={{
            x: [-10, 10, -10],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.div
        className="flex items-center justify-center space-x-2 mt-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.h2
          className="text-xl font-bold text-blue-600"
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
