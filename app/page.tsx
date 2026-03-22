import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen">
      <Image
        src="/images/baeksa-invite.jpeg"
        alt="BAEKSA Invite"
        fill
        className="object-cover"
      />
      <button
        onClick={() => router.push("/pre")}
        className="absolute px-8 py-4 text-xl font-bold text-white bg-black/50 rounded-xl hover:bg-black/70"
      >
        ENTER
      </button>
    </main>
  );
}