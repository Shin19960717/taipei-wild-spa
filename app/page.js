"use client";

import { useCallback, useRef, useState } from "react";
import HomeSections from "@/components/pages/HomeSections";
import useGallery from "@/hooks/useGallery";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import useHomeViewModel from "@/hooks/useHomeViewModel";
import { scrollToSection } from "@/lib/scroll";
import SOCIAL_LINKS from "@/data/socialLinks";
import { openLineBooking } from "@/lib/line";

export default function Home() {
  const scrolled = useHeaderScroll();
  const [lang, setLang] = useState("zh");
  const headerRef = useRef(null);

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