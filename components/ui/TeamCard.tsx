"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import ImageCarousel from "@/components/ui/ImageCarousel";
import type { Lang, TeamMember } from "@/data/teamMembers";

export const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full " +
  "bg-white/20 backdrop-blur-lg border border-white/30 " +
  "text-stone-900 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.08)]";

type TeamCardProps = {
  member: TeamMember;
  lang: Lang;
  onOpen?: (member: TeamMember, index?: number) => void;
  openLineBooking?: (memberName: string, lang: string) => void;
};

const TeamCard = memo(function TeamCard({
  member,
  lang,
}: TeamCardProps) {
  const router = useRouter();

  const previewTags = member.desc[lang].slice(0, 2);
  const profileHref = `/team/${member.id}?lang=${lang}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* 🔥 點圖片直接進個人頁 */}
      <div
        className="relative h-[340px] w-full cursor-pointer md:h-[380px]"
        onClick={() => router.push(profileHref)}
      >
        <ImageCarousel
          images={member.imgs}
          alt={member.name}
        />
      </div>

      <div className="p-4 md:p-5">
        <h3 className="mb-3 text-xl font-bold text-stone-900">
          {member.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {previewTags.map((item, index) => (
            <span
              key={`${member.id}-${lang}-${index}`}
              className={
                index === 0
                  ? "inline-flex items-center rounded-full px-4 py-2 text-sm text-white bg-black/60 backdrop-blur-md border border-white/10 shadow-md"
                  : TAG_CLASS
              }
            >
              {item}
            </span>
          ))}
        </div>

        {/* ❌ 已刪除：查看個人頁 + LINE 預約 */}
      </div>
    </div>
  );
});

export default TeamCard;