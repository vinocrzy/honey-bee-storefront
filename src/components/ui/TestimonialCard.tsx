interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
}

export function TestimonialCard({ quote, author, location, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl sunlight-shadow p-7 space-y-4">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="material-symbols-outlined text-primary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
            star
          </span>
        ))}
      </div>
      <blockquote className="font-headline italic text-[#1c1c19] text-lg leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer>
        <p className="font-semibold text-sm text-[#1c1c19]">{author}</p>
        {location && <p className="label-caps text-on-surface-variant">{location}</p>}
      </footer>
    </div>
  );
}
