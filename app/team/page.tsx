import TeamPageClient from "@/components/team/TeamPageClient";
import type { Lang } from "@/data/teamMembers";
import { cookies, headers } from "next/headers";

type TeamPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;
const LANG_COOKIE_NAME = "preferred-lang";

function isValidLang(value: string | null | undefined): value is Lang {
  return typeof value === "string" && VALID_LANGS.includes(value as Lang);
}

function detectLangFromAcceptLanguage(acceptLanguage: string | null): Lang | null {
  if (!acceptLanguage) return null;

  const normalized = acceptLanguage.toLowerCase();

  if (
    normalized.includes("zh-tw") ||
    normalized.includes("zh-hk") ||
    normalized.includes("zh-mo") ||
    normalized.includes("zh-cn") ||
    normalized.includes("zh")
  ) {
    return "zh";
  }

  if (normalized.includes("ko")) return "ko";
  if (normalized.includes("ja")) return "ja";
  if (normalized.includes("en")) return "en";

  return null;
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const params = await searchParams;
  const langFromQuery = params?.lang;

  // 1. 優先使用 URL query
  if (isValidLang(langFromQuery)) {
    return <TeamPageClient lang={langFromQuery} />;
  }

  // 2. 再使用 cookie
  const cookieStore = await cookies();
  const langFromCookie = cookieStore.get(LANG_COOKIE_NAME)?.value;

  if (isValidLang(langFromCookie)) {
    return <TeamPageClient lang={langFromCookie} />;
  }

  // 3. 再看瀏覽器語言
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  const langFromAcceptLanguage = detectLangFromAcceptLanguage(acceptLanguage);

  if (isValidLang(langFromAcceptLanguage)) {
    return <TeamPageClient lang={langFromAcceptLanguage} />;
  }

  // 4. 最後才預設 zh
  return <TeamPageClient lang="zh" />;
}