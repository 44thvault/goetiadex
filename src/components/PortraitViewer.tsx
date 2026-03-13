import { useMemo } from "react";
import type { DemonEntry } from "../types/goetia";

interface PortraitViewerProps {
  entry: DemonEntry;
  scanKey: string;
}

export function PortraitViewer({ entry, scanKey }: PortraitViewerProps) {
  const label = useMemo(
    () => `${entry.name} portrait based on Ars Goetia appearance notes`,
    [entry.name]
  );

  return (
    <div
      key={scanKey}
      className="relative overflow-hidden rounded-[1.8rem] border border-emerald-200/10 bg-black/30 p-4 shadow-screen"
    >
      <div className="pointer-events-none absolute inset-0 animate-pulseRing rounded-[1.7rem] border border-emerald-300/20" />
      <div className="pointer-events-none absolute inset-x-3 top-0 h-12 animate-sweep bg-gradient-to-b from-emerald-200/20 via-transparent to-transparent" />
      <div className="screen-noise crt-mask relative rounded-[1.2rem] bg-[#0c1110] p-3">
        <img
          src={entry.portraitAsset}
          alt={label}
          className="mx-auto aspect-square w-full max-w-[18rem] object-contain [image-rendering:pixelated]"
        />
      </div>
    </div>
  );
}
