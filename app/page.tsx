"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/pre");
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* 배경 이미지 */}
      <img
        src="/images/baeksa-invite.jpeg"
        alt="BAEKSA Poster"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6">
        <h1 className="text-3xl tracking-[0.4em]">BAEKSA</h1>

        <button
          onClick={handleEnter}
          className="border border-white px-8 py-3 text-sm tracking-[0.3em] transition hover:bg-white hover:text-black"
        >
          ENTER
        </button>
      </div>
    </main>
  );
}