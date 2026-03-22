export const questions = [
  { id: 0, type: "input", fields: ["name", "phone"] },

  { id: 1, type: "single", key: "reason", options: ["새로운 사람", "기존 지인", "분위기 경험"] },

  { id: 2, type: "single", key: "relationship", options: ["가벼운", "새로운 인연", "단순 경험"] },

  { id: 3, type: "single", key: "approach", options: ["그렇다", "상황에 따라", "그렇지 않다"] },

  { id: 4, type: "single", key: "groupSize", options: ["2–3", "4–6", "7명 이상"] },

  { id: 5, type: "single", key: "vibe", options: ["강함", "중간", "차분"] },

  { id: 6, type: "single", key: "energy", options: ["더 활발", "유지", "조용"] },

  { id: 7, type: "single", key: "trigger", options: ["공통 관심사", "분위기", "개입"] },

  { id: 8, type: "multi-input", fields: ["birthYear", "instagram", "mbti"] },

  { id: 9, type: "songs", key: "songs" },
];
