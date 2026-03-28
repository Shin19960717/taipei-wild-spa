"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const RECRUIT_APPLY_TEXT = {
  zh: "加入 LINE 應徵",
  en: "Apply via LINE",
  ja: "LINEで応募する",
  ko: "LINE으로 지원하기",
};

const RECRUIT_DATA = {
  title: {
    zh: "人才招募",
    en: "Join Our Team",
    ja: "人材募集",
    ko: "채용 안내",
  },
  desc: {
    zh: "我們正在尋找重視互動品質與服務細節的夥伴，歡迎加入。",
    en: "We are looking for team members who value interaction quality and service details.",
    ja: "接客の質とサービスの細やかさを大切にする方を募集しています。",
    ko: "서비스 디테일과 소통을 중요하게 생각하는 분을 찾고 있습니다.",
  },
  images: ["/recruit/01.jpg", "/recruit/02.jpg", "/recruit/03.jpg"],
  items: {
    zh: ["高配合度", "環境單純", "重視隱私", "彈性排班"],
    en: ["High cooperation", "Simple environment", "Privacy focused", "Flexible schedule"],
    ja: ["高い協調性", "シンプルな環境", "プライバシー重視", "柔軟なシフト"],
    ko: ["높은 협조도", "단순한 환경", "프라이버시 중시", "유연한 스케줄"],
  },
};

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

const CONTENT = {
  bookThis: {
    zh: "預約此位師傅",
    en: "Book this therapist",
    ja: "このスタッフを予約",
    ko: "이 직원 예약하기",
  },
  zh: {
    navTeam: "團隊介紹與招募",
    navServices: "服務內容",
    navAbout: "環境概覽",
    navContact: "即刻預約",
    heroTitle: "Taipei Wild Spa",
    heroSubtitle: "專業放鬆體驗｜隱私安全｜高品質服務",
    heroButton: "立即加 LINE 預約",
    teamTitle: "團隊介紹",
    scheduleButton: "查看班表",
    recruitTitle: "人才招募",
    servicesTitle: "方案介紹",
    servicesIntro: "所有方案皆提供以下服務",
    serviceTag1: "全身筋絡放鬆",
    serviceTag2: "精油放鬆",
    serviceTag3: "泰式體推",
    inStoreTitle: "店內服務",
    inStoreTime1: "60 分鐘　TWD $2000",
    inStoreTime2: "90 分鐘　TWD $2500",
    inStoreTime3: "120 分鐘　TWD $3000",
    extraTime: "加時 30 分鐘 +TWD $600",
    inStoreNote1: "* 團隊成員未於工作坊待命，為免久候，建議提前至少一小時預約",
    inStoreNote2: "* 為提供更好服務，夜間將酌收額外服務費 TWD $500",
    homeServiceTitle: "到府服務（外出）",
    homeServiceTime1: "60 分鐘　TWD $2500",
    homeServiceTime2: "100 分鐘　TWD $3000",
    homeNote1: "* 為使團隊成員於指定時間前往服務，為免久候，建議提前至少一小時預約",
    homeNote2: "* 外出服務依地區可能酌收交通費，請透過 LINE 預約確認",
    homeNote3: "* 為提供良好服務，夜間將酌收額外服務費 TWD $500",
    aboutHeader: "環境介紹",
    aboutTitle: "服務簡介",
    aboutText: "安靜、乾淨、隱私性高的舒適空間",
    businessHoursTitle: "服務時間",
    businessHoursText: "每日 11:00 - 25:00",
    locationTitle: "服務地點",
    locationText: "台北市萬華區康定路99號",
    bookingTitle: "預約方式",
    bookingText: "請透過 LINE 官方帳號預約",
    noticeTitle: "注意事項",
    noticeText: "為避免久候，建議至少提前一小時預約，實際服務時段與師傅排班請以 LINE 確認為準。",
    contactTitle: "聯絡方式",
    contactHint: "我們推薦透過 LINE 聯繫，以獲得最快速的安排與即時回覆",
  },
  en: {
    navTeam: "Team & Join Us",
    navServices: "Services",
    navAbout: "Space",
    navContact: "Book Now",
    heroTitle: "Taipei Wild Spa",
    heroSubtitle: "Professional relaxation ｜ Privacy ｜ Premium service",
    heroButton: "Book via LINE",
    teamTitle: "Our Team",
    scheduleButton: "View Schedule",
    recruitTitle: "We're Hiring",
    servicesTitle: "Service Plans",
    servicesIntro: "All plans include the following services",
    serviceTag1: "Full-body meridian relaxation",
    serviceTag2: "Aromatherapy oil massage",
    serviceTag3: "Thai bodywork",
    inStoreTitle: "In-Studio Service",
    inStoreTime1: "60 mins　TWD $2000",
    inStoreTime2: "90 mins　TWD $2500",
    inStoreTime3: "120 mins　TWD $3000",
    extraTime: "Extra 30 mins +TWD $600",
    inStoreNote1: "* Team members are not always waiting on-site. To avoid waiting, please book at least 1 hour in advance.",
    inStoreNote2: "* A late-night surcharge of TWD $500 may apply for better service arrangement.",
    homeServiceTitle: "Outcall Service",
    homeServiceTime1: "60 mins　TWD $2500",
    homeServiceTime2: "100 mins　TWD $3000",
    homeNote1: "* To ensure timely arrival, please book at least 1 hour in advance.",
    homeNote2: "* Transportation fees may apply depending on the area. Please confirm via LINE.",
    homeNote3: "* A late-night surcharge may apply.",
    aboutHeader: "Our Space",
    aboutTitle: "Service Overview",
    aboutText: "A quiet, clean, and private space for complete relaxation",
    businessHoursTitle: "Business Hours",
    businessHoursText: "Daily 11:00 - 25:00",
    locationTitle: "Location",
    locationText: "No. 99, KangDing Rd., Wanhua Dist., Taipei City",
    bookingTitle: "Booking Method",
    bookingText: "Please make a reservation through our official LINE account",
    noticeTitle: "Notes",
    noticeText: "To avoid waiting, we recommend booking at least 1 hour in advance. Actual service hours and staff schedules should be confirmed via LINE.",
    contactTitle: "Contact",
    contactHint: "We recommend contacting us via LINE for the fastest arrangement and reply",
  },
  ja: {
    navTeam: "スタッフ・採用",
    navServices: "サービス",
    navAbout: "空間紹介",
    navContact: "今すぐ予約",
    heroTitle: "Taipei Wild Spa",
    heroSubtitle: "上質な癒し｜安心できる空間｜高品質サービス",
    heroButton: "LINEで予約する",
    teamTitle: "スタッフ紹介",
    scheduleButton: "出勤表を見る",
    recruitTitle: "スタッフ募集",
    servicesTitle: "プラン紹介",
    servicesIntro: "すべてのプランに以下の内容が含まれます",
    serviceTag1: "全身リラクゼーション",
    serviceTag2: "アロマオイルケア",
    serviceTag3: "タイ式ボディケア",
    inStoreTitle: "店内サービス",
    inStoreTime1: "60分　TWD $2000",
    inStoreTime2: "90分　TWD $2500",
    inStoreTime3: "120分　TWD $3000",
    extraTime: "延長30分 +TWD $600",
    inStoreNote1: "* スタッフは常時待機していないため、お待たせしないよう1時間前までのご予約をおすすめします。",
    inStoreNote2: "* より良いサービス提供のため、深夜は TWD $500 の追加料金を頂く場合があります。",
    homeServiceTitle: "出張サービス",
    homeServiceTime1: "60分　TWD $2500",
    homeServiceTime2: "100分　TWD $3000",
    homeNote1: "* ご指定の時間に伺うため、1時間前までのご予約をおすすめします。",
    homeNote2: "* エリアにより交通費が発生する場合があります。詳細はLINEでご確認ください。",
    homeNote3: "* 深夜は TWD $500 の追加料金を頂く場合があります。",
    aboutHeader: "空間紹介",
    aboutTitle: "サービス概要",
    aboutText: "静かで清潔、プライバシーに配慮した快適な空間",
    businessHoursTitle: "営業時間",
    businessHoursText: "毎日 11:00 - 25:00",
    locationTitle: "所在地",
    locationText: "台北市萬華區康定路99號",
    bookingTitle: "予約方法",
    bookingText: "ご予約は LINE公式アカウントよりお願いいたします",
    noticeTitle: "ご案内",
    noticeText: "お待たせを避けるため、少なくとも1時間前までのご予約をおすすめします。実際の対応時間やスタッフの出勤状況はLINEでご確認ください。",
    contactTitle: "お問い合わせ",
    contactHint: "最もスムーズなご案内のため、LINEでのご連絡をおすすめします",
  },
  ko: {
    navTeam: "팀 소개 및 채용",
    navServices: "서비스",
    navAbout: "공간 소개",
    navContact: "바로 예약",
    heroTitle: "Taipei Wild Spa",
    heroSubtitle: "전문적인 휴식 ｜ 프라이버시 ｜ 고품질 서비스",
    heroButton: "LINE으로 예약하기",
    teamTitle: "팀 소개",
    scheduleButton: "스케줄 보기",
    recruitTitle: "채용 안내",
    servicesTitle: "서비스 안내",
    servicesIntro: "모든 코스에는 아래 서비스가 포함됩니다",
    serviceTag1: "전신 근육 이완",
    serviceTag2: "아로마 오일 케어",
    serviceTag3: "타이식 바디 케어",
    inStoreTitle: "매장 서비스",
    inStoreTime1: "60분　TWD $2000",
    inStoreTime2: "90분　TWD $2500",
    inStoreTime3: "120분　TWD $3000",
    extraTime: "30분 연장 +TWD $600",
    inStoreNote1: "* 팀원이 항상 매장에 대기하지 않을 수 있어, 대기 시간을 줄이기 위해 최소 1시간 전 예약을 권장합니다.",
    inStoreNote2: "* 보다 나은 서비스 제공을 위해 야간에는 TWD $500 추가 요금이 부과될 수 있습니다.",
    homeServiceTitle: "출장 서비스",
    homeServiceTime1: "60분　TWD $2500",
    homeServiceTime2: "100분　TWD $3000",
    homeNote1: "* 지정 시간에 맞춰 방문하기 위해 최소 1시간 전 예약을 권장합니다.",
    homeNote2: "* 지역에 따라 교통비가 추가될 수 있으니 LINE으로 확인해 주세요.",
    homeNote3: "* 야간에는 TWD $500 추가 요금이 부과될 수 있습니다.",
    aboutHeader: "공간 소개",
    aboutTitle: "서비스 소개",
    aboutText: "조용하고 깨끗하며 프라이버시가 높은 편안한 공간",
    businessHoursTitle: "영업시간",
    businessHoursText: "매일 11:00 - 25:00",
    locationTitle: "위치",
    locationText: "타이베이시 완화구 캉딩로 99호",
    bookingTitle: "예약 방법",
    bookingText: "공식 LINE 계정으로 예약해 주세요",
    noticeTitle: "안내사항",
    noticeText: "대기 시간을 줄이기 위해 최소 1시간 전 예약을 권장합니다. 실제 서비스 가능 시간과 직원 스케줄은 LINE으로 확인해 주세요.",
    contactTitle: "연락처",
    contactHint: "가장 빠른 안내와 답변을 위해 LINE으로 문의하시는 것을 권장합니다",
  },
};

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

function useLockBodyScroll(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}

function useEscapeKey(active, onClose) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onClose]);
}

function useAutoCarousel(length, delay = 3000, paused = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [length, delay, paused]);

  useEffect(() => {
    if (current >= length) setCurrent(0);
  }, [current, length]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % length);
  }, [length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + length) % length);
  }, [length]);

  return { current, setCurrent, goNext, goPrev };
}

function useGallery() {
  const [gallery, setGallery] = useState({
    isOpen: false,
    member: null,
    imageIndex: 0,
  });

  const openGallery = useCallback((member, imageIndex = 0) => {
    setGallery({ isOpen: true, member, imageIndex });
  }, []);

  const closeGallery = useCallback(() => {
    setGallery({ isOpen: false, member: null, imageIndex: 0 });
  }, []);

  const showPrevImage = useCallback(() => {
    setGallery((prev) => {
      if (!prev.member) return prev;
      return {
        ...prev,
        imageIndex:
          prev.imageIndex === 0
            ? prev.member.imgs.length - 1
            : prev.imageIndex - 1,
      };
    });
  }, []);

  const showNextImage = useCallback(() => {
    setGallery((prev) => {
      if (!prev.member) return prev;
      return {
        ...prev,
        imageIndex:
          prev.imageIndex === prev.member.imgs.length - 1
            ? 0
            : prev.imageIndex + 1,
      };
    });
  }, []);

  const selectGalleryImage = useCallback((imageIndex) => {
    setGallery((prev) => ({ ...prev, imageIndex }));
  }, []);

  return {
    gallery,
    openGallery,
    closeGallery,
    showPrevImage,
    showNextImage,
    selectGalleryImage,
  };
}

function SectionTitle({ children, center = false }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}

function RevealOnScroll({ children, className = "", delay = 0, y = 24 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transition: "opacity 0.9s ease, transform 0.9s ease",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function SocialIcon({ item }) {
  return <i className={item.iconClass} />;
}

function HeroCarousel({ images }) {
  const { current } = useAutoCarousel(images.length, 4000);

  if (!images?.length) return null;

  return (
    <div className="absolute inset-0">
      {images.map((img, index) => (
        <div
          key={`hero-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`hero-${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function ImageCarousel({ images = [], alt, onImageClick }) {
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(null);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const hasMultipleImages = images.length > 1;
  const { current, setCurrent, goNext, goPrev } = useAutoCarousel(
    images.length,
    3000,
    isPaused
  );

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  }, []);

  useEffect(() => {
    if (!hasMultipleImages || !isPaused || !lastInteraction) return;

    const resumeDelay = 5000;
    const elapsed = Date.now() - lastInteraction;
    const remaining = Math.max(resumeDelay - elapsed, 0);

    const timer = window.setTimeout(() => {
      setIsPaused(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [hasMultipleImages, isPaused, lastInteraction]);

  const handleTouchStart = (e) => {
    pauseAutoPlay();
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) return;

    const distance = touchStartXRef.current - touchEndXRef.current;

    if (distance > 50) goNext();
    if (distance < -50) goPrev();
  };

  if (!images.length) {
    return (
      <div className="w-full h-[320px] bg-stone-200 flex items-center justify-center text-stone-500">
        No image
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[320px] overflow-hidden bg-stone-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={`${alt}-${index}`} className="relative w-full h-full shrink-0">
            <Image
              src={img}
              alt={`${alt}-${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover select-none cursor-pointer"
              draggable={false}
              onClick={() => onImageClick?.(index)}
            />
          </div>
        ))}
      </div>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={() => {
              pauseAutoPlay();
              goPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => {
              pauseAutoPlay();
              goNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={`dot-${alt}-${index}`}
                type="button"
                onClick={() => {
                  pauseAutoPlay();
                  setCurrent(index);
                }}
                className={`w-2.5 h-2.5 rounded-full ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const TeamCard = memo(function TeamCard({ member, lang, onOpen }) {
  const previewTags = member.desc[lang].slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden border border-stone-200">
      <ImageCarousel
        images={member.imgs}
        alt={member.name}
        onImageClick={(index) => onOpen(member, index)}
      />

      <div className="p-4 md:p-5">
        <h3 className="font-bold text-xl mb-3">{member.name}</h3>

        <div className="flex flex-wrap gap-2">
          {previewTags.map((item, index) => (
            <span
              key={`${member.id}-${lang}-${index}`}
              className={
                index === 0
                  ? "inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm"
                  : TAG_CLASS
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  times,
  extraTime,
  notes,
  className = "",
  delay = 0,
  y = 22,
}) {
  return (
    <RevealOnScroll
      className={`relative w-full max-w-[520px] min-h-[360px] rounded-2xl overflow-hidden shadow-lg ${className}`}
      delay={delay}
      y={y}
    >
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 p-6 md:p-8 text-white flex flex-col justify-end min-h-[360px]">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>

        <ul className="space-y-3 text-white/95 text-lg">
          {times.map((time) => (
            <li key={time}>{time}</li>
          ))}
        </ul>

        <p className="text-sm text-white/80 mt-5">{extraTime}</p>

        <div className="text-xs text-white/70 mt-3 space-y-1 leading-6">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

function RecruitModal({ isOpen, lang, onClose }) {
  useLockBodyScroll(isOpen);
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black text-white text-lg transition hover:scale-105"
          aria-label="Close recruit modal"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          {RECRUIT_DATA.images.map((img, idx) => (
            <div key={`recruit-${idx}`} className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`recruit-${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {RECRUIT_DATA.title[lang]}
          </h3>
          <p className="text-stone-700 leading-8 mb-5">{RECRUIT_DATA.desc[lang]}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {RECRUIT_DATA.items[lang].map((item, idx) => (
              <span key={`recruit-item-${idx}`} className={TAG_CLASS}>
                {item}
              </span>
            ))}
          </div>

          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className={PRIMARY_BUTTON_CLASS}
          >
            {RECRUIT_APPLY_TEXT[lang]}
          </a>
        </div>
      </div>
    </div>
  );
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
  const [recruitOpen, setRecruitOpen] = useState(false);
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

          <button
            type="button"
            onClick={() => setRecruitOpen(true)}
            className="inline-block mt-4 mb-6 px-3 py-1.5 border border-stone-700 text-stone-700 text-sm rounded-full transition hover:bg-stone-100 hover:scale-105"
          >
            {t.recruitTitle}
          </button>

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.720699767034!2d121.50058377537685!3d25.043550877810183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90887199d5f%3A0xc99cf0b88c4be9f3!2zMTA4NDToh7rljJfluILokKzoj6_ljYDmiJDpg73ot68xMznomZ8!5e0!3m2!1szh-TW!2stw!4v1774421460605!5m2!1szh-TW!2stw"
                width="100%"
                height="350"
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

      <RecruitModal
        isOpen={recruitOpen}
        lang={lang}
        onClose={() => setRecruitOpen(false)}
      />

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