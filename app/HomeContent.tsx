"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HomeSections from "@/components/pages/HomeSections";
import useGallery from "@/hooks/useGallery";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import useHomeViewModel from "@/hooks/useHomeViewModel";
import { scrollToSection } from "@/lib/scroll";
import SOCIAL_LINKS from "@/data/socialLinks";
import { openLineBooking } from "@/lib/line";

const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;
type Lang = (typeof VALID_LANGS)[number];

function isValidLang(value: string | null): value is Lang {
  return typeof value === "string" && VALID_LANGS.includes(value as Lang);
}

export default function HomeContent() {
  const scrolled = useHeaderScroll();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const searchParamsString = searchParams.toString();
  const langParam = searchParams.get("lang");

  const resolvedLang = useMemo<Lang>(() => {
    return isValidLang(langParam) ? langParam : "zh";
  }, [langParam]);

  const [lang, setLangState] = useState<Lang>(resolvedLang);

  // ✅ 關鍵新增（這就是你缺的）
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);

  useEffect(() => {
    setLangState((prev) => (prev === resolvedLang ? prev : resolvedLang));
  }, [resolvedLang]);

  const setLang = useCallback((nextLang: string) => {
    const safeLang: Lang = isValidLang(nextLang) ? nextLang : "zh";
    setLangState(safeLang);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    params.set("lang", lang);

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentUrl = searchParamsString
      ? `${pathname}?${searchParamsString}`
      : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [lang, pathname, router, searchParamsString]);

  // 語言切換 → 自動關閉手機選單
  useEffect(() => {
    setIsMobileLangMenuOpen(false);
  }, [lang]);

  const { t, navItems, serviceCards } = useHomeViewModel(lang);

  const handleScrollToSection = useCallback((sectionId: string) => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    scrollToSection(sectionId, headerHeight + 16);
  }, []);

  const {
    gallery,
    openGallery,
    closeGallery,
    showPrevImage,
    showNextImage,
    selectGalleryImage,
  } = useGallery();

  return (
    <HomeSections
      headerRef={headerRef}
      scrolled={scrolled}
      navItems={navItems}
      lang={lang}
      setLang={setLang}
      isMobileLangMenuOpen={isMobileLangMenuOpen}   // ✅ 修正點
      setIsMobileLangMenuOpen={setIsMobileLangMenuOpen} // ✅ 修正點
      onScrollToSection={handleScrollToSection}
      t={t}
      serviceCards={serviceCards}
      socialLinks={SOCIAL_LINKS}
      gallery={gallery}
      onOpenGallery={openGallery}
      onCloseGallery={closeGallery}
      onPrevGallery={showPrevImage}
      onNextGallery={showNextImage}
      onSelectGalleryImage={selectGalleryImage}
      openLineBooking={openLineBooking}
    />
  );
}