"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MODAL_ARROW_BUTTON_CLASS,
  MODAL_CLOSE_BUTTON_CLASS,
} from "./galleryModal.constants";

const ANIMATION_MS = 320;
const AUTO_PLAY_MS = 3000;
const RESUME_DELAY_MS = 5000;

export default function GalleryModalStage({
  member,
  imageIndex,
  onClose,
  onPrev,
  onNext,
  interactionSignal,
}) {
  const images = member?.imgs ?? [];
  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;

  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState(0);
  const [stage, setStage] = useState("idle");
  // idle | animating-next | animating-prev | snap-back

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const startContainerWidthRef = useRef(1);
  const isHorizontalSwipeRef = useRef(false);

  const prevIndex = useMemo(() => {
    if (!totalImages) return 0;
    return (imageIndex - 1 + totalImages) % totalImages;
  }, [imageIndex, totalImages]);

  const nextIndex = useMemo(() => {
    if (!totalImages) return 0;
    return (imageIndex + 1) % totalImages;
  }, [imageIndex, totalImages]);

  const isAnimating =
    stage === "animating-next" ||
    stage === "animating-prev" ||
    stage === "snap-back";

  const pauseAutoPlay = () => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    if (!hasMultipleImages || !interactionSignal) return;
    pauseAutoPlay();
  }, [interactionSignal, hasMultipleImages]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused || isDragging || isAnimating) return;

    const timer = window.setInterval(() => {
      setStage("animating-next");
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, isPaused, isDragging, isAnimating, imageIndex]);

  useEffect(() => {
    if (!hasMultipleImages || !isPaused || !lastInteraction) return;

    const elapsed = Date.now() - lastInteraction;
    const remaining = Math.max(RESUME_DELAY_MS - elapsed, 0);

    const timer = window.setTimeout(() => {
      setIsPaused(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [hasMultipleImages, isPaused, lastInteraction]);

  const goNext = () => {
    if (!hasMultipleImages || isAnimating) return;
    setIsDragging(false);
    setDragPercent(0);
    setStage("animating-next");
  };

  const goPrev = () => {
    if (!hasMultipleImages || isAnimating) return;
    setIsDragging(false);
    setDragPercent(0);
    setStage("animating-prev");
  };

  const handlePrevClick = () => {
    pauseAutoPlay();
    goPrev();
  };

  const handleNextClick = () => {
    pauseAutoPlay();
    goNext();
  };

  const handleTouchStart = (e) => {
    if (!hasMultipleImages || isAnimating) return;

    const touch = e.touches[0];
    const width = containerRef.current?.getBoundingClientRect().width ?? 1;

    pauseAutoPlay();

    startContainerWidthRef.current = width;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchStartTimeRef.current = Date.now();
    lastTouchXRef.current = touch.clientX;
    isHorizontalSwipeRef.current = false;

    setIsDragging(true);
    setDragPercent(0);
  };

  const handleTouchMove = (e) => {
    if (!hasMultipleImages || !isDragging || isAnimating) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDragging(false);
        setDragPercent(0);
        return;
      }
    }

    if (!isHorizontalSwipeRef.current) return;

    e.preventDefault();
    lastTouchXRef.current = touch.clientX;

    const width = startContainerWidthRef.current || 1;
    const percent = (deltaX / width) * 100;
    const clampedPercent = Math.max(Math.min(percent, 60), -60);

    setDragPercent(clampedPercent);
  };

  const handleTouchEnd = () => {
    if (!hasMultipleImages || !isDragging || isAnimating) return;

    const deltaX = lastTouchXRef.current - touchStartXRef.current;
    const elapsed = Date.now() - touchStartTimeRef.current;
    const width = startContainerWidthRef.current || 1;

    const distanceThreshold = width * 0.18;
    const velocity = elapsed > 0 ? Math.abs(deltaX) / elapsed : 0;

    const shouldMoveByDistance = Math.abs(deltaX) > distanceThreshold;
    const shouldMoveByVelocity = velocity > 0.45;

    setIsDragging(false);

    if (shouldMoveByDistance || shouldMoveByVelocity) {
      setDragPercent(0);

      if (deltaX < 0) {
        setStage("animating-next");
      } else {
        setStage("animating-prev");
      }
      return;
    }

    setDragPercent(0);
    setStage("snap-back");
  };

  const handleTrackTransitionEnd = (e) => {
    if (e.target !== trackRef.current) return;
    if (e.propertyName !== "transform") return;

    if (stage === "animating-next") {
      onNext?.();
      setStage("idle");
      return;
    }

    if (stage === "animating-prev") {
      onPrev?.();
      setStage("idle");
      return;
    }

    if (stage === "snap-back") {
      setStage("idle");
    }
  };

  if (!member || !images.length) return null;

  let translatePercent = -100;

  if (stage === "animating-next") {
    translatePercent = -200;
  } else if (stage === "animating-prev") {
    translatePercent = 0;
  } else {
    translatePercent = -100 + dragPercent;
  }

  const shouldAnimate =
    stage === "animating-next" ||
    stage === "animating-prev" ||
    stage === "snap-back";

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
        ref={containerRef}
        className="relative flex h-[55vh] items-center justify-center overflow-hidden bg-black md:h-[70vh]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            display: "grid",
            gridTemplateColumns: "100% 100% 100%",
            width: "100%",
            height: "100%",
            transform: `translate3d(${translatePercent}%, 0, 0)`,
            transition: shouldAnimate
              ? `transform ${ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
            willChange: "transform",
          }}
        >
          <div className="relative h-full overflow-hidden">
            <Image
              src={images[prevIndex]}
              alt={`${member.name}-${prevIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          <div className="relative h-full overflow-hidden">
            <Image
              src={images[imageIndex]}
              alt={`${member.name}-${imageIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          <div className="relative h-full overflow-hidden">
            <Image
              src={images[nextIndex]}
              alt={`${member.name}-${nextIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevClick}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-3 md:left-4`}
              aria-label="Previous gallery image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNextClick}
              className={`${MODAL_ARROW_BUTTON_CLASS} right-3 md:right-4`}
              aria-label="Next gallery image"
            >
              ›
            </button>
          </>
        )}
      </div>
    </>
  );
}