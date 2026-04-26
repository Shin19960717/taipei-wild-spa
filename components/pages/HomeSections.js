"use client";

import HomePageSections from "@/components/pages/home/HomePageSections";
import HomeGalleryLayer from "@/components/pages/home/HomeGalleryLayer";
import { getLatestReviews } from "@/data/reviews";

export default function HomeSections({
  headerRef,
  scrolled,
  navItems,
  lang,
  setLang,
  isMobileLangMenuOpen,
  setIsMobileLangMenuOpen,
  onScrollToSection,
  t,
  serviceCards,
  socialLinks,
  gallery,
  onOpenGallery,
  onCloseGallery,
  onPrevGallery,
  onNextGallery,
  onSelectGalleryImage,
  openLineBooking,
}) {
  const latestReviews = getLatestReviews(15);

  return (
    <div className="min-h-screen bg-stone-300 text-stone-800">
      <HomePageSections
        headerRef={headerRef}
        scrolled={scrolled}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        isMobileLangMenuOpen={isMobileLangMenuOpen}
        setIsMobileLangMenuOpen={setIsMobileLangMenuOpen}
        onScrollToSection={onScrollToSection}
        t={t}
        serviceCards={serviceCards}
        socialLinks={socialLinks}
        reviews={latestReviews}
        onOpenGallery={onOpenGallery}
        openLineBooking={openLineBooking}
      />

      <HomeGalleryLayer
        gallery={gallery}
        lang={lang}
        t={t}
        onCloseGallery={onCloseGallery}
        onPrevGallery={onPrevGallery}
        onNextGallery={onNextGallery}
        onSelectGalleryImage={onSelectGalleryImage}
      />
    </div>
  );
}