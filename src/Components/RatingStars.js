import React from 'react';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex">
      {Array(fullStars).fill(0).map((_, index) => (
        <span key={index} className="text-yellow-500">&#9733;</span>
      ))}
      {Array(emptyStars).fill(0).map((_, index) => (
        <span key={index} className="text-gray-300">&#9733;</span>
      ))}
    </div>
  );
};

export default RatingStars;
