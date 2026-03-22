import Link from "next/link";
import { PARTY_MODE } from "@/lib/config";

export default function HomePage() {
  const enterHref = PARTY_MODE ? "/party" : "/pre";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <img
        src="/images/baeksa-invite.jpg"
        alt="BAEKSA invitation poster"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-10">
        <Link
          href={enterHref}
          className="rounded-full border border-white/70 bg-black/30 px-8 py-3 text-xs tracking-[0.28em] text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
        >
          ENTER
        </Link>
      </div>
    </main>
  );
}