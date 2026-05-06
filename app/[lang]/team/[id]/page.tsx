import { notFound } from "next/navigation";

import TEAM_MEMBERS, {
  type Lang,
} from "@/data/teamMembers";

import TherapistPageClient from "./TherapistPageClient";

type TherapistPageProps = {
  params: Promise<{
    id: string;
    lang: Lang;
  }>;
};

const VALID_LANGS: Lang[] = [
  "zh",
  "en",
  "ja",
  "ko",
];

export async function generateStaticParams() {
  return VALID_LANGS.flatMap(
    (lang) =>
      TEAM_MEMBERS.map(
        (member) => ({
          lang,
          id: member.id,
        })
      )
  );
}

export async function generateMetadata({
  params,
}: TherapistPageProps) {
  const { id, lang } =
    await params;

  const member =
    TEAM_MEMBERS.find(
      (item) =>
        item.id === id
    );

  if (!member) {
    return {
      title:
        "Therapist Not Found｜Taipei Wild Spa",
    };
  }

  return {
    title: `${member.name}｜Taipei Wild Spa`,

    description: `${member.name} therapist profile at Taipei Wild Spa.`,

    alternates: {
      canonical: `https://taipeiwildspa.com/${lang}/team/${member.id}`,
    },
  };
}

export default async function TherapistPage({
  params,
}: TherapistPageProps) {
  const { id, lang } =
    await params;

  if (
    !VALID_LANGS.includes(lang)
  ) {
    notFound();
  }

  const member =
    TEAM_MEMBERS.find(
      (item) =>
        item.id === id
    );

  if (!member) {
    notFound();
  }

  return (
    <TherapistPageClient
      member={member}
      lang={lang}
    />
  );
}