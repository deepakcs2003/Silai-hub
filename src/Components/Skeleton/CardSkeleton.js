import React from 'react';

const CardSkeleton = () => {
  return (
    <div 
      className="
        relative 
        bg-white 
        rounded-2xl 
        border 
        border-gray-100 
        shadow-lg 
        overflow-hidden 
        animate-pulse
      "
    >
      {/* Image Skeleton with Shimmer Effect */}
      <div 
        className="
          relative 
          h-72
          bg-gradient-to-r 
          from-gray-200 
          via-gray-300 
          to-gray-200 
          bg-size-200 
          animate-shimmer
        " 
      />

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          {/* Product Name */}
          <div 
            className="
              h-6 
              bg-gradient-to-r 
              from-gray-200 
              via-gray-300 
              to-gray-200 
              rounded-md 
              w-3/4 
              animate-shimmer
              bg-size-200
            "
          />
          
          {/* Category */}
          <div 
            className="
              h-4 
              bg-gradient-to-r 
              from-gray-200 
              via-gray-300 
              to-gray-200 
              rounded-md 
              w-1/4 
              animate-shimmer
              bg-size-200
            "
          />
        </div>

        {/* Pricing Skeleton */}
        <div className="space-y-3">
          {/* ReadyMade Price */}
          <div className="flex justify-between items-center">
            <div 
              className="
                h-4 
                bg-gradient-to-r 
                from-gray-200 
                via-gray-300 
                to-gray-200 
                rounded-md 
                w-1/3 
                animate-shimmer
                bg-size-200
              "
            />
            <div 
              className="
                h-4 
                bg-gradient-to-r 
                from-gray-200 
                via-gray-300 
                to-gray-200 
                rounded-md 
                w-1/3 
                animate-shimmer
                bg-size-200
              "
            />
          </div>

          {/* Tailor Made Price */}
          <div className="flex justify-between items-center">
            <div 
              className="
                h-4 
                bg-gradient-to-r 
                from-gray-200 
                via-gray-300 
                to-gray-200 
                rounded-md 
                w-1/3 
                animate-shimmer
                bg-size-200
              "
            />
            <div 
              className="
                h-4 
                bg-gradient-to-r 
                from-gray-200 
                via-gray-300 
                to-gray-200 
                rounded-md 
                w-1/3 
                animate-shimmer
                bg-size-200
              "
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <div 
            className="
              h-10 
              bg-gradient-to-r 
              from-gray-200 
              via-gray-300 
              to-gray-200 
              rounded-md 
              flex-1 
              animate-shimmer
              bg-size-200
            "
          />
          <div 
            className="
              h-10 
              bg-gradient-to-r 
              from-gray-200 
              via-gray-300 
              to-gray-200 
              rounded-md 
              flex-1 
              animate-shimmer
              bg-size-200
            "
          />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;