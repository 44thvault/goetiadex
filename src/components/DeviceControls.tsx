interface DeviceControlsProps {
  onRandom: () => void;
  onCompareOpen: () => void;
  onSequenceInput: (value: string) => void;
}

export function DeviceControls({
  onRandom,
  onCompareOpen,
  onSequenceInput
}: DeviceControlsProps) {
  const padButtons = [
    ["up", "UP"],
    ["left", "LEFT"],
    ["center", "SEAL"],
    ["right", "RIGHT"],
    ["down", "DOWN"]
  ] as const;

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
      <div className="rounded-[1.8rem] border border-white/10 bg-black/25 p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-stone-300/70">
          Device controls
        </p>
        <div className="grid grid-cols-3 gap-2">
          {padButtons.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onSequenceInput(value)}
              className={`rounded-2xl border px-3 py-4 text-xs uppercase tracking-[0.22em] transition ${
                value === "center"
                  ? "border-amber-200/35 bg-amber-300/10 text-amber-100"
                  : "border-white/10 bg-[#0d1110] text-stone-200/70 hover:border-white/25"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={onRandom}
          className="rounded-[1.6rem] border border-emerald-200/25 bg-emerald-300/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-emerald-100 transition hover:bg-emerald-300/15"
        >
          Random encounter
        </button>
        <button
          type="button"
          onClick={onCompareOpen}
          className="rounded-[1.6rem] border border-amber-200/25 bg-amber-300/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-amber-100 transition hover:bg-amber-300/15"
        >
          Open compare
        </button>
      </div>
    </div>
  );
}
