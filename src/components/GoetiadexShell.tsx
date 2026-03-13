import type { ReactNode } from "react";

export function GoetiadexShell({
  left,
  right
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-[1500px] animate-boot px-4 py-8 lg:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-14 z-0 h-32 bg-gradient-to-b from-red-500/10 to-transparent blur-3xl" />
      <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(24rem,30rem)_1fr]">
        <div className="relative">
          {left}
          <DeviceDetail side="left" />
        </div>
        <div className="relative">
          {right}
          <DeviceDetail side="right" />
        </div>
      </div>
      <div className="relative mx-auto -mt-3 hidden h-10 w-[94%] rounded-full border border-black/30 bg-gradient-to-b from-[#2b0c0f] to-[#160507] shadow-[0_14px_35px_rgba(0,0,0,0.45)] xl:block" />
      <div className="absolute left-1/2 top-8 hidden h-[92%] w-8 -translate-x-1/2 rounded-full border border-black/30 bg-gradient-to-b from-[#420b0d] via-[#1d0708] to-[#420b0d] xl:block" />
    </div>
  );
}

function DeviceDetail({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <>
      <div
        className={`pointer-events-none absolute ${isLeft ? "left-4 top-4" : "right-4 top-4"} flex gap-2`}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-full border border-black/25 bg-white/15"
          />
        ))}
      </div>
      <div
        className={`pointer-events-none absolute ${isLeft ? "bottom-5 left-5" : "bottom-5 right-5"} flex gap-2`}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="h-1.5 w-4 rounded-full bg-black/25" />
        ))}
      </div>
    </>
  );
}
