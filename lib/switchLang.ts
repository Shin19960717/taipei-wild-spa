import { VALID_LANGS } from "./i18n";

export function switchLangPath(
  pathname: string | null,
  nextLang: string
) {
  const safeLang = VALID_LANGS.includes(nextLang as any)
    ? nextLang
    : "zh";

  if (!pathname) return `/${safeLang}`;

  // 去掉 query/hash
  const cleanPathname = pathname.split("?")[0].split("#")[0];

  const pathWithoutLang = cleanPathname.replace(
    /^\/(zh|en|ja|ko)(?=\/|$)/,
    ""
  );

  const cleanPath = pathWithoutLang.startsWith("/")
    ? pathWithoutLang
    : `/${pathWithoutLang}`;

  if (cleanPath === "/") return `/${safeLang}`;

  return `/${safeLang}${cleanPath}`;
}