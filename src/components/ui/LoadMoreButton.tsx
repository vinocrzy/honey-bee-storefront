'use client';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

export function LoadMoreButton({ onClick, loading = false, hasMore = true }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-16">
      <button
        onClick={onClick}
        disabled={loading}
        className="border border-primary text-primary font-label uppercase tracking-widest text-sm px-12 py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Load More Products'}
      </button>
    </div>
  );
}
