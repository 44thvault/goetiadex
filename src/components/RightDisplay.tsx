import type { DemonEntry, EntryTab, FilterState } from "../types/goetia";
import { DemonEntry as DemonEntryPanel } from "./DemonEntry";
import { DemonList } from "./DemonList";
import { SearchAndFilters } from "./SearchAndFilters";
import { DeviceControls } from "./DeviceControls";

interface RightDisplayProps {
  entry: DemonEntry;
  entries: DemonEntry[];
  favorites: string[];
  compareTargetId: string | null;
  filters: FilterState;
  ranks: string[];
  tags: string[];
  activeTab: EntryTab;
  breachMode: boolean;
  onSelect: (id: string) => void;
  onCompareSelect: (id: string) => void;
  onFiltersChange: (next: FilterState) => void;
  onTabChange: (tab: EntryTab) => void;
  onRandom: () => void;
  onCompareOpen: () => void;
  onSequenceInput: (value: string) => void;
}

export function RightDisplay({
  entry,
  entries,
  favorites,
  compareTargetId,
  filters,
  ranks,
  tags,
  activeTab,
  breachMode,
  onSelect,
  onCompareSelect,
  onFiltersChange,
  onTabChange,
  onRandom,
  onCompareOpen,
  onSequenceInput
}: RightDisplayProps) {
  return (
    <section className="rounded-[2.4rem] bg-gradient-to-b from-shell-500 via-shell-700 to-shell-900 p-5 shadow-device">
      <div className="rounded-[2rem] border border-black/35 bg-gradient-to-b from-[#121a17] to-[#090d0c] p-4">
        <div className={`space-y-4 ${breachMode ? "animate-breach" : "animate-flicker"}`}>
          <SearchAndFilters
            filters={filters}
            ranks={ranks}
            tags={tags}
            onChange={onFiltersChange}
            resultCount={entries.length}
          />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.8fr)]">
            <DemonEntryPanel
              entry={entry}
              activeTab={activeTab}
              onTabChange={onTabChange}
              breachMode={breachMode}
            />
            <DemonList
              entries={entries}
              selectedId={entry.id}
              favorites={favorites}
              compareTargetId={compareTargetId}
              onSelect={onSelect}
              onCompareSelect={onCompareSelect}
            />
          </div>
          <DeviceControls
            onRandom={onRandom}
            onCompareOpen={onCompareOpen}
            onSequenceInput={onSequenceInput}
          />
        </div>
      </div>
    </section>
  );
}
