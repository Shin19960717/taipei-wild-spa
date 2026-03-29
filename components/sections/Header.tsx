"use client";

import { forwardRef } from "react";
import { LANG_OPTIONS } from "@/data/siteConfig";
import { LANG_BUTTON_BASE, NAV_LINK_CLASS } from "@/constants/styles";
import type { Lang } from "@/types/common";

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  scrolled: boolean;
  onScrollToSection: (sectionId: string) => void;
  t: Record<string, string>;
};

const Header = forwardRef<HTMLDivElement, Props>(function Header(
  { lang, setLang, scrolled, onScrollToSection, t },
  ref
) {
  const navItems = [
    { key: "team", label: t.navTeam },
    { key: "services", label: t.navServices },
    { key: "about", label: t.navAbout },
    { key: "contact", label: t.navContact },
  ];

  return (
    <header
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg md:text-xl font-bold tracking-wide"
        >
          Taipei Wild Spa
        </button>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onScrollToSection(item.key)}
              className={NAV_LINK_CLASS}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {LANG_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setLang(option.key)}
              className={`${LANG_BUTTON_BASE} ${
                lang === option.key
                  ? "bg-black text-white border-black"
                  : "bg-white/80 text-stone-700 border-stone-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
});

export default Header;