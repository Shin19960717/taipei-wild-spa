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

  useLockBodyScroll(gallery?.isOpen && !fullScreen);
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

if (fullScreen) {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      <div className="grid min-h-screen w-full grid-cols-1 lg:h-screen lg:grid-cols-[minmax(0,35vw)_minmax(550px,1fr)] lg:gap-24 lg:pl-0 lg:pr-16 xl:pr-24">
        <section className="flex min-h-[64svh] flex-col bg-black lg:min-h-0 lg:overflow-hidden lg:rounded-r-3xl">
          <div className="min-h-0 flex-1">
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
          </div>

          <GalleryModalThumbnails
            member={member}
            imageIndex={gallery.imageIndex}
            onSelectImage={handleThumbnailSelect}
            fullScreen={fullScreen}
          />
        </section>

        <aside className="bg-white lg:min-h-0 lg:overflow-y-auto lg:pl-4 lg:pr-0 xl:pl-8">
          <GalleryModalInfo
            member={member}
            lang={lang}
            t={t}
            imageIndex={gallery.imageIndex}
            openLineBooking={openLineBooking}
            fullScreen={fullScreen}
          />
        </aside>
      </div>
    </main>
  );
}
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="relative mx-auto my-4 w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl md:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
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