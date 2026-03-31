"use client";

import { useEffect, useRef, useState } from "react";
import {
  HEADER_EXPAND_THRESHOLD,
  HEADER_COLLAPSE_THRESHOLD,
} from "@/constants/header";

export default function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;

      setScrolled((prev) => {
        if (!prev && y > HEADER_COLLAPSE_THRESHOLD) return true;
        if (prev && y < HEADER_EXPAND_THRESHOLD) return false;
        return prev;
      });

      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolled;
}