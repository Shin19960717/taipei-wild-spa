import {
  getReviewsByTherapist,
  type Review,
} from "@/data/reviews";

import type {
  Lang,
} from "@/data/teamMembers";

export type TherapistPageReview =
  Review;

export function getTherapistReviews(
  therapistName: string,
  lang: Lang
): TherapistPageReview[] {
  return getReviewsByTherapist(
    therapistName,
    lang
  );
}