import TeamPageClient from "@/components/team/TeamPageClient";
import type { Lang } from "@/data/teamMembers";

type TeamPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const params = await searchParams;
  const langParam = params?.lang;

  const lang: Lang =
    langParam === "en" ||
    langParam === "ja" ||
    langParam === "ko" ||
    langParam === "zh"
      ? langParam
      : "zh";

  return <TeamPageClient lang={lang} />;
}