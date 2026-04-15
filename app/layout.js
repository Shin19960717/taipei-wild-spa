import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://taipeiwildspa.com"),

  title: "Taipei Wild Spa｜台北同志按摩｜Taipei gay Spa｜Taipei gay massage",
  description:
    "Taipei Wild Spa 提供台北同志按摩，重視隱私與舒適體驗，打造安心放鬆空間，並且我們致力讓身材最好最帥的師傅為您服務。Gay massage in Taipei with private rooms.",

  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant": "/",
      en: "/?lang=en",
      ja: "/?lang=ja",
      ko: "/?lang=ko",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
          rel="stylesheet"
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18088551896"
          strategy="afterInteractive"
        />

        {/* Google Ads global site tag */}
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18088551896');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}