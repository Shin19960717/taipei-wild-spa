import TeamPageClient from "@/components/team/TeamPageClient";
import type { Lang } from "@/data/teamMembers";

type TeamPageProps = {
  searchParams?: {
    lang?: string;
  };
};

export default function TeamPage({ searchParams }: TeamPageProps) {
  const langParam = searchParams?.lang;

  const lang: Lang =
    langParam === "en" ||
    langParam === "ja" ||
    langParam === "ko" ||
    langParam === "zh"
      ? langParam
      : "zh";

  return <TeamPageClient lang={lang} />;
}