import { notFound } from "next/navigation";
import TEAM_MEMBERS, { type Lang } from "@/data/teamMembers";
import TherapistPageClient from "./TherapistPageClient";

type TherapistPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
  }>;
};

const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;

function isValidLang(value: string | undefined): value is Lang {
  return VALID_LANGS.includes(value as Lang);
}

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    id: member.id,
  }));
}

export async function generateMetadata({ params }: TherapistPageProps) {
  const { id } = await params;

  const member = TEAM_MEMBERS.find((item) => item.id === id);

  if (!member) {
    return {
      title: "Therapist Not Found｜Taipei Wild Spa",
    };
  }

  return {
    title: `${member.name}｜Taipei Wild Spa 台北同志按摩`,
    description: `${member.name} therapist profile at Taipei Wild Spa. View photos, introduction, and booking information.`,
    alternates: {
      canonical: `/team/${member.id}`,
    },
  };
}

export default async function TherapistPage({
  params,
  searchParams,
}: TherapistPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const lang: Lang = isValidLang(query?.lang) ? query.lang : "zh";

  const member = TEAM_MEMBERS.find((item) => item.id === id);

  if (!member) {
    notFound();
  }

  return <TherapistPageClient member={member} lang={lang} />;
}