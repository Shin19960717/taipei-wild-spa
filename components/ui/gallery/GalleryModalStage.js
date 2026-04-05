"use client";

import Image from "next/image";
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
}) {
  const hasMultipleImages = member.imgs.length > 1;

  return (
    <>
      {/* 關閉按鈕（維持在最外層 OK） */}
      <button
        type="button"
        onClick={onClose}
        className={MODAL_CLOSE_BUTTON_CLASS}
        aria-label="Close gallery"
      >
        ×
      </button>

      {/* 🔥 重點：整個圖片區塊 */}
      <div className="relative bg-black flex items-center justify-center h-[55vh] md:h-[70vh]">
        {/* 圖片 */}
        <Image
          src={member.imgs[imageIndex]}
          alt={`${member.name}-${imageIndex + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
        />

        {/* ✅ 把箭頭移到這裡（inside relative container） */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-3 md:left-4`}
              aria-label="Previous gallery image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={onNext}
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