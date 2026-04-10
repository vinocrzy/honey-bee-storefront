'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { ProductCard } from '@/components/ui/ProductCard';
import { SortSelect } from '@/components/ui/SortSelect';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { getProducts, getCategories } from '@/services/products';
import type { Product, Category, ProductFilters } from '@/types';

export function ShopClientShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Filter state from URL params
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');

  const PAGE_SIZE = 12;

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const filters: ProductFilters = {
          page: currentPage,
          per_page: PAGE_SIZE,
        };

        if (selectedCategory) {
          const category = categories.find(c => c.slug === selectedCategory);
          if (category) filters.category_id = category.id;
        }
        if (search) filters.search = search;
        if (minPrice) filters.min_price = parseFloat(minPrice);
        if (maxPrice) filters.max_price = parseFloat(maxPrice);

        // Map sort value to API params
        if (sort === 'price-asc') {
          filters.sort_by = 'price';
          filters.sort_order = 'asc';
        } else if (sort === 'price-desc') {
          filters.sort_by = 'price';
          filters.sort_order = 'desc';
        } else if (sort === 'newest') {
          filters.sort_by = 'created_at';
          filters.sort_order = 'desc';
        } else if (sort === 'name') {
          filters.sort_by = 'name';
          filters.sort_order = 'asc';
        }

        const response = await getProducts(filters);
        
        if (currentPage === 1) {
          setProducts(response.data);
        } else {
          setProducts(prev => [...prev, ...response.data]);
        }
        
        setTotalProducts(response.total);
        setHasMore(response.current_page < response.last_page);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (categories.length > 0 || !selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory, search, minPrice, maxPrice, sort, currentPage, categories]);

  // Reset to page 1 when filters change
 const handleFilterChange = (callback: () => void) => {
    setCurrentPage(1);
    callback();
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (error && products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#4f4634] mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="honey-glow text-white label-caps text-[11px] rounded-xl px-8 py-4 hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Sidebar - disabled filters for MVP*/}
      <FilterSidebar
        selectedCategory={selectedCategory}
        selectedSkinTypes={[]}
        selectedFragrances={[]}
        onCategoryChange={(cat) => handleFilterChange(() => setSelectedCategory(cat))}
        onSkinTypeToggle={() => {}}
        onFragranceToggle={() => {}}
      />

      {/* Product Grid */}
      <div className="flex-1">
        {/* Sort + count bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="label-caps text-on-surface-variant">
            {totalProducts} product{totalProducts !== 1 ? 's' : ''}
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {/* Loading state */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl sunlight-shadow overflow-hidden animate-pulse">
                <div className="aspect-square bg-[#f0ede8]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#f0ede8] rounded w-3/4" />
                  <div className="h-3 bg-[#f0ede8] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[#5c614d] mx-auto block" style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}>
              search_off
            </span>
            <h3 className="font-headline text-2xl text-[#1c1c19] mt-6 mb-3">No Products Found</h3>
            <p className="text-[#4f4634] mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSearch('');
                setMinPrice('');
                setMaxPrice('');
                setSort('featured');
                setCurrentPage(1);
              }}
              className="honey-glow text-white label-caps text-[11px] rounded-xl px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.primary_image?.url || product.images?.[0]?.url || '/images/placeholder-product.webp'}
                  fragrance={product.short_description || undefined}
                  badge={product.is_featured ? 'Featured' : undefined}
                  tags={product.categories?.slice(0, 2).map(c => c.name)}
                />
              ))}
            </div>

            {/* Load More */}
            <LoadMoreButton
              hasMore={hasMore}
              onClick={handleLoadMore}
              loading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
