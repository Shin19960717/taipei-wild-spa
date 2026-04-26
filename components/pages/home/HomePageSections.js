import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import AboutSection from "@/components/sections/AboutSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

export default function HomePageSections({
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
  reviews = [],
  onOpenGallery,
  openLineBooking,
}) {
  const mobileBlurClass = isMobileLangMenuOpen
    ? "max-md:blur-md max-md:pointer-events-none max-md:select-none transition-[filter] duration-300"
    : "transition-[filter] duration-300";

  return (
    <>
      <div className={mobileBlurClass}>
        <Header
          headerRef={headerRef}
          scrolled={scrolled}
          navItems={navItems}
          lang={lang}
          setLang={setLang}
          isMobileLangMenuOpen={isMobileLangMenuOpen}
          setIsMobileLangMenuOpen={setIsMobileLangMenuOpen}
          onScrollToSection={onScrollToSection}
          navContactLabel={t.navContact}
        />
      </div>

      <div className={mobileBlurClass}>
        <HeroSection t={t} />
      </div>

      <div className={mobileBlurClass}>
        <TeamSection
          t={t}
          lang={lang}
          onOpenGallery={onOpenGallery}
          openLineBooking={openLineBooking}
        />
      </div>

      <ServicesSection t={t} serviceCards={serviceCards} />

      <div className={mobileBlurClass}>
        <AboutSection t={t} socialLinks={socialLinks} />
      </div>

      <div className={mobileBlurClass}>
        <ReviewsSection t={t} lang={lang} reviews={reviews} limit={15} />
      </div>
    </>
  );
}