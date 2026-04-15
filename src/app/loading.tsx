/**
 * Honey Bee — Global Loading State
 * Displays while Next.js is loading pages
 * Stitch "Luminous Alchemist" design system
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fcf9f4] flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-[#e0e5cc] border-t-[#7b5800] rounded-full animate-spin mx-auto mb-4" />
        
        {/* Text */}
        <p className="label-caps text-[#5c614d]">LOADING...</p>
      </div>
    </div>
  );
}
