import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import AboutSection from "@/components/sections/AboutSection";
import SOCIAL_LINKS from "@/data/socialLinks";

export default function HomePageSections({
  headerRef,
  scrolled,
  navItems,
  lang,
  setLang,
  onScrollToSection,
  t,
  serviceCards,
  onOpenGallery,
}) {
  return (
    <>
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
    </>
  );
}