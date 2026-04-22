/**
 * RatingStars — Star rating display component
 * Supports decimal ratings (e.g. 4.3), optional value + review count text.
 * Uses Material Symbols `star` icon.
 */

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

const ICON_SIZE: Record<string, string> = {
  sm: '14px',
  md: '18px',
  lg: '22px',
};

const TEXT_SIZE: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
}: RatingStarsProps) {
  const iconSize = ICON_SIZE[size];
  const textSize = TEXT_SIZE[size];

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starNum = i + 1;
    const filled = rating >= starNum;
    const halfFilled = !filled && rating >= starNum - 0.5;

    return (
      <span
        key={i}
        className={`material-symbols-outlined ${
          filled || halfFilled ? 'text-[#d59f2b]' : 'text-outline-variant'
        }`}
        style={{
          fontSize: iconSize,
          fontVariationSettings: filled
            ? "'FILL' 1, 'wght' 400"
            : halfFilled
            ? "'FILL' 1, 'wght' 200"
            : "'FILL' 0, 'wght' 200",
        }}
        aria-hidden="true"
      >
        star
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      <div className="flex items-center">{stars}</div>
      {showValue && (
        <span className={`${textSize} font-semibold text-[#1c1c19] ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={`${textSize} text-on-surface-variant`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
