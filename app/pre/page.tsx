"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import QuestionCard from "@/components/pre/QuestionCard";
import { questions } from "@/lib/questions";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzTD-RQIr5FDaH8WFnyvSlRbLb4Ft8MIeNfY_YlJ6W9AeFf0BoiRow9ZlAZf7AoFMOw/exec";

const STORAGE_KEY = "baeksa-entry-v2";
const FORM_VERSION = "v2";

export default function PrePage() {
  const [entered, setEntered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<"form" | "processing" | "done">("form");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = questions.length + 1; // privacy notice 1장 추가
  const currentQuestion = currentStep === 0 ? null : questions[currentStep - 1];
  const isLastStep = currentStep === totalSteps - 1;

  const progress = useMemo(() => {
    return ((currentStep + 1) / totalSteps) * 100;
  }, [currentStep, totalSteps]);

  const isCurrentStepValid = useMemo(() => {
    if (currentStep === 0) return true;
    if (!currentQuestion) return false;

    if (currentQuestion.type === "multi-input") {
      const requiredFields = currentQuestion.fields.filter(
        (field) => field.required !== false
      );

      return requiredFields.every((field) => {
        const value = answers[field.key];
        return typeof value === "string" && value.trim().length > 0;
      });
    }

    if (currentQuestion.type === "single") {
      const value = answers[currentQuestion.key];
      return typeof value === "string" && value.trim().length > 0;
    }

    return false;
  }, [answers, currentQuestion, currentStep]);

  const handleEnter = () => {
    setEntered(true);
  };

  const handleBack = () => {
    if (currentStep === 0 || isSubmitting) return;
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isSubmitting) return;
    if (currentStep !== 0 && !isCurrentStepValid) return;
    if (isLastStep) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!isLastStep) return;
    if (!isCurrentStepValid) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitPhase("processing");

    const payload = {
      submittedAt: new Date().toISOString(),
      version: FORM_VERSION,
      answers,
      submissionKey: `${String(answers.name ?? "")
        .trim()
        .replace(/\s+/g, " ")}__${String(answers.phone ?? "").replace(/[^0-9]/g, "")}`,
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();

      let result: { success?: boolean; message?: string } = {};
      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (typeof result.success === "boolean" && !result.success) {
        throw new Error(result.message || "Submit failed");
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSubmitted(true);
      setSubmitPhase("done");
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      setIsSubmitting(false);
      setSubmitPhase("form");
      alert("제출 실패. 다시 시도해주세요.");
    }
  };

  const handleExit = () => {
    setEntered(false);
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitPhase("form");
    setCurrentStep(0);
    setAnswers({});
  };

  return (
    <main className="bg-black text-white">
      {!entered ? (
        <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
          <Image
            src="/images/baeksa-invite.jpeg"
            alt="BAEKSA invitation poster"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-[34%] z-10 flex justify-center px-6 text-center sm:bottom-[30%]">
            <button
              onClick={handleEnter}
              className="rounded-full bg-white/95 px-8 py-3 text-sm font-medium tracking-[0.22em] text-black shadow-xl backdrop-blur-[2px] transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              TAP TO ENTER
            </button>
          </div>
        </section>
      ) : submitPhase === "processing" ? (
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-2xl text-center">
            <p className="mb-4 text-[10px] tracking-[0.45em] text-white/45 sm:text-xs">
              BAEKSA
            </p>

            <h1 className="text-3xl font-semibold tracking-[0.18em] sm:text-5xl">
              PROCESSING
            </h1>

            <div className="mt-6 space-y-2 text-sm tracking-[0.22em] text-white/70 sm:text-base">
              <p>HOLD YOUR POSITION</p>
              <p>SECURING YOUR ENTRY</p>
            </div>
          </div>
        </section>
      ) : submitted || submitPhase === "done" ? (
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

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-5 text-left">
              <p className="text-[11px] tracking-[0.25em] text-white/40">
                FINAL NOTE
              </p>
              <div className="mt-3 space-y-2 text-sm text-white/75">
                <p>입장 확정 인원에 한해 1인당 30,000원의 참가비가 적용됩니다.</p>
                <p>세부 장소 및 최종 안내는 개별적으로 전달됩니다.</p>
              </div>
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
        <section className="flex min-h-[100dvh] items-start justify-center px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
          <div className="w-full max-w-2xl">
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between text-[11px] tracking-[0.25em] text-white/45">
                <span>
                  {String(currentStep + 1).padStart(2, "0")} /{" "}
                  {String(totalSteps).padStart(2, "0")}
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
              {currentStep === 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] px-8 py-10 sm:px-10 sm:py-12">
                  <p className="text-[11px] tracking-[0.35em] text-white/40">
                    PRIVATE ENTRY PROTOCOL
                  </p>

                  <h2 className="mt-5 text-3xl font-semibold tracking-[0.12em] sm:text-4xl">
                    PRIVACY NOTICE
                  </h2>

                  <div className="mt-8 space-y-4 text-sm leading-7 text-white/70 sm:text-base">
                    <p>
                      입력된 이름 및 연락처는 행사 운영과 최종 안내 전달을 위해서만
                      사용됩니다.
                    </p>

                    <p>
                      모든 개인정보는 행사 종료 후 즉시 폐기되며 다른 목적으로는
                      사용되지 않습니다.
                    </p>
                  </div>
                </div>
              ) : (
                <QuestionCard
                  question={currentQuestion!}
                  answers={answers}
                  onAnswerChange={setAnswers}
                />
              )}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={handleBack}
                disabled={currentStep === 0 || isSubmitting}
                className="min-w-[110px] border border-white/15 px-5 py-3 text-sm tracking-[0.24em] text-white transition duration-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                BACK
              </button>

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid || isSubmitting}
                  className="min-w-[110px] border border-white bg-white px-5 py-3 text-sm tracking-[0.24em] text-black transition duration-300 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/10 disabled:text-white/35"
                >
                  {isSubmitting ? "PROCESSING..." : "FINISH"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={(currentStep !== 0 && !isCurrentStepValid) || isSubmitting}
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
