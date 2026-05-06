"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { useParams } from "next/navigation";

import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderNav from "@/components/header/HeaderNav";
import HeaderLanguage from "@/components/header/HeaderLanguage";
import { getSafeLang } from "@/lib/i18n";

const MOBILE_LANG_SHORT_LABEL: Record<string, string> = {
  zh: "ZH",
  en: "EN",
  ja: "JP",
  ko: "KR",
};

type NavItem = {
  id: string;
  label: string;
};

type HeaderProps = {
  scrolled: boolean;
  headerRef: RefObject<HTMLDivElement | null>;
  navItems: NavItem[];
  onScrollToSection: (sectionId: string) => void;
  navContactLabel: string;
};

export default function Header({
  scrolled,
  headerRef,
  navItems,
  onScrollToSection,
  navContactLabel,
}: HeaderProps) {
  const params = useParams();
  const lang = getSafeLang(params?.lang);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  /**
   * 切換語言時自動關閉 menu
   */
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  }, [lang]);

  /**
   * 點擊外部關閉語言 dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setMobileLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /**
   * Menu 開啟時鎖定 body scroll
   */
  useEffect(() => {
    if (mobileMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const currentMobileLangShort = useMemo(() => {
    return MOBILE_LANG_SHORT_LABEL[lang] ?? "ZH";
  }, [lang]);

  return (
    <header
      ref={headerRef}
      className={`
        sticky top-0 z-50 w-full
        border-b border-black/10
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md"
            : "bg-white/70 backdrop-blur-md"
        }
      `}
    >
      {/* Desktop */}
      <div className="mx-auto hidden w-full max-w-7xl items-center justify-between px-6 py-3 md:flex">
        <div className="flex items-center gap-6">
          <HeaderLogo
            scrolled={scrolled}
            onScrollToSection={onScrollToSection}
          />

          <HeaderNav
            navItems={navItems}
            onScrollToSection={onScrollToSection}
            navContactLabel={navContactLabel}
          />
        </div>

        <HeaderLanguage />
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between px-2 py-1.5 md:hidden">
        <HeaderLogo
          scrolled={scrolled}
          onScrollToSection={onScrollToSection}
        />

        <div className="flex items-center gap-2">
{/* Language Dropdown */}
<div
  ref={langDropdownRef}
  className="relative"
>
  {/* Trigger Button */}
  <button
    onClick={() => {
      setMobileLangOpen((prev) => !prev);
      setMobileMenuOpen(false);
    }}
    className="
      flex h-10 min-w-[52px]
      items-center justify-center
      rounded-full
      border border-black/10
      bg-white/90
      px-2
      text-md font-medium tracking-[0.08em]
      text-black/80
      shadow-md
      backdrop-blur-xl

      transition-all duration-300

      hover:bg-neutral-100
      active:scale-95
    "
  >
    {currentMobileLangShort}
  </button>

  {/* Dropdown */}
  <div
    className={`
      absolute left-1/2 top-12 z-40
      w-[190px]
      overflow-hidden

      rounded-[30px]
      border border-black/10
      bg-white/95
      shadow-2xl
      backdrop-blur-2xl

      transition-all duration-300 ease-out

      ${
        mobileLangOpen
          ? `
            pointer-events-auto
            translate-x-[-50%]
            translate-y-0
            opacity-100
            scale-100
          `
          : `
            pointer-events-none
            translate-x-[-50%]
            -translate-y-2
            opacity-0
            scale-95
          `
      }
    `}
  >
    <HeaderLanguage
      mobile
      onSelect={() => {
        setMobileLangOpen(false);
      }}
    />
  </div>
</div>
          {/* Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setMobileLangOpen(false);
            }}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full border border-black/10
              bg-white/90 text-lg shadow-sm
              backdrop-blur-xl
              transition-all duration-300
              hover:bg-neutral-100
              active:scale-95
            "
          >
            <span
              className={`
                transition-all duration-300
                ${
                  mobileMenuOpen
                    ? "rotate-90"
                    : "rotate-0"
                }
              `}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          overflow-hidden
          border-t border-black/5
          bg-white/95 backdrop-blur-xl
          transition-all duration-300 ease-out
          md:hidden

          ${
            mobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="p-4">
          <HeaderNav
            navItems={navItems}
            onScrollToSection={(id) => {
              onScrollToSection(id);
              setMobileMenuOpen(false);
            }}
            navContactLabel={navContactLabel}
          />
        </div>
      </div>
    </header>
  );
}