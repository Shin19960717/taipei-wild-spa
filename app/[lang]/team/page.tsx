import TeamPageClient from "@/components/team/TeamPageClient";
import type { Lang } from "@/data/teamMembers";

type TeamPageProps = {
  params: {
    lang: Lang;
  };
};

export default function TeamPage({ params }: TeamPageProps) {
  return <TeamPageClient lang={params.lang} />;
}