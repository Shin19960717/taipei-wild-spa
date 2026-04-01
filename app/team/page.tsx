"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TeamGrid from "@/components/team/TeamGrid";
import TEAM_MEMBERS, { type Lang } from "@/data/teamMembers";
import useGallery from "@/hooks/useGallery";
import GalleryModal from "@/components/ui/gallery/GalleryModal";
import { openLineBooking } from "@/lib/line";

export default function TeamPage() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");

  const lang: Lang =
    langParam === "en" ||
    langParam === "ja" ||
    langParam === "ko" ||
    langParam === "zh"
      ? langParam
      : "zh";

  const backHref = lang === "zh" ? "/" : `/?lang=${lang}`;

  const pageText = useMemo(
    () =>
      ({
        zh: {
          title: "全部師傅",
          subtitle: "查看目前可預約師傅的照片與基本資訊。",
          back: "返回首頁",
          scheduleButton: "查看班表",
          bookThis: "LINE預約這位師傅",
        },
        en: {
          title: "All Therapists",
          subtitle:
            "Browse photos and basic information of all available therapists.",
          back: "Back to Home",
          scheduleButton: "View Schedule",
          bookThis: "Book This Therapist via LINE",
        },
        ja: {
          title: "全セラピスト一覧",
          subtitle:
            "現在予約可能なセラピストの写真と基本情報をご覧いただけます。",
          back: "ホームへ戻る",
          scheduleButton: "スケジュールを見る",
          bookThis: "LINEでこのセラピストを予約",
        },
        ko: {
          title: "전체 테라피스트",
          subtitle:
            "현재 예약 가능한 테라피스트의 사진과 기본 정보를 확인하세요.",
          back: "홈으로 돌아가기",
          scheduleButton: "스케줄 보기",
          bookThis: "LINE으로 이 테라피스트 예약",
        },
      })[lang],
    [lang]
  );

  const {
    gallery,
    openGallery,
    closeGallery,
    showPrevImage,
    showNextImage,
    selectGalleryImage,
  } = useGallery();

  return (
    <>
      <main className="min-h-screen bg-white px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 md:mb-14">
            <Link
              href={backHref}
              className="inline-flex items-center rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-50"
            >
              {pageText.back}
            </Link>

            <h1 className="mt-6 text-3xl font-bold md:text-5xl">
              {pageText.title}
            </h1>

            <p className="mt-3 text-sm text-stone-600 md:text-base">
              {pageText.subtitle}
            </p>
          </div>

          <TeamGrid
            members={TEAM_MEMBERS}
            lang={lang}
            onOpenGallery={openGallery}
          />
        </div>
      </main>

      <GalleryModal
        gallery={gallery}
        lang={lang}
        t={pageText}
        onClose={closeGallery}
        onPrev={showPrevImage}
        onNext={showNextImage}
        onSelectImage={selectGalleryImage}
        openLineBooking={openLineBooking}
      />
    </>
  );
}