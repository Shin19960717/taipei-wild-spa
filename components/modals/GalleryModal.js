"use client";

import Image from "next/image";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/hooks/useEscapeKey";
const MODAL_ARROW_BUTTON_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center";

const MODAL_CLOSE_BUTTON_CLASS =
  "absolute top-4 right-4 z-20 bg-black/70 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center";

const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base";

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
        <button
          type="button"
          onClick={onClose}
          className={MODAL_CLOSE_BUTTON_CLASS}
          aria-label="Close gallery"
        >
          ×
        </button>

        {member.imgs.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-4`}
              aria-label="Previous gallery image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={onNext}
              className={`${MODAL_ARROW_BUTTON_CLASS} right-4`}
              aria-label="Next gallery image"
            >
              ›
            </button>
          </>
        )}

        <div className="relative bg-black flex items-center justify-center h-[55vh] md:h-[70vh]">
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