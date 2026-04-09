'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (qty: number) => void;
}

export function QuantitySelector({ min = 1, max = 10, defaultValue = 1, onChange }: QuantitySelectorProps) {
  const [qty, setQty] = useState(defaultValue);

  const update = (val: number) => {
    const clamped = Math.min(Math.max(val, min), max);
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="flex items-center gap-0 border border-outline-variant rounded-xl overflow-hidden w-fit">
      <button
        onClick={() => update(qty - 1)}
        disabled={qty <= min}
        className="px-4 py-3 text-primary hover:bg-surface-container transition-colors disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 300" }}>remove</span>
      </button>
      <span className="px-5 py-3 font-label text-sm font-semibold text-[#1c1c19] min-w-[3rem] text-center border-x border-outline-variant">
        {qty}
      </span>
      <button
        onClick={() => update(qty + 1)}
        disabled={qty >= max}
        className="px-4 py-3 text-primary hover:bg-surface-container transition-colors disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'wght' 300" }}>add</span>
      </button>
    </div>
  );
}
