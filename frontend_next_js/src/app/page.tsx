"use client";

import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] text-[#111827]">
      <div className="w-full flex items-center justify-center py-10">
        <Game />
      </div>
    </main>
  );
}
