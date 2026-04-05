"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderNav from "@/components/header/HeaderNav";
import HeaderLanguage from "@/components/header/HeaderLanguage";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import LANG_OPTIONS from "@/data/langOptions";

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

const MOBILE_LANG_SHORT_LABEL: Record<string, string> = {
  zh: "ZH",
  en: "EN",
  ja: "JP",
  ko: "KR",
};

const HTML_MOBILE_LANG_OPEN_CLASS = "mobile-lang-open";

export default function Header({
  scrolled,
  headerRef,
  navItems,
  lang,
  setLang,
  onScrollToSection,
  navContactLabel,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  }, [lang]);

  useEffect(() => {
    const html = document.documentElement;

    if (mobileLangOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
      html.classList.add(HTML_MOBILE_LANG_OPEN_CLASS);
    } else {
      document.body.style.overflow = "";
      html.classList.remove(HTML_MOBILE_LANG_OPEN_CLASS);
    }

    return () => {
      document.body.style.overflow = "";
      html.classList.remove(HTML_MOBILE_LANG_OPEN_CLASS);
    };
  }, [mobileLangOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileLangOpen(false);
        document.documentElement.classList.remove(HTML_MOBILE_LANG_OPEN_CLASS);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentLangLabel = useMemo(() => {
    const matched = LANG_OPTIONS.find((option) => option.key === lang);
    return matched?.label ?? "中文";
  }, [lang]);

  const currentMobileLangShort = useMemo(() => {
    return MOBILE_LANG_SHORT_LABEL[lang] ?? "ZH";
  }, [lang]);

  const handleSetLang = (nextLang: string) => {
    document.cookie = `preferred-lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
    setLang(nextLang);
  };

  const handleMobileNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  };

  const handleMobileBookingClick = () => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  };

  const handleMobileLangClick = (nextLang: string) => {
    handleSetLang(nextLang);
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full border-b border-black/10 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "bg-white/85 backdrop-blur-md"
        }`}
      >
        {/* 桌機版 */}
        <div className="mx-auto hidden w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:flex md:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
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

          <div className="shrink-0">
            <HeaderLanguage lang={lang} setLang={handleSetLang} />
          </div>
        </div>

        {/* 手機版 */}
        <div className="md:hidden">
          <div className="mx-auto flex w-full items-center justify-between px-4 py-3">
            <HeaderLogo
              scrolled={scrolled}
              onScrollToSection={onScrollToSection}
            />

            <div className="flex items-center gap-2">
              {/* 語言切換 */}
              <div className="relative z-[95]">
                <div className="group relative">
                  <button
                    type="button"
                    aria-label={`Language，目前為 ${currentLangLabel}`}
                    aria-expanded={mobileLangOpen}
                    onClick={() => {
                      setMobileLangOpen((prev) => !prev);
                      setMobileMenuOpen(false);
                    }}
                    className={`relative flex h-10 min-w-[58px] items-center justify-center overflow-hidden rounded-full border text-sm font-semibold tracking-[0.08em] transition-all duration-300 ${
                      mobileLangOpen
                        ? "border-black/80 bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                        : "border-black/10 bg-white/80 text-stone-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        mobileLangOpen ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <span className="absolute inset-[1px] rounded-full bg-white/70" />
                    </span>

                    <span className="relative z-10">
                      {currentMobileLangShort}
                    </span>
                  </button>

                  <div
                    className={`pointer-events-none absolute left-1/2 top-[120%] z-[96] w-max -translate-x-1/2 rounded-full bg-black px-3 py-1 text-[11px] tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-200 ${
                      mobileLangOpen
                        ? "translate-y-1 opacity-0"
                        : "translate-y-0 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    Language
                  </div>
                </div>
              </div>

              {/* 漢堡按鈕 */}
              <button
                type="button"
                aria-label={mobileMenuOpen ? "關閉選單" : "開啟選單"}
                aria-expanded={mobileMenuOpen}
                onClick={() => {
                  setMobileMenuOpen((prev) => !prev);
                  setMobileLangOpen(false);
                }}
                className="relative z-[95] flex h-10 w-10 items-center justify-center rounded-md transition active:bg-black/10"
              >
                <div className="relative h-5 w-5">
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-[7px] bg-black transition duration-300 ${
                      mobileMenuOpen ? "translate-y-0 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 bg-black transition duration-300 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-5 translate-y-[6px] bg-black transition duration-300 ${
                      mobileMenuOpen ? "-translate-y-0 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* 手機主選單 */}
          <div
            className={`overflow-hidden border-t border-black/5 transition-all duration-300 ${
              mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="px-4 py-3">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-black/5 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => handleMobileNavClick(item.id)}
                      className="flex w-full items-center justify-between py-4 text-left text-base text-stone-800"
                    >
                      <span>{item.label}</span>
                      <span className="text-stone-400">›</span>
                    </button>
                  </li>
                ))}

                <li className="pt-3">
                  <a
                    href={LINE_ADD_FRIEND_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleMobileBookingClick}
                    className="flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-base text-white transition active:opacity-90"
                  >
                    {navContactLabel}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* 手機語言面板：獨立於 header 外部，避免自己也被模糊 */}
      <div className="md:hidden">
        <button
          type="button"
          aria-label="關閉語言選單"
          onClick={() => setMobileLangOpen(false)}
          className={`fixed inset-0 z-[90] transition-all duration-300 ${
            mobileLangOpen
              ? "pointer-events-auto bg-stone-950/10 opacity-100"
              : "pointer-events-none bg-transparent opacity-0"
          }`}
        />

        <div
          className={`mobile-lang-panel fixed right-4 top-[88px] z-[100] w-[168px] origin-top-right transition-all duration-300 ease-out ${
            mobileLangOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-[22px] border border-white/40 bg-white/75 shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70">
            <div className="border-b border-black/5 px-4 py-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">
                Language
              </div>
            </div>

            <div className="p-2">
              {LANG_OPTIONS.map((option) => {
                const isActive = lang === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleMobileLangClick(option.key)}
                    className={`mb-1.5 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition-all duration-200 last:mb-0 ${
                      isActive
                        ? "bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                        : "bg-transparent text-stone-800 hover:bg-white/80 active:scale-[0.98]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </div>

                    <div
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold tracking-[0.08em] ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {MOBILE_LANG_SHORT_LABEL[option.key]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}