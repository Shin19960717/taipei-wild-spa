import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TeamCard from "@/components/ui/TeamCard";
import type { Lang, TeamMember } from "@/data/teamMembers";

type TeamGridProps = {
  members: TeamMember[];
  lang: Lang;
  onOpenGallery: (member: TeamMember, index?: number) => void;
};

export default function TeamGrid({
  members,
  lang,
  onOpenGallery,
}: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <RevealOnScroll key={member.id} delay={index * 120} y={20}>
          <TeamCard
            member={member}
            lang={lang}
            onOpen={onOpenGallery}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}