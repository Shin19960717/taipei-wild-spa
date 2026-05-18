import TeamPageClient from "@/components/team/TeamPageClient";
import type { Lang } from "@/data/teamMembers";

type TeamPageProps = {
  params: Promise<{
    lang: Lang;
  }>;
};

export default async function TeamPage({
  params,
}: TeamPageProps) {

  const { lang } = await params;

  return (
    <TeamPageClient lang={lang} />
  );
}