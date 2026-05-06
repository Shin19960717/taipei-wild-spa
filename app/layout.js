import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://taipeiwildspa.com"),
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>

      <body>
        {/* Google Ads / GA */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18088551896"
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-18088551896');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}