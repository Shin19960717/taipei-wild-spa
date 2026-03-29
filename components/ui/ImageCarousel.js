"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useAutoCarousel from "@/hooks/useAutoCarousel";

export default function ImageCarousel({ images = [], alt, onImageClick }) {
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(null);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const hasMultipleImages = images.length > 1;

  const { current, setCurrent, goNext, goPrev } = useAutoCarousel(
    images.length,
    3000,
    isPaused
  );

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  }, []);

  useEffect(() => {
    if (!hasMultipleImages || !isPaused || !lastInteraction) return;

    const resumeDelay = 5000;
    const elapsed = Date.now() - lastInteraction;
    const remaining = Math.max(resumeDelay - elapsed, 0);

    const timer = window.setTimeout(() => {
      setIsPaused(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [hasMultipleImages, isPaused, lastInteraction]);

  const handleTouchStart = (e) => {
    pauseAutoPlay();
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) return;

    const distance = touchStartXRef.current - touchEndXRef.current;

    if (distance > 50) goNext();
    if (distance < -50) goPrev();
  };

  if (!images.length) {
    return (
      <div className="w-full h-[320px] bg-stone-200 flex items-center justify-center text-stone-500">
        No image
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[320px] overflow-hidden bg-stone-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={`${alt}-${index}`}
            className="relative w-full h-full shrink-0"
          >
            <Image
              src={img}
              alt={`${alt}-${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover select-none cursor-pointer"
              draggable={false}
              onClick={() => onImageClick?.(index)}
            />
          </div>
        ))}
      </div>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={() => {
              pauseAutoPlay();
              goPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => {
              pauseAutoPlay();
              goNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={`dot-${alt}-${index}`}
                type="button"
                onClick={() => {
                  pauseAutoPlay();
                  setCurrent(index);
                }}
                className={`w-2.5 h-2.5 rounded-full ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}