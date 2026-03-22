"use client";

import { useState } from "react";
import PreEntryScreen from "@/components/pre/PreEntryScreen";

export type Answers = {
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
  songs?: string[];
};

export default function PrePage() {
  const [entered, setEntered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  // ENTER → 설문 시작
  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <>
      {!entered ? (
        <PreEntryScreen onEnter={handleEnter} />
      ) : (
        <div className="h-screen w-full bg-[#0A0A0A] text-white flex items-center justify-center">
          <div>
            <p>STEP: {currentStep + 1}</p>
            <pre>{JSON.stringify(answers, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
