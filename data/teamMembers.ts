export type Lang = "zh" | "en" | "ja" | "ko";

export type TeamMember = {
  id: string;
  name: string;
  desc: Record<Lang, string[]>;
  imgs: string[];
  calendar: string;
  newUntil?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "aaron",
    name: "Aaron",
    desc: {
      zh: ["171/68/31", "體格健壯", "按摩手法穩健", "開朗健談", "配合度高"],
      en: ["171/68/31","Strong physique",
        "Steady massage technique",
        "Friendly and talkative",
        "Highly cooperative and adaptable",
      ],
      ja: [
        "171/68/31",
        "しっかりした体格",
        "安定感のある施術",
        "明るく話しやすい雰囲気",
        "柔軟に対応できる高い協調性",
      ],
      ko: [
        "171/68/31",
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
    calendar:
      "https://calendar.google.com/calendar/embed?src=9241237bf98b8c10c239557b49e534adcf6ab9983be17c70f1e36f6373317080%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "dragon",
    name: "Dragon",
    desc: {
      zh: ["175/73/22", "學生", "陽光自然", "年下感", "運動感", "禮貌靦腆"],
      en: [
        "175/73/22","Studnet",
        "Bright and natural vibe",
        "boyish charm",
        "sporty",
        "soft-spoken and polite",
      ],
      ja: [
        "175/73/22","学生",
        "明るく自然な雰囲気",
        "少年っぽい感じ",
        "スポーティーな感じ",
        "礼儀正しくて少し恥ずかしがり屋",
      ],
      ko: [
        "175/73/22","학생",
        "밝고 자연스러운 분위기",
        "소년 같은 느낌",
        "스포티한 느낌",
        "공손하고 부끄러움 많은 스타일",
      ],
    },
    imgs: ["/team/Dragon01.jpg", "/team/Dragon02.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=981faba76ebecafe5ad16547ffac3f70add16197f370e884e99873219a1d8731%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "ryan",
    name: "Ryan",
    desc: {
      zh: ["165/56/26", "陽光自然", "專業按摩技術", "運動感"],
      en: [
        "165/56/26",
        "Bright and natural vibe",
        "Professional massage techniques",
        "sporty",
      ],
      ja: [
        "165/56/26",
        "明るく自然な雰囲気",
        "プロのマッサージ技術",
        "スポーティーな感じ",
      ],
      ko: [
        "165/56/26",
        "밝고 자연스러운 분위기",
        "전문가의 마사지 기술",
        "스포티한 느낌",
      ],
    },
    imgs: ["/team/Ryan01.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "sun",
    name: "Sun",
    desc: {
      zh: ["182/108/25", "超壯", "專業按摩技術", "親切健談"],
      en: [
        "182/108/25",
        "super buff",
        "Professional massage techniques",
        "warm and outgoing",
      ],
      ja: [
        "182/108/25",
        "ゴリゴリに鍛えてる",
        "プロのマッサージ技術",
        "親しみやすくて話しやすい",
      ],
      ko: [
        "182/108/25",
        "완전 근육 빵빵",
        "전문가의 마사지 기술",
        "편하게 대화할 수 있어요",
      ],
    },
    imgs: ["/team/Sun01.jpg", "/team/Sun02.jpg", "/team/Sun03.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "sam",
    name: "Sam",
    desc: {
      zh: ["162/73/26", "健美先生", "專業按摩技術"],
      en: [
        "162/73/26",
        "bodybuilder",
        "Professional massage techniques",
      ],
      ja: [
        "162/73/26",
        "ボディビルダー",
        "プロのマッサージ技術",
      ],
      ko: [
        "162/73/26",
        "보디빌더",
        "전문가의 마사지 기술",
      ],
    },
    imgs: ["/team/Sam01.jpg", "/team/Sam02.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-15",
  },
  {
    id: "mike",
    name: "Mike",
    desc: {
      zh: ["173/80/35", "穩重", "親切", "穩定運動習慣"],
      en: ["173/80/35", "composed", "friendly", "athletic"],
      ja: ["173/80/35", "落ち着いた", "親しみやすい", "アクティブ"],
      ko: ["173/80/35", "차분한", "친절한", "운동을 좋아하는"],
    },
    imgs: ["/team/Mike01.jpg", "/team/Mike02.jpg", "/team/Mike03.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-25",
  },
    {
    id: "leo",
    name: "Leo",
    desc: {
      zh: ["178/73/27", "呆萌感", "配合度高","開朗健談"],
      en: ["178/73/27",
        "nnocently cute",
        "very accommodating",
        "friendly and easy to talk to"],
      ja: ["178/73/27",
        "天然",
        "柔軟に対応してくれる",
        "明るくてとても話しやすい方です"],
      ko: ["178/73/27",
        "엉뚱한 매력",
        "요청을 잘 맞춰주는 편이에요",
        "성격이 밝고 대화하기 편해요"],
    },
    imgs: ["/team/Leo01.jpg", "/team/Leo02.jpg","/team/Leo03.jpg","/team/Leo04.jpg","/team/Leo05.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-28",
  },
      {
    id: "chris",
    name: "Chris",
    desc: {
      zh: ["173/64/33", "成熟穩重", "精壯結實","內斂吸引力"],
      en: ["173/64/33", "Mature and composed", "Lean and well-built", "Subtle attractiveness"],
      ja: ["173/64/33", "落ち着いた大人の魅力", "引き締まった体型", "内に秘めた魅力"],
      ko: ["173/64/33", "차분하고 성숙한 분위기", "탄탄한 근육형 체형", "은은한 매력"],    },
    imgs: ["/team/Chris01.jpg", "/team/Chris02.jpg","/team/Chris03.jpg","/team/Chris04.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-30",
  },
      {
    id: "dean",
    name: "Dean",
    desc: {
      zh: ["173/60/34", "男人味", "成熟穩重", "精壯結實", "自然親合感"],
      en: ["173/60/34", "Masculine", "Mature & Steady", "Lean & Toned", "Naturally Approachable"],
      ja: ["173/60/34", "男らしい", "落ち着いた大人の魅力", "引き締まった体", "親しみやすい雰囲気"],
      ko: ["173/60/34", "남성적인 매력", "차분하고 성숙한 이미지", "탄탄한 체형", "자연스럽고 편안한 분위기"],},
      imgs: ["/team/Dean01.jpg", "/team/Dean02.jpg","/team/Dean03.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-05-30",
  },
        {
    id: "jackson",
    name: "Jackson",
    desc: {
      zh: ["184/80/24", "新人上線", "直男", "校隊", "精壯結實", "健身教練"],
      en: ["184/80/24", "New Arrival", "Straight", "School Team", "Lean & Muscular", "Fitness Coach"],
      ko: ["184/80/24", "신규 등록", "직남", "학교 대표팀", "탄탄한 근육질", "헬스 트레이너"],
      ja: ["184/80/24", "新人デビュー", "ノンケ", "学校代表チーム", "引き締まった筋肉質", "フィットネストレーナー"]},
      imgs: ["/team/Jackson01.jpg", "/team/Jackson02.jpg","/team/Jackson03.jpg","/team/Jackson04.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-06-30",
  },
        {
    id: "lun",
    name: "Lun",
    desc: {
    zh: ["182/68/24", "新人上線", "多年經驗", "白皙精壯", "韓系風格"],
    en: ["182/68/24", "New Arrival", "Experienced", "Fair & Athletic", "Korean Style"],
    ja: ["182/68/24", "新人デビュー", "経験豊富", "色白・筋肉質", "韓国系スタイル"],
    ko: ["182/68/24", "신규 등록", "풍부한 경력", "하얗고 탄탄한 체형", "한국 스타일"]},
    imgs: ["/team/Lun01.jpg", "/team/Lun02.jpg","/team/Lun03.jpg","/team/Lun04.jpg"],
    calendar:
      "https://calendar.google.com/calendar/embed?src=ba08f0cb5feedcff2f99ac3762866cb7711ccedc7afd4f5ba07f051f0ca96be6%40group.calendar.google.com&ctz=Asia%2FTaipei",
    newUntil: "2026-06-30",
  },

];

export default TEAM_MEMBERS;