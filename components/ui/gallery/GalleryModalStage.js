"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MODAL_ARROW_BUTTON_CLASS } from "./galleryModal.constants";

export default function GalleryModalStage({
  member,
  imageIndex,
  onPrev,
  onNext,
  onSelectImage,
  interactionSignal,
  fullScreen = false,
  isFullLightboxOpen = false,
  setIsFullLightboxOpen,
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

  const syncSelectImage = useCallback(
    (index) => {
      setCurrent(index);
      onSelectImage?.(index);
    },
    [onSelectImage]
  );

  useEffect(() => {
    setCurrent(imageIndex ?? 0);
  }, [imageIndex]);

const handleGoPrev = useCallback(() => {
  if (!hasMultipleImages) return;

  const nextIndex = (current - 1 + totalImages) % totalImages;

  syncSelectImage(nextIndex);
}, [current, hasMultipleImages, totalImages, syncSelectImage]);

const handleGoNext = useCallback(() => {
  if (!hasMultipleImages) return;

  const nextIndex = (current + 1) % totalImages;

  syncSelectImage(nextIndex);
}, [current, hasMultipleImages, totalImages, syncSelectImage]);
  useEffect(() => {
    if (!hasMultipleImages || !interactionSignal) return;

    pauseAutoPlay();
  }, [interactionSignal, hasMultipleImages, pauseAutoPlay]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused || isFullLightboxOpen) return;

    const timer = window.setTimeout(() => {
      handleGoNext();
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [current, hasMultipleImages, isPaused, isFullLightboxOpen, handleGoNext]);

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
    const handleKeyDown = (event) => {
      if (!hasMultipleImages) return;

      if (event.key === "ArrowLeft") {
        pauseAutoPlay();
        handleGoPrev();
      }

      if (event.key === "ArrowRight") {
        pauseAutoPlay();
        handleGoNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, pauseAutoPlay, handleGoPrev, handleGoNext]);

  const handleTouchStart = (event) => {
    pauseAutoPlay();
    touchStartXRef.current = event.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (event) => {
    touchEndXRef.current = event.targetTouches[0].clientX;
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

  const handleOpenFullLightbox = (index) => {
    pauseAutoPlay();
    syncSelectImage(index);
    setIsFullLightboxOpen?.(true);
  };

  const handleCloseFullLightbox = () => {
    setIsFullLightboxOpen?.(false);
  };

  const handleSelectLightboxImage = (index) => {
    pauseAutoPlay();
    syncSelectImage(index);
  };

  const handleImageError = (index, img) => {
    console.error(`[GalleryModalStage] image failed to load: ${img}`);

    setFailedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  if (!member || !images.length) return null;

  const currentImage = images[current];

  return (
    <>
      <div
        className={
          fullScreen
            ? "relative h-full min-h-0 w-full overflow-hidden bg-black"
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
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 100vw, 60vw"
                  }
                  className="cursor-zoom-in select-none object-cover"
                  draggable={false}
                  priority={index === current}
                  onClick={() => handleOpenFullLightbox(index)}
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
              className={`${MODAL_ARROW_BUTTON_CLASS} left-3 md:left-5`}
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
              className={`${MODAL_ARROW_BUTTON_CLASS} right-3 md:right-5`}
              aria-label="Next gallery image"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={`modal-dot-${member.name}-${index}`}
                  type="button"
                  onClick={() => {
                    pauseAutoPlay();
                    syncSelectImage(index);
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

      {isFullLightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95"
          onClick={handleCloseFullLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleCloseFullLightbox();
            }}
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur-md transition hover:bg-white/25"
            aria-label="Close full image lightbox"
          >
            ×
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  pauseAutoPlay();
                  handleGoPrev();
                }}
                className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white backdrop-blur-md transition hover:bg-white/25 md:left-8 md:h-14 md:w-14"
                aria-label="Previous full image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  pauseAutoPlay();
                  handleGoNext();
                }}
                className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white backdrop-blur-md transition hover:bg-white/25 md:right-8 md:h-14 md:w-14"
                aria-label="Next full image"
              >
                ›
              </button>
            </>
          )}

          <div
            className="flex h-full w-full flex-col"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
<div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-3 pt-16 md:px-20 md:pb-5 md:pt-16">
  <div className="relative flex h-full w-full items-center justify-center">
    <Image
      src={currentImage}
      alt={`${member.name}-full-${current + 1}`}
      width={1600}
      height={2200}
      unoptimized
      priority
      sizes="100vw"
      className="max-h-full max-w-full select-none object-contain"
      draggable={false}
      onClick={(event) => event.stopPropagation()}
    />
  </div>
</div>
            {hasMultipleImages && (
              <div
                className="shrink-0 border-t border-white/10 bg-black/40 px-4 py-4 backdrop-blur-md md:px-8"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto pb-1">
                  {images.map((img, index) => {
                    const isActive = current === index;

                    return (
                      <button
                        key={`${member.id}-full-lightbox-thumb-${index}`}
                        type="button"
                        onClick={() => handleSelectLightboxImage(index)}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 md:h-20 md:w-20 ${
                          isActive
                            ? "scale-100 border-white opacity-100"
                            : "scale-95 border-white/25 opacity-60 hover:scale-100 hover:opacity-100"
                        }`}
                        aria-label={`Select full image ${index + 1}`}
                        aria-pressed={isActive}
                      >
                        <Image
                          src={img}
                          alt={`${member.name}-full-thumb-${index + 1}`}
                          fill
                          unoptimized
                          sizes="80px"
                          className="object-cover"
                          draggable={false}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}