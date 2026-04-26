"use client";

import { useMemo, useState } from "react";
import GalleryModal from "@/components/ui/gallery/GalleryModal";
import { openLineBooking } from "@/lib/line";
import type { Lang, TeamMember } from "@/data/teamMembers";

type TherapistPageClientProps = {
  member: TeamMember;
  lang: Lang;
};

const TEXT = {
  zh: {
    backToTeam: "返回全部師傅",
    bookThis: "LINE 預約這位師傅",
    gallery: "照片",
    intro: "師傅介紹",
    schedule: "預約前可先透過 LINE 詢問可預約時段。",
  },
  en: {
    backToTeam: "Back to All Therapists",
    bookThis: "Book This Therapist via LINE",
    gallery: "Photos",
    intro: "Therapist Profile",
    schedule: "Please contact us via LINE to check available times.",
  },
  ja: {
    backToTeam: "セラピスト一覧へ戻る",
    bookThis: "LINEでこのセラピストを予約",
    gallery: "写真",
    intro: "セラピスト紹介",
    schedule: "予約可能時間はLINEでお問い合わせください。",
  },
  ko: {
    backToTeam: "전체 테라피스트로 돌아가기",
    bookThis: "LINE으로 이 테라피스트 예약",
    gallery: "사진",
    intro: "테라피스트 소개",
    schedule: "예약 가능 시간은 LINE으로 문의해 주세요.",
  },
};

export default function TherapistPageClient({
  member,
  lang,
}: TherapistPageClientProps) {
  const t = TEXT[lang];

  const [gallery, setGallery] = useState({
    isOpen: true,
    member,
    imageIndex: 0,
  });

  const imageLength = member.imgs.length;

  const closeHref = useMemo(() => `/team?lang=${lang}`, [lang]);

  const closeGallery = () => {
    window.location.href = closeHref;
  };

  const showPrevImage = () => {
    setGallery((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex === 0 ? imageLength - 1 : prev.imageIndex - 1,
    }));
  };

  const showNextImage = () => {
    setGallery((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex === imageLength - 1 ? 0 : prev.imageIndex + 1,
    }));
  };

  const selectGalleryImage = (imageIndex: number) => {
    setGallery((prev) => ({
      ...prev,
      imageIndex,
    }));
  };

  return (
    <GalleryModal
      gallery={gallery}
      lang={lang}
      t={t}
      onClose={closeGallery}
      onPrev={showPrevImage}
      onNext={showNextImage}
      onSelectImage={selectGalleryImage}
      openLineBooking={openLineBooking}
      fullScreen
    />
  );
}