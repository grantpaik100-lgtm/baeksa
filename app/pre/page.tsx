"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import QuestionCard from "@/components/pre/QuestionCard";
import { questions } from "@/lib/questions";
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxfDjrwAeiwWt56gfi5lxfNGfWc-ea75jgl7xIENUCBzl4GpF4xSlIUNQa9jnJqFKTd/exec";
const STORAGE_KEY = "baeksa-entry";
export default function PrePage() {
  const [entered, setEntered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const progress = useMemo(() => {
    return ((currentStep + 1) / questions.length) * 100;
  }, [currentStep]);

  const isCurrentStepValid = useMemo(() => {
    if (!currentQuestion) return false;

    if ("fields" in currentQuestion) {
      return currentQuestion.fields.every((field) => {
        const value = answers[field];
        return typeof value === "string" && value.trim().length > 0;
      });
    }

    if ("key" in currentQuestion) {
      const value = answers[currentQuestion.key];
      return typeof value === "string" && value.trim().length > 0;
    }

    return false;
  }, [answers, currentQuestion]);

  const handleEnter = () => {
    setEntered(true);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isCurrentStepValid) return;
    if (isLastStep) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
  if (!isCurrentStepValid) return;

  const payload = {
    submittedAt: new Date().toISOString(),
    answers,
  };

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    setSubmitted(true);
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    alert("제출 실패. 다시 시도해주세요.");
  }
};

  const handleExit = () => {
    setEntered(false);
    setSubmitted(false);
    setCurrentStep(0);
    setAnswers({});
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {!entered ? (
        <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
        
          <Image
            src="/images/baeksa-invite.jpeg"
            alt="BAEKSA invitation poster"
            fill
            priority
            className="object-cover"
          />
        

          
<div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
  <button
    onClick={handleEnter}
    className="rounded-full bg-white px-8 py-3 text-sm font-medium tracking-[0.22em] text-black shadow-lg transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
  >
    TAP TO ENTER
  </button>
</div>
        </section>
      ) : submitted ? (
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-2xl text-center">
            <p className="mb-4 text-[10px] tracking-[0.45em] text-white/45 sm:text-xs">
              BAEKSA
            </p>

            <h1 className="text-3xl font-semibold tracking-[0.18em] sm:text-5xl">
              ENTRY ACCEPTED
            </h1>

            <div className="mt-6 space-y-2 text-sm tracking-[0.22em] text-white/70 sm:text-base">
              <p>YOU ARE NOW INSIDE</p>
              <p>DETAILS WILL BE REVEALED</p>
            </div>

            <button
              onClick={handleExit}
              className="mt-12 border border-white/20 px-8 py-3 text-sm tracking-[0.3em] transition duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              EXIT
            </button>
          </div>
        </section>
      ) : (
        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-[11px] tracking-[0.25em] text-white/45">
                <span>
                  {String(currentStep + 1).padStart(2, "0")} /{" "}
                  {String(questions.length).padStart(2, "0")}
                </span>
                <span>ENTRY FORM</span>
              </div>

              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="animate-[fadeIn_0.35s_ease]">
              <QuestionCard
                question={currentQuestion}
                answers={answers}
                onAnswerChange={setAnswers}
              />
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="min-w-[110px] border border-white/15 px-5 py-3 text-sm tracking-[0.24em] text-white transition duration-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                BACK
              </button>

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid}
                  className="min-w-[110px] border border-white bg-white px-5 py-3 text-sm tracking-[0.24em] text-black transition duration-300 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/10 disabled:text-white/35"
                >
                  FINISH
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid}
                  className="min-w-[110px] border border-white bg-white px-5 py-3 text-sm tracking-[0.24em] text-black transition duration-300 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/10 disabled:text-white/35"
                >
                  NEXT
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
