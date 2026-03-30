"use client";

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
}) {
  const member = gallery.member;

  useLockBodyScroll(gallery.isOpen);
  useEscapeKey(gallery.isOpen, onClose);

  if (!gallery.isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-4 md:my-8 mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GalleryModalStage
          member={member}
          imageIndex={gallery.imageIndex}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
        />

        <GalleryModalInfo
          member={member}
          lang={lang}
          t={t}
          imageIndex={gallery.imageIndex}
          openLineBooking={openLineBooking}
        />

        <GalleryModalThumbnails
          member={member}
          imageIndex={gallery.imageIndex}
          onSelectImage={onSelectImage}
        />
      </div>
    </div>
  );
}