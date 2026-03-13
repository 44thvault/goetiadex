import clsx from "clsx";
import type { DemonEntry } from "../types/goetia";
import { formatLegions, formatNumber } from "../utils/goetia";

interface DemonListProps {
  entries: DemonEntry[];
  selectedId: string;
  favorites: string[];
  compareTargetId: string | null;
  onSelect: (id: string) => void;
  onCompareSelect: (id: string) => void;
}

export function DemonList({
  entries,
  selectedId,
  favorites,
  compareTargetId,
  onSelect,
  onCompareSelect
}: DemonListProps) {
  return (
    <div className="rounded-[1.8rem] border border-emerald-200/10 bg-black/25 p-3">
      <div className="mb-2 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.32em] text-emerald-100/70">
        <span>Index roster</span>
        <span>compare target</span>
      </div>
      <div className="max-h-[27rem] space-y-2 overflow-y-auto pr-1">
        {entries.map((entry) => {
          const selected = entry.id === selectedId;
          const compareSelected = entry.id === compareTargetId;

          return (
            <div
              key={entry.id}
              className={clsx(
                "grid grid-cols-[1fr_auto] gap-2 rounded-2xl border px-3 py-3 transition",
                selected
                  ? "border-emerald-200/40 bg-emerald-300/10"
                  : "border-white/8 bg-[#090f0d] hover:border-white/20"
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(entry.id)}
                className="min-w-0 text-left"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200/80">
                    #{formatNumber(entry.goetiaNumber)}
                  </span>
                  {favorites.includes(entry.id) && (
                    <span className="rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-100">
                      saved
                    </span>
                  )}
                </div>
                <div className="truncate text-sm font-semibold text-stone-100">
                  {entry.name}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-300/70">
                  {entry.rank} · {formatLegions(entry.legions)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onCompareSelect(entry.id)}
                aria-pressed={compareSelected}
                className={clsx(
                  "rounded-xl border px-3 py-2 text-[10px] uppercase tracking-[0.22em] transition",
                  compareSelected
                    ? "border-amber-200/45 bg-amber-300/10 text-amber-100"
                    : "border-white/10 bg-black/25 text-stone-300/70 hover:border-white/25"
                )}
              >
                compare
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
