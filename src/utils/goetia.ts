import type { DemonEntry, FilterState } from "../types/goetia";

export const defaultFilters: FilterState = {
  query: "",
  rank: "all",
  tag: "all",
  minLegions: "",
  maxLegions: "",
  sortBy: "number"
};

export function getUniqueTags(entries: DemonEntry[]) {
  return Array.from(new Set(entries.flatMap((entry) => entry.tags))).sort();
}

export function getFilteredEntries(entries: DemonEntry[], filters: FilterState) {
  const normalizedQuery = filters.query.trim().toLowerCase();
  const min = filters.minLegions ? Number(filters.minLegions) : null;
  const max = filters.maxLegions ? Number(filters.maxLegions) : null;

  const filtered = entries.filter((entry) => {
    const haystack = [
      entry.name,
      entry.rank,
      entry.aliases.join(" "),
      entry.tags.join(" "),
      entry.offices.join(" "),
      entry.appearance ?? ""
    ]
      .join(" ")
      .toLowerCase();

    if (normalizedQuery && !haystack.includes(normalizedQuery)) {
      return false;
    }

    if (filters.rank !== "all" && entry.rank !== filters.rank) {
      return false;
    }

    if (filters.tag !== "all" && !entry.tags.includes(filters.tag)) {
      return false;
    }

    if (min !== null && (entry.legions ?? 0) < min) {
      return false;
    }

    if (max !== null && (entry.legions ?? 0) > max) {
      return false;
    }

    return true;
  });

  return filtered.sort((left, right) => {
    switch (filters.sortBy) {
      case "name":
        return left.name.localeCompare(right.name);
      case "rank":
        return left.rank.localeCompare(right.rank) || left.goetiaNumber - right.goetiaNumber;
      case "legions":
        return (right.legions ?? 0) - (left.legions ?? 0) || left.goetiaNumber - right.goetiaNumber;
      case "number":
      default:
        return left.goetiaNumber - right.goetiaNumber;
    }
  });
}

export function clampSelection(entries: DemonEntry[], selectedId: string) {
  return entries.find((entry) => entry.id === selectedId)?.id ?? entries[0]?.id ?? "";
}

export function formatLegions(legions: number | null) {
  return legions ? `${legions} legions` : "Not stated";
}

export function formatNumber(number: number) {
  return number.toString().padStart(2, "0");
}
