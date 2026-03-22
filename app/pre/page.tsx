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

  const handleEnter = () => {
    console.log("ENTER fired");
    setEntered(true);
  };

  if (!entered) {
    return <PreEntryScreen onEnter={handleEnter} />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0A0A0A] text-white">
      <div className="text-center">
        <p className="mb-4 text-lg">STEP: {currentStep + 1}</p>
        <pre className="text-left text-sm text-white/70">
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>
    </div>
  );
}
