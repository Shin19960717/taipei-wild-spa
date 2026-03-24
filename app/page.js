"use client";

import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("zh");

const teamMembers = [
  {
    name: "Ryan",
    img: "/team/01.jpg",
  },
  {
    name: "Leo",
    img: "/team/02.jpg",
  },
  {
    name: "Max",
    img: "/team/03.jpg",
  },
  {
    name: "Evan",
    img: "/team/04.jpg",
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
      member: "成員",
      memberDesc: "專業按摩・放鬆體驗",
      servicesTitle: "服務介紹",
      service1: "經典舒壓按摩",
      service1Desc: "全身放鬆，舒緩壓力",
      service2: "深層放鬆",
      service2Desc: "針對肌肉緊繃調整",
      service3: "芳療舒眠",
      service3Desc: "幫助入眠與放鬆",
      aboutTitle: "環境介紹",
      aboutDesc: "安靜、乾淨、隱私性高的舒適空間",
      contactTitle: "聯絡我們",
      contactButton: "加 LINE 預約",
    },
    en: {
      navTeam: "Team",
      navServices: "Service",
      navAbout: "About",
      navContact: "Booking",
      heroTitle: "Taipei Wild Spa",
      heroSubtitle: "Professional relaxation ｜ Privacy ｜ Premium service",
      heroButton: "Book via LINE",
      teamTitle: "Our Team",
      member: "Member",
      memberDesc: "Professional massage ・ Relaxing experience",
      servicesTitle: "Services",
      service1: "Classic Relax Massage",
      service1Desc: "Full-body relaxation and stress relief",
      service2: "Deep Relaxation",
      service2Desc: "Release muscle tension and restore comfort",
      service3: "Aroma Sleep Therapy",
      service3Desc: "Relaxing aroma experience for better rest",
      aboutTitle: "About Our Space",
      aboutDesc: "Quiet, clean, and private environment",
      contactTitle: "Contact Us",
      contactButton: "Book on LINE",
    },
    ja: {
      navTeam: "チーム",
      navServices: "サービス",
      navAbout: "空間",
      navContact: "予約",
      heroTitle: "Taipei Wild Spa",
      heroSubtitle: "上質な癒し｜安心できる空間｜高品質サービス",
      heroButton: "LINEで予約する",
      teamTitle: "スタッフ紹介",
      member: "スタッフ",
      memberDesc: "プロフェッショナルな癒し体験",
      servicesTitle: "サービス紹介",
      service1: "クラシックリラックスマッサージ",
      service1Desc: "全身をほぐし、ストレスを和らげます",
      service2: "ディープリラクゼーション",
      service2Desc: "筋肉のこわばりをやさしく緩和します",
      service3: "アロマ安眠ケア",
      service3Desc: "香りで心身を落ち着かせます",
      aboutTitle: "空間紹介",
      aboutDesc: "静かで清潔、プライバシーに配慮した空間",
      contactTitle: "お問い合わせ",
      contactButton: "LINEで予約",
    },
    ko: {
      navTeam: "팀",
      navServices: "서비스",
      navAbout: "공간",
      navContact: "예약",
      heroTitle: "Taipei Wild Spa",
      heroSubtitle: "전문적인 휴식 ｜ 프라이버시 ｜ 고품질 서비스",
      heroButton: "LINE으로 예약하기",
      teamTitle: "팀 소개",
      member: "멤버",
      memberDesc: "전문 마사지 ・ 편안한 힐링 경험",
      servicesTitle: "서비스 소개",
      service1: "클래식 릴랙스 마사지",
      service1Desc: "전신 이완과 스트레스 완화",
      service2: "딥 릴랙세이션",
      service2Desc: "근육 긴장을 부드럽게 완화",
      service3: "아로마 수면 케어",
      service3Desc: "편안한 휴식을 돕는 아로마 케어",
      aboutTitle: "공간 소개",
      aboutDesc: "조용하고 깨끗하며 프라이버시가 높은 공간",
      contactTitle: "문의하기",
      contactButton: "LINE 예약하기",
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Header */}
<header className="relative p-6 flex flex-col md:flex-row justify-between items-center bg-white shadow-md gap-4">
  <h1 className="text-xl font-bold">Taipei Wild Spa</h1>

  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-wrap items-center gap-3">
    <a href="#team" className="px-3 py-1 border rounded">{t.navTeam}</a>
    <a href="#services" className="px-3 py-1 border rounded">{t.navServices}</a>
    <a href="#about" className="px-3 py-1 border rounded">{t.navAbout}</a>
    <a href="#contact" className="px-3 py-1 bg-black text-white rounded">{t.navContact}</a>
  </div>

  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => setLang("zh")}
      className={`px-5 py-3 rounded-xl border transition ${
        lang === "zh"
          ? "bg-black text-white shadow-md"
          : "bg-white text-black hover:bg-stone-100"
      }`}
    >
      中文
    </button>

    <button
      onClick={() => setLang("en")}
      className={`px-5 py-3 rounded-xl border transition ${
        lang === "en"
          ? "bg-black text-white shadow-md"
          : "bg-white text-black hover:bg-stone-100"
      }`}
    >
      EN
    </button>

    <button
      onClick={() => setLang("ja")}
      className={`px-5 py-3 rounded-xl border transition ${
        lang === "ja"
          ? "bg-black text-white shadow-md"
          : "bg-white text-black hover:bg-stone-100"
      }`}
    >
      日本語
    </button>

    <button
      onClick={() => setLang("ko")}
      className={`px-5 py-3 rounded-xl border transition ${
        lang === "ko"
          ? "bg-black text-white shadow-md"
          : "bg-white text-black hover:bg-stone-100"
      }`}
    >
      한국어
    </button>
  </div>
</header>

      {/* Hero */}
<section className="relative h-[70vh] md:h-[85vh]">

  {/* 背景圖 */}
  <img
    src="/team/profilebanner.jpg"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* 遮罩 */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* 文字 */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Taipei Wild Spa
    </h1>

    <p className="mb-6">
      專業放鬆體驗｜隱私安全｜高品質服務
    </p>

    <a
      href="https://line.me/R/ti/p/@834xdutc"
      target="_blank"
      rel="noreferrer"
      className="bg-white text-black px-6 py-3 rounded-full font-semibold"
    >
      立即加 LINE 預約
    </a>
  </div>

</section>
      {/* Team */}
      <section id="team" className="p-10">
        <h2 className="text-2xl font-bold mb-6">{t.teamTitle}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
{/* 人才招募卡 */}
<a
  href="https://line.me/R/ti/p/@834xdutc"
  target="_blank"
  rel="noreferrer"
  className="bg-black text-white rounded-xl shadow overflow-hidden block hover:opacity-90 transition"
>
  <div className="w-full h-[320px] flex items-center justify-center text-center px-6">
    <div>
      <p className="text-sm tracking-[0.2em] mb-3">JOIN US</p>
      <h3 className="text-2xl font-bold mb-2">人才招募</h3>
      <p className="text-sm text-stone-300">
        歡迎加入 Taipei Wild Spa
      </p>
    </div>
  </div>

  <div className="p-4 border-t border-white/10">
    <p className="text-sm text-stone-300">點擊聯絡我們</p>
  </div>
</a>
{teamMembers.map((member, index) => (
  <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
    <img
      src={member.img}
      alt={member.name}
      className="w-full h-[320px] object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold">{member.name}</h3>
      <p className="text-sm text-stone-600">{t.memberDesc}</p>
    </div>
  </div>
))}
</div>
</section>

<section id="services" className="p-10 bg-white">  <h2 className="text-2xl font-bold mb-8">方案介紹</h2>
  <p className="text-stone-600 mb-6">
  所有方案皆提供以下服務
</p>

<div className="flex flex-wrap gap-2 mb-8">
  <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">全身筋絡放鬆</span>
  <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">精油放鬆</span>
  <span className="px-3 py-1 bg-stone-200 rounded-full text-sm">泰式體推</span>
</div>

  <div className="grid md:grid-cols-2 gap-8">

    {/* 店內服務 */}
<div className="p-6 border rounded-2xl shadow">
  <h3 className="text-xl font-bold mb-4">店內服務</h3>

  <ul className="space-y-3 text-stone-700">
    <li>60 分鐘　TWD $2000</li>
    <li>90 分鐘　TWD $2500</li>
    <li>120 分鐘　TWD $3000</li>
  </ul>

  <p className="text-sm text-stone-500 mt-4">
    加時 30 分鐘 +TWD $600
  </p>

<p className="text-xs text-stone-400 mt-2 space-y-1">
  <span className="block">
    * 團隊成員未於工作坊待命，為免久候，建議提前至少一小時預約
  </span>
  <span className="block">
    * 為提供更好服務，夜間將酌收額外服務費 TWD $500
  </span>
</p></div>
    {/* 到府服務 */}
<div className="p-6 border rounded-2xl shadow">
  <h3 className="text-xl font-bold mb-4">到府服務（外出）</h3>

  <ul className="space-y-3 text-stone-700">
    <li>60 分鐘　TWD $2500</li>
    <li>100 分鐘　TWD $3000</li>
  </ul>

  <p className="text-sm text-stone-500 mt-4">
    加時 30 分鐘 +TWD $600
  </p>

  <p className="text-xs text-stone-400 mt-2 space-y-1">
    <span className="block">
      * 為使團隊成員於指定時間前往服務，為免久候，建議提前至少一小時預約
    </span>
    <span className="block">
      * 外出服務依地區可能酌收交通費，請透過 LINE 預約確認
    </span>
        <span className="block">
      * 為提供良好服務，夜間將酌收額外服務費TWD $500
    </span>

  </p>
</div>
  </div>
</section>
      {/* About */}
<section id="about" className="p-10">
  <h2 className="text-2xl font-bold mb-4">環境介紹</h2>
  <p className="mb-6">安靜、乾淨、隱私性高的舒適空間</p>

  {/* 環境照片 */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <img
    src="/environment/01.jpg"
    alt="環境照片1"
    className="w-full h-[250px] object-cover rounded-xl"
  />

  <img
    src="/environment/02.jpg"
    alt="環境照片2"
    className="w-full h-[250px] object-cover rounded-xl"
  />

  <img
    src="/environment/03.jpg"
    alt="環境照片3"
    className="w-full h-[250px] object-cover rounded-xl"
  />
</div></section>    </div>
  );
}