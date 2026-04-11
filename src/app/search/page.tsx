/**
 * Honey Bee — Search Page (/search)
 * Header search icon lands here. Reads ?q= from URL, calls products API.
 * 'use client' — needs URL params + live search
 */

'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { SortSelect } from '@/components/ui/SortSelect';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { searchProducts } from '@/services/products';
import type { Product } from '@/types';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1600857544200-b2f468e9b2b1?w=800&auto=format&fit=crop';

function getProductImage(product: Product): string {
  return product.primary_image?.url ?? product.images?.[0]?.url ?? PLACEHOLDER_IMAGE;
}

const PAGE_SIZE = 12;

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState('featured');
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(
    async (query: string, page: number, append: boolean) => {
      if (!query.trim()) {
        setProducts([]);
        setTotalProducts(0);
        setHasMore(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await searchProducts(query.trim(), page, PAGE_SIZE);
        setProducts((prev) => (append ? [...prev, ...response.data] : response.data));
        setTotalProducts(response.total ?? 0);
        setHasMore(response.current_page < response.last_page);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Run search when activeQuery changes
  useEffect(() => {
    setCurrentPage(1);
    fetchResults(activeQuery, 1, false);
  }, [activeQuery, fetchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === activeQuery) return;
    // Push to URL so browser history works
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    setActiveQuery(inputValue.trim());
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchResults(activeQuery, nextPage, true);
  };

  const hasQuery = activeQuery.trim().length > 0;
  const hasResults = products.length > 0;

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-20 py-12">

      {/* Search header */}
      <section className="pb-12">
        <SectionLabel>Search</SectionLabel>
        <h1 className="font-headline text-5xl md:text-6xl text-[#1c1c19] mb-8">
          Find your perfect <span className="italic font-normal text-[#7b5800]">bar</span>
        </h1>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex items-stretch gap-0 max-w-2xl">
          <div className="relative flex-1">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              style={{ fontSize: '20px', fontVariationSettings: "'wght' 200" }}
            >
              search
            </span>
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search soaps, ingredients, skin type…"
              autoFocus
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-l-xl pl-12 pr-4 py-4 text-sm text-[#1c1c19] focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
            />
          </div>
          <button
            type="submit"
            className="honey-glow text-white font-label font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-r-xl hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Search
          </button>
        </form>
      </section>

      {/* Results area */}
      {!hasQuery && (
        <section className="py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}
          >
            search
          </span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">
            What are you looking for?
          </h2>
          <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Try searching for a fragrance note, skin concern, or ingredient name — like
            "lavender", "sensitive skin", or "turmeric".
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {['Lavender', 'Honey', 'Charcoal', 'Sensitive Skin', 'Ayurvedic', 'Cold Process'].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputValue(suggestion);
                    setActiveQuery(suggestion);
                    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
                  }}
                  className="rounded-full bg-surface-container label-caps px-4 py-2 text-on-surface-variant hover:bg-[#e0e5cc] hover:text-[#7b5800] transition-colors"
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        </section>
      )}

      {hasQuery && isLoading && products.length === 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-surface-container rounded-xl mb-4" />
              <div className="h-4 bg-surface-container rounded w-3/4 mb-2" />
              <div className="h-3 bg-surface-container rounded w-1/2" />
            </div>
          ))}
        </section>
      )}

      {hasQuery && error && (
        <section className="py-20 text-center space-y-4">
          <span
            className="material-symbols-outlined text-error mx-auto block"
            style={{ fontSize: '48px', fontVariationSettings: "'wght' 100" }}
          >
            error_outline
          </span>
          <p className="text-on-surface-variant">{error}</p>
          <button
            onClick={() => fetchResults(activeQuery, 1, false)}
            className="honey-glow text-white font-label font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </section>
      )}

      {hasQuery && !isLoading && !error && !hasResults && (
        <section className="py-20 text-center space-y-6">
          <span
            className="material-symbols-outlined text-on-surface-variant mx-auto block"
            style={{ fontSize: '64px', fontVariationSettings: "'wght' 100" }}
          >
            search_off
          </span>
          <h2 className="font-headline text-3xl text-[#1c1c19]">
            No results for &ldquo;{activeQuery}&rdquo;
          </h2>
          <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Try a different search term, or browse the full collection.
          </p>
          <Link
            href="/products"
            className="honey-glow inline-block text-white font-label font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl shadow-lg shadow-primary/10 hover:opacity-90 transition-opacity"
          >
            Browse All Soaps
          </Link>
        </section>
      )}

      {hasQuery && hasResults && (
        <section>
          {/* Results header row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <p className="text-on-surface-variant text-sm">
              <span className="font-semibold text-[#1c1c19]">{totalProducts}</span> result
              {totalProducts !== 1 ? 's' : ''} for &ldquo;<span className="text-[#7b5800]">{activeQuery}</span>&rdquo;
            </p>
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                imageUrl={getProductImage(product)}
                fragrance={product.short_description ?? undefined}
                badge={product.is_featured ? 'Featured' : undefined}
                tags={product.categories?.map((c) => c.name) ?? []}
              />
            ))}
          </div>

          <LoadMoreButton
            onClick={handleLoadMore}
            loading={isLoading}
            hasMore={hasMore}
          />
        </section>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
