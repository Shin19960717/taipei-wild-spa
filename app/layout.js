import "./globals.css";

export const metadata = {
  title: "Taipei Wild Spa",
  description: "Taipei Wild Spa official website",
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