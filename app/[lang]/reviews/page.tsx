import { Suspense } from "react";
import ReviewsPage from "@/components/pages/reviews/ReviewsPage";
import { notFound } from "next/navigation";

const VALID_LANGS = ["zh", "en", "ja", "ko"] as const;

type Lang = (typeof VALID_LANGS)[number];

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const { lang } = await params;

  if (!VALID_LANGS.includes(lang as Lang)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto text-white">
          <p className="text-sm text-gray-400">
            Loading reviews...
          </p>
        </main>
      }
    >
      <ReviewsPage lang={lang as Lang} />
    </Suspense>
  );
}