"use client";

import React from "react";
import type { Question } from "@/lib/questions";

type Props = {
  question: Question;
  answers: Record<string, string>;
  onAnswerChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
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

  if (question.type === "multi-input") {
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
            <div key={field.key}>
              <label className="mb-2 block text-sm tracking-[0.08em] text-white/65">
                {field.label}
                {field.required ? (
                  <span className="ml-2 text-white/35">*</span>
                ) : (
                  <span className="ml-2 text-white/25">(선택)</span>
                )}
              </label>

              <input
                type={field.inputType ?? "text"}
                value={answers[field.key] ?? ""}
                onChange={(e) => updateAnswer(field.key, e.target.value)}
                className="w-full border border-white/15 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/45"
                placeholder={field.placeholder ?? field.label}
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
