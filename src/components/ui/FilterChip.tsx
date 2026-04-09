'use client';

interface FilterChipProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, count, active = false, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-label transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-surface-container text-on-surface-variant hover:bg-secondary-container'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
          active ? 'bg-white/20' : 'bg-secondary-container'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}
