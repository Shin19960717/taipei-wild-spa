"use client";

import Link from "next/link";

import TEAM_MEMBERS from "@/data/teamMembers";
import type { Lang } from "@/data/teamMembers";

import TeamCard from "@/components/ui/TeamCard";

const VALID_LANGS: Lang[] = [
  "zh",
  "en",
  "ja",
  "ko",
];

const TEXT_MAP: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    back: string;
  }
> = {
  zh: {
    title: "全部師傅",
    subtitle:
      "查看目前可預約師傅的照片與基本資訊。",
    back: "返回首頁",
  },

  en: {
    title: "All Therapists",
    subtitle:
      "Browse photos and basic information of all available therapists.",
    back: "Back to Home",
  },

  ja: {
    title: "全セラピスト一覧",
    subtitle:
      "現在予約可能なセラピスト的照片與基本資訊をご覧いただけます。",
    back: "ホームへ戻る",
  },

  ko: {
    title: "전체 테라피스트",
    subtitle:
      "현재 예약 가능한 테라피스트의 사진과 기본 정보를 확인하세요.",
    back: "홈으로 돌아가기",
  },
};

type TeamPageClientProps = {
  lang: Lang;
};

export default function TeamPageClient({
  lang,
}: TeamPageClientProps) {

  /* 只處理 build 報錯 */
  const pageText =
    TEXT_MAP[lang as Lang] ?? TEXT_MAP.zh;

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">
          {pageText.title}
        </h1>

        <p className="text-gray-400">
          {pageText.subtitle}
        </p>

        <Link
          href={`/${lang}`}
          className="mt-4 inline-block text-sm text-gray-300 underline"
        >
          {pageText.back}
        </Link>
      </div>

      {/* Team Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}