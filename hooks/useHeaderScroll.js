"use client";

import { useEffect, useState } from "react";
import {
  HEADER_EXPAND_THRESHOLD,
  HEADER_COLLAPSE_THRESHOLD,
} from "@/constants/header";

export default function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled((prev) => {
        if (!prev && y > HEADER_COLLAPSE_THRESHOLD) return true;
        if (prev && y < HEADER_EXPAND_THRESHOLD) return false;
        return prev;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolled;
}