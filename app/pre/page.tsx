"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import QuestionCard from "@/components/pre/QuestionCard";
import { questions } from "@/lib/questions";

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

const isFilled = (value?: string) => !!value?.trim();

export default function PrePage() {
  const [entered, setEntered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];

  const progress = useMemo(
    () => ((currentStep + 1) / totalSteps) * 100,
    [currentStep, totalSteps]
  );

  const canGoNext = useMemo(() => {
    if (currentQuestion.type === "double-input") {
      return isFilled(answers.name) && isFilled(answers.phone);
    }

    if (currentQuestion.type === "single") {
      return isFilled(answers[currentQuestion.key]);
    }

    if (currentQuestion.type === "triple-input") {
      return (
        isFilled(answers.birthYear) &&
        isFilled(answers.instagram) &&
        isFilled(answers.mbti)
      );
    }

    if (currentQuestion.type === "songs") {
      return (
        isFilled(answers.song1) &&
        isFilled(answers.song2) &&
        isFilled(answers.song3)
      );
    }

    return false;
  }, [answers, currentQuestion]);

  const handleChange = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!entered) {
    return (
      <div
        className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] text-white"
        onClick={() => setEntered(true)}
      >
        <Image
          src="/images/baeksa-invite.jpeg"
          alt="BAEKSA invitation poster"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEntered(true);
            }}
            className="border border-white/30 bg-white/10 px-8 py-3 text-sm tracking-[0.35em] text-white/90 backdrop-blur-sm"
          >
            ENTER
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-[11px] tracking-[0.28em] text-white/60">
            TAP ANYWHERE TO ENTER
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] tracking-[0.28em] text-white/40">
            ENTRY FORM
          </p>
          <p className="text-[11px] tracking-[0.2em] text-white/35">
            {currentStep + 1} / {totalSteps}
          </p>
        </div>

        <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white/80 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div key={currentStep} className="animate-[fadeIn_220ms_ease-out]">
          <QuestionCard
            question={currentQuestion}
            answers={answers}
            onChange={handleChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStep === 0}
            isLast={currentStep === totalSteps - 1}
            canGoNext={canGoNext}
          />
        </div>
      </div>
    </main>
  );
}
