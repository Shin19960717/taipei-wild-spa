"use client";

import type { Dispatch, RefObject, SetStateAction } from "react";
import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderNav from "@/components/header/HeaderNav";
import HeaderLanguage from "@/components/header/HeaderLanguage";

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
}: HeaderProps) {
  return (
    <div>
      <div
        ref={headerRef}
        className={`sticky top-0 z-40 relative transition-[background-color,box-shadow] duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        {/* Logo */}
        <div className="max-w-6xl mx-auto px-4 flex justify-center transition-all duration-500 ease-out">
          <HeaderLogo scrolled={scrolled} />
        </div>

        {/* Nav + Language */}
        <div
          className={`max-w-6xl mx-auto px-4 pb-4 md:pb-6 flex flex-col items-center justify-center gap-3
            transition-[opacity,transform] duration-500 ease-out
            ${
              scrolled
                ? "absolute left-0 right-0 top-full opacity-0 -translate-y-4 pointer-events-none"
                : "relative opacity-100 translate-y-0"
            }
          `}
        >
          <HeaderNav
            navItems={navItems}
            onScrollToSection={onScrollToSection}
            navContactLabel={navContactLabel}
          />

          <HeaderLanguage lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}