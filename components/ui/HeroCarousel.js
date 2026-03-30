"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function useAutoCarousel(length, delay = 4000, paused = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!length || length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [length, delay, paused]);

  useEffect(() => {
    if (!length) return;
    if (current >= length) setCurrent(0);
  }, [current, length]);

  return current;
}

export default function HeroCarousel({ images = [] }) {
  const validImages = images.filter(
    (img) => typeof img === "string" && img.trim().length > 0
  );

  const current = useAutoCarousel(validImages.length, 4000);

  if (!validImages.length) return null;

  return (
    <div className="absolute inset-0 h-full w-full">
      {validImages.map((img, index) => (
        <div
          key={`hero-${index}`}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={current !== index}
        >
          <Image
            src={img}
            alt={`hero-${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}