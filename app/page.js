"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroCarousel from "@/components/ui/HeroCarousel";
import ServiceCard from "@/components/ui/ServiceCard";
import TeamCard from "@/components/ui/TeamCard";
import GalleryModal from "@/components/modals/GalleryModal";
import AboutSection from "@/components/sections/AboutSection";
import CONTENT from "@/data/content";
import useGallery from "@/hooks/useGallery";
import HERO_IMAGES from "@/data/heroImages";
import TEAM_MEMBERS from "@/data/teamMembers";
const LINE_CONFIG = {
  officialId: "@834xdutc",
};

const LANG_OPTIONS = [
  { key: "zh", label: "中文" },
  { key: "en", label: "EN" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
];

const NAV_LINK_CLASS =
  "px-3 py-1 text-sm border rounded-full transition hover:bg-stone-100";
const LANG_BUTTON_BASE = "px-3 py-1 text-sm rounded-full border transition";
const ICON_BUTTON_CLASS =
  "w-10 h-10 flex items-center justify-center rounded-full border border-stone-300 transition";
const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base";
const PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center px-5 py-3 bg-black text-white rounded-xl text-sm md:text-base transition hover:scale-105";

const buildLineAddFriendUrl = () =>
  `https://line.me/R/ti/p/${encodeURIComponent(LINE_CONFIG.officialId)}`;

const buildLineOaMessageUrl = (message) =>
  `https://line.me/R/oaMessage/${encodeURIComponent(
    LINE_CONFIG.officialId
  )}/?${encodeURIComponent((message || "").trim())}`;

const LINE_ADD_FRIEND_URL = buildLineAddFriendUrl();

const SOCIAL_LINKS = [
  {
    name: "LINE",
    href: LINE_ADD_FRIEND_URL,
    iconClass: "ri-line-fill text-xl text-white",
    className: `${ICON_BUTTON_CLASS} bg-[#06C755] border-[#06C755] hover:opacity-90`,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/taipei_wildspa?igsh=MWsxNm1odnV0M2JkdQ%3D%3D&utm_source=qr",
    iconClass: "ri-instagram-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576573349568",
    iconClass: "ri-facebook-circle-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
  {
    name: "X",
    href: "https://x.com/taipei_wildspa?s=21",
    iconClass: "ri-twitter-x-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
];

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getBookingMessage(memberName, lang) {
  const messageMap = {
    zh: `你好，我想預約 ${memberName}\n🗓️時間：\n💆🏻服務：`,
    en: `Hello, I would like to book ${memberName}\n🗓️Time:\n💆🏻Service:`,
    ja: `こんにちは、${memberName}を予約したいです\n🗓️希望時間：\n💆🏻希望サービス：`,
    ko: `안녕하세요, ${memberName} 예약하고 싶습니다\n🗓️시간:\n💆🏻서비스:`,
  };
  return messageMap[lang] || messageMap.zh;
}

function openLineBooking(memberName, lang) {
  if (typeof window === "undefined") return;

  const message = getBookingMessage(memberName, lang);
  const oaMessageUrl = buildLineOaMessageUrl(message);

  if (isMobileDevice()) {
    window.location.href = oaMessageUrl;
    return;
  }

  window.open(LINE_ADD_FRIEND_URL, "_blank", "noopener,noreferrer");
}

function scrollToSection(sectionId, headerOffset = 0) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetTop = elementTop - headerOffset;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

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
<div
  ref={headerRef}
  className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-out ${
    scrolled
      ? "bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      : "bg-white"
  }`}
>
          <div className="max-w-6xl mx-auto px-4 flex justify-center transition-all duration-500 ease-out">
          <div
            className={`relative transition-all duration-500 ease-out ${
              scrolled
                ? "w-[110px] h-[42px] md:w-[150px] md:h-[52px] py-1"
                : "w-[160px] h-[60px] md:w-[220px] md:h-[80px] py-2 md:py-3"
            }`}
          >
            <Image
              src="/flatbanner.png"
              alt="Taipei Wild Spa"
              fill
              priority
              sizes="220px"
              className="object-contain"
            />
          </div>
        </div>

<div
  className={`max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-3 overflow-hidden transition-[opacity,transform,max-height,padding] duration-500 ease-out ${
    scrolled
      ? "opacity-0 -translate-y-2 max-h-0 pb-0 pointer-events-none"
      : "opacity-100 translate-y-0 max-h-40 pb-3"
  }`}
>
            <div className="flex flex-wrap justify-center gap-2 w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollToSection(item.id)}
                className={NAV_LINK_CLASS}
              >
                {item.label}
              </button>
            ))}

            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 text-sm bg-black text-white rounded-full transition hover:opacity-90"
            >
              {t.navContact}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 w-full">
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setLang(option.key)}
                className={`${LANG_BUTTON_BASE} ${
                  lang === option.key
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black hover:bg-stone-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="relative h-[42vh] md:h-[58vh] overflow-hidden">
        <HeroCarousel images={HERO_IMAGES} />
        <div className="absolute inset-0 bg-black/50" />

        <RevealOnScroll
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
          y={18}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="mb-6 text-sm md:text-base">{t.heroSubtitle}</p>
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold transition hover:scale-105"
          >
            {t.heroButton}
          </a>
        </RevealOnScroll>
      </section>

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

      <section
        id="services"
        className="px-6 py-16 md:px-12 relative overflow-hidden bg-gradient-to-b from-white via-stone-100 to-stone-200 scroll-mt-32"
      >
        <RevealOnScroll className="max-w-6xl mx-auto" y={24}>
          <SectionTitle>{t.servicesTitle}</SectionTitle>
          <p className="text-stone-600 mt-4 mb-6">{t.servicesIntro}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {[t.serviceTag1, t.serviceTag2, t.serviceTag3].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-stone-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center md:px-10">
            {serviceCards.map((card) => (
              <ServiceCard
                key={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                title={card.title}
                times={card.times}
                extraTime={t.extraTime}
                notes={card.notes}
                className={card.className}
                delay={card.delay}
              />
            ))}
          </div>
        </RevealOnScroll>
      </section>

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