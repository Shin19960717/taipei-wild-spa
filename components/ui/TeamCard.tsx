"use client";

import { memo } from "react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import type { Lang, TeamMember } from "@/data/teamMembers";

const TAG_CLASS =
  "inline-flex items-center px-4 py-2 rounded-full bg-stone-100 text-stone-800 text-sm md:text-base";

type TeamCardProps = {
  member: TeamMember;
  lang: Lang;
  onOpen?: (member: TeamMember, index?: number) => void;
};

const TeamCard = memo(function TeamCard({
  member,
  lang,
  onOpen,
}: TeamCardProps) {
  const previewTags = member.desc[lang].slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden border border-stone-200">
      <div className="relative w-full h-[340px] md:h-[380px]">
        <ImageCarousel
          images={member.imgs}
          alt={member.name}
          onImageClick={(index: number) => onOpen?.(member, index)}
        />
      </div>

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

export default TeamCard;