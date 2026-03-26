"use client";

import { useState, useEffect } from "react";

function ImageCarousel({ images, alt, onImageClick }) {
    const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const pauseAutoPlay = () => {
    setIsPaused(true);
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const resumeDelay = 5000;
    const now = Date.now();
    const timeSinceLastInteraction = now - lastInteraction;

    if (isPaused && timeSinceLastInteraction < resumeDelay) {
      const resumeTimer = setTimeout(() => {
        setIsPaused(false);
      }, resumeDelay - timeSinceLastInteraction);

      return () => clearTimeout(resumeTimer);
    }

    const autoTimer = setInterval(() => {
      goNext();
    }, 3000);

    return () => clearInterval(autoTimer);
  }, [images, isPaused, lastInteraction]);

  const handleManualNext = () => {
    pauseAutoPlay();
    goNext();
  };

  const handleManualPrev = () => {
    pauseAutoPlay();
    goPrev();
  };

  const handleTouchStart = (e) => {
    pauseAutoPlay();
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      goNext();
    } else if (distance < -50) {
      goPrev();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[320px] bg-stone-200 flex items-center justify-center text-stone-500">
        No image
      </div>
    );
  }

return (
  <div
    className="relative w-full h-[320px] overflow-hidden"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    <div
      className="flex h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${current * 100}%)` }}
    >
      {images.map((img, index) => (
        <div key={index} className="w-full h-full shrink-0">
<img
  src={img}
  alt={`${alt}-${index + 1}`}
  className="w-full h-full object-cover select-none cursor-pointer"
  draggable="false"
  onClick={() => onImageClick?.(index)}
/>        </div>
      ))}
    </div>

    {images.length > 1 && (
      <>
        <button
          type="button"
          onClick={handleManualPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={handleManualNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                pauseAutoPlay();
                setCurrent(index);
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </>
    )}
  </div>
);}export default function Home() {
  const [lang, setLang] = useState("zh");
  const [selectedMember, setSelectedMember] = useState(null);
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
const [isGalleryOpen, setIsGalleryOpen] = useState(false);
const [recruitOpen, setRecruitOpen] = useState(false);
  {/* 人才招募 Recruit */}
const recruitData = {
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
  images: [
    "/recruit/01.jpg",
    "/recruit/02.jpg",
    "/recruit/03.jpg",
  ],
  items: {
    zh: ["高配合度", "環境單純", "重視隱私", "彈性排班"],
    en: ["High cooperation", "Simple environment", "Privacy focused", "Flexible schedule"],
    ja: ["高い協調性", "シンプルな環境", "プライバシー重視", "柔軟なシフト"],
    ko: ["높은 협조도", "단순한 환경", "프라이버시 중시", "유연한 스케줄"],
  },
  lineLink: "https://line.me/R/ti/p/@834xdutc",
};


const teamMembers = [
  
  {
    name: "Rookie",
    desc: {
      zh: [
        "171/68/28",
        "體格健壯",
        "按摩手法穩健",
        "開朗健談",
        "配合度高",
      ],
en: [
  "172/67/33",
  "Clean and sharp appearance",
  "Solid and well-built physique",
  "Natural and easygoing interaction",
  "Highly cooperative and adaptable"
],
ja: [
  "172/67/33",
  "清潔感のある整った外見",
  "しっかりとした筋肉質な体格",
  "自然で気軽なコミュニケーション",
  "柔軟に対応できる高い協調性"
],
ko: [
  "172/67/33",
  "깔끔하고 단정한 외형",
  "탄탄하고 근육질의 체형",
  "자연스럽고 편안한 소통",
  "유연하게 대응 가능한 높은 협조도"
],
    },
    imgs: ["/team/Rookie01.jpg", "/team/Rookie02.jpg", "/team/Rookie03.jpg", "/team/Rookie04.jpg"],
    calendar: "https://calendar.google.com/ryan",
  },
    {
    name: "Eric",
    desc: {
zh: [
  "172/67/33",
  "外表乾淨俐落",
  "肌肉結實厚實",
  "互動自然不拘束",
  "配合度高",
],
en: [
  "172/67/33",
  "Clean and sharp appearance",
  "Solid and well-built physique",
  "Natural and easygoing interaction",
  "Highly cooperative"
],
ja: [
  "172/67/33",
  "清潔感のある整った外見",
  "しっかりとした筋肉質な体格",
  "自然で気軽なコミュニケーション",
  "協調性が高い"
],
ko: [
  "172/67/33",
  "깔끔하고 단정한 외형",
  "탄탄하고 근육질의 체형",
  "자연스럽고 편안한 소통",
  "높은 협조도"
],
    },
    imgs: ["/team/Eric01.jpg", "/team/Eric02.jpg", "/team/Eric03.jpg", "/team/Eric04.jpg"],
    calendar: "https://calendar.google.com/ryan",
  },
];
  const content = {
    zh: {
      navTeam: "團隊介紹與招募",
      navServices: "服務內容",
      navAbout: "環境概覽",
      navContact: "即刻預約",

      heroTitle: "Taipei Wild Spa",
      heroSubtitle: "專業放鬆體驗｜隱私安全｜高品質服務",
      heroButton: "立即加 LINE 預約",

      teamTitle: "團隊介紹",
      memberDesc: "專業按摩・放鬆體驗",
      scheduleButton: "查看班表",

      recruitLabel: "JOIN US",
      recruitTitle: "人才招募",
      recruitDesc: "歡迎加入 Taipei Wild Spa",
      recruitButton: "點擊聯絡我們",

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

aboutTitle: "環境介紹",
aboutDesc: "安靜、乾淨、隱私性高的舒適空間",
businessHoursTitle: "營業時間",
businessHoursText: "每日 11:00 - 25:00",
locationTitle: "營業地點",
locationText: "台北市萬華區成都路139號",
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
      memberDesc: "Professional massage ・ Relaxing experience",
      scheduleButton: "View Schedule",

      recruitLabel: "JOIN US",
      recruitTitle: "We're Hiring",
      recruitDesc: "Welcome to join Taipei Wild Spa",
      recruitButton: "Contact Us",

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
      inStoreNote1:
        "* Team members are not always waiting on-site. To avoid waiting, please book at least 1 hour in advance.",
      inStoreNote2:
        "* A late-night surcharge of TWD $500 may apply for better service arrangement.",

      homeServiceTitle: "Outcall Service",
      homeServiceTime1: "60 mins　TWD $2500",
      homeServiceTime2: "100 mins　TWD $3000",
      homeNote1:
        "* To ensure timely arrival, please book at least 1 hour in advance.",
      homeNote2:
        "* Transportation fees may apply depending on the area. Please confirm via LINE.",
      homeNote3:
        "* A late-night surcharge of TWD $500 may apply.",

aboutTitle: "Our Space",
aboutDesc: "A quiet, clean, and private space for complete relaxation",
businessHoursTitle: "Business Hours",
businessHoursText: "Daily 11:00 - 25:00",
locationTitle: "Location",
locationText: "No. 139, Chengdu Rd., Wanhua Dist., Taipei City",
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
      memberDesc: "プロによる癒しとリラックス体験",
      scheduleButton: "出勤表を見る",

      recruitLabel: "JOIN US",
      recruitTitle: "スタッフ募集",
      recruitDesc: "Taipei Wild Spa へようこそ",
      recruitButton: "お問い合わせはこちら",

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
      inStoreNote1:
        "* スタッフは常時待機していないため、お待たせしないよう1時間前までのご予約をおすすめします。",
      inStoreNote2:
        "* より良いサービス提供のため、深夜は TWD $500 の追加料金を頂く場合があります。",

      homeServiceTitle: "出張サービス",
      homeServiceTime1: "60分　TWD $2500",
      homeServiceTime2: "100分　TWD $3000",
      homeNote1:
        "* ご指定の時間に伺うため、1時間前までのご予約をおすすめします。",
      homeNote2:
        "* エリアにより交通費が発生する場合があります。詳細はLINEでご確認ください。",
      homeNote3:
        "* 深夜は TWD $500 の追加料金を頂く場合があります。",

aboutTitle: "空間紹介",
aboutDesc: "静かで清潔、プライバシーに配慮した快適な空間",
businessHoursTitle: "営業時間",
businessHoursText: "毎日 11:00 - 25:00",
locationTitle: "所在地",
locationText: "台北市萬華區成都路139號",
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
      memberDesc: "전문 마사지 ・ 편안한 힐링 경험",
      scheduleButton: "스케줄 보기",

      recruitLabel: "JOIN US",
      recruitTitle: "채용 안내",
      recruitDesc: "Taipei Wild Spa와 함께하세요",
      recruitButton: "문의하기",

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
      inStoreNote1:
        "* 팀원이 항상 매장에 대기하지 않을 수 있어, 대기 시간을 줄이기 위해 최소 1시간 전 예약을 권장합니다.",
      inStoreNote2:
        "* 보다 나은 서비스 제공을 위해 야간에는 TWD $500 추가 요금이 부과될 수 있습니다.",

      homeServiceTitle: "출장 서비스",
      homeServiceTime1: "60분　TWD $2500",
      homeServiceTime2: "100분　TWD $3000",
      homeNote1:
        "* 지정 시간에 맞춰 방문하기 위해 최소 1시간 전 예약을 권장합니다.",
      homeNote2:
        "* 지역에 따라 교통비가 추가될 수 있으니 LINE으로 확인해 주세요.",
      homeNote3:
        "* 야간에는 TWD $500 추가 요금이 부과될 수 있습니다.",

aboutTitle: "공간 소개",
aboutDesc: "조용하고 깨끗하며 프라이버시가 높은 편안한 공간",
businessHoursTitle: "영업시간",
businessHoursText: "매일 11:00 - 25:00",
locationTitle: "위치",
locationText: "타이베이시 완화구 청두로 139호",
bookingTitle: "예약 방법",
bookingText: "공식 LINE 계정으로 예약해 주세요",
noticeTitle: "안내사항",
noticeText: "대기 시간을 줄이기 위해 최소 1시간 전 예약을 권장합니다. 실제 서비스 가능 시간과 직원 스케줄은 LINE으로 확인해 주세요.",
contactTitle: "연락처",
contactHint: "가장 빠른 안내와 답변을 위해 LINE으로 문의하시는 것을 권장합니다",
    },
  };
const openGallery = (member, index = 0) => {
  setSelectedMember(member);
  setSelectedImageIndex(index);
  setIsGalleryOpen(true);
};

const closeGallery = () => {
  setSelectedMember(null);
  setSelectedImageIndex(0);
  setIsGalleryOpen(false);
};

const showPrevImage = () => {
  if (!selectedMember) return;
  setSelectedImageIndex((prev) =>
    prev === 0 ? selectedMember.imgs.length - 1 : prev - 1
  );
};

const showNextImage = () => {
  if (!selectedMember) return;
  setSelectedImageIndex((prev) =>
    prev === selectedMember.imgs.length - 1 ? 0 : prev + 1
  );
};

  const t = content[lang];

  return (
    <div className="min-h-screen bg-stone-300 text-stone-800">
      {/* Header */}
      <header className="bg-white py-2 shadow-md">
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          {/* LOGO */}
          <div className="flex justify-center w-full">
            <img
              src="/flatbanner.png"
              alt="Taipei Wild Spa"
              className="w-30 h-30 object-contain"
            />
          </div>

          {/* NAV */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
            <a href="#team" className="px-2 py-0.5 text-sm border rounded-lg">
              {t.navTeam}
            </a>
            <a
              href="#services"
              className="px-2 py-0.5 text-sm border rounded-lg"
            >
              {t.navServices}
            </a>
            <a href="#about" className="px-2 py-0.5 text-sm border rounded-lg">
              {t.navAbout}
            </a>
            <a
              href="https://line.me/R/ti/p/@834xdutc"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-0.5 text-sm bg-black text-white rounded-lg"
            >
              {t.navContact}
            </a>
          </div>

          {/* LANG */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
            <button
              onClick={() => setLang("zh")}
              className={`px-2 py-0.5 text-sm rounded-lg border transition ${
                lang === "zh"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              中文
            </button>

            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 text-sm rounded-lg border transition ${
                lang === "en"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLang("ja")}
              className={`px-2 py-0.5 text-sm rounded-lg border transition ${
                lang === "ja"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              日本語
            </button>

            <button
              onClick={() => setLang("ko")}
              className={`px-2 py-0.5 text-sm rounded-lg border transition ${
                lang === "ko"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              한국어
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[55vh]">
        <img
          src="/team/profilebanner.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.heroTitle}
          </h1>

          <p className="mb-6">{t.heroSubtitle}</p>

          <a
            href="https://line.me/R/ti/p/@834xdutc"
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            {t.heroButton}
          </a>
        </div>
      </section>

      {/* Team */}
<section id="team" className="p-10">
  <h2 className="text-2xl font-bold mb-3">{t.teamTitle}</h2>

  <button
    type="button"
    onClick={() => setRecruitOpen(true)}
    className="inline-block mb-6 px-3 py-1.5 border border-stone-700 text-stone-700 text-sm rounded-full hover:bg-stone-100 hover:scale-105 transition"
  >
    {t.recruitTitle}
  </button>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {teamMembers.map((member, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        <ImageCarousel
          images={member.imgs}
          alt={member.name}
          onImageClick={(index) => openGallery(member, index)}
        />

        <div className="p-4">
          <h3 className="font-bold">{member.name}</h3>

          <div className="flex flex-wrap gap-3 mt-3">
            {member.desc[lang].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base"
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href={member.calendar}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            {t.scheduleButton}
          </a>
        </div>
      </div>
    ))}
  </div>

{recruitOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    onClick={() => setRecruitOpen(false)}
  >
    <div
      className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setRecruitOpen(false)}
        className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black text-white text-lg hover:scale-105 transition"
      >
        ×
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {recruitData.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`recruit-${idx + 1}`}
            className="w-full h-64 object-cover rounded-xl"
          />
        ))}
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {recruitData.title[lang]}
        </h3>

        <p className="text-stone-700 leading-8 mb-5">
          {recruitData.desc[lang]}
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {recruitData.items[lang].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base"
            >
              {item}
            </span>
          ))}
        </div>

        <a
          href={recruitData.lineLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-5 py-3 bg-black text-white rounded-xl text-sm md:text-base hover:scale-105 transition"
        >
          {lang === "zh"
            ? "加入 LINE 應徵"
            : lang === "en"
            ? "Apply via LINE"
            : lang === "ja"
            ? "LINEで応募する"
            : "LINE으로 지원하기"}
        </a>
      </div>
    </div>
  </div>
)}
</section>
      {/* Services */}
      <section id="services" className="p-10 bg-white">
        <h2 className="text-2xl font-bold mb-8">{t.servicesTitle}</h2>

        <p className="text-stone-600 mb-6">{t.servicesIntro}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">
            {t.serviceTag1}
          </span>
          <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">
            {t.serviceTag2}
          </span>
          <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">
            {t.serviceTag3}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* In-store */}
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">{t.inStoreTitle}</h3>

            <ul className="space-y-3 text-stone-700">
              <li>{t.inStoreTime1}</li>
              <li>{t.inStoreTime2}</li>
              <li>{t.inStoreTime3}</li>
            </ul>

            <p className="text-sm text-stone-500 mt-4">{t.extraTime}</p>

            <p className="text-xs text-stone-400 mt-2 space-y-1">
              <span className="block">{t.inStoreNote1}</span>
              <span className="block">{t.inStoreNote2}</span>
            </p>
          </div>

          {/* Outcall */}
          <div className="p-6 border rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">{t.homeServiceTitle}</h3>

            <ul className="space-y-3 text-stone-700">
              <li>{t.homeServiceTime1}</li>
              <li>{t.homeServiceTime2}</li>
            </ul>

            <p className="text-sm text-stone-500 mt-4">{t.extraTime}</p>

            <p className="text-xs text-stone-400 mt-2 space-y-1">
              <span className="block">{t.homeNote1}</span>
              <span className="block">{t.homeNote2}</span>
              <span className="block">{t.homeNote3}</span>
            </p>
          </div>
        </div>
      </section>

{/* About / Environment */}
<section id="about" className="py-16 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
      {t.aboutTitle}
    </h2>

<div className="grid md:grid-cols-2 gap-10 items-start">
  
  {/* 左側資訊 */}
<div className="bg-stone-50 rounded-2xl shadow-lg p-6 md:p-8">
  <p className="text-stone-600 mb-3">{t.aboutDesc}</p>

  <div className="space-y-5 text-stone-800">
    <div>
      <h3 className="text-lg font-bold mb-1">{t.businessHoursTitle}</h3>
      <p>{t.businessHoursText}</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-1">{t.locationTitle}</h3>
      <p>{t.locationText}</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-1">{t.bookingTitle}</h3>
      <p>{t.bookingText}</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-1">{t.noticeTitle}</h3>
      <p className="text-sm text-stone-600 leading-7">
        {t.noticeText}
      </p>
    </div>

    <div className="pt-4 border-t border-stone-200">
      <h3 className="text-lg font-bold mb-3">{t.contactTitle}</h3>

      <div className="flex gap-4 mb-4">
        {/* LINE */}
        <a
          href="https://line.me/R/ti/p/@834xdutc"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-300 hover:scale-110 transition"
          aria-label="LINE"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
            alt="LINE"
            className="w-5 h-5"
          />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/taipei_wildspa?igsh=MWsxNm1odnV0M2JkdQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-300 hover:bg-black hover:text-white transition"
          aria-label="Instagram"
        >
          <i className="ri-instagram-line text-xl"></i>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61576573349568"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-300 hover:bg-black hover:text-white transition"
          aria-label="Facebook"
        >
          <i className="ri-facebook-circle-line text-xl"></i>
        </a>

        {/* X */}
        <a
          href="https://x.com/taipei_wildspa?s=21"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-300 hover:bg-black hover:text-white transition"
          aria-label="X"
        >
          <i className="ri-twitter-x-line text-xl"></i>
        </a>
      </div>

      <p className="text-sm text-stone-400">
        {t.contactHint}
      </p>
    </div>
  </div>
</div>
  {/* 右側地圖 */}
  <div className="w-full">
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.720699767034!2d121.50058377537685!3d25.043550877810183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90887199d5f%3A0xc99cf0b88c4be9f3!2zMTA4NDToh7rljJfluILokKzoj6_ljYDmiJDpg73ot68xMznomZ8!5e0!3m2!1szh-TW!2stw!4v1774421460605!5m2!1szh-TW!2stw"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Taipei Wild Spa 地圖"
      ></iframe>
    </div>
    
  </div>

</div>
  </div>
      </section>
            {isGalleryOpen && selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              type="button"
              onClick={closeGallery}
              className="absolute top-4 right-4 z-20 bg-black/70 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center"
            >
              ×
            </button>

            {/* 左右切換 */}
            {selectedMember.imgs.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* 大圖 */}
            <div className="bg-black flex items-center justify-center">
              <img
                src={selectedMember.imgs[selectedImageIndex]}
                alt={`${selectedMember.name}-${selectedImageIndex + 1}`}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* 人名與描述 */}
            <div className="px-6 pt-4">
              <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
<div className="flex flex-wrap gap-3 mt-3">
  {selectedMember.desc[lang].map((item, idx) => (
    <span
      key={idx}
      className={
        idx === 0
          ? "inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm md:text-base font-medium"
          : "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base"
      }
    >
      {item}
    </span>
  ))}
</div>              <p className="text-sm text-stone-500 mt-2">
                {selectedImageIndex + 1} / {selectedMember.imgs.length}
              </p>
            </div>

            {/* 小圖預覽 */}
            <div className="flex gap-3 overflow-x-auto px-6 py-4 bg-white">
              {selectedMember.imgs.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-stone-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedMember.name}-thumb-${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}