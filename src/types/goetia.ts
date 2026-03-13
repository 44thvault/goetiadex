export type ViewMode = "portrait" | "sigil";
export type EntryTab = "overview" | "offices" | "manifestation" | "notes";
export type SortKey = "number" | "name" | "rank" | "legions";

export interface DemonSource {
  title: string;
  editor: string;
  url: string;
}

export interface DemonEntry {
  id: string;
  goetiaNumber: number;
  name: string;
  rank: string;
  legions: number | null;
  title: string | null;
  shortDescription: string;
  fullDescription: string;
  appearance: string | null;
  offices: string[];
  specialties: string[];
  aliases: string[];
  sigil: string;
  portraitAsset: string;
  tags: string[];
  notesOnVariations: string | null;
  source: DemonSource;
}

export interface FilterState {
  query: string;
  rank: string;
  tag: string;
  minLegions: string;
  maxLegions: string;
  sortBy: SortKey;
}
