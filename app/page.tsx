// app/page.tsx

"use client";

import { useRouter } from "next/navigation";

const PARTY_MODE = false; // 나중에 true로 바꾸면 /party로 감

export default function HomePage() {
  const router = useRouter();

  const handleEnter = () => {
    if (PARTY_MODE) {
      router.push("/party");
    } else {
      router.push("/pre");
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* 포스터 이미지 */}
      <img
        src="/poster.jpg" // ← public 폴더에 넣어야 함
        alt="BAEKSA Poster"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ENTER 버튼 */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <button
          onClick={handleEnter}
          className="border border-white px-8 py-3 text-white tracking-[0.3em] hover:bg-white hover:text-black transition"
        >
          ENTER
        </button>
      </div>
    </main>
  );
}