"use client";

import { useMemo, useState } from "react";
import { PartyQuestion, QuestionCategory, QUESTIONS } from "@/lib/questions";

const CATEGORY_LABELS: { key: QuestionCategory | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "light", label: "가벼운 질문" },
  { key: "balance", label: "밸런스" },
  { key: "relation", label: "관계 / 사람" },
  { key: "value", label: "가치관" },
  { key: "party", label: "파티용" },
];

function getRandomQuestion(list: PartyQuestion[], currentId?: number) {
  if (list.length === 0) return null;
  if (list.length === 1) return list[0];

  let picked = list[Math.floor(Math.random() * list.length)];
  while (picked.id === currentId) {
    picked = list[Math.floor(Math.random() * list.length)];
  }
  return picked;
}

export default function PartyPage() {
  const [category, setCategory] = useState<QuestionCategory | "all">("all");
  const [current, setCurrent] = useState<PartyQuestion | null>(QUESTIONS[0]);

  const filtered = useMemo(() => {
    if (category === "all") return QUESTIONS;
    return QUESTIONS.filter((question) => question.category === category);
  }, [category]);

  const handleNext = (targetCategory?: QuestionCategory | "all") => {
    const nextCategory = targetCategory ?? category;
    const pool =
      nextCategory === "all"
        ? QUESTIONS
        : QUESTIONS.filter((question) => question.category === nextCategory);

    const next = getRandomQuestion(pool, current?.id);
    setCurrent(next);
  };

  const handleCategoryChange = (nextCategory: QuestionCategory | "all") => {
    setCategory(nextCategory);
    const pool =
      nextCategory === "all"
        ? QUESTIONS
        : QUESTIONS.filter((question) => question.category === nextCategory);

    const next = getRandomQuestion(pool);
    setCurrent(next);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.22em] text-white/35">
          BAEKSA / Party Mode
        </p>

        <h1 className="mb-10 text-center text-3xl font-semibold leading-tight">
          서로에게 던져볼 질문
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_LABELS.map((item) => {
            const active = category === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleCategoryChange(item.key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition",
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-white/5 text-white/80 hover:border-white/30",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-14 text-center backdrop-blur-md">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/35">
            {category === "all"
              ? "Random Question"
              : CATEGORY_LABELS.find((c) => c.key === category)?.label}
          </p>

          <div className="min-h-[120px] text-2xl font-medium leading-relaxed text-white">
            {current?.text ?? "질문을 불러오지 못했습니다."}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => handleNext()}
            className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:opacity-90 sm:w-auto"
          >
            다른 질문 보기
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("light")}
            className="w-full rounded-full border border-white/12 bg-white/5 px-6 py-4 text-sm text-white/90 transition hover:border-white/25 sm:w-auto"
          >
            좀 더 가벼운 질문
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("value")}
            className="w-full rounded-full border border-white/12 bg-white/5 px-6 py-4 text-sm text-white/90 transition hover:border-white/25 sm:w-auto"
          >
            생각하는 질문
          </button>
        </div>
      </div>
    </main>
  );
}