import type { DemonEntry } from "../types/goetia";

interface SigilViewerProps {
  entry: DemonEntry;
  scanKey: string;
}

export function SigilViewer({ entry, scanKey }: SigilViewerProps) {
  return (
    <div
      key={scanKey}
      className="relative overflow-hidden rounded-[1.8rem] border border-amber-200/10 bg-black/30 p-4 shadow-screen"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] border border-amber-200/20 shadow-[0_0_30px_rgba(245,207,123,0.15)]" />
      <div className="screen-noise crt-mask relative rounded-[1.2rem] bg-[#141210] p-4">
        <img
          src={entry.sigil}
          alt={`${entry.name} traditional sigil`}
          className="mx-auto aspect-square w-full max-w-[18rem] object-contain invert sepia-[0.55] saturate-[0.65] hue-rotate-[342deg] contrast-125"
        />
      </div>
    </div>
  );
}
