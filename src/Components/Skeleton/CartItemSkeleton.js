import React from 'react';

const CartItemSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-4 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Image Skeleton */}
        <div className="w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                        rounded-lg mb-4 md:mb-0 md:mr-6 animate-shimmer bg-size-200" />
        
        <div className="flex-grow w-full md:w-auto space-y-4">
          {/* Product Name Skeleton */}
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                          rounded-md w-3/4 animate-shimmer bg-size-200" />
          
          {/* Product Details Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Category */}
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                            rounded-md animate-shimmer bg-size-200" />
            
            {/* Price */}
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                            rounded-md animate-shimmer bg-size-200" />
            
            {/* Discount */}
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                            rounded-md animate-shimmer bg-size-200" />
            
            {/* Total Price */}
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                            rounded-md animate-shimmer bg-size-200" />
          </div>
          
          {/* Action Buttons Skeleton */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              {/* Decrease Button */}
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                              rounded-full animate-shimmer bg-size-200" />
              
              {/* Quantity */}
              <div className="w-10 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                              rounded-md animate-shimmer bg-size-200" />
              
              {/* Increase Button */}
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                              rounded-full animate-shimmer bg-size-200" />
            </div>
            
            {/* Remove Button */}
            <div className="w-24 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                            rounded-lg animate-shimmer bg-size-200" />
          </div>
          
          {/* Order Button */}
          <div className="w-full h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
                          rounded-lg animate-shimmer bg-size-200" />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;