import SurveyForm from "@/components/SurveyForm";

export default function PrePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto mb-10 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/40">
          BAEKSA
        </p>
        <h1 className="text-3xl font-semibold leading-tight">
          파티 전에 가볍게 체크해주세요
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          이 설문은 사람들의 성향을 미리 파악하고, 현장에서 더 자연스럽게
          섞일 수 있도록 돕기 위한 장치입니다. 가장 비슷한 선택지를 골라주세요.
        </p>
      </div>

      <SurveyForm />
    </main>
  );
}