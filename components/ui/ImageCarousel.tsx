"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useAutoCarousel from "@/hooks/useAutoCarousel";

type Props = {
  images?: string[];
  alt: string;
  onImageClick?: (index: number) => void;
};

export default function ImageCarousel({
  images = [],
  alt,
  onImageClick,
}: Props) {
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    pauseAutoPlay();
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) return;

    const distance = touchStartXRef.current - touchEndXRef.current;

    if (distance > 50) goNext();
    if (distance < -50) goPrev();
  };

  const handleImageError = (index: number, img: string) => {
    console.error(`[ImageCarousel] image failed to load: ${img}`);
    setFailedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  if (!images.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500">
        No image
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-stone-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={`${alt}-${index}`}
            className="relative h-full min-w-full"
          >
            {failedImages[index] ? (
              <div className="flex h-full w-full items-center justify-center bg-stone-200 text-sm text-stone-500">
                Image failed: {img}
              </div>
            ) : (
              <Image
                src={img}
                alt={`${alt}-${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover select-none cursor-pointer"
                draggable={false}
                onClick={() => onImageClick?.(index)}
                onError={() => handleImageError(index, img)}
              />
            )}
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
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
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
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={`dot-${alt}-${index}`}
                type="button"
                onClick={() => {
                  pauseAutoPlay();
                  setCurrent(index);
                }}
                className={`h-2.5 w-2.5 rounded-full ${
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