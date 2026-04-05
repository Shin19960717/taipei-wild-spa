"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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
  interactionSignal,
}) {
  const hasMultipleImages = member.imgs.length > 1;
  const totalImages = member?.imgs?.length ?? 0;

  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(null);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);

  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);
  const slideActionLockRef = useRef(false);

  const pauseAutoPlay = () => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  };

  // 縮圖點擊或外部互動時，重置自動輪播計時
useEffect(() => {
  if (!hasMultipleImages || !interactionSignal) return;
  pauseAutoPlay();
}, [interactionSignal, hasMultipleImages]);
  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const timer = window.setInterval(() => {
      onNext();
    }, 3000);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, isPaused, onNext]);

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

  const prevIndex = useMemo(() => {
    if (!totalImages) return 0;
    return (imageIndex - 1 + totalImages) % totalImages;
  }, [imageIndex, totalImages]);

  const nextIndex = useMemo(() => {
    if (!totalImages) return 0;
    return (imageIndex + 1) % totalImages;
  }, [imageIndex, totalImages]);

  const trackTranslateX = `calc(-100% + ${dragX}px)`;

  const resetDragState = () => {
    setDragX(0);
    setIsDragging(false);
    setEnableTransition(false);
    isHorizontalSwipeRef.current = false;
    slideActionLockRef.current = false;
  };

  useEffect(() => {
    if (!enableTransition && !isDragging && dragX === 0) {
      const id = window.requestAnimationFrame(() => {
        setEnableTransition(true);
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [enableTransition, isDragging, dragX]);

  const animateToNext = () => {
    if (slideActionLockRef.current) return;
    slideActionLockRef.current = true;

    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    setEnableTransition(true);
    setDragX(-containerWidth);

    window.setTimeout(() => {
      onNext();
      resetDragState();
    }, 220);
  };

  const animateToPrev = () => {
    if (slideActionLockRef.current) return;
    slideActionLockRef.current = true;

    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    setEnableTransition(true);
    setDragX(containerWidth);

    window.setTimeout(() => {
      onPrev();
      resetDragState();
    }, 220);
  };

  const handlePrevClick = () => {
    pauseAutoPlay();
    animateToPrev();
  };

  const handleNextClick = () => {
    pauseAutoPlay();
    animateToNext();
  };

  const handleTouchStart = (e) => {
    if (!hasMultipleImages || slideActionLockRef.current) return;

    const touch = e.touches[0];
    pauseAutoPlay();
    setEnableTransition(false);
    setIsDragging(true);

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchStartTimeRef.current = Date.now();
    lastTouchXRef.current = touch.clientX;
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!hasMultipleImages || !isDragging || slideActionLockRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDragging(false);
        setDragX(0);
        return;
      }
    }

    if (isHorizontalSwipeRef.current) {
      e.preventDefault();
      lastTouchXRef.current = touch.clientX;
      setDragX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!hasMultipleImages || slideActionLockRef.current) return;

    const deltaX = lastTouchXRef.current - touchStartXRef.current;
    const elapsed = Date.now() - touchStartTimeRef.current;

    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const distanceThreshold = containerWidth * 0.18;
    const velocity = elapsed > 0 ? Math.abs(deltaX) / elapsed : 0;

    const shouldMoveByDistance = Math.abs(deltaX) > distanceThreshold;
    const shouldMoveByVelocity = velocity > 0.45;

    setEnableTransition(true);

    if (shouldMoveByDistance || shouldMoveByVelocity) {
      if (deltaX < 0) {
        animateToNext();
      } else {
        animateToPrev();
      }
    } else {
      setDragX(0);
      setIsDragging(false);
      isHorizontalSwipeRef.current = false;
    }
  };

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
          className="flex h-full w-[300%]"
          style={{
            transform: trackTranslateX,
            transition: enableTransition ? "transform 220ms ease-out" : "none",
          }}
        >
          <div className="relative h-full w-full shrink-0">
            <Image
              src={member.imgs[prevIndex]}
              alt={`${member.name}-${prevIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              draggable={false}
            />
          </div>

          <div className="relative h-full w-full shrink-0">
            <Image
              src={member.imgs[imageIndex]}
              alt={`${member.name}-${imageIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              draggable={false}
            />
          </div>

          <div className="relative h-full w-full shrink-0">
            <Image
              src={member.imgs[nextIndex]}
              alt={`${member.name}-${nextIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              draggable={false}
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