import { Suspense } from "react";
import ReviewsPage from "@/components/pages/reviews/ReviewsPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto text-white">
          <p className="text-sm text-gray-400">Loading reviews...</p>
        </main>
      }
    >
      <ReviewsPage />
    </Suspense>
  );
}