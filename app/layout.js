import "./globals.css";

export const metadata = {
  title: "台北同志按摩｜Taipei Wild Spa 高隱私男士按摩體驗",
  description:
    "Taipei Wild Spa 提供台北同志按摩與男士按摩服務，重視隱私與舒適體驗，打造安心放鬆空間。Gay massage in Taipei with private rooms.",
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