"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TeamCard from "@/components/ui/TeamCard";
import GalleryModal from "@/components/modals/GalleryModal";
import AboutSection from "@/components/sections/AboutSection";
import CONTENT from "@/data/content";
import TEAM_MEMBERS from "@/data/teamMembers";
import SOCIAL_LINKS from "@/data/socialLinks";
import useGallery from "@/hooks/useGallery";
import { scrollToSection } from "@/lib/scroll";
import { openLineBooking } from "@/lib/line";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("zh");
  const headerRef = useRef(null);

  useEffect(() => {
    const EXPAND_THRESHOLD = 30;
    const COLLAPSE_THRESHOLD = 80;

    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled((prev) => {
        if (!prev && y > COLLAPSE_THRESHOLD) return true;
        if (prev && y < EXPAND_THRESHOLD) return false;
        return prev;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useMemo(
    () => ({
      ...CONTENT[lang],
      bookThis: CONTENT.bookThis[lang],
    }),
    [lang]
  );

  const navItems = useMemo(
    () => [
      { id: "team", label: t.navTeam },
      { id: "services", label: t.navServices },
      { id: "about", label: t.navAbout },
    ],
    [t]
  );

  const serviceCards = useMemo(
    () => [
      {
        imageSrc: "/services/store.jpg",
        imageAlt: "store service",
        title: t.inStoreTitle,
        times: [t.inStoreTime1, t.inStoreTime2, t.inStoreTime3],
        notes: [t.inStoreNote1, t.inStoreNote2],
        className: "md:justify-self-start",
        delay: 100,
      },
      {
        imageSrc: "/services/home.jpg",
        imageAlt: "home service",
        title: t.homeServiceTitle,
        times: [t.homeServiceTime1, t.homeServiceTime2],
        notes: [t.homeNote1, t.homeNote2, t.homeNote3],
        className: "md:justify-self-end",
        delay: 220,
      },
    ],
    [t]
  );

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
    <div className="min-h-screen bg-stone-300 text-stone-800">
      <Header
        headerRef={headerRef}
        scrolled={scrolled}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        onScrollToSection={handleScrollToSection}
        navContactLabel={t.navContact}
      />

      <HeroSection t={t} />

      <section id="team" className="px-6 py-12 md:px-10 scroll-mt-32">
        <RevealOnScroll className="max-w-6xl mx-auto" y={24}>
          <SectionTitle>{t.teamTitle}</SectionTitle>

          <Link
            href="/recruit"
            className="inline-block mt-4 mb-6 px-3 py-1.5 border border-stone-700 text-stone-700 text-sm rounded-full transition hover:bg-stone-100 hover:scale-105"
          >
            {t.recruitTitle}
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <RevealOnScroll key={member.id} delay={index * 120} y={20}>
                <TeamCard member={member} lang={lang} onOpen={openGallery} />
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <ServicesSection t={t} serviceCards={serviceCards} />

      <AboutSection t={t} socialLinks={SOCIAL_LINKS} />

      <GalleryModal
        gallery={gallery}
        lang={lang}
        t={t}
        onClose={closeGallery}
        onPrev={showPrevImage}
        onNext={showNextImage}
        onSelectImage={selectGalleryImage}
        openLineBooking={openLineBooking}
      />
    </div>
  );
}