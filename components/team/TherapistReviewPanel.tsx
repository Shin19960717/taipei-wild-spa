"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import GalleryModal from "@/components/ui/gallery/GalleryModal";

import { openLineBooking } from "@/lib/line";

import type {
  Lang,
  TeamMember,
} from "@/data/teamMembers";

import TherapistReviewsSection from "@/components/sections/TherapistReviewsSection";

import { getTherapistReviews } from "@/lib/getTherapistReviews";

type TherapistPageClientProps = {
  member: TeamMember;
  lang: Lang;
};

const TEXT = {
  zh: {
    backToHome: "返回首頁",
    bookThis: "LINE 預約這位師傅",
    gallery: "照片",
    intro: "師傅介紹",
    schedule:
      "預約前可先透過 LINE 詢問可預約時段。",
  },

  en: {
    backToHome: "Back to Home",
    bookThis:
      "Book This Therapist via LINE",
    gallery: "Photos",
    intro: "Therapist Profile",
    schedule:
      "Please contact us via LINE to check available times.",
  },

  ja: {
    backToHome: "ホームへ戻る",
    bookThis:
      "LINEでこのセラピストを予約",
    gallery: "写真",
    intro: "セラピスト紹介",
    schedule:
      "予約可能時間はLINEでお問い合わせください。",
  },

  ko: {
    backToHome: "홈으로 돌아가기",
    bookThis:
      "LINE으로 이 테라피스트 예약",
    gallery: "사진",
    intro: "테라피스트 소개",
    schedule:
      "예약 가능 시간은 LINE으로 문의해 주세요.",
  },
};

export default function TherapistPageClient({
  member,
  lang,
}: TherapistPageClientProps) {
  const router = useRouter();

  const t = TEXT[lang];

  const reviews = useMemo(() => {
    return getTherapistReviews(
      member.name,
      lang
    );
  }, [member.name, lang]);

  const [gallery, setGallery] =
    useState({
      isOpen: true,
      member,
      imageIndex: 0,
    });

  const imageLength =
    member.imgs.length;

  const closeHref = `/${lang}`;

  const showPrevImage = () => {
    setGallery((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex === 0
          ? imageLength - 1
          : prev.imageIndex - 1,
    }));
  };

  const showNextImage = () => {
    setGallery((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex ===
        imageLength - 1
          ? 0
          : prev.imageIndex + 1,
    }));
  };

  const selectGalleryImage = (
    imageIndex: number
  ) => {
    setGallery((prev) => ({
      ...prev,
      imageIndex,
    }));
  };

  const handleClose = () => {
    router.push(`/${lang}`);
  };

  return (
    <>
      <GalleryModal
        gallery={gallery}
        lang={lang}
        t={t}
        onClose={handleClose}
        onPrev={showPrevImage}
        onNext={showNextImage}
        onSelectImage={
          selectGalleryImage
        }
        openLineBooking={
          openLineBooking
        }
        fullScreen
      />

      <div className="min-h-screen bg-black">
        <div className="max-w-6xl mx-auto px-4 pb-20 pt-6">
          <div className="mb-8">
            <Link
              href={closeHref}
              className="text-sm underline text-gray-400 hover:text-white transition-colors"
            >
              {t.backToHome}
            </Link>
          </div>

          <TherapistReviewsSection
            reviews={reviews}
            lang={lang}
          />
        </div>
      </div>
    </>
  );
}