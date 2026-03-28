import "./globals.css";

export const metadata = {
  title:
    "台北同志按摩｜Taipei Wild Spa｜Gay Massage Taipei｜ゲイマッサージ台北｜타이베이 게이 마사지",
  description:
    "Taipei Wild Spa 提供台北同志按摩、精油按摩與高隱私放鬆體驗。Gay massage in Taipei. 台北でゲイマッサージをお探しの方へ。타이베이에서 프라이버시를 중시한 마사지 서비스.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}