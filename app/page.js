"use client";
import SocialIcon from "@/components/ui/SocialIcon";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroCarousel from "@/components/ui/HeroCarousel";
import ServiceCard from "@/components/ui/ServiceCard";
import TeamCard from "@/components/ui/TeamCard";
import CONTENT from "@/data/content";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import useEscapeKey from "@/hooks/useEscapeKey";
import useGallery from "@/hooks/useGallery";
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
const MODAL_ARROW_BUTTON_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center";
const MODAL_CLOSE_BUTTON_CLASS =
  "absolute top-4 right-4 z-20 bg-black/70 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center";

const HERO_IMAGES = [
  "/hero/hero01.jpg",
  "/hero/hero02.jpg",
  "/hero/hero03.jpg",
];

const TEAM_MEMBERS = [
  {
    id: "rookie",
    name: "Rookie",
    desc: {
      zh: ["171/68/28", "體格健壯", "按摩手法穩健", "開朗健談", "配合度高"],
      en: [
        "171/68/28",
        "Strong physique",
        "Steady massage technique",
        "Friendly and talkative",
        "Highly cooperative and adaptable",
      ],
      ja: [
        "171/68/28",
        "しっかりした体格",
        "安定感のある施術",
        "明るく話しやすい雰囲気",
        "柔軟に対応できる高い協調性",
      ],
      ko: [
        "171/68/28",
        "탄탄한 체형",
        "안정감 있는 마사지 스타일",
        "밝고 편안한 소통",
        "유연하게 대응 가능한 높은 협조도",
      ],
    },
    imgs: [
      "/team/Rookie01.jpg",
      "/team/Rookie02.jpg",
      "/team/Rookie03.jpg",
      "/team/Rookie04.jpg",
    ],
    calendar: "https://calendar.google.com/ryan",
  },
  {
    id: "eric",
    name: "Eric",
    desc: {
      zh: ["172/67/33", "外表乾淨俐落", "肌肉結實厚實", "互動自然不拘束", "配合度高"],
      en: [
        "172/67/33",
        "Clean and sharp appearance",
        "Solid and well-built physique",
        "Natural and easygoing interaction",
        "Highly cooperative",
      ],
      ja: [
        "172/67/33",
        "清潔感のある整った外見",
        "しっかりとした筋肉質な体格",
        "自然で気軽なコミュニケーション",
        "協調性が高い",
      ],
      ko: [
        "172/67/33",
        "깔끔하고 단정한 외형",
        "탄탄하고 근육질의 체형",
        "자연스럽고 편안한 소통",
        "높은 협조도",
      ],
    },
    imgs: [
      "/team/Eric01.jpg",
      "/team/Eric02.jpg",
      "/team/Eric03.jpg",
      "/team/Eric04.jpg",
    ],
    calendar: "https://calendar.google.com/ryan",
  },
];

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

function GalleryModal({ gallery, lang, t, onClose, onPrev, onNext, onSelectImage }) {
  const member = gallery.member;

  useLockBodyScroll(gallery.isOpen);
  useEscapeKey(gallery.isOpen, onClose);

  if (!gallery.isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-4 md:my-8 mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={MODAL_CLOSE_BUTTON_CLASS}
          aria-label="Close gallery"
        >
          ×
        </button>

        {member.imgs.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className={`${MODAL_ARROW_BUTTON_CLASS} left-4`}
              aria-label="Previous gallery image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={onNext}
              className={`${MODAL_ARROW_BUTTON_CLASS} right-4`}
              aria-label="Next gallery image"
            >
              ›
            </button>
          </>
        )}

        <div className="relative bg-black flex items-center justify-center h-[55vh] md:h-[70vh]">
          <Image
            src={member.imgs[gallery.imageIndex]}
            alt={`${member.name}-${gallery.imageIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <div className="p-4 md:p-5">
          <h3 className="text-2xl font-bold">{member.name}</h3>

          <div className="flex flex-wrap gap-3 mt-3">
            {member.desc[lang].map((item, idx) => (
              <span
                key={`${member.id}-${lang}-desc-${idx}`}
                className={
                  idx === 0
                    ? "inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm md:text-base font-medium"
                    : TAG_CLASS
                }
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={member.calendar}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              {t.scheduleButton}
            </a>

            <button
              type="button"
              onClick={() => openLineBooking(member.name, lang)}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm transition hover:scale-105"
            >
              {t.bookThis}
            </button>
          </div>

          <p className="text-sm text-stone-500 mt-3">
            {gallery.imageIndex + 1} / {member.imgs.length}
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto px-6 py-4 bg-white">
          {member.imgs.map((img, index) => (
            <button
              key={`${member.id}-thumb-${index}`}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative shrink-0 rounded-full overflow-hidden border-2 w-20 h-20 ${
                gallery.imageIndex === index ? "border-black" : "border-stone-200"
              }`}
            >
              <Image
                src={img}
                alt={`${member.name}-thumb-${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
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

      <section id="about" className="relative px-6 py-16 scroll-mt-32 overflow-hidden">
        <Image
          src="/about/about-bg1.jpg"
          alt="environment background"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-stone-100/82 to-stone-200/88" />

        <RevealOnScroll className="relative z-10 max-w-6xl mx-auto md:px-10" y={24}>
          <SectionTitle center>{t.aboutHeader}</SectionTitle>

          <div className="grid md:grid-cols-2 gap-10 items-start mt-10">
<RevealOnScroll
  className="relative rounded-2xl shadow-lg border border-white/40 overflow-hidden min-h-[560px]"
  delay={100}
  y={20}
>
  {/* 背景圖片 */}
  <Image
    src="/about/card-bg.jpg"
    alt="card background"
    fill
    className="object-cover object-[65%_center]"
    priority
  />

  {/* 遮罩 */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/84 to-white/88 backdrop-blur-xs" />

  {/* 內容 */}
<div className="relative z-10 p-6 md:p-8 space-y-6">
  <div className="space-y-1">
    <h3 className="text-lg font-bold text-stone-900">
      {t.aboutTitle}
    </h3>
    <p className="text-stone-700">
      {t.aboutText}
    </p>
  </div>

<div className="space-y-5 text-stone-700">
      <div className="space-y-1">
<h3 className="text-lg font-bold text-stone-900">
          {t.businessHoursTitle}
      </h3>
      <p>{t.businessHoursText}</p>
    </div>

    <div className="space-y-1">
<h3 className="text-lg font-bold text-stone-900">
          {t.locationTitle}
      </h3>
      <p>{t.locationText}</p>
    </div>

    <div className="space-y-1">
<h3 className="text-lg font-bold text-stone-900">
          {t.bookingTitle}
      </h3>
      <p>{t.bookingText}</p>
    </div>

    <div className="space-y-1">
<h3 className="text-lg font-bold text-stone-900">
          {t.noticeTitle}
      </h3>
      <p className="text-sm text-stone-600 leading-7">
        {t.noticeText}
      </p>
    </div>

    <div className="pt-4 border-t border-stone-200/70 space-y-3">
<h3 className="text-lg font-bold text-stone-900">
          {t.contactTitle}
      </h3>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={item.className}
            aria-label={item.name}
          >
            <SocialIcon item={item} />
          </a>
        ))}
      </div>

      <p className="text-sm text-stone-500">
        {t.contactHint}
      </p>
    </div>
  </div>
</div>
</RevealOnScroll>
            <RevealOnScroll
              className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/40"
              delay={220}
              y={20}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8358363076327!2d121.4994605753547!3d25.039644638064257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9a872a72d25%3A0xb0b2343c58e9b562!2zMTA46Ie65YyX5biC6JCs6I-v5Y2A5bq35a6a6LevOTnomZ8!5e0!3m2!1szh-TW!2stw!4v1774715460312!5m2!1szh-TW!2stw"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taipei Wild Spa 地圖"
              />
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </section>

      <GalleryModal
        gallery={gallery}
        lang={lang}
        t={t}
        onClose={closeGallery}
        onPrev={showPrevImage}
        onNext={showNextImage}
        onSelectImage={selectGalleryImage}
      />
    </div>
  );
}