"use client";

import { useCallback, useEffect, useState } from "react";

export default function useAutoCarousel(length, delay = 3000, paused = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [length, delay, paused]);

  useEffect(() => {
    if (current >= length) {
      setCurrent(0);
    }
  }, [current, length]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % length);
  }, [length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + length) % length);
  }, [length]);

  return {
    current,
    setCurrent,
    goNext,
    goPrev,
  };
}