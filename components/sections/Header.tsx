"use client";

import Image from "next/image";
import type { Dispatch, RefObject, SetStateAction } from "react";
import LANG_OPTIONS from "@/data/langOptions";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import { NAV_LINK_CLASS, LANG_BUTTON_BASE } from "@/constants/uiClasses";

type NavItem = {
  id: string;
  label: string;
};

type HeaderProps = {
  scrolled: boolean;
  headerRef: RefObject<HTMLDivElement | null>;
  navItems: NavItem[];
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  onScrollToSection: (sectionId: string) => void;
  navContactLabel: string;
};

export default function Header({
  scrolled,
  headerRef,
  navItems,
  lang,
  setLang,
  onScrollToSection,
  navContactLabel,
}: 
HeaderProps) {
  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-out ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-center transition-all duration-500 ease-out">
<div
  className={`transition-all duration-500 ease-out flex items-center justify-center ${
    scrolled
      ? "w-[110px] h-[42px] md:w-[150px] md:h-[52px] py-1"
      : "w-[160px] h-[60px] md:w-[220px] md:h-[80px] py-2 md:py-3"
  }`}
>
  <Image
    src="/flatbanner.png"
    alt="Taipei Wild Spa"
    width={220}
    height={80}
    priority
    className="w-full h-full object-contain"
  />
</div>
      </div>

      <div
        className={`max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-3 overflow-hidden transition-[opacity,transform,max-height,padding] duration-500 ease-out ${
          scrolled
            ? "opacity-0 -translate-y-2 max-h-0 pb-0 pointer-events-none"
            : "opacity-100 translate-y-0 max-h-40 pb-3"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className={NAV_LINK_CLASS}
            >
              {item.label}
            </button>
          ))}

          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 text-sm bg-black text-white rounded-full transition hover:opacity-90"
          >
            {navContactLabel}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-2 w-full">
          {LANG_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setLang(option.key)}
              className={`${LANG_BUTTON_BASE} ${
                lang === option.key
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}