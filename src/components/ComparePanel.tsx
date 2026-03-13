import type { DemonEntry } from "../types/goetia";
import { formatLegions, formatNumber } from "../utils/goetia";

interface ComparePanelProps {
  primary: DemonEntry;
  secondary: DemonEntry | null;
  onClose: () => void;
}

export function ComparePanel({
  primary,
  secondary,
  onClose
}: ComparePanelProps) {
  if (!secondary) {
    return null;
  }

  const rows: Array<[string, string, string]> = [
    ["Number", formatNumber(primary.goetiaNumber), formatNumber(secondary.goetiaNumber)],
    ["Rank", primary.rank, secondary.rank],
    ["Legions", formatLegions(primary.legions), formatLegions(secondary.legions)],
    ["Appearance", primary.appearance ?? "Not separately stated", secondary.appearance ?? "Not separately stated"],
    [
      "Tags",
      primary.tags.length ? primary.tags.join(", ") : "None",
      secondary.tags.length ? secondary.tags.join(", ") : "None"
    ]
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-red-200/15 bg-[#12090b] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.65)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-red-100/65">
              Compare mode
            </p>
            <h2 className="mt-2 text-2xl uppercase tracking-[0.14em] text-stone-100">
              {primary.name} vs {secondary.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-200/80 hover:border-white/30"
          >
            Close
          </button>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-2">
          {[primary, secondary].map((entry) => (
            <div
              key={entry.id}
              className="rounded-[1.8rem] border border-white/10 bg-black/25 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg uppercase tracking-[0.12em] text-stone-100">
                  {entry.name}
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-amber-100/75">
                  {entry.rank}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <img
                  src={entry.portraitAsset}
                  alt={`${entry.name} portrait`}
                  className="aspect-square w-full rounded-[1.2rem] border border-white/10 bg-[#0c1110] p-3 [image-rendering:pixelated]"
                />
                <img
                  src={entry.sigil}
                  alt={`${entry.name} sigil`}
                  className="aspect-square w-full rounded-[1.2rem] border border-white/10 bg-[#141210] p-3 invert sepia-[0.55] saturate-[0.65] hue-rotate-[342deg] contrast-125"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-black/25 text-left text-[10px] uppercase tracking-[0.32em] text-stone-300/70">
              <tr>
                <th className="px-4 py-3">Field</th>
                <th className="px-4 py-3">{primary.name}</th>
                <th className="px-4 py-3">{secondary.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, left, right]) => (
                <tr key={label} className="border-t border-white/10">
                  <td className="px-4 py-3 text-stone-300/70">{label}</td>
                  <td className="px-4 py-3 text-stone-100/88">{left}</td>
                  <td className="px-4 py-3 text-stone-100/88">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
