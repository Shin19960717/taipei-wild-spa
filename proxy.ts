import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["zh", "en", "ja", "ko"] as const;
const LANG_COOKIE_NAME = "preferred-lang";

type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(value: string | null | undefined): value is SupportedLang {
  return typeof value === "string" && SUPPORTED_LANGS.includes(value as SupportedLang);
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

function detectLangFromCountry(country: string | null): SupportedLang {
  if (!country) return "zh";

  const upper = country.toUpperCase();

  if (upper === "TW" || upper === "HK" || upper === "MO") return "zh";
  if (upper === "JP") return "ja";
  if (upper === "KR") return "ko";

  return "en";
}

function shouldSkipPath(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js)$/)
  );
}

export function proxy(request: NextRequest) {
  const { nextUrl, cookies, headers } = request;
  const pathname = nextUrl.pathname;
  const searchParams = nextUrl.searchParams;

  if (shouldSkipPath(pathname)) {
    return NextResponse.next();
  }

  const langFromQuery = searchParams.get("lang");
  if (isSupportedLang(langFromQuery)) {
    return NextResponse.next();
  }

  // cookie
  const langFromCookie = cookies.get(LANG_COOKIE_NAME)?.value ?? null;
  if (isSupportedLang(langFromCookie)) {
    const url = nextUrl.clone();
    url.searchParams.set("lang", langFromCookie);
    return NextResponse.redirect(url);
  }

  // browser
  const acceptLanguage = headers.get("accept-language");
  const langFromAcceptLanguage = detectLangFromAcceptLanguage(acceptLanguage);

  if (isSupportedLang(langFromAcceptLanguage)) {
    const url = nextUrl.clone();
    url.searchParams.set("lang", langFromAcceptLanguage);
    return NextResponse.redirect(url);
  }

  // IP
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code") ||
    null;

  const finalLang = detectLangFromCountry(country);

  const url = nextUrl.clone();
  url.searchParams.set("lang", finalLang);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};