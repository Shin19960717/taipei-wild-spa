"use client";

import { useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import GalleryModalStage from "./GalleryModalStage";
import GalleryModalInfo from "./GalleryModalInfo";
import GalleryModalThumbnails from "./GalleryModalThumbnails";

export default function GalleryModal({
  gallery,
  lang,
  t,
  onClose,
  onPrev,
  onNext,
  onSelectImage,
  openLineBooking,
  fullScreen = false,
}) {
  const member = gallery?.member;
  const [interactionSignal, setInteractionSignal] = useState(0);

  useLockBodyScroll(gallery?.isOpen);
  useEscapeKey(gallery?.isOpen, onClose);

  if (!gallery?.isOpen || !member) return null;

  const triggerInteractionSignal = () => {
    setInteractionSignal((prev) => prev + 1);
  };

  const handleThumbnailSelect = (index) => {
    triggerInteractionSignal();
    onSelectImage(index);
  };

  const handlePrev = () => {
    triggerInteractionSignal();
    onPrev?.();
  };

  const handleNext = () => {
    triggerInteractionSignal();
    onNext?.();
  };

  const handleStageSelectImage = (index) => {
    triggerInteractionSignal();
    onSelectImage?.(index);
  };

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 overflow-y-auto bg-[#111] px-4 py-6 md:px-8 md:py-10"
          : "fixed inset-0 z-50 overflow-y-auto bg-black/80 p-2 md:p-4"
      }
      onClick={onClose}
    >
      <div
        className={
          fullScreen
            ? "relative mx-auto min-h-[90vh] w-full max-w-[1400px] overflow-hidden rounded-2xl bg-white shadow-xl"
            : "relative mx-auto my-4 w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl md:my-8"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            fullScreen
              ? "grid min-h-[90vh] grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]"
              : "grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]"
          }
        >
          <div className="bg-white">
            <GalleryModalStage
              member={member}
              imageIndex={gallery.imageIndex}
              onClose={onClose}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectImage={handleStageSelectImage}
              interactionSignal={interactionSignal}
              fullScreen={fullScreen}
            />

            <GalleryModalThumbnails
              member={member}
              imageIndex={gallery.imageIndex}
              onSelectImage={handleThumbnailSelect}
              fullScreen={fullScreen}
            />
          </div>

          <div className="bg-white">
            <GalleryModalInfo
              member={member}
              lang={lang}
              t={t}
              imageIndex={gallery.imageIndex}
              openLineBooking={openLineBooking}
              fullScreen={fullScreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}