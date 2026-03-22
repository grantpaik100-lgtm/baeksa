// lib/survey.ts

export type Option = {
  label: string;
  value: string;
};

export type Question = {
  id: string;
  type: "text" | "tel" | "single" | "multi";
  title: string;
  options?: Option[];
  required?: boolean;
};

export type Section = {
  title: string;
  questions: Question[];
};

export const surveySections: Section[] = [
  {
    title: "기본 정보",
    questions: [
      { id: "name", type: "text", title: "이름", required: true },
      { id: "contact", type: "tel", title: "연락처", required: true },
      {
        id: "companions",
        type: "single",
        title: "동반 여부",
        options: [
          { label: "혼자", value: "solo" },
          { label: "2인", value: "pair" },
          { label: "그룹", value: "group" },
        ],
      },
    ],
  },
  {
    title: "참여 목적",
    questions: [
      {
        id: "purpose",
        type: "single",
        title: "왜 이 자리에 오나요?",
        options: [
          { label: "새로운 사람", value: "new_people" },
          { label: "기존 지인", value: "known_people" },
          { label: "분위기 경험", value: "vibe" },
          { label: "기타", value: "other" },
        ],
      },
      {
        id: "relationship",
        type: "single",
        title: "이번 자리에서 원하는 관계는?",
        options: [
          { label: "가벼운", value: "light" },
          { label: "새로운 인연", value: "connection" },
          { label: "단순 경험", value: "experience" },
        ],
      },
    ],
  },
  {
    title: "상호작용 성향",
    questions: [
      {
        id: "initiation",
        type: "single",
        title: "먼저 말을 거는 편인가요?",
        options: [
          { label: "예", value: "yes" },
          { label: "상황에 따라", value: "depends" },
          { label: "아니오", value: "no" },
        ],
      },
      {
        id: "group_size",
        type: "single",
        title: "편한 그룹 크기",
        options: [
          { label: "2~3명", value: "small" },
          { label: "4~6명", value: "medium" },
          { label: "그 이상", value: "large" },
        ],
      },
    ],
  },
  {
    title: "에너지",
    questions: [
      {
        id: "energy_level",
        type: "single",
        title: "선호 분위기",
        options: [
          { label: "강함", value: "high" },
          { label: "중간", value: "mid" },
          { label: "차분", value: "low" },
        ],
      },
      {
        id: "night_change",
        type: "single",
        title: "밤이 깊어질수록",
        options: [
          { label: "더 활발", value: "more_active" },
          { label: "유지", value: "same" },
          { label: "조용해짐", value: "calm" },
        ],
      },
    ],
  },
  {
    title: "행동 트리거",
    questions: [
      {
        id: "trigger",
        type: "single",
        title: "대화가 시작되는 순간",
        options: [
          { label: "공통 관심사", value: "interest" },
          { label: "분위기", value: "vibe" },
          { label: "누군가의 개입", value: "intervention" },
        ],
      },
    ],
  },
  {
    title: "개방성",
    questions: [
      {
        id: "openness",
        type: "single",
        title: "새로운 사람과의 거리감",
        options: [
          { label: "편함", value: "comfortable" },
          { label: "상황에 따라", value: "depends" },
          { label: "불편함", value: "uncomfortable" },
        ],
      },
    ],
  },
  {
    title: "음악 취향",
    questions: [
      {
        id: "music",
        type: "multi",
        title: "선호 음악",
        options: [
          { label: "Hip-hop", value: "hiphop" },
          { label: "EDM", value: "edm" },
          { label: "R&B", value: "rnb" },
          { label: "Pop", value: "pop" },
          { label: "House", value: "house" },
          { label: "기타", value: "other" },
        ],
      },
    ],
  },
  {
    title: "리스크",
    questions: [
      {
        id: "drinking",
        type: "single",
        title: "술 스타일",
        options: [
          { label: "거의 안 마심", value: "none" },
          { label: "적당히", value: "moderate" },
          { label: "많이", value: "heavy" },
        ],
      },
    ],
  },
  {
    title: "드레스코드",
    questions: [
      {
        id: "dress",
        type: "single",
        title: "드레스코드 착용 가능 여부",
        options: [
          { label: "가능", value: "yes" },
          { label: "불가능", value: "no" },
        ],
      },
    ],
  },
];