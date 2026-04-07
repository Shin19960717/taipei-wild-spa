"use client";

import { memo } from "react";
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
  onOpen,
  openLineBooking,
}: TeamCardProps) {
  const previewTags = member.desc[lang].slice(0, 2);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-sm">
      <div className="relative h-[340px] w-full md:h-[380px]">
        <ImageCarousel
          images={member.imgs}
          alt={member.name}
          onImageClick={(index: number) => onOpen?.(member, index)}
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
                  ? "inline-flex items-center rounded-full px-4 py-2 text-sm text-white " +
"bg-black/60 backdrop-blur-md border border-white/10 shadow-md"
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

export default TeamCard;