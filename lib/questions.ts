export type QuestionCategory =
  | "light"
  | "balance"
  | "relation"
  | "value"
  | "party";

export interface PartyQuestion {
  id: number;
  category: QuestionCategory;
  text: string;
}

export const QUESTIONS: PartyQuestion[] = [
  { id: 1, category: "light", text: "요즘 제일 자주 듣는 노래는?" },
  { id: 2, category: "light", text: "최근에 제일 웃겼던 일은?" },
  { id: 3, category: "light", text: "오늘 오기 전에 제일 고민한 건?" },
  { id: 4, category: "light", text: "원래 이런 자리 자주 오는 편이야?" },
  { id: 5, category: "light", text: "최근에 가장 충동적으로 한 행동은?" },
  { id: 6, category: "light", text: "주말 하루가 통으로 비면 뭐 할 거야?" },
  { id: 7, category: "light", text: "요즘 빠져 있는 거 하나만 말해줘." },
  { id: 8, category: "light", text: "최근 가장 만족스러웠던 하루는 언제였어?" },
  { id: 9, category: "light", text: "여행 가면 계획형이야, 즉흥형이야?" },
  { id: 10, category: "light", text: "지금 제일 먹고 싶은 거 하나 고르면?" },

  { id: 11, category: "balance", text: "설렘 vs 안정" },
  { id: 12, category: "balance", text: "즉흥 vs 계획" },
  { id: 13, category: "balance", text: "직진형 vs 눈치형" },
  { id: 14, category: "balance", text: "빠르게 친해짐 vs 천천히 친해짐" },
  { id: 15, category: "balance", text: "표현 많이 vs 행동으로" },
  { id: 16, category: "balance", text: "첫인상 vs 알아갈수록" },
  { id: 17, category: "balance", text: "말 잘 통함 vs 분위기 끌림" },
  { id: 18, category: "balance", text: "연락 자주 vs 필요할 때만" },
  { id: 19, category: "balance", text: "자유 vs 안정" },
  { id: 20, category: "balance", text: "많이 해보는 삶 vs 제대로 해보는 삶" },

  { id: 21, category: "relation", text: "사람에게 끌릴 때는 보통 어떤 순간이야?" },
  { id: 22, category: "relation", text: "좋아하는 사람 생기면 티 나는 편이야?" },
  { id: 23, category: "relation", text: "편한 사람이 좋아, 자극되는 사람이 좋아?" },
  { id: 24, category: "relation", text: "사람 볼 때 오래 남는 포인트 하나만 고르면?" },
  { id: 25, category: "relation", text: "호감은 빨리 생기는 편이야, 천천히 생기는 편이야?" },
  { id: 26, category: "relation", text: "좋은 사람 기준은 자주 바뀌는 편이야?" },
  { id: 27, category: "relation", text: "친해지고 싶은 사람은 어떤 사람이야?" },
  { id: 28, category: "relation", text: "첫 만남에서 대화가 더 중요해, 분위기가 더 중요해?" },
  { id: 29, category: "relation", text: "사람을 좋아하게 되는 건 계기 때문이야, 시간 때문이야?" },
  { id: 30, category: "relation", text: "매력은 만들어지는 거라고 생각해?" },

  { id: 31, category: "value", text: "행복은 안정에서 온다 vs 변화에서 온다" },
  { id: 32, category: "value", text: "사람은 변할 수 있다 vs 본질은 안 변한다" },
  { id: 33, category: "value", text: "노력 vs 방향" },
  { id: 34, category: "value", text: "운 vs 실력" },
  { id: 35, category: "value", text: "좋아하는 일 vs 잘하는 일" },
  { id: 36, category: "value", text: "인생에서 가장 중요한 가치 하나만 고르면?" },
  { id: 37, category: "value", text: "나답게 사는 게 더 중요해, 잘 사는 게 더 중요해?" },
  { id: 38, category: "value", text: "다양한 경험 vs 깊이 있는 경험" },
  { id: 39, category: "value", text: "사람을 판단할 때 가장 중요한 기준은 뭐야?" },
  { id: 40, category: "value", text: "좋은 사람은 편한 사람 vs 배울 점 있는 사람" },

  { id: 41, category: "party", text: "오늘 여기 온 이유를 솔직하게 말하면 뭐야?" },
  { id: 42, category: "party", text: "오늘 목표 하나 정하면 뭐야?" },
  { id: 43, category: "party", text: "오늘 제일 먼저 말 걸고 싶은 사람 스타일은?" },
  { id: 44, category: "party", text: "처음 보는 사람이 먼저 말 걸면 편해, 살짝 부담돼?" },
  { id: 45, category: "party", text: "여기서 제일 재밌어 보이는 사람 유형은?" },
  { id: 46, category: "party", text: "지금 분위기 몇 점이야?" },
  { id: 47, category: "party", text: "오늘 끝날 때 기억에 남고 싶은 순간은?" },
  { id: 48, category: "party", text: "지금 기분을 한 단어로 표현하면?" },
  { id: 49, category: "party", text: "오늘 너를 한 단어로 표현하면?" },
  { id: 50, category: "party", text: "이 파티에서 기대하는 건 뭐야?" },
];