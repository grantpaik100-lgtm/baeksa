"use client";

import React from "react";

type MultiInputQuestion = {
  id: number;
  type: "double-input" | "triple-input";
  title: string;
  subtitle?: string;
  fields: readonly string[];
};

type SingleQuestion = {
  id: number;
  type: "single";
  title: string;
  subtitle?: string;
  key: string;
  options: readonly string[];
};

type Question = MultiInputQuestion | SingleQuestion;

type Props = {
  question: Question;
  answers: Record<string, string>;
  onAnswerChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const fieldLabelMap: Record<string, string> = {
  name: "이름",
  phone: "연락처",
  birthYear: "출생연도",
  instagram: "인스타그램",
  mbti: "MBTI",
};

const fieldPlaceholderMap: Record<string, string> = {
  name: "이름 입력",
  phone: "연락처 입력",
  birthYear: "예: 2002",
  instagram: "@아이디 또는 아이디",
  mbti: "예: ENFP",
};

export default function QuestionCard({
  question,
  answers,
  onAnswerChange,
}: Props) {
  const updateAnswer = (key: string, value: string) => {
    onAnswerChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (question.type === "double-input" || question.type === "triple-input") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-[0.04em] sm:text-2xl">
            {question.title}
          </h2>

          {question.subtitle ? (
            <p className="mt-3 text-sm text-white/60">{question.subtitle}</p>
          ) : null}
        </div>

        <div className="space-y-4">
          {question.fields.map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm tracking-[0.08em] text-white/65">
                {fieldLabelMap[field] ?? field}
              </label>

              <input
                type={field === "phone" ? "tel" : "text"}
                value={answers[field] ?? ""}
                onChange={(e) => updateAnswer(field, e.target.value)}
                className="w-full border border-white/15 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/45"
                placeholder={fieldPlaceholderMap[field] ?? (fieldLabelMap[field] ?? field)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-[0.04em] sm:text-2xl">
          {question.title}
        </h2>

        {question.subtitle ? (
          <p className="mt-3 text-sm text-white/60">{question.subtitle}</p>
        ) : null}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = answers[question.key] === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => updateAnswer(question.key, option)}
              className={`w-full border px-4 py-4 text-left text-sm tracking-[0.03em] transition ${
                selected
                  ? "border-white bg-white text-black"
                  : "border-white/12 bg-transparent text-white hover:border-white/35"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
