export type Lang = "zh" | "en" | "ja" | "ko";

export type TeamMember = {
  id: string;
  name: string;
  desc: Record<Lang, string[]>;
  imgs: string[];
  calendar: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "rookie",
    name: "Rookie",
    desc: {
      zh: ["171/68/28", "體格健壯", "按摩手法穩健", "開朗健談", "配合度高"],
      en: [
        "171/68/28",
        "Strong physique",
        "Steady massage technique",
        "Friendly and talkative",
        "Highly cooperative and adaptable",
      ],
      ja: [
        "171/68/28",
        "しっかりした体格",
        "安定感のある施術",
        "明るく話しやすい雰囲気",
        "柔軟に対応できる高い協調性",
      ],
      ko: [
        "171/68/28",
        "탄탄한 체형",
        "안정감 있는 마사지 스타일",
        "밝고 편안한 소통",
        "유연하게 대응 가능한 높은 협조도",
      ],
    },
    imgs: [
      "/team/Rookie01.jpg",
      "/team/Rookie02.jpg",
      "/team/Rookie03.jpg",
      "/team/Rookie04.jpg",
    ],
    calendar: "https://calendar.google.com/ryan",
  },
  {
    id: "eric",
    name: "Eric",
    desc: {
      zh: ["172/67/33", "外表乾淨俐落", "肌肉結實厚實", "互動自然不拘束", "配合度高"],
      en: [
        "172/67/33",
        "Clean and sharp appearance",
        "Solid and well-built physique",
        "Natural and easygoing interaction",
        "Highly cooperative",
      ],
      ja: [
        "172/67/33",
        "清潔感のある整った外見",
        "しっかりとした筋肉質な体格",
        "自然で気軽なコミュニケーション",
        "協調性が高い",
      ],
      ko: [
        "172/67/33",
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
    calendar: "https://calendar.google.com/ryan",
  },
    {
    id: "Dragon",
    name: "Dragon",
    desc: {
      zh: ["175/73/22", "年下感", "運動感", "禮貌靦腆"],
      en: [
        "175/73/22",
        "boyish charm",
        "sporty",
        "soft-spoken and polite",
      ],
      ja: [
        "175/73/22",
        "少年っぽい感じ",
        "スポーティーな感じ",
        "礼儀正しくて少し恥ずかしがり屋",
      ],
      ko: [
        "175/73/22",
        "소년 같은 느낌",
        "스포티한 느낌",
        "공손하고 부끄러움 많은 스타일",
      ],
    },
    imgs: [
      "/team/Dragon01.jpg",
      "/team/Dragon02.jpg",
    ],
    calendar: "https://calendar.google.com/ryan",
  },

];

export default TEAM_MEMBERS;