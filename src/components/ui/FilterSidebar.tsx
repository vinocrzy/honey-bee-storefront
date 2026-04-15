'use client';

import { FilterChip } from './FilterChip';
import type { Category } from '@/types';

const SKIN_TYPES = ['Sensitive', 'Dry', 'Oily', 'Normal', 'Combination'];
const FRAGRANCES = [
  { name: 'Floral', count: 12 },
  { name: 'Earthy', count: 8 },
  { name: 'Citrus', count: 5 },
  { name: 'Woody', count: 4 },
  { name: 'Herbal', count: 6 },
];

interface FilterSidebarProps {
  categories?: Category[];
  selectedCategory?: string;
  selectedSkinTypes?: string[];
  selectedFragrances?: string[];
  onCategoryChange?: (cat: string) => void;
  onSkinTypeToggle?: (type: string) => void;
  onFragranceToggle?: (frag: string) => void;
}

export function FilterSidebar({
  categories = [],
  selectedCategory = '',
  selectedSkinTypes = [],
  selectedFragrances = [],
  onCategoryChange,
  onSkinTypeToggle,
  onFragranceToggle,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
      {/* Category */}
      <div className="space-y-5">
        <h3 className="font-label text-xs uppercase tracking-widest font-bold text-[#1c1c19]">Categories</h3>
        <div className="flex flex-col space-y-3">
          {/* All Products option */}
          <label 
            className="flex items-center group cursor-pointer" 
            onClick={() => onCategoryChange?.('')}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
              selectedCategory === '' ? 'border-primary' : 'border-outline-variant group-hover:border-primary'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                selectedCategory === '' ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'
              }`} />
            </div>
            <span className={`ml-3 font-label text-sm ${
              selectedCategory === '' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}>
              All Products
            </span>
          </label>
          
          {/* Real categories from API */}
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center group cursor-pointer" onClick={() => onCategoryChange?.(cat.slug)}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                selectedCategory === cat.slug ? 'border-primary' : 'border-outline-variant group-hover:border-primary'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                  selectedCategory === cat.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'
                }`} />
              </div>
              <span className={`ml-3 font-label text-sm ${
                selectedCategory === cat.slug ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div className="space-y-5">
        <h3 className="font-label text-xs uppercase tracking-widest font-bold text-[#1c1c19]">Skin Type</h3>
        <div className="flex flex-wrap gap-2">
          {SKIN_TYPES.map((type) => (
            <FilterChip
              key={type}
              label={type}
              active={selectedSkinTypes.includes(type)}
              onClick={() => onSkinTypeToggle?.(type)}
            />
          ))}
        </div>
      </div>

      {/* Fragrance Profile */}
      <div className="space-y-5">
        <h3 className="font-label text-xs uppercase tracking-widest font-bold text-[#1c1c19]">Fragrance</h3>
        <div className="space-y-3">
          {FRAGRANCES.map(({ name, count }) => (
            <button
              key={name}
              onClick={() => onFragranceToggle?.(name)}
              className={`flex justify-between items-center w-full text-sm font-label text-on-surface-variant hover:text-primary transition-colors ${
                selectedFragrances.includes(name) ? 'text-primary font-bold' : ''
              }`}
            >
              <span>{name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Honey Bee Promise box */}
      <div className="bg-secondary-container/40 p-7 rounded-xl space-y-4">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px', fontVariationSettings: "'wght' 300" }}>
          nature_people
        </span>
        <h4 className="font-headline font-bold text-primary text-xl leading-snug">The Honey Bee Promise</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed font-body">
          Each bar is cured for six weeks in our atelier, ensuring a longer-lasting, deeply moisturizing lather that respects your skin&apos;s delicate biome.
        </p>
        <ul className="space-y-2 text-xs font-label text-on-surface-variant font-medium">
          {['Cold-Pressed Process', 'Organic Botanicals', 'Cruelty-Free'].map((p) => (
            <li key={p} className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-primary" style={{ fontSize: '14px' }}>check</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
