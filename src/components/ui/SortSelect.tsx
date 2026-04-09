'use client';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestselling', label: 'Best Selling' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-caps text-on-surface-variant">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm font-label text-[#1c1c19] focus:outline-none focus:border-primary transition-colors"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
