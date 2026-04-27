import {
  getReviewsByTherapist,
  type Review,
} from "@/data/reviews";

export type TherapistPageReview = Review;

export function getTherapistReviews(
  therapistName: string
): TherapistPageReview[] {
  return getReviewsByTherapist(therapistName);
}