import { useEffect, useState } from "react";
import { getQuestions } from "../../lib/questions";

export default function PartyPage() {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  return (
    <main className="flex flex-col items-center h-screen bg-black text-white">
      <h1 className="text-2xl font-bold">Random Questions</h1>
      {questions.map((question, idx) => (
        <div key={idx} className="p-4 m-2 border rounded-lg">
          {question}
        </div>
      ))}
    </main>
  );
}