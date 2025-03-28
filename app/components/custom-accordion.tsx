"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function CustomAccordion({
  title,
  children,
  isOpen,
  onToggle,
  className,
}: CustomAccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  // Update height when content changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  return (
    <div className={cn("border-b", className)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-medium md:text-base text-lg mobile-large-text"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>
      <div
        style={{
          height: height ? `${height}px` : "0px",
          overflow: "hidden",
          transition: "height 300ms ease-out",
        }}
      >
        <div ref={contentRef} className="pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
