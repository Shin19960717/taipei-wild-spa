"use client";

import HomePageSections from "@/components/pages/home/HomePageSections";
import HomeGalleryLayer from "@/components/pages/home/HomeGalleryLayer";

export default function HomeSections({
  headerRef,
  scrolled,
  navItems,
  lang,
  setLang,
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
}) {
  return (
    <div className="min-h-screen bg-stone-300 text-stone-800">
      <HomePageSections
        headerRef={headerRef}
        scrolled={scrolled}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        onScrollToSection={onScrollToSection}
        t={t}
        serviceCards={serviceCards}
        socialLinks={socialLinks}
        onOpenGallery={onOpenGallery}
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