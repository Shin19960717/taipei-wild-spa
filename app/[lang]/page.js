// app/[lang]/page.js

import HomePageClient from "@/components/home/HomePageClient";

export default async function Page({
  params,
}) {
  const { lang } = await params;

  return (
    <HomePageClient lang={lang} />
  );
}