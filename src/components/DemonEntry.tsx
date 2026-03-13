import type { DemonEntry, EntryTab } from "../types/goetia";
import { formatLegions } from "../utils/goetia";

interface DemonEntryProps {
  entry: DemonEntry;
  activeTab: EntryTab;
  onTabChange: (tab: EntryTab) => void;
  breachMode: boolean;
}

const tabs: EntryTab[] = ["overview", "offices", "manifestation", "notes"];

export function DemonEntry({
  entry,
  activeTab,
  onTabChange,
  breachMode
}: DemonEntryProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-200/10 bg-gradient-to-b from-[#14211d] to-[#0a110f] p-5 shadow-screen">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-emerald-100/65">
            {breachMode ? "Restricted channel active" : "Archive online"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-[0.16em] text-stone-100">
            {entry.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-300/82">
            {entry.shortDescription}
          </p>
        </div>
        <div className="grid min-w-[14rem] gap-2 rounded-[1.6rem] border border-white/10 bg-black/20 p-4 text-xs uppercase tracking-[0.18em] text-stone-200/75">
          <span>Rank: {entry.rank}</span>
          <span>Title: {entry.title ?? "Not specified"}</span>
          <span>Legions: {formatLegions(entry.legions)}</span>
          <span>Aliases: {entry.aliases.length ? entry.aliases.join(", ") : "None noted"}</span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] transition ${
              activeTab === tab
                ? "border-emerald-200/45 bg-emerald-300/12 text-emerald-100"
                : "border-white/10 bg-black/20 text-stone-200/70 hover:border-white/25"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-200/86">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <p>{entry.fullDescription}</p>
            <MetadataChips label="Tags" items={entry.tags} />
          </div>
        )}

        {activeTab === "offices" && (
          <div className="space-y-4">
            <MetadataChips
              label="Attributed offices"
              items={entry.offices.length ? entry.offices : ["No additional office summary extracted."]}
            />
            <MetadataChips
              label="Specialties"
              items={entry.specialties.length ? entry.specialties : ["No specialty tag applied."]}
            />
          </div>
        )}

        {activeTab === "manifestation" && (
          <div className="space-y-4">
            <p>{entry.appearance ?? "No separate manifestation note extracted from the source text."}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-100/75">
              Portraits in this archive are restrained visual interpretations of the textual manifestation notes.
            </p>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            <p>{entry.notesOnVariations ?? "No major naming variation note attached for this entry."}</p>
            <p>
              Source:{" "}
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-200 underline underline-offset-2"
              >
                {entry.source.title}
              </a>{" "}
              edited by {entry.source.editor}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function MetadataChips({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-stone-300/70">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-100/84"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
