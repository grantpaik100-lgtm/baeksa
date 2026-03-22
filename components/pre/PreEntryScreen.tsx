"use client";

import Image from "next/image";

export default function PreEntryScreen() {
  const handleEnter = () => {
    console.log("ENTER clicked");
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] text-white"
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleEnter();
        }
      }}
    >
      {/* Poster Image */}
      <Image
        src="/images/baeksa-invite.jpeg"
        alt="BAEKSA invitation poster"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
          className="border border-white/30 bg-white/8 px-8 py-3 text-sm tracking-[0.35em] text-white/90 backdrop-blur-sm transition hover:bg-white/12"
        >
          ENTER
        </button>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 text-center">
        <p className="text-[11px] tracking-[0.28em] text-white/60">
          TAP ANYWHERE TO ENTER
        </p>
      </div>
    </div>
  );
}
