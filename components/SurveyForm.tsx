"use client";

import { useState } from "react";
import { surveySections } from "../lib/survey";

type Answers = {
  [key: string]: string | string[];
};

export default function SurveyForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleMulti = (id: string, value: string) => {
    const prev = (answers[id] as string[]) || [];
    if (prev.includes(value)) {
      setAnswers({ ...answers, [id]: prev.filter((v) => v !== value) });
    } else {
      setAnswers({ ...answers, [id]: [...prev, value] });
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("baeksa_entry", JSON.stringify(answers));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-white text-center mt-40">
        <p className="text-xl">ENTRY COMPLETE</p>
      </div>
    );
  }

  return (
    <div className="text-white max-w-xl mx-auto py-20 px-4 space-y-12">
      {surveySections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg mb-4 opacity-70">{section.title}</h2>

          <div className="space-y-6">
            {section.questions.map((q) => (
              <div key={q.id}>
                <p className="mb-2">{q.title}</p>

                {q.type === "text" || q.type === "tel" ? (
                  <input
                    type={q.type}
                    className="w-full bg-black border border-gray-700 px-3 py-2"
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                ) : null}

                {q.type === "single" &&
                  q.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange(q.id, opt.value)}
                      className={`block w-full text-left px-3 py-2 border mb-2 ${
                        answers[q.id] === opt.value
                          ? "border-white"
                          : "border-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}

                {q.type === "multi" &&
                  q.options?.map((opt) => {
                    const selected = (answers[q.id] as string[])?.includes(
                      opt.value
                    );
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleMulti(q.id, opt.value)}
                        className={`block w-full text-left px-3 py-2 border mb-2 ${
                          selected ? "border-white" : "border-gray-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full border border-white py-3 mt-10"
      >
        SUBMIT
      </button>
    </div>
  );
}