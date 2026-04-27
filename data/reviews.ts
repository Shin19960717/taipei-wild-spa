export type Review = {
  id: string;
  name: string;
  date: string;
  therapist: string;
  rating?: number;
  content: string;
};

export const REVIEWS: Review[] = [
  {
    id: "review-001",
    name: "匿名",
    date: "2026-04-11",
    therapist: "Ryan",
    content:
      "師傅話不多，但也不到高冷，想放鬆按摩不想講話的話是個選擇，蠻會按的。",
  },
  {
    id: "review-002",
    name: "Kevin",
    date: "2026-04-01",
    therapist: "Sun",
    content:
      "第一次同志按摩，預約前有點緊張又有點期待，喜歡大熊，所以點了Sun，本人比照片看起來更壯，很好抱哈哈，很健談也很客氣，謝謝他給了我美好的一天。",
  },
  {
    id: "review-003",
    name: "匿名",
    date: "2026-03-15",
    therapist: "Aaron",
    content:
      "覺得之前好像在哪裡看過他，反正身材很好，配合度又很高。聽說我好像是前幾個客人的樣子。",
  },
  {
    id: "review-004",
    name: "匿名",
    date: "2026-03-21",
    therapist: "Ryan",
    content:
      "只有一張照片，還看不到臉，但剛好那時段只有他，想說試試看，結果師傅本人帥，身材又跟照片一樣好，也剛好沒被挑菜，哈哈，體驗不錯。",
  },
  {
    id: "review-005",
    name: "Jason",
    date: "2026-04-06",
    therapist: "Aaron",
    content: "手法穩定，互動自然，整體節奏很舒服",
  },
  {
    id: "review-006",
    name: "匿名",
    date: "2026-03-20",
    therapist: "Aaron",
    content:
      "官網照有打碼，本人是菜，很溫柔很有禮貌，還會一直問力道如何，有被呵護到，重點是身材真的很好",
  },
  {
    id: "review-007",
    name: "K",
    date: "2026-03-10",
    therapist: "Aaron",
    content: "很會聊，氣氛很好",
  },
  {
    id: "review-008",
    name: "Leo",
    date: "2026-04-08",
    therapist: "Eric",
    content: "我遇過的師傅裡最親切的 有被照顧的感覺 有男友感",
  },
  {
    id: "review-009",
    name: "凱",
    date: "2026-03-21",
    therapist: "Eric",
    content: "肌肉線條很好，服務態度也很好，也很熱情...特別喜歡油壓",
  },
  {
    id: "review-010",
    name: "M",
    date: "2026-04-03",
    therapist: "Dragon",
    content: "連假剛好有空，來放鬆一下 點了龍師傅 可以說是我按摩以來最好的體驗，很鮮，很帥又可愛，還好配合，工具...我喜歡，有男友感 很親切 而且本人比照片好看很多",
  },
  {
    id: "review-011",
    name: "匿名",
    date: "2026-03-01",
    therapist: "Dragon",
    content: "本人鮮肉一枚，很蘇胡",
  },
  {
    id: "review-012",
    name: "匿名",
    date: "2026-04-01",
    therapist: "Ryan",
    content: "我常去養生館按，但以同志按摩來說，萊恩按摩技術很好，是有經驗的感覺，不是隨便按，而且不像養生館那種沉悶的感覺，可以聊聊天，油壓的手法也和養生館不同，壓力有被釋放",
  },
  {
    id: "review-013",
    name: "匿名",
    date: "2026-03-01",
    therapist: "Ryan",
    content: "本人蠻帥",
  },
  {
    id: "review-014",
    name: "匿名",
    date: "2026-03-19",
    therapist: "Sun",
    content:
      "看照片的時候，感覺好像很壯，因此嘗試預約，見到本人時有點驚訝，真的很大隻比想像中更大，非常難遇到那麼大隻的人，很健談聊天感覺很有趣，手法倒是很溫柔，體推的感覺非常舒服，喜歡哈",
  },
    {
    id: "review-015",
    name: "J.Phi",
    date: "2026-03-11",
    therapist: "Eric",
    content:
      "Great place with amazing service. Had a wonderful experience in Taiwan.",
  },
    {
    id: "review-016",
    name: "顏",
    date: "2026-03-03",
    therapist: "Dragon",
    content: "跟朋友來西門吃飯 一時興起約一下按摩 剛好找到這間 看了一下最喜歡龍師傅他看起來最年輕好像是學生 見到本人接我上樓後 難掩內心的衝動直接抱了他 有點不好意思...",
  },
    {
    id: "review-017",
    name: "anonymous",
    date: "2026-03-31",
    therapist: "Dragon",
    content: "I usually have a habit of writing a diary, and right after the session the staff happened to ask if I’d be willing to share my massage experience, so I wrote this—though honestly, I probably would have written it anyway even if they hadn’t asked. This time I stayed in Taiwan for five days. On the evening of the third day, I happened to be in the lively Ximending area. After eating a lot of great food and walking quite a bit, I was feeling a little tired, so I decided to search for a gay massage. This place suddenly popped up, and judging by the distance shown, it was about a ten-minute walk from Ximending, which seemed reasonable. After looking through all the therapists, I decided to book Dragon. His name seemed to mean “dragon” in Chinese, which I found interesting, and his photos showed him smiling, giving off a very friendly and approachable vibe. Once the massage started, I was actually quite surprised. I had never experienced a gay massage before, and since the therapist looked quite young, I assumed his technique might not be that great. But it turned out that both the rhythm and pressure were spot on, making me feel extremely relaxed. The oil massage at the end, in particular, was especially impressive—it made me realize that a massage could be this comfortable and relaxing. My only regret is not finding this place on the first day. The next time I come to Taiwan, I will definitely make time to come here again.",
  },

];

export function getAllReviews(): Review[] {
  return [...REVIEWS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestReviews(limit = 15): Review[] {
  return getAllReviews().slice(0, limit);
}

export function getReviewsByTherapist(therapistName: string): Review[] {
  const normalizedTherapistName = therapistName.trim().toLowerCase();

  return getAllReviews().filter(
    (review) => review.therapist.trim().toLowerCase() === normalizedTherapistName
  );
}

export function getReviewCountByTherapist(therapistName: string): number {
  return getReviewsByTherapist(therapistName).length;
}

export function getAverageRatingByTherapist(
  therapistName: string
): number | null {
  const reviews = getReviewsByTherapist(therapistName).filter(
    (review) => typeof review.rating === "number"
  );

  if (reviews.length === 0) return null;

  const total = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);

  return Math.round((total / reviews.length) * 10) / 10;
}

export default REVIEWS;