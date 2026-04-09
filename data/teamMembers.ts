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
        content: "手法穩定，互動自然，整體節奏很舒服。",
      },
      {
        name: "匿名顧客",
        rating: 5,
        date: "2026.03",
        content: "照片與本人落差小，體驗流暢，會想再回訪。",
      },
      {
        name: "K",
        rating: 4,
        date: "2026.03",
        content: "聊天不尷尬，氣氛很好。",
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
        content: "外型乾淨，互動自然，過程很放鬆。",
      },
      {
        name: "匿名顧客",
        rating: 4,
        date: "2026.03",
        content: "肌肉線條很好，服務態度佳。",
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
        content: "很自然的互動，完全不會尷尬。",
      },
      {
        name: "匿名顧客",
        rating: 4,
        date: "2026.03",
        content: "年下感很強，氣氛輕鬆。",
      },
    ],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
];

export default TEAM_MEMBERS;