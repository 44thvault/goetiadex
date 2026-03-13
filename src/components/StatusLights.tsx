interface StatusLightsProps {
  breachMode: boolean;
  viewedCount: number;
  totalCount: number;
}

export function StatusLights({
  breachMode,
  viewedCount,
  totalCount
}: StatusLightsProps) {
  const lights = breachMode
    ? [
        ["breach", "bg-amber-300"],
        ["glyph", "bg-red-400"],
        ["seal", "bg-amber-100"]
      ]
    : [
        ["archive", "bg-emerald-400"],
        ["scanner", "bg-lime-300"],
        ["indexed", "bg-amber-300"]
      ];

  return (
    <div className="rounded-2xl border border-black/30 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-stone-200/80">
      <div className="mb-2 flex items-center gap-2">
        {lights.map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${color} animate-indicator shadow-[0_0_8px_currentColor]`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="text-stone-300/70">
        Viewed {viewedCount}/{totalCount}
      </div>
    </div>
  );
}
