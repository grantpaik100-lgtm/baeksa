"use client";

import { FormEvent, useMemo, useState } from "react";
import FadeInSection from "./FadeInSection";
import {
  ATTRACTED_TO_OPTIONS,
  DRINK_OPTIONS,
  ENERGY_OPTIONS,
  FIRST_IMPRESSION_OPTIONS,
  MUSIC_OPTIONS,
  PRE_THINK_QUESTIONS,
  SOCIAL_OPENNESS_OPTIONS,
  TALK_STYLE_OPTIONS,
  WHY_OPTIONS,
} from "@/lib/survey";

interface SurveyState {
  name: string;
  birthYear: string;
  instagram: string;
  referredBy: string;
  mbti: string;
  socialOpenness: string;
  talkStyle: string;
  energyStyle: string;
  drinkStyle: string;
  whyJoined: string;
  favoriteMusic: string[];
  firstLookPoint: string;
  attractedTo: string;
}

const initialState: SurveyState = {
  name: "",
  birthYear: "",
  instagram: "",
  referredBy: "",
  mbti: "",
  socialOpenness: "",
  talkStyle: "",
  energyStyle: "",
  drinkStyle: "",
  whyJoined: "",
  favoriteMusic: [],
  firstLookPoint: "",
  attractedTo: "",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-3 block text-sm font-medium text-white/90">{children}</label>;
}

export default function SurveyForm() {
  const [form, setForm] = useState<SurveyState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.birthYear.trim() &&
      form.instagram.trim() &&
      form.socialOpenness &&
      form.talkStyle &&
      form.energyStyle &&
      form.drinkStyle &&
      form.whyJoined &&
      form.favoriteMusic.length > 0 &&
      form.firstLookPoint &&
      form.attractedTo
    );
  }, [form]);

  const updateField = <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMusic = (value: string) => {
    setForm((prev) => {
      const exists = prev.favoriteMusic.includes(value);
      if (exists) {
        return {
          ...prev,
          favoriteMusic: prev.favoriteMusic.filter((item) => item !== value),
        };
      }
      if (prev.favoriteMusic.length >= 3) return prev;

      return {
        ...prev,
        favoriteMusic: [...prev.favoriteMusic, value],
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      alert("필수 문항을 먼저 채워주세요.");
      return;
    }

    localStorage.setItem("baeksa-survey", JSON.stringify(form));
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">기본 정보</h2>

          <div>
            <FieldLabel>이름</FieldLabel>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="이름"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div>
            <FieldLabel>출생연도</FieldLabel>
            <input
              value={form.birthYear}
              onChange={(e) => updateField("birthYear", e.target.value)}
              placeholder="예: 2001"
              inputMode="numeric"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div>
            <FieldLabel>인스타그램 ID</FieldLabel>
            <input
              value={form.instagram}
              onChange={(e) => updateField("instagram", e.target.value)}
              placeholder="@ 없이 입력"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div>
            <FieldLabel>누구를 통해 오셨나요?</FieldLabel>
            <input
              value={form.referredBy}
              onChange={(e) => updateField("referredBy", e.target.value)}
              placeholder="초대한 사람 / 친구 이름"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div>
            <FieldLabel>MBTI (선택)</FieldLabel>
            <input
              value={form.mbti}
              onChange={(e) => updateField("mbti", e.target.value.toUpperCase())}
              placeholder="예: ENFP"
              maxLength={4}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white uppercase outline-none placeholder:text-white/35"
            />
          </div>
        </section>

        <section className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">파티 스타일</h2>

          <RadioBlock
            label="처음 보는 사람에게"
            name="socialOpenness"
            options={SOCIAL_OPENNESS_OPTIONS}
            value={form.socialOpenness}
            onChange={(value) => updateField("socialOpenness", value)}
          />

          <RadioBlock
            label="파티에서 나는"
            name="talkStyle"
            options={TALK_STYLE_OPTIONS}
            value={form.talkStyle}
            onChange={(value) => updateField("talkStyle", value)}
          />

          <RadioBlock
            label="에너지 스타일"
            name="energyStyle"
            options={ENERGY_OPTIONS}
            value={form.energyStyle}
            onChange={(value) => updateField("energyStyle", value)}
          />

          <RadioBlock
            label="술과 대화"
            name="drinkStyle"
            options={DRINK_OPTIONS}
            value={form.drinkStyle}
            onChange={(value) => updateField("drinkStyle", value)}
          />
        </section>

        <section className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">왜 오셨나요?</h2>

          <RadioBlock
            label="이번 파티에 온 이유는?"
            name="whyJoined"
            options={WHY_OPTIONS}
            value={form.whyJoined}
            onChange={(value) => updateField("whyJoined", value)}
          />
        </section>

        <section className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">취향과 대화 포인트</h2>

          <div>
            <FieldLabel>요즘 자주 듣는 음악 (최대 3개)</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {MUSIC_OPTIONS.map((option) => {
                const active = form.favoriteMusic.includes(option);
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => toggleMusic(option)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/15 bg-white/5 text-white/80 hover:border-white/30",
                    ].join(" ")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-white/45">최대 3개까지 선택 가능</p>
          </div>

          <RadioBlock
            label="사람을 볼 때 더 먼저 보는 건?"
            name="firstLookPoint"
            options={FIRST_IMPRESSION_OPTIONS}
            value={form.firstLookPoint}
            onChange={(value) => updateField("firstLookPoint", value)}
          />

          <RadioBlock
            label="나는 어떤 사람이 더 끌리는 편인가?"
            name="attractedTo"
            options={ATTRACTED_TO_OPTIONS}
            value={form.attractedTo}
            onChange={(value) => updateField("attractedTo", value)}
          />
        </section>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-full border border-white/70 bg-white px-6 py-4 text-sm font-semibold tracking-[0.2em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          SUBMIT
        </button>
      </form>

      {submitted && (
        <FadeInSection>
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
              Before the party
            </p>
            <h3 className="mb-5 text-xl font-semibold text-white">
              파티 전에 한 번 생각해보세요
            </h3>

            <div className="space-y-3">
              {PRE_THINK_QUESTIONS.map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white/88"
                >
                  {question}
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>
      )}
    </div>
  );
}

function RadioBlock({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition",
                checked
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-black/20 text-white/85 hover:border-white/25",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="hidden"
              />
              <span className="text-sm">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}