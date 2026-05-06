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

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  }, [lang]);

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        transition-all
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]

        ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-md"
            : "bg-white/70 backdrop-blur-xl"
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
      <div className="flex items-center justify-between px-3 py-2 md:hidden">
        <HeaderLogo
          scrolled={scrolled}
          onScrollToSection={onScrollToSection}
        />

        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div ref={langDropdownRef} className="relative">
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setMobileLangOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              className="
                flex h-11 min-w-[58px]
                items-center justify-center

                rounded-full

                border border-black/10
                bg-white/90

                px-3

                text-md font-medium
                tracking-[0.08em]
                text-black/80

                shadow-md
                backdrop-blur-2xl

                transition-all
                duration-300
                ease-[cubic-bezier(0.16,1,0.3,1)]

                hover:bg-neutral-100
                active:scale-95
              "
            >
              {currentMobileLangShort}
            </button>

            {/* Dropdown */}
            <div
              className={`
                absolute right-0 top-14 z-40

                w-[180px]

                overflow-hidden

                rounded-[30px]

                border border-black/10
                bg-white/90

                shadow-[0_20px_60px_rgba(0,0,0,0.12)]

                backdrop-blur-2xl

                origin-top-right

                transition-all
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  mobileLangOpen
                    ? `
                        pointer-events-auto
                        translate-y-0
                        opacity-100
                        scale-100
                      `
                    : `
                        pointer-events-none
                        -translate-y-1
                        opacity-0
                        scale-[0.98]
                      `
                }
              `}
            >
              <div
                className={`
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  ${
                    mobileLangOpen
                      ? `
                          opacity-100
                          translate-y-0
                        `
                      : `
                          opacity-0
                          translate-y-1
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
          </div>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setMobileLangOpen(false);
            }}
            className="
              flex h-11 w-11 items-center justify-center

              rounded-full

              border border-black/10
              bg-white/90

              text-lg text-black/80

              shadow-md
              backdrop-blur-2xl

              transition-all
              duration-300
              ease-[cubic-bezier(0.16,1,0.3,1)]

              hover:bg-neutral-100
              active:scale-95
            "
          >
            <span
              className={`
                transition-all
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  mobileMenuOpen
                    ? "rotate-90 scale-110"
                    : "rotate-0 scale-100"
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
          md:hidden

          overflow-hidden

          border-t border-black/5

          bg-white/80
          backdrop-blur-2xl

transition-[max-height,opacity]
duration-[950ms]
ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            mobileMenuOpen
              ? `
                  max-h-[520px]
                  opacity-100
                `
              : `
                  pointer-events-none
                  max-h-0
                  opacity-0
                `
          }
        `}
      >
        <div
          className={`
            p-4

transition-all
duration-[900ms]
ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              mobileMenuOpen
                ? `
                    opacity-100
                    translate-y-0
                  `
                : `
                    opacity-0
                    -translate-y-1
                  `
            }
          `}
        >
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