import { NextRequest, NextResponse } from "next/server";

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
  const pathname = request.nextUrl.pathname;

  if (shouldSkipPath(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};