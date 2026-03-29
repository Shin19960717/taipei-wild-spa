"use client";

import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import GalleryModal from "@/components/modals/GalleryModal";
import AboutSection from "@/components/sections/AboutSection";
import SOCIAL_LINKS from "@/data/socialLinks";
import { openLineBooking } from "@/lib/line";

export default function HomeSections({
  headerRef,
  scrolled,
  navItems,
  lang,
  setLang,
  onScrollToSection,
  t,
  serviceCards,
  gallery,
  onOpenGallery,
  onCloseGallery,
  onPrevGallery,
  onNextGallery,
  onSelectGalleryImage,
}) {
  return (
    <div className="min-h-screen bg-stone-300 text-stone-800">
      <Header
        headerRef={headerRef}
        scrolled={scrolled}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        onScrollToSection={onScrollToSection}
        navContactLabel={t.navContact}
      />

      <HeroSection t={t} />

      <TeamSection
        t={t}
        lang={lang}
        onOpenGallery={onOpenGallery}
      />

      <ServicesSection t={t} serviceCards={serviceCards} />

      <AboutSection t={t} socialLinks={SOCIAL_LINKS} />

      <GalleryModal
        gallery={gallery}
        lang={lang}
        t={t}
        onClose={onCloseGallery}
        onPrev={onPrevGallery}
        onNext={onNextGallery}
        onSelectImage={onSelectGalleryImage}
        openLineBooking={openLineBooking}
      />
    </div>
  );
}