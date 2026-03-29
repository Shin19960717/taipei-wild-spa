"use client";

import { memo } from "react";
import ImageCarousel from "./ImageCarousel";
import { TAG_CLASS } from "@/constants/styles";
import type { Lang } from "@/types/common";
import type { TeamMember } from "@/types/team";

type Props = {
  member: TeamMember;
  lang: Lang;
  onOpen: (member: TeamMember, index: number) => void;
};

const TeamCard = memo(function TeamCard({ member, lang, onOpen }: Props) {
  const previewTags = member.desc[lang].slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden border border-stone-200">
      <ImageCarousel
        images={member.imgs}
        alt={member.name}
        onImageClick={(index) => onOpen(member, index)}
      />

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