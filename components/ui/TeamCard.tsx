"use client";

import { memo, useMemo } from "react";
import Link from "next/link";

import ImageCarousel from "@/components/ui/ImageCarousel";

import type {
  Lang,
  TeamMember,
} from "@/data/teamMembers";

export const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full " +
  "bg-white/20 backdrop-blur-lg border border-white/30 " +
  "text-stone-900 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.08)]";

const SUPPORTED_LANGS: Lang[] = [
  "zh",
  "en",
  "ja",
  "ko",
];

function normalizeLang(
  lang: string
): Lang {
  if (
    SUPPORTED_LANGS.includes(lang as Lang)
  ) {
    return lang as Lang;
  }

  return "zh";
}

type TeamCardProps = {
  member: TeamMember;

  lang: Lang;

  openLineBooking?: (
    memberName: string,
    lang: string
  ) => void;
};

const TeamCard = memo(function TeamCard({
  member,
  lang,
}: TeamCardProps) {
  const safeLang =
    normalizeLang(lang);

  const descList = useMemo(() => {
    return (
      member.desc[safeLang] ||
      member.desc["zh"] ||
      []
    );
  }, [member.desc, safeLang]);

  const previewTags =
    descList.slice(0, 2);

  const profileHref = `/${safeLang}/team/${member.id}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <div className="relative h-[340px] w-full md:h-[380px]">

        {/* 圖片本身可點擊進入子頁 */}
        <Link
          href={profileHref}
          aria-label={member.name}
          className="block h-full w-full"
        >
          <ImageCarousel
            images={member.imgs}
            alt={member.name}
          />
        </Link>

      </div>

      <div className="p-4 md:p-5">
        <h3 className="mb-3 text-xl font-bold text-stone-900">
          {member.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {previewTags.map(
            (item, index) => (
              <span
                key={`${member.id}-${safeLang}-${index}`}
                className={
                  index === 0
                    ? "inline-flex items-center rounded-full px-4 py-2 text-sm text-white bg-black/60 backdrop-blur-md border border-white/10 shadow-md"
                    : TAG_CLASS
                }
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
});

export default TeamCard;