import { memo, useMemo } from 'react';

const RatingStars = memo(function RatingStars({ rating }) {
  const stars = useMemo(() => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return { full, empty };
  }, [rating]);

  return (
    <div className="flex">
      {Array(stars.full).fill(0).map((_, index) => (
        <span key={`full-${index}`} className="text-yellow-500">&#9733;</span>
      ))}
      {Array(stars.empty).fill(0).map((_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">&#9733;</span>
      ))}
    </div>
  );
});

export default RatingStars;
