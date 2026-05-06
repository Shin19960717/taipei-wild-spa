import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["zh", "en", "ja", "ko"] as const;

const DEFAULT_LANG = "zh";

const LANG_COOKIE_NAME = "preferred-lang";

type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(
  value: string | null | undefined
): value is SupportedLang {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGS.includes(value as SupportedLang)
  );
}

function detectLangFromAcceptLanguage(
  acceptLanguage: string | null
): SupportedLang | null {
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

function detectLangFromCountry(
  country: string | null
): SupportedLang {
  if (!country) return DEFAULT_LANG;

  const upper = country.toUpperCase();

  if (
    upper === "TW" ||
    upper === "HK" ||
    upper === "MO"
  ) {
    return "zh";
  }

  if (upper === "JP") return "ja";

  if (upper === "KR") return "ko";

  return "en";
}

function shouldSkipPath(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||

    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.json" ||

    pathname.startsWith("/favicon.ico") ||

    pathname.match(
      /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|xml|txt|json)$/i
    ) !== null
  );
}

export function middleware(request: NextRequest) {
  const { nextUrl, cookies, headers } = request;

  const pathname = nextUrl.pathname;

  // sitemap / robots 直接放行
  if (shouldSkipPath(pathname)) {
    return NextResponse.next();
  }

  // 已有語言 prefix
  const pathLang = pathname.split("/")[1];

  if (isSupportedLang(pathLang)) {
    return NextResponse.next();
  }

  // cookie 優先
  const langFromCookie =
    cookies.get(LANG_COOKIE_NAME)?.value ?? null;

  if (isSupportedLang(langFromCookie)) {
    return NextResponse.redirect(
      new URL(`/${langFromCookie}`, request.url)
    );
  }

  // 瀏覽器語言
  const acceptLanguage =
    headers.get("accept-language");

  const langFromAcceptLanguage =
    detectLangFromAcceptLanguage(acceptLanguage);

  if (isSupportedLang(langFromAcceptLanguage)) {
    return NextResponse.redirect(
      new URL(`/${langFromAcceptLanguage}`, request.url)
    );
  }

  // IP fallback
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code") ||
    null;

  const finalLang =
    detectLangFromCountry(country);

  return NextResponse.redirect(
    new URL(`/${finalLang}`, request.url)
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};