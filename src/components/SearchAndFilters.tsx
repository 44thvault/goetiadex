import type { ChangeEvent } from "react";
import type { FilterState, SortKey } from "../types/goetia";

interface SearchAndFiltersProps {
  filters: FilterState;
  ranks: string[];
  tags: string[];
  onChange: (next: FilterState) => void;
  resultCount: number;
}

export function SearchAndFilters({
  filters,
  ranks,
  tags,
  onChange,
  resultCount
}: SearchAndFiltersProps) {
  const update =
    (key: keyof FilterState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({
        ...filters,
        [key]: event.target.value
      });
    };

  return (
    <section className="rounded-[1.8rem] border border-emerald-200/10 bg-black/25 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="block flex-1">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.32em] text-emerald-100/75">
            Search archive
          </span>
          <input
            value={filters.query}
            onChange={update("query")}
            placeholder="Name, alias, office, manifestation..."
            className="w-full rounded-2xl border border-white/10 bg-[#08100d] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-emerald-200/45"
          />
        </label>
        <div className="rounded-2xl border border-white/10 bg-[#08100d] px-4 py-3 text-xs uppercase tracking-[0.22em] text-emerald-200/80">
          {resultCount} results
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <LabeledSelect
          label="Rank"
          value={filters.rank}
          options={["all", ...ranks]}
          onChange={update("rank")}
        />
        <LabeledSelect
          label="Tag"
          value={filters.tag}
          options={["all", ...tags]}
          onChange={update("tag")}
        />
        <LabeledSelect
          label="Sort"
          value={filters.sortBy}
          options={["number", "name", "rank", "legions"]}
          onChange={update("sortBy")}
          formatLabel={(value) => value}
        />
        <LabeledInput
          label="Min legions"
          value={filters.minLegions}
          onChange={update("minLegions")}
        />
        <LabeledInput
          label="Max legions"
          value={filters.maxLegions}
          onChange={update("maxLegions")}
        />
      </div>
    </section>
  );
}

function LabeledSelect({
  label,
  value,
  options,
  onChange,
  formatLabel
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  formatLabel?: (value: SortKey | string) => string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.28em] text-stone-300/70">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-[#08100d] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-emerald-200/45"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatLabel ? formatLabel(option) : option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LabeledInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.28em] text-stone-300/70">
        {label}
      </span>
      <input
        inputMode="numeric"
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-[#08100d] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-emerald-200/45"
      />
    </label>
  );
}
