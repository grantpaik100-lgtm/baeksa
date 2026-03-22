"use client";

import Image from "next/image";

export default function PreEntryScreen() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] text-white">
      <Image
        src="/images/baeksa-invite.jpeg"
        alt="BAEKSA invitation poster"
        fill
        priority
        className="object-cover"
      /> 

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          className="border border-white/30 bg-white/10 px-8 py-3 text-sm tracking-[0.35em] text-white/90 backdrop-blur-sm"
        >
          ENTER
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-[11px] tracking-[0.28em] text-white/60">
          TAP ANYWHERE TO ENTER
        </p>
      </div>
    </div>
  );
}
