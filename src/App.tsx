import { useEffect, useMemo, useState } from "react";
import { ComparePanel } from "./components/ComparePanel";
import { GoetiadexShell } from "./components/GoetiadexShell";
import { LeftDisplay } from "./components/LeftDisplay";
import { RightDisplay } from "./components/RightDisplay";
import { goetiaEntries, ranks } from "./data/goetiaEntries";
import type { EntryTab, ViewMode } from "./types/goetia";
import {
  clampSelection,
  defaultFilters,
  getFilteredEntries,
  getUniqueTags
} from "./utils/goetia";
import { toggleInList, usePersistentState } from "./utils/storage";

const breachSequence = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "center"
];

export default function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedId, setSelectedId] = useState(goetiaEntries[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>("portrait");
  const [activeTab, setActiveTab] = useState<EntryTab>("overview");
  const [compareTargetId, setCompareTargetId] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [favorites, setFavorites] = usePersistentState<string[]>("goetiadex:favorites", []);
  const [viewed, setViewed] = usePersistentState<string[]>("goetiadex:viewed", [
    goetiaEntries[0].id
  ]);
  const [breachMode, setBreachMode] = usePersistentState<boolean>("goetiadex:breach", false);
  const [sequenceInput, setSequenceInput] = useState<string[]>([]);
  const [scanStamp, setScanStamp] = useState(() => `${goetiaEntries[0].id}-${Date.now()}`);

  const tags = useMemo(() => getUniqueTags(goetiaEntries), []);
  const filteredEntries = useMemo(
    () => getFilteredEntries(goetiaEntries, filters),
    [filters]
  );

  useEffect(() => {
    const nextId = clampSelection(filteredEntries, selectedId);
    if (nextId && nextId !== selectedId) {
      setSelectedId(nextId);
    }
  }, [filteredEntries, selectedId]);

  const selectedEntry =
    filteredEntries.find((entry) => entry.id === selectedId) ??
    goetiaEntries.find((entry) => entry.id === selectedId) ??
    goetiaEntries[0];

  const compareEntry =
    (compareTargetId && goetiaEntries.find((entry) => entry.id === compareTargetId)) || null;

  useEffect(() => {
    setViewed((current) =>
      current.includes(selectedEntry.id) ? current : [...current, selectedEntry.id]
    );
  }, [selectedEntry.id, setViewed]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
        return;
      }

      const currentIndex = filteredEntries.findIndex((entry) => entry.id === selectedEntry.id);
      if (event.key === "ArrowDown" && currentIndex < filteredEntries.length - 1) {
        selectEntry(filteredEntries[currentIndex + 1].id);
      }
      if (event.key === "ArrowUp" && currentIndex > 0) {
        selectEntry(filteredEntries[currentIndex - 1].id);
      }
      if (event.key.toLowerCase() === "p") {
        setViewMode("portrait");
      }
      if (event.key.toLowerCase() === "s") {
        setViewMode("sigil");
      }
      if (event.key.toLowerCase() === "r") {
        pickRandom();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredEntries, selectedEntry.id]);

  function selectEntry(id: string) {
    setSelectedId(id);
    setScanStamp(`${id}-${Date.now()}`);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => toggleInList(current, id));
  }

  function pickRandom() {
    const pool = filteredEntries.length ? filteredEntries : goetiaEntries;
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    selectEntry(candidate.id);
  }

  function registerSequence(value: string) {
    setSequenceInput((current) => {
      const next = [...current, value].slice(-breachSequence.length);
      if (breachSequence.every((token, index) => next[index] === token)) {
        setBreachMode((currentBreach) => !currentBreach);
      }
      return next;
    });
  }

  function openCompare() {
    if (!compareTargetId) {
      const fallback = goetiaEntries.find((entry) => entry.id !== selectedEntry.id);
      if (fallback) {
        setCompareTargetId(fallback.id);
      }
    }
    setCompareOpen(true);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-4 pt-6 text-center lg:px-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-stone-300/55">
          Archive interface for historical occult taxonomy. Data drawn from traditional Ars Goetia
          descriptions.
        </p>
      </div>

      <GoetiadexShell
        left={
          <LeftDisplay
            entry={selectedEntry}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFavorite={() => toggleFavorite(selectedEntry.id)}
            isFavorite={favorites.includes(selectedEntry.id)}
            viewedCount={viewed.length}
            totalCount={goetiaEntries.length}
            breachMode={breachMode}
            scanKey={scanStamp}
          />
        }
        right={
          <RightDisplay
            entry={selectedEntry}
            entries={filteredEntries}
            favorites={favorites}
            compareTargetId={compareTargetId}
            filters={filters}
            ranks={ranks}
            tags={tags}
            activeTab={activeTab}
            breachMode={breachMode}
            onSelect={selectEntry}
            onCompareSelect={(id) => setCompareTargetId(id)}
            onFiltersChange={setFilters}
            onTabChange={setActiveTab}
            onRandom={pickRandom}
            onCompareOpen={openCompare}
            onSequenceInput={registerSequence}
          />
        }
      />

      {compareOpen && (
        <ComparePanel
          primary={selectedEntry}
          secondary={compareEntry}
          onClose={() => setCompareOpen(false)}
        />
      )}
    </main>
  );
}
