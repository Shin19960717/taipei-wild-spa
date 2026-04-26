import REVIEWS, { type Review } from "@/data/reviews";

export function getAllReviews(): Review[] {
  return [...REVIEWS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestReviews(limit = 15): Review[] {
  return getAllReviews().slice(0, limit);
}

export function getReviewsByTherapist(therapistName: string): Review[] {
  return getAllReviews().filter(
    (review) =>
      review.therapist.toLowerCase() === therapistName.toLowerCase()
  );
}

export function getReviewCountByTherapist(therapistName: string): number {
  return getReviewsByTherapist(therapistName).length;
}

export function getAverageRatingByTherapist(therapistName: string): number | null {
  const reviews = getReviewsByTherapist(therapistName).filter(
    (review) => typeof review.rating === "number"
  );

  if (reviews.length === 0) return null;

  const total = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);

  return Math.round((total / reviews.length) * 10) / 10;
}