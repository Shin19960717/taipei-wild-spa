"use client";

import Image from "next/image";
import { TAG_CLASS, MODAL_ARROW_BUTTON_CLASS, MODAL_CLOSE_BUTTON_CLASS } from "@/constants/styles";
import { openLineBooking } from "@/lib/line";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Lang } from "@/types/common";
import type { GalleryState } from "@/types/team";

type Props = {
  gallery: GalleryState;
  lang: Lang;
  t: Record<string, string>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
};

export default function GalleryModal({
  gallery,
  lang,
  t,
  onClose,
  onPrev,
  onNext,
  onSelectImage,
}: Props) {
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
        <button
          type="button"
          onClick={onClose}
          className={MODAL_CLOSE_BUTTON_CLASS}
          aria-label="Close gallery modal"
        >
          ×
        </button>

        {member.imgs.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-3`}
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={onNext}
              className={`${MODAL_ARROW_BUTTON_CLASS} right-3`}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        <div className="relative w-full h-[60vh] bg-black">
          <Image
            src={member.imgs[gallery.imageIndex]}
            alt={`${member.name}-${gallery.imageIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <div className="p-4 md:p-5">
          <h3 className="text-2xl font-bold">{member.name}</h3>

          <div className="flex flex-wrap gap-3 mt-3">
            {member.desc[lang].map((item, idx) => (
              <span
                key={`${member.id}-${lang}-desc-${idx}`}
                className={
                  idx === 0
                    ? "inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm md:text-base font-medium"
                    : TAG_CLASS
                }
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={member.calendar}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              {t.scheduleButton}
            </a>

            <button
              type="button"
              onClick={() => openLineBooking(member.name, lang)}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm transition hover:scale-105"
            >
              {t.bookThis}
            </button>
          </div>

          <p className="text-sm text-stone-500 mt-3">
            {gallery.imageIndex + 1} / {member.imgs.length}
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto px-6 py-4 bg-white">
          {member.imgs.map((img, index) => (
            <button
              key={`${member.id}-thumb-${index}`}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative shrink-0 rounded-full overflow-hidden border-2 w-20 h-20 ${
                gallery.imageIndex === index ? "border-black" : "border-stone-200"
              }`}
            >
              <Image
                src={img}
                alt={`${member.name}-thumb-${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}