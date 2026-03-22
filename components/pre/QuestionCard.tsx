"use client";

type Answers = {
  name?: string;
  phone?: string;
  reason?: string;
  relationship?: string;
  approach?: string;
  groupSize?: string;
  vibe?: string;
  energy?: string;
  trigger?: string;
  birthYear?: string;
  instagram?: string;
  mbti?: string;
  song1?: string;
  song2?: string;
  song3?: string;
};

type Question =
  | {
      id: number;
      type: "double-input";
      title: string;
      subtitle: string;
      fields: readonly ["name", "phone"];
    }
  | {
      id: number;
      type: "single";
      title: string;
      options: readonly string[];
      key:
        | "reason"
        | "relationship"
        | "approach"
        | "groupSize"
        | "vibe"
        | "energy"
        | "trigger";
    }
  | {
      id: number;
      type: "triple-input";
      title: string;
      fields: readonly ["birthYear", "instagram", "mbti"];
    }
  | {
      id: number;
      type: "songs";
      title: string;
      fields: readonly ["song1", "song2", "song3"];
    };

type Props = {
  question: Question;
  answers: Answers;
  onChange: (key: keyof Answers, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  canGoNext: boolean;
};

const inputBase =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/90 outline-none placeholder:text-white/28 transition focus:border-white/25 focus:bg-white/[0.06]";

const optionBase =
  "w-full rounded-2xl border px-4 py-4 text-left text-sm transition";

const optionIdle =
  "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/20 hover:bg-white/[0.05]";

const optionActive = "border-white/40 bg-white/10 text-white";

const labelBase = "mb-3 text-sm text-white/84";

export default function QuestionCard({
  question,
  answers,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
  canGoNext,
}: Props) {
  const renderBody = () => {
    if (question.type === "double-input") {
      return (
        <div className="space-y-5">
          <div>
            <p className={labelBase}>{question.title}</p>
            <input
              className={inputBase}
              value={answers.name ?? ""}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="이름"
            />
          </div>

          <div>
            <p className={labelBase}>{question.subtitle}</p>
            <input
              className={inputBase}
              value={answers.phone ?? ""}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="연락처"
              inputMode="tel"
            />
          </div>
        </div>
      );
    }

    if (question.type === "single") {
      const selected = answers[question.key] ?? "";

      return (
        <div>
          <p className="mb-5 text-base leading-relaxed text-white/90">
            {question.title}
          </p>

          <div className="space-y-3">
            {question.options.map((option) => {
              const active = selected === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(question.key, option)}
                  className={`${optionBase} ${active ? optionActive : optionIdle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (question.type === "triple-input") {
      return (
        <div>
          <p className="mb-5 text-base leading-relaxed text-white/90">
            {question.title}
          </p>

          <div className="space-y-3">
            <input
              className={inputBase}
              value={answers.birthYear ?? ""}
              onChange={(e) => onChange("birthYear", e.target.value)}
              placeholder="출생연도"
              inputMode="numeric"
            />
            <input
              className={inputBase}
              value={answers.instagram ?? ""}
              onChange={(e) => onChange("instagram", e.target.value)}
              placeholder="인스타"
            />
            <input
              className={inputBase}
              value={answers.mbti ?? ""}
              onChange={(e) => onChange("mbti", e.target.value)}
              placeholder="MBTI"
            />
          </div>
        </div>
      );
    }

    if (question.type === "songs") {
      return (
        <div>
          <p className="mb-5 text-base leading-relaxed text-white/90">
            {question.title}
          </p>

          <div className="space-y-3">
            <input
              className={inputBase}
              value={answers.song1 ?? ""}
              onChange={(e) => onChange("song1", e.target.value)}
              placeholder="노래 1"
            />
            <input
              className={inputBase}
              value={answers.song2 ?? ""}
              onChange={(e) => onChange("song2", e.target.value)}
              placeholder="노래 2"
            />
            <input
              className={inputBase}
              value={answers.song3 ?? ""}
              onChange={(e) => onChange("song3", e.target.value)}
              placeholder="노래 3"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md md:p-7">
      <div className="mb-3 text-[11px] tracking-[0.24em] text-white/30">
        BAEKSA
      </div>

      <div className="mb-8 transition-opacity duration-300 ease-out">
        {renderBody()}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.2em] text-white/45 transition hover:border-white/20 hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-30"
        >
          BACK
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs tracking-[0.24em] text-white/90 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/28"
        >
          {isLast ? "FINISH" : "NEXT"}
        </button>
      </div>
    </div>
  );
}
