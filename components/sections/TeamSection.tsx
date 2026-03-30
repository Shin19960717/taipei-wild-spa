import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TeamGrid from "@/components/team/TeamGrid";
import TEAM_MEMBERS from "@/data/teamMembers";

import type { Lang, TeamMember } from "@/data/teamMembers";

type TeamSectionProps = {
  t: {
    teamTitle: string;
    recruitTitle: string;
  };
  lang: Lang;
  onOpenGallery: (member: TeamMember, index?: number) => void;
};

export default function TeamSection({
  t,
  lang,
  onOpenGallery,
}: TeamSectionProps) {
  return (
    <section id="team" className="px-6 py-12 md:px-10 scroll-mt-32">
      <RevealOnScroll className="max-w-6xl mx-auto" y={24}>
        <SectionTitle>{t.teamTitle}</SectionTitle>

        <Link
          href="/recruit"
          className="inline-block mt-4 mb-6 px-3 py-1.5 border border-stone-700 text-stone-700 text-sm rounded-full transition hover:bg-stone-100 hover:scale-105"
        >
          {t.recruitTitle}
        </Link>

        <TeamGrid
          members={TEAM_MEMBERS}
          lang={lang}
          onOpenGallery={onOpenGallery}
        />
      </RevealOnScroll>
    </section>
  );
}