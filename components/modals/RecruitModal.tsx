"use client";

import Image from "next/image";
import { RECRUIT_APPLY_TEXT, RECRUIT_DATA } from "@/data/recruit";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import { PRIMARY_BUTTON_CLASS, TAG_CLASS } from "@/constants/styles";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Lang } from "@/types/common";

type Props = {
  isOpen: boolean;
  lang: Lang;
  onClose: () => void;
};

export default function RecruitModal({ isOpen, lang, onClose }: Props) {
  useLockBodyScroll(isOpen);
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black text-white text-lg transition hover:scale-105"
          aria-label="Close recruit modal"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          {RECRUIT_DATA.images.map((img, idx) => (
            <div key={`recruit-${idx}`} className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`recruit-${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {RECRUIT_DATA.title[lang]}
          </h3>
          <p className="text-stone-700 leading-8 mb-5">{RECRUIT_DATA.desc[lang]}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {RECRUIT_DATA.items[lang].map((item, idx) => (
              <span key={`recruit-item-${idx}`} className={TAG_CLASS}>
                {item}
              </span>
            ))}
          </div>

          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className={PRIMARY_BUTTON_CLASS}
          >
            {RECRUIT_APPLY_TEXT[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}