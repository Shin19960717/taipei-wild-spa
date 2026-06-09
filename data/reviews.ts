export type SupportedLang = "zh" | "en" | "ja" | "ko";

export type Review = {
  id: string;
  name: string;
  date: string;
  therapist: string;
  rating?: number;
  content: string;
  lang: SupportedLang;
};

export const REVIEWS: Review[] = [
  {
    id: "review-001",
    name: "匿名",
    date: "2026-04-11",
    therapist: "Ryan",
    lang: "zh",
    content:
      "師傅話不多，但也不到高冷，想放鬆按摩不想講話的話是個選擇，蠻會按的。",
  },
  {
    id: "review-002",
    name: "Kevin",
    date: "2026-04-01",
    therapist: "Sun",
    lang: "zh",
    content:
      "第一次同志按摩，預約前有點緊張又有點期待，喜歡大熊，所以點了Sun，本人比照片看起來更壯，很好抱哈哈，很健談也很客氣，謝謝他給了我美好的一天。",
  },
  {
    id: "review-003",
    name: "匿名",
    date: "2026-03-15",
    therapist: "Aaron",
    lang: "zh",
    content:
      "覺得之前好像在哪裡看過他，反正身材很好，配合度又很高。聽說我好像是前幾個客人的樣子。",
  },
  {
    id: "review-004",
    name: "匿名",
    date: "2026-03-21",
    therapist: "Ryan",
    lang: "zh",
    content:
      "只有一張照片，還看不到臉，但剛好那時段只有他，想說試試看，結果師傅本人帥，身材又跟照片一樣好，也剛好沒被挑菜，哈哈，體驗不錯。",
  },
  {
    id: "review-005",
    name: "Jason",
    date: "2026-04-06",
    therapist: "Aaron",
    lang: "zh",
    content: "身材好 按得好 有禮貌 錢花得值得",
  },
  {
    id: "review-006",
    name: "匿名",
    date: "2026-03-20",
    therapist: "Aaron",
    lang: "zh",
    content:
      "官網照有打碼，本人是菜，很溫柔很有禮貌，還會一直問力道如何，有被呵護到，重點是身材真的很好",
  },
  {
    id: "review-007",
    name: "K",
    date: "2026-03-10",
    therapist: "Aaron",
    lang: "zh",
    content: "很會聊，很會營造氣氛😳😳😳",
  },
  {
    id: "review-008",
    name: "Leo",
    date: "2026-04-08",
    therapist: "Eric",
    lang: "zh",
    content: "我遇過的師傅裡最親切的 有被照顧的感覺 有男友感",
  },
  {
    id: "review-009",
    name: "凱",
    date: "2026-03-21",
    therapist: "Eric",
    lang: "zh",
    content: "肌肉線條很好，服務態度也很好，也很熱情...特別喜歡油壓",
  },
  {
    id: "review-010",
    name: "M",
    date: "2026-04-03",
    therapist: "Dragon",
    lang: "zh",
    content:
      "連假剛好有空，來放鬆一下 點了龍師傅 可以說是我按摩以來最好的體驗，很鮮，很帥又可愛，還好配合，工具...我喜歡，有男友感 很親切 而且本人比照片好看很多",
  },
  {
    id: "review-011",
    name: "匿名",
    date: "2026-03-01",
    therapist: "Dragon",
    lang: "zh",
    content: "本人鮮肉一枚，很蘇胡",
  },
  {
    id: "review-012",
    name: "匿名",
    date: "2026-04-01",
    therapist: "Ryan",
    lang: "zh",
    content:
      "我常去養生館按，但以同志按摩來說，萊恩按摩技術很好，是有經驗的感覺，不是隨便按，而且不像養生館那種沉悶的感覺，可以聊聊天，油壓的手法也和養生館不同，壓力有被釋放",
  },
  {
    id: "review-013",
    name: "匿名",
    date: "2026-03-01",
    therapist: "Ryan",
    lang: "zh",
    content: "本人蠻帥",
  },
  {
    id: "review-014",
    name: "匿名",
    date: "2026-03-19",
    therapist: "Sun",
    lang: "zh",
    content:
      "看照片的時候，感覺好像很壯，因此嘗試預約，見到本人時有點驚訝，真的很大隻比想像中更大，非常難遇到那麼大隻的人，很健談聊天感覺很有趣，手法倒是很溫柔，體推的感覺非常舒服，喜歡哈",
  },
  {
    id: "review-015",
    name: "J.Phi",
    date: "2026-03-11",
    therapist: "Eric",
    lang: "en",
    content:
      "Great place with amazing service. Had a wonderful experience in Taiwan.",
  },
  {
    id: "review-016",
    name: "顏",
    date: "2026-03-03",
    therapist: "Dragon",
    lang: "zh",
    content:
      "跟朋友來西門吃飯 一時興起約一下按摩 剛好找到這間 看了一下最喜歡龍師傅他看起來最年輕好像是學生 見到本人接我上樓後 難掩內心的衝動直接抱了他 有點不好意思...",
  },
  {
    id: "review-017",
    name: "anonymous",
    date: "2026-03-31",
    therapist: "Dragon",
    lang: "en",
    content:
      "I usually have a habit of writing a diary, and right after the session the staff happened to ask if I’d be willing to share my massage experience, so I wrote this—though honestly, I probably would have written it anyway even if they hadn’t asked. This time I stayed in Taiwan for five days. On the evening of the third day, I happened to be in the lively Ximending area. After eating a lot of great food and walking quite a bit, I was feeling a little tired, so I decided to search for a gay massage. This place suddenly popped up, and judging by the distance shown, it was about a ten-minute walk from Ximending, which seemed reasonable. After looking through all the therapists, I decided to book Dragon. His name seemed to mean “dragon” in Chinese, which I found interesting, and his photos showed him smiling, giving off a very friendly and approachable vibe. Once the massage started, I was actually quite surprised. I had never experienced a gay massage before, and since the therapist looked quite young, I assumed his technique might not be that great. But it turned out that both the rhythm and pressure were spot on, making me feel extremely relaxed. The oil massage at the end, in particular, was especially impressive—it made me realize that a massage could be this comfortable and relaxing. My only regret is not finding this place on the first day. The next time I come to Taiwan, I will definitely make time to come here again.",
  },
  {
    id: "review-018",
    name: "豪",
    date: "2026-04-21",
    therapist: "Eric",
    lang: "zh",
    content: "第二次約了 感覺還是不錯",
  },
  {
    id: "review-019",
    name: "Edward",
    date: "2026-04-19",
    therapist: "Aaron",
    lang: "en",
    content: "nice",
  },
    {
    id: "review-020",
    name: "익명",
    date: "2026-05-01",
    therapist: "Dragon",
    lang: "ko",
    content: "드래곤 관리사님 진짜 느낌 좋았어요ㅎㅎ 대만 남자 특유 느낌 있더라구요, 생각보다 순한 느낌 좋았고 편하게 받았어요ㅋㅋ",
  },
    {
    id: "review-021",
    name: "taengtaenggu713",
    date: "2026-04-16",
    therapist: "Sam",
    lang: "ko",
    content: "몸 보고 바로 예약함 사진도 ㄱㅊ았는데 실물이 더 좋더라 관리도 편하게 잘 해주시고 전체적으로 만족했음 ㅎㅎ",
  },
    {
    id: "review-022",
    name: "익명",
    date: "2026-05-07",
    therapist: "Aaron",
    lang: "ko",
    content: "몸은 사진 그대로였고 피부는 그냥 보통 느낌? ㅋㅋ",
  },
{
    id: "review-023",
    name: "01걍사",
    date: "2026-03-22",
    therapist: "Chris",
    lang: "ko",
    content: "목소리 ㄹㅇ 좋았음🤯 눈 못보겠더라;; 너무 쎔",
  },
  {
    id: "review-024",
    name: "qaz13195",
    date: "2026-05-11",
    therapist: "Aaron",
    lang: "zh",
    content: "肌肉大塊八塊肌、、",
  },
    {
    id: "review-025",
    name: "Ma",
    date: "2026-05-04",
    therapist: "Leo",
    lang: "en",
    content: "Cute boy with hot body🥵🥵🥵",
  },
    {
    id: "review-026",
    name: "陈",
    date: "2026-05-07",
    therapist: "Dragon",
    lang: "zh",
    content: "起初担心政治问题，能不能顺利安排的，倒是店主说话客气，预约服务也挺不错，龙师傅给人的感觉更好、更舒服，会给推荐朋友来。",
  },
    {
    id: "review-027",
    name: "匿名",
    date: "2026-05-04",
    therapist: "Sam",
    lang: "zh",
    content: "我感覺他是異男，可碰，但互動頗冷淡",
  },
    {
    id: "review-028",
    name: "anonymous",
    date: "2026-05-10",
    therapist: "Mike",
    lang: "en",
    content: "My type, and also very professional and friendly. Strongly recommended.",
  },
      {
    id: "review-029",
    name: "anonymous",
    date: "2026-05-13",
    therapist: "Sam",
    lang: "en",
    content: "Sam is a very talented therapist. His technique and pressure are excellent, and his physique looks even better in person than in the photos.",
  },
      {
    id: "review-030",
    name: "Max",
    date: "2026-05-13",
    therapist: "Leo",
    lang: "zh",
    content: "講話有點笨笨的很可愛，會有一些口頭禪，憨厚憨厚的感覺，皮膚蠻黑的，我約過的按摩師裡面很特別的體驗",
  },
      {
    id: "review-031",
    name: "anonymous",
    date: "2026-05-18",
    therapist: "Chris",
    lang: "en",
    content: "I had never gotten a massage in another country before, so this was my first time. I was hesitant about whether I should include a massage in my trip itinerary, but I’m really glad I did. Dragon gave me an amazing experience and made my trip even more memorable.",
  },
      {
    id: "review-032",
    name: "anonymous",
    date: "2026-05-22",
    therapist: "Dragon",
    lang: "en",
    content: "Honestly, no lie, I think he looks much better in person than in the photos. The owner should update his pictures so they don’t undersell him",
  },
      {
    id: "review-033",
    name: "anonymous",
    date: "2026-05-26",
    therapist: "Dragon",
    lang: "en",
    content: "He made my day, I'm really lucky to meet him.",
  },
      {
    id: "review-034",
    name: "匿名",
    date: "2026-05-28",
    therapist: "Aaron",
    lang: "zh",
    content: "按的力道不錯 手上的青筋也很不錯 飽滿的胸肌跟小鬍子...哈哈",
  },
      {
    id: "review-035",
    name: "18977680.5",
    date: "2026-05-28",
    therapist: "Ryan",
    lang: "zh",
    content: "預約的時候想說他怎麼只有一張照片 還要和店家另外要",
  },

];

export function normalizeReviewLang(
  lang?: string | null
): SupportedLang {
  if (
    lang === "en" ||
    lang === "ja" ||
    lang === "ko" ||
    lang === "zh"
  ) {
    return lang;
  }

  return "zh";
}

export function sortReviewsByLanguage(
  reviews: Review[],
  lang?: string | null
): Review[] {
  const safeLang = normalizeReviewLang(lang);

  // 各語言頁面的優先排序規則
  const languagePriorityMap: Record<
    SupportedLang,
    SupportedLang[]
  > = {
    zh: ["zh", "en", "ja", "ko"],
    en: ["en", "zh", "ja", "ko"],
    ja: ["ja", "ko", "en", "zh"],
    ko: ["ko", "ja", "zh", "en"],
  };

  const priorityOrder =
    languagePriorityMap[safeLang];

  return [...reviews].sort((a, b) => {
    const aPriority =
      priorityOrder.indexOf(a.lang);

    const bPriority =
      priorityOrder.indexOf(b.lang);

    // 第一排序：語言優先
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // 第二排序：日期新到舊
    return (
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
    );
  });
}

export function getAllReviews(
  lang?: string | null
): Review[] {
  return sortReviewsByLanguage(
    REVIEWS,
    lang
  );
}

export function getLatestReviews(
  limit = 15,
  lang?: string | null
): Review[] {
  return getAllReviews(lang).slice(
    0,
    limit
  );
}

export function getReviewsByTherapist(
  therapistName: string,
  lang?: string | null
): Review[] {
  const normalizedTherapistName =
    therapistName.trim().toLowerCase();

  return getAllReviews(lang).filter(
    (review) =>
      review.therapist
        .trim()
        .toLowerCase() ===
      normalizedTherapistName
  );
}

export function getReviewCountByTherapist(
  therapistName: string
): number {
  return getReviewsByTherapist(
    therapistName
  ).length;
}

export function getAverageRatingByTherapist(
  therapistName: string
): number | null {
  const reviews =
    getReviewsByTherapist(
      therapistName
    ).filter(
      (review) =>
        typeof review.rating === "number"
    );

  if (reviews.length === 0) return null;

  const total = reviews.reduce(
    (sum, review) =>
      sum + (review.rating ?? 0),
    0
  );

  return (
    Math.round(
      (total / reviews.length) * 10
    ) / 10
  );
}

export default REVIEWS;