export type SingleQuestion = {
  id: number;
  type: "single";
  title: string;
  subtitle?: string;
  key: string;
  options: readonly string[];
};

export type MultiInputField = {
  key: string;
  label: string;
  placeholder?: string;
  inputType?: "text" | "tel" | "number";
  required?: boolean;
};

export type MultiInputQuestion = {
  id: number;
  type: "multi-input";
  title: string;
  subtitle?: string;
  fields: readonly MultiInputField[];
};

export type Question = SingleQuestion | MultiInputQuestion;

export const questions: readonly Question[] = [
  {
    id: 0,
    type: "multi-input",
    title: "이름과 연락처를 입력해주세요",
    subtitle: "운영을 위한 기본 정보입니다",
    fields: [
      {
        key: "name",
        label: "이름",
        placeholder: "이름 입력",
        inputType: "text",
        required: true,
      },
      {
        key: "phone",
        label: "연락처",
        placeholder: "연락 가능한 번호 입력",
        inputType: "tel",
        required: true,
      },
    ],
  },
  {
    id: 1,
    type: "single",
    title: "이번 파티에서 가장 얻고 싶은 것은 무엇인가요?",
    options: [
      "새로운 사람과 연결",
      "편하게 어울리기",
      "좋은 분위기 즐기기",
      "아는 사람과 더 가까워지기",
    ],
    key: "goal",
  },
  {
    id: 2,
    type: "single",
    title: "파티에서 나는 어떤 모드에 가까운가요?",
    subtitle: "평소의 상태를 기준으로 골라주세요",
    options: [
      "먼저 섞어보고 싶다",
      "누가 열어주면 잘 섞일 수 있다",
      "천천히 적응하고 싶다",
    ],
    key: "todayMode",
  },
  {
    id: 3,
    type: "single",
    title: "처음 보는 사람에게 먼저 말을 거는 편인가요?",
    options: [
      "거의 먼저 거는 편",
      "상황이 좋으면 가능",
      "먼저 다가와 주는 편이 좋다",
    ],
    key: "approachStyle",
  },
  {
    id: 4,
    type: "single",
    title: "가장 편하게 대화가 되는 단위는 무엇인가요?",
    options: ["1:1", "2–4명", "5명 이상도 괜찮다"],
    key: "groupComfort",
  },
  {
    id: 5,
    type: "single",
    title: "어떤 대화가 가장 편한가요?",
    options: [
      "가볍고 웃긴 대화",
      "취향·관심사 대화",
      "생각이 오가는 깊은 대화",
      "내가 말하기보다 듣는 편이 편하다",
    ],
    key: "conversationStyle",
  },
  {
    id: 6,
    type: "single",
    title: "대화가 가장 잘 풀리는 시작 방식은 무엇인가요?",
    options: [
      "공통 관심사",
      "상대가 먼저 편하게 열어줄 때",
      "여러 명 속에서 자연스럽게",
      "음악·분위기처럼 현장 흐름을 탈 때",
    ],
    key: "triggerStyle",
  },
  {
    id: 7,
    type: "single",
    title: "어떤 에너지의 사람과 잘 맞을 것 같나요?",
    options: [
      "밝고 적극적인 사람",
      "너무 세지 않은 편안한 사람",
      "차분하고 안정적인 사람",
      "그때그때 다르다",
    ],
    key: "preferredEnergy",
  },
  {
    id: 8,
    type: "single",
    title: "아래 중 가장 부담스러운 상황은 무엇인가요?",
    options: [
      "너무 텐션이 높은 분위기",
      "이미 친한 사람들 사이에 들어가는 것",
      "말이 너무 없는 어색한 자리",
      "너무 깊거나 무거운 대화",
    ],
    key: "socialRisk",
  },
  {
    id: 9,
    type: "single",
    title: " 초대 받으신 분의 성향은 어떤 쪽에 가까운가요?",
    options: [
      "여러 사람과 넓게 만나고 싶다",
      "몇 명과 깊게 대화하고 싶다",
      "아직 모르겠다",
    ],
    key: "mixingStyle",
  },
  {
    id: 10,
    type: "multi-input",
    title: "가벼운 프로필",
    subtitle: "선택 입력입니다",
    fields: [
      {
        key: "birthYear",
        label: "출생연도",
        placeholder: "예: 2002",
        inputType: "number",
        required: false,
      },
      {
        key: "instagram",
        label: "인스타그램",
        placeholder: "@아이디 또는 아이디",
        inputType: "text",
        required: false,
      },
    ],
  },
  {
    id: 11,
    type: "multi-input",
    title: "자신을 가장 잘 표현하는 노래 3곡",
    subtitle: "정답은 없습니다. 지금의 당신을 가장 잘 보여주는 곡이면 됩니다",
    fields: [
      {
        key: "song1",
        label: "노래 1",
        placeholder: "첫 번째 곡-가수",
        inputType: "text",
        required: true,
      },
      {
        key: "song2",
        label: "노래 2",
        placeholder: "두 번째 곡-가수",
        inputType: "text",
        required: true,
      },
      {
        key: "song3",
        label: "노래 3",
        placeholder: "세 번째 곡-가수",
        inputType: "text",
        required: true,
      },
    ],
  },
] as const;
