import { questions } from "../../lib/questions";

export default function PartyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.3em] text-white/50">BAEKSA — PARTY MODE</p>
        <h1 className="mt-4 text-3xl">Random Question Page</h1>

        <div className="mt-8 space-y-3">
          {questions.map((q, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              {q}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}