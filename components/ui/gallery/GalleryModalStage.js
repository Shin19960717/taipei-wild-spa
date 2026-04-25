"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MODAL_ARROW_BUTTON_CLASS,
  MODAL_CLOSE_BUTTON_CLASS,
} from "./galleryModal.constants";

export default function GalleryModalStage({
  member,
  imageIndex,
  onClose,
  onPrev,
  onNext,
  onSelectImage,
  interactionSignal,
  fullScreen = false,
}) {
  const images = member?.imgs ?? [];
  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;

  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  const [current, setCurrent] = useState(imageIndex ?? 0);

  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  }, []);

  useEffect(() => {
    setCurrent(imageIndex ?? 0);
  }, [imageIndex]);

  useEffect(() => {
    if (!hasMultipleImages || !interactionSignal) return;
    pauseAutoPlay();
  }, [interactionSignal, hasMultipleImages, pauseAutoPlay]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const timer = window.setTimeout(() => {
      handleGoNext();
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [current, hasMultipleImages, isPaused]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (!hasMultipleImages) return;

      if (e.key === "ArrowLeft") {
        pauseAutoPlay();
        handleGoPrev();
      }

      if (e.key === "ArrowRight") {
        pauseAutoPlay();
        handleGoNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, pauseAutoPlay, current, totalImages]);

  const handleGoPrev = useCallback(() => {
    if (!hasMultipleImages) return;

    const nextIndex = (current - 1 + totalImages) % totalImages;

    setCurrent(nextIndex);
    onPrev?.();
  }, [current, hasMultipleImages, totalImages, onPrev]);

  const handleGoNext = useCallback(() => {
    if (!hasMultipleImages) return;

    const nextIndex = (current + 1) % totalImages;

    setCurrent(nextIndex);
    onNext?.();
  }, [current, hasMultipleImages, totalImages, onNext]);

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

    if (distance > 50) {
      handleGoNext();
    }

    if (distance < -50) {
      handleGoPrev();
    }
  };

  const handleImageError = (index, img) => {
    console.error(`[GalleryModalStage] image failed to load: ${img}`);

    setFailedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  if (!member || !images.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={MODAL_CLOSE_BUTTON_CLASS}
        aria-label="Close gallery"
      >
        ×
      </button>

      <div
        className={
          fullScreen
            ? "relative h-[70vh] w-full overflow-hidden bg-black lg:h-[78vh]"
            : "relative h-[55vh] w-full overflow-hidden bg-black md:h-[70vh]"
        }
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
              key={`${member.name}-${index}`}
              className="relative h-full min-w-full bg-black"
            >
              {failedImages[index] ? (
                <div className="flex h-full w-full items-center justify-center bg-stone-900 text-sm text-stone-300">
                  Image failed: {img}
                </div>
              ) : (
                <Image
                  src={img}
                  alt={`${member.name}-${index + 1}`}
                  fill
                  unoptimized
                  sizes={
                    fullScreen
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 100vw, 60vw"
                  }
                  className="cursor-pointer select-none object-cover"
                  draggable={false}
                  priority={index === current}
                  onClick={() => onSelectImage?.(index)}
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
                handleGoPrev();
              }}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-3 md:left-4`}
              aria-label="Previous gallery image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => {
                pauseAutoPlay();
                handleGoNext();
              }}
              className={`${MODAL_ARROW_BUTTON_CLASS} right-3 md:right-4`}
              aria-label="Next gallery image"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={`modal-dot-${member.name}-${index}`}
                  type="button"
                  onClick={() => {
                    pauseAutoPlay();
                    setCurrent(index);
                    onSelectImage?.(index);
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
    </>
  );
}