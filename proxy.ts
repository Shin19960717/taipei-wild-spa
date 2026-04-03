import { NextResponse } from "next/server";

const SUPPORTED_LANGS = ["zh", "en", "ja", "ko"];

function isSupportedLang(value) {
  return typeof value === "string" && SUPPORTED_LANGS.includes(value);
}

function detectLangFromAcceptLanguage(acceptLanguage) {
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

function detectLangFromCountry(country) {
  if (!country) return "zh";

  const upper = country.toUpperCase();

  if (upper === "TW" || upper === "HK" || upper === "MO") {
    return "zh";
  }

  if (upper === "JP") {
    return "ja";
  }

  if (upper === "KR") {
    return "ko";
  }

  return "en";
}

export function proxy(request) {
  const { nextUrl, cookies, headers } = request;
  const pathname = nextUrl.pathname;
  const searchParams = nextUrl.searchParams;

  // 只處理首頁
  if (pathname !== "/") {
    return NextResponse.next();
  }

  // 已經有合法 lang 參數就不干預
  const langFromQuery = searchParams.get("lang");
  if (isSupportedLang(langFromQuery)) {
    return NextResponse.next();
  }

  // 1. 優先尊重使用者以前手動選過的語言
  const langFromCookie = cookies.get("preferred-lang")?.value ?? null;
  if (isSupportedLang(langFromCookie)) {
    const url = nextUrl.clone();
    url.searchParams.set("lang", langFromCookie);

    const response = NextResponse.redirect(url);
    response.cookies.set("preferred-lang", langFromCookie, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // 2. 再看瀏覽器語言
  const acceptLanguage = headers.get("accept-language");
  const langFromAcceptLanguage =
    detectLangFromAcceptLanguage(acceptLanguage);

  if (isSupportedLang(langFromAcceptLanguage)) {
    const url = nextUrl.clone();
    url.searchParams.set("lang", langFromAcceptLanguage);

    const response = NextResponse.redirect(url);
    response.cookies.set("preferred-lang", langFromAcceptLanguage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // 3. 最後才用 IP 國家作備援
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code") ||
    null;

  const finalLang = detectLangFromCountry(country);

  const url = nextUrl.clone();
  url.searchParams.set("lang", finalLang);

  const response = NextResponse.redirect(url);
  response.cookies.set("preferred-lang", finalLang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/"],
};