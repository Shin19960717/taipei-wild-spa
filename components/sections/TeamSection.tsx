"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import TeamCard from "@/components/ui/TeamCard";
import { RECRUIT_DATA } from "@/data/recruit";
import { TAG_CLASS, PRIMARY_BUTTON_CLASS } from "@/constants/styles";
import type { Lang } from "@/types/common";
import type { TeamMember } from "@/types/team";

type Props = {
  lang: Lang;
  t: Record<string, string>;
  members: TeamMember[];
  onOpenGallery: (member: TeamMember, imageIndex: number) => void;
  onOpenRecruit: () => void;
};

export default function TeamSection({
  lang,
  t,
  members,
  onOpenGallery,
  onOpenRecruit,
}: Props) {
  return (
    <section id="team" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <SectionTitle center>{t.teamTitle}</SectionTitle>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {members.map((member, index) => (
            <RevealOnScroll key={member.id} delay={index * 100}>
              <TeamCard member={member} lang={lang} onOpen={onOpenGallery} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-14" delay={200}>
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">{RECRUIT_DATA.title[lang]}</h3>
                <p className="text-stone-600 mt-3 leading-7">
                  {RECRUIT_DATA.desc[lang]}
                </p>

                <div className="flex flex-wrap gap-3 mt-5">
                  {RECRUIT_DATA.items[lang].map((item, idx) => (
                    <span key={`recruit-preview-${idx}`} className={TAG_CLASS}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onOpenRecruit}
                  className={PRIMARY_BUTTON_CLASS}
                >
                  {t.recruitTitle}
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}