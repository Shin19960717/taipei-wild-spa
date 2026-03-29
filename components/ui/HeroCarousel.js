"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function useAutoCarousel(length, delay = 3000, paused = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [length, delay, paused]);

  useEffect(() => {
    if (current >= length) setCurrent(0);
  }, [current, length]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % length);
  }, [length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + length) % length);
  }, [length]);

  return { current, setCurrent, goNext, goPrev };
}

export default function HeroCarousel({ images }) {
  const { current } = useAutoCarousel(images.length, 4000);

  if (!images?.length) return null;

  return (
    <div className="absolute inset-0">
      {images.map((img, index) => (
        <div
          key={`hero-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`hero-${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}