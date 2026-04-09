'use client';

import { useState, useMemo } from 'react';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { ProductCard } from '@/components/ui/ProductCard';
import { SortSelect } from '@/components/ui/SortSelect';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  fragrance?: string;
  badge?: string;
  tags?: string[];
}

interface ShopClientShellProps {
  products: Product[];
}

const PAGE_SIZE = 6;

export function ShopClientShell({ products }: ShopClientShellProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([]);
  const [sort, setSort] = useState('featured');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const toggleSkinType = (type: string) => {
    setSelectedSkinTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFragrance = (frag: string) => {
    setSelectedFragrances(prev =>
      prev.includes(frag) ? prev.filter(f => f !== frag) : [...prev, frag]
    );
  };

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'newest') list.reverse();
    return list;
  }, [products, sort]);

  const visible_products = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Sidebar */}
      <FilterSidebar
        selectedCategory={selectedCategory}
        selectedSkinTypes={selectedSkinTypes}
        selectedFragrances={selectedFragrances}
        onCategoryChange={setSelectedCategory}
        onSkinTypeToggle={toggleSkinType}
        onFragranceToggle={toggleFragrance}
      />

      {/* Product Grid */}
      <div className="flex-1">
        {/* Sort + count bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="label-caps text-on-surface-variant">
            {sorted.length} product{sorted.length !== 1 ? 's' : ''}
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible_products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <LoadMoreButton
          hasMore={hasMore}
          onClick={() => setVisible(prev => prev + PAGE_SIZE)}
        />
      </div>
    </div>
  );
}
