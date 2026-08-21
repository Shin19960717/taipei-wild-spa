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
    date: "2026-05-30",
    therapist: "Ryan",
    lang: "zh",
    content: "預約的時候想說他怎麼只有一張照片 還要和店家另外要",
  },
      {
    id: "review-036",
    name: "anonymous",
    date: "2026-06-01",
    therapist: "Ray",
    lang: "en",
    content: "His body is insanely good, also with a cute face.",
  },
    {
    id: "review-037",
    name: "익명",
    date: "2026-06-01",
    therapist: "Jackson",
    lang: "ko",
    content: "마사지도 정말 잘하고, 체육 코치라고 해서 더 매력적으로 느껴졌어요.",
  },
    {
    id: "review-038",
    name: "匿名",
    date: "2026-06-04",
    therapist: "Ray",
    lang: "zh",
    content: "我猜他是他們店的紅牌，身材好，臉也很帥又可愛，還很體貼，幸好我提前兩周預約了，但我看他似乎是這裡的新人，可能會越來越熱門🤭",
  },
    {
    id: "review-039",
    name: "Andy W",
    date: "2026-06-06",
    therapist: "Dragon",
    lang: "en",
    content: "There weren’t many reviews about this place online, so I decided to give it a try and see how it went. It turned out to be way better than I expected. The massage was excellent, the staff were polite, they replied to my messages very quickly, and the massage therapist was really handsome too.😁😁😁",
  },
    {
    id: "review-040",
    name: "anonymous",
    date: "2026-06-10",
    therapist: "Ray",
    lang: "en",
    content: "It was a little hard to find a time that worked, so I'd recommend booking a bit in advance. Other than that, everything was great. The therapist had big, beautiful eyes, was really muscular, and his technique was amazing. Plus, he was very well-endowed, which was a huge bonus. I was really happy with the experience and would definitely come back.🥰🥰",
  },
    {
    id: "review-041",
    name: "익명",
    date: "2026-06-11",
    therapist: "Aaron",
    lang: "ko",
    content: "관리사분이 정말 배려심이 많고 서비스도 세심했어요. 실력도 정말 좋았고, 대화하는 걸 좋아하셔서 대만에 대한 이야기를 많이 들려주셨어요. 덕분에 정말 재미있고 즐거운 시간이었어요.",
  },
      {
    id: "review-042",
    name: "Kenji",
    date: "2026-04-11",
    therapist: "Dragon",
    lang: "ja",
    content: "タイ式マッサージに少し近い感じですが、台湾のほうが施術は丁寧で、セラピストの雰囲気も上品でした。Dragonさんはとても気さくで接しやすく、彼氏みたいな安心感がありました。楽しい時間をありがとうございました。",
  },
      {
    id: "review-043",
    name: "Kwen",
    date: "2026-06-13",
    therapist: "Sun",
    lang: "en",
    content: "He was so nice to cuddle with. Honestly, he was even more handsome in person than in his photos. He looked really intelligent with his glasses on, and... well... I have to say, his skills were absolutely amazing. 😊",
  },
        {
    id: "review-044",
    name: "匿名",
    date: "2026-06-17",
    therapist: "Ray",
    lang: "zh",
    content: "又高又壯又帥又可愛的",
  },
        {
    id: "review-045",
    name: "匿名",
    date: "2026-06-20",
    therapist: "Ray",
    lang: "zh",
    content: "沒擺臉照真的太可惜😳😳😳真的很很帥很可愛 溫柔又有男友感...超暈...",
  },
        {
    id: "review-046",
    name: "anonymous",
    date: "2026-06-19",
    therapist: "Aaron",
    lang: "en",
    content: "He looks even better in person than in his photos. He's muscular with a little stubble, and his service was outstanding. The massage pressure and technique were both excellent, and he made sure I was comfortable throughout the session. The only minor issue was that he doesn't speak English.",
  },
        {
    id: "review-047",
    name: "陳",
    date: "2026-06-20",
    therapist: "Jackson",
    lang: "zh",
    content: "是個異男，身材不差，蠻高，話少",
  },
        {
    id: "review-048",
    name: "Sung",
    date: "2026-06-20",
    therapist: "Ryan",
    lang: "ko",
    content: "그 진짜 귀여워 ㅋㅋ 피부도 엄청 좋고, 완전 햇살 느낌이야. 몸도 좋고 웃으면 너무 귀여움 ㅎㅎ",
  },
      {
    id: "review-049",
    name: "Morimoto822",
    date: "2026-06-22",
    therapist: "Ray",
    lang: "ja",
    content: "Rayはサービスも良かったし、マッサージも上手だった！かわいいし、体もがっしりしてて背も高くて、最初から最後までめっちゃリラックスできた😊あと、台湾のマッサージは東京とはちょっと雰囲気が違うかも。料金表どおりに全部決まってる感じじゃなくて、そのあたりは担当するセラピスト次第って感じだった。",
  },
      {
    id: "review-050",
    name: "井霖",
    date: "2026-06-25",
    therapist: "Leo",
    lang: "zh",
    content: "可惜撞號😅，但我覺得Leo本人比照片好看很多，但話不太多，感覺憨憨的。題外話，這間店的布置真的蠻高級的，比一般同志按摩好不少。",
  },
      {
    id: "review-051",
    name: "匿名",
    date: "2026-06-25",
    therapist: "Dragon",
    lang: "zh",
    content: "看了評價決定點龍師傅，我覺得真的跟其他人說的一樣，本人比照片好看，照片該更新了，本人真的很有禮貌很靦腆很可愛，按摩技術跟力道也真的很棒，感覺身心靈都放鬆了，下次來會想再找他服務",
  },
      {
    id: "review-052",
    name: "天蠍男",
    date: "2026-07-06",
    therapist: "Ray",
    lang: "zh",
    content: "第一次來指定了Ray，每次去按摩都很怕師傅很冷漠，但Ray很親切，一見面尷尬的感覺就沒有了，也很適當的丟話題的閒聊，沒什麼壓力。進入按摩的重點 力道很紮實，男友力也很足，偶爾還會有點撒嬌，弟弟感的哥哥🤣 身高高又很厚實，可能因為按摩不方便的關係，師傅有把眼鏡換成隱形眼鏡，不然身為眼鏡控有點斯文敗類的壞壞感，下次身心想放鬆的時候 ，還是想指定Ray",
  },
      {
    id: "review-053",
    name: "Andrew",
    date: "2026-07-03",
    therapist: "Sun",
    lang: "en",
    content: "Hot body, cute smile, great personality, nice service, an awesome experience",
  },
      {
    id: "review-054",
    name: "匿名",
    date: "2026-07-03",
    therapist: "Sam",
    lang: "zh",
    content: "按摩按得不錯，環境漂亮且高級，客服服務親切詳細不厭其煩!",
  },
      {
    id: "review-055",
    name: "匿名",
    date: "2026-07-07",
    therapist: "Leo",
    lang: "zh",
    content: "有張狗狗臉，呆呆笨笨的，講話的感覺也是鈍鈍的，但有種親切感，按摩技術還可以，但可以再更精進，整體算還行",
  },
      {
    id: "review-056",
    name: "Phillie",
    date: "2026-07-09",
    therapist: "Sun",
    lang: "en",
    content: "STRONGGGGGGGG!!!!!HANNNNDSOME!!!!",
  },
      {
    id: "review-057",
    name: "익명",
    date: "2026-07-09",
    therapist: "Sam",
    lang: "ko",
    content: "전형적인 대만 미남 스타일은 아니지만, 뭔가 운동선수 같은 느낌이 있어요. 마사지도 꽤 괜찮았고, 오일 마사지 받을 때 정말 편하고 좋았어요!",
  },
      {
    id: "review-058",
    name: "익명",
    date: "2026-07-19",
    therapist: "Ray",
    lang: "ko",
    content: "여기 사장님이 한국어를 배우신 것 같아서 한국어로 소통할 수 있다는 점이 꽤 편했어요. Ray쌤은 사진에서 얼굴이 전부 모자이크 처리되어 있었는데 몸은 진짜 너무 좋더라고요. 솔직히 얼굴이 별로면 어쩌지 살짝 걱정했는데, 실제로 보니까 강아지상에 완전 귀여웠어요ㅋㅋ 마사지 압도 시원하게 잘 들어가고 서비스도 아주 화끈해서 대만족ㅎㅎㅎ",
  },
      {
    id: "review-059",
    name: "匿名",
    date: "2026-07-18",
    therapist: "Aaron",
    lang: "ja",
    content: "全体的に質の高いお店だと感じました。台北でこれまで利用した他店と比べても、店内はより高級感のある雰囲気です。受付の方もとても礼儀正しく、対応が迅速で、日本語でやり取りできる点も大変助かりました。今回はAaronさんにお願いしました。受付の方のように日本語を話せるわけではありませんが、終始きめ細やかで、こちらへの気遣いも感じられる丁寧なサービスでした。次回台湾を訪れる際には、友人も連れて、また利用したいと思います。",
  },
      {
    id: "review-060",
    name: "匿名",
    date: "2026-07-22",
    therapist: "Leo",
    lang: "zh",
    content: "感覺真的笨笨的 但真的很可愛 很像高中生哈哈哈哈",
  },
      {
    id: "review-061",
    name: "익명",
    date: "2026-07-24",
    therapist: "Dragon",
    lang: "ko",
    content: "드래곤 마사지사님의 따뜻한 분위기가 정말 좋았어요. 너무 부담스러울 정도로 적극적이지도 않고, 딱 기분 좋게 친절하고 예의 바르셨어요. 마사지 실력도 정말 좋았고, 실제로 보니 귀엽고 잘생기기까지 했어요! 그리고 여기 고객 응대도 정말 세심했어요. 제가 전에 경험했던 곳들과는 확실히 달랐고, 지하철로 어떻게 오는지까지 친절하게 알려주셔서 정말 감사했어요.",
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