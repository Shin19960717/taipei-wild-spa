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

const VALID_LANGS = ["zh", "en", "ja", "ko"];

export default function HomeContent() {
  const scrolled = useHeaderScroll();
  const searchParams = useSearchParams(); // ✅ 現在合法
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef(null);

  const searchParamsString = searchParams.toString();
  const langParam = searchParams.get("lang");

  const resolvedLang = useMemo(() => {
    return typeof langParam === "string" && VALID_LANGS.includes(langParam)
      ? langParam
      : "zh";
  }, [langParam]);

  const [lang, setLang] = useState(resolvedLang);

  useEffect(() => {
    setLang((prev) => (prev === resolvedLang ? prev : resolvedLang));
  }, [resolvedLang]);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);

    if (lang === "zh") {
      params.delete("lang");
    } else {
      params.set("lang", lang);
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentUrl = searchParamsString
      ? `${pathname}?${searchParamsString}`
      : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [lang, pathname, router, searchParamsString]);

  const { t, navItems, serviceCards } = useHomeViewModel(lang);

  const handleScrollToSection = useCallback((sectionId) => {
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