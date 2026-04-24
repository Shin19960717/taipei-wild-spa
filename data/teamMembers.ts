export type Lang = "zh" | "en" | "ja" | "ko";

export type TeamReview = {
  name?: string;
  rating?: number;
  date?: string;
  content: string;
};

export type TeamMember = {
  id: string;
  name: string;
  desc: Record<Lang, string[]>;
  imgs: string[];
  calendar: string;
  newUntil?: string;
  reviews?: TeamReview[];
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "aaron",
    name: "Aaron",
    desc: {
      zh: ["171/68/28", "新人上線", "體格健壯", "按摩手法穩健", "開朗健談", "配合度高"],
      en: [
        "171/68/28",
        "New arrival",
        "Strong physique",
        "Steady massage technique",
        "Friendly and talkative",
        "Highly cooperative and adaptable",
      ],
      ja: [
        "171/68/28",
        "新人セラピスト",
        "しっかりした体格",
        "安定感のある施術",
        "明るく話しやすい雰囲気",
        "柔軟に対応できる高い協調性",
      ],
      ko: [
        "171/68/28",
        "신규 테라피스트",
        "탄탄한 체형",
        "안정감 있는 마사지 스타일",
        "밝고 편안한 소통",
        "유연하게 대응 가능한 높은 협조도",
      ],
    },
    imgs: [
      "/team/Aaron01.jpg",
      "/team/Aaron02.jpg",
      "/team/Aaron03.jpg",
      "/team/Aaron04.jpg",
    ],
    reviews: [
      {
        name: "Jason",
        rating: 5,
        date: "2026.04",
        content: "手法穩定，互動自然，整體節奏很舒服",
      },
      {
        name: "匿名顧客",
        rating: 5,
        date: "2026.03",
        content: "雖然有打碼，但本人算帥，會想為了他再來",
      },
      {
        name: "K",
        rating: 4,
        date: "2026.03",
        content: "很會聊，氣氛很好",
      },
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=9241237bf98b8c10c239557b49e534adcf6ab9983be17c70f1e36f6373317080%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "eric",
    name: "Eric",
    desc: {
      zh: ["172/67/33", "新人上線", "外表乾淨俐落", "肌肉結實厚實", "互動自然不拘束", "配合度高"],
      en: [
        "172/67/33",
        "New arrival",
        "Clean and sharp appearance",
        "Solid and well-built physique",
        "Natural and easygoing interaction",
        "Highly cooperative",
      ],
      ja: [
        "172/67/33",
        "新人セラピスト",
        "清潔感のある整った外見",
        "しっかりとした筋肉質な体格",
        "自然で気軽なコミュニケーション",
        "協調性が高い",
      ],
      ko: [
        "172/67/33",
        "신규 테라피스트",
        "깔끔하고 단정한 외형",
        "탄탄하고 근육질의 체형",
        "자연스럽고 편안한 소통",
        "높은 협조도",
      ],
    },
    imgs: [
      "/team/Eric01.jpg",
      "/team/Eric02.jpg",
      "/team/Eric03.jpg",
      "/team/Eric04.jpg",
    ],
    reviews: [
      {
        name: "Leo",
        rating: 5,
        date: "2026.04",
        content: "外型乾淨，蠻親切，過程按到睡著很放鬆",
      },
      {
        name: "匿名顧客",
        rating: 4,
        date: "2026.03",
        content: "肌肉線條很好，服務態度佳",
      },
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=6761e8d7b25daa548fd72acfd0c161fca4da291c0ce9c7a1a37d0132034d13a5%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "dragon",
    name: "Dragon",
    desc: {
      zh: ["175/73/22", "新人上線", "陽光自然", "年下感", "運動感", "禮貌靦腆"],
      en: [
        "175/73/22",
        "New arrival",
        "Bright and natural vibe",
        "boyish charm",
        "sporty",
        "soft-spoken and polite",
      ],
      ja: [
        "175/73/22",
        "新人セラピスト",
        "明るく自然な雰囲気",
        "少年っぽい感じ",
        "スポーティーな感じ",
        "礼儀正しくて少し恥ずかしがり屋",
      ],
      ko: [
        "175/73/22",
        "신규 테라피스트",
        "밝고 자연스러운 분위기",
        "소년 같은 느낌",
        "스포티한 느낌",
        "공손하고 부끄러움 많은 스타일",
      ],
    },
    imgs: [
      "/team/Dragon01.jpg",
      "/team/Dragon02.jpg",
    ],
    reviews: [
      {
        name: "M",
        rating: 5,
        date: "2026.04",
        content: "有男友感，很親切",
      },
      {
        name: "匿名顧客",
        rating: 5,
        date: "2026.03",
        content: "本人鮮肉一枚，蠻會聊的，很蘇胡",
      },
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
    {
    id: "ryan",
    name: "Ryan",
    desc: {
      zh: ["165/56/24", "新人上線", "陽光自然", "專業按摩技術", "運動感"],
      en: [
        "165/56/24",
        "New arrival",
        "Bright and natural vibe",
        "Professional massage techniques",
        "sporty",
      ],
      ja: [
        "165/56/24",
        "新人セラピスト",
        "明るく自然な雰囲気",
        "プロのマッサージ技術",
        "スポーティーな感じ",
      ],
      ko: [
        "165/56/24",
        "신규 테라피스트",
        "밝고 자연스러운 분위기",
        "전문가의 마사지 기술",
        "스포티한 느낌",
      ],
    },
    imgs: [
      "/team/Ryan01.jpg",
    ],
    reviews: [
      {
        name: "匿名顧客",
        rating: 5,
        date: "2026.03",
        content: "按摩手法很好，蠻有經驗的感覺不是隨便按，互動感覺還不錯",
      },
      {
        name: "匿名顧客",
        rating: 5,
        date: "2026.03",
        content: "本人蠻帥",
      },

    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
    {
    id: "sun",
    name: "Sun",
    desc: {
      zh: ["172/85/23", "新人上線", "超壯", "專業按摩技術", "親切健談"],
      en: [
        "172/85/23",
        "New arrival",
        "super buff",
        "Professional massage techniques",
        "warm and outgoing",
      ],
      ja: [
        "172/85/23",
        "新人セラピスト",
        "ゴリゴリに鍛えてる",
        "プロのマッサージ技術",
        "親しみやすくて話しやすい",
      ],
      ko: [
        "172/85/23",
        "신규 테라피스트",
        "완전 근육 빵빵",
        "전문가의 마사지 기술",
        "편하게 대화할 수 있어요",
      ],
    },
    imgs: [
      "/team/Sun01.jpg",
      "/team/Sun02.jpg",
      "/team/Sun03.jpg",
    ],
    reviews: [
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
    {
    id: "sam",
    name: "Sam",
    desc: {
      zh: ["162/73/25", "新人上線", "健美先生", "專業按摩技術"],
      en: [
        "165/56/24",
        "New arrival",
        "bodybuilder",
        "Professional massage techniques",
      ],
      ja: [
        "162/73/25",
        "新人セラピスト",
        "ボディビルダー",
        "プロのマッサージ技術",
      ],
      ko: [
        "162/73/25",
        "신규 테라피스트",
        "보디빌더",
        "전문가의 마사지 기술",
      ],
    },
    imgs: [
      "/team/Sam01.jpg",
      "/team/Sam02.jpg",
    ],
    reviews: [
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
    {
    id: "mike",
    name: "Mike",
    desc: {
      zh: [
        "173/80/35",
        "新人上線",
        "穩重",
        "親切",
        "穩定運動習慣",
      ],
      en: [
        "173/80/35",
        "New arrival",
        "composed",
        "friendly",
        "athletic",
      ],
      ja: [
        "173/80/35",
        "新人セラピスト",
        "落ち着いた",
        "親しみやすい",
        "アクティブ",
      ],
      ko: [
        "173/80/35",
        "신규 테라피스트",
        "차분한",
        "친절한",
        "운동을 좋아하는",
      ],
    },
    imgs: [
      "/team/Mike01.jpg",
      "/team/Mike02.jpg",
      "/team/Mike03.jpg",
    ],
    reviews: [
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-25",
  },

];

export default TEAM_MEMBERS;