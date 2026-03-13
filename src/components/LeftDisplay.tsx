import { formatLegions, formatNumber } from "../utils/goetia";
import type { DemonEntry, ViewMode } from "../types/goetia";
import { PortraitViewer } from "./PortraitViewer";
import { SigilViewer } from "./SigilViewer";
import { StatusLights } from "./StatusLights";

interface LeftDisplayProps {
  entry: DemonEntry;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  viewedCount: number;
  totalCount: number;
  breachMode: boolean;
  scanKey: string;
}

export function LeftDisplay({
  entry,
  viewMode,
  onViewModeChange,
  onToggleFavorite,
  isFavorite,
  viewedCount,
  totalCount,
  breachMode,
  scanKey
}: LeftDisplayProps) {
  return (
    <section className="rounded-[2.4rem] bg-gradient-to-b from-shell-500 via-shell-700 to-shell-900 p-5 shadow-device">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.42em] text-stone-200/70">
            Seal integrity {breachMode ? "unstable" : "stable"}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full border border-black/40 bg-black/25 px-3 py-1 font-mono text-xs text-amber-100">
              #{formatNumber(entry.goetiaNumber)}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-200/80">
              {formatLegions(entry.legions)}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] transition ${
            isFavorite
              ? "border-amber-200/70 bg-amber-300/20 text-amber-100"
              : "border-white/15 bg-black/20 text-stone-200/75 hover:border-white/30"
          }`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <div className="relative mb-4 rounded-[2rem] border border-black/35 bg-gradient-to-br from-[#111917] to-[#070a09] p-4">
        <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.75)]" />
          <span className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.75)]" />
          <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(134,239,172,0.75)]" />
        </div>

        {viewMode === "portrait" ? (
          <PortraitViewer entry={entry} scanKey={scanKey} />
        ) : (
          <SigilViewer entry={entry} scanKey={scanKey} />
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        {(["portrait", "sigil"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onViewModeChange(mode)}
            className={`rounded-2xl border px-3 py-2 text-xs uppercase tracking-[0.22em] transition ${
              viewMode === mode
                ? "border-emerald-200/60 bg-emerald-300/15 text-emerald-100"
                : "border-white/15 bg-black/20 text-stone-200/75 hover:border-white/35"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <StatusLights
        breachMode={breachMode}
        viewedCount={viewedCount}
        totalCount={totalCount}
      />
    </section>
  );
}
