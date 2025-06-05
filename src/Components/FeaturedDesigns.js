import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Card from './Card';

const AllProducts = () => {
  const { allProduct, getAllProduct, addToCart } = useContext(AppContext);
  const [showFeatured, setShowFeatured] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(12);
  
  // Responsive products per page for initial load
  const getInitialItemsToShow = () => {
    if (window.innerWidth >= 1024) return 15; // Desktop: 3 rows of 6
    if (window.innerWidth >= 768) return 12;  // Tablet: 3 rows of 4
    return 12; // Mobile: 3 rows of 2
  };

  const getItemsPerLoad = () => {
    if (window.innerWidth >= 1024) return 10; // Desktop: 2 rows of 6
    if (window.innerWidth >= 768) return 8;   // Tablet: 2 rows of 4
    return 12; // Mobile: 3 rows of 2
  };

  useEffect(() => {
    getAllProduct();
    setItemsToShow(getInitialItemsToShow());
  }, []);

  // Filter for featured products
  const featuredProducts = allProduct.filter((product) => product.featuredProduct);
  const displayedProducts = showFeatured ? featuredProducts : allProduct;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newInitialItems = getInitialItemsToShow();
      // Only reset if we're showing less than the new initial amount
      if (itemsToShow < newInitialItems) {
        setItemsToShow(newInitialItems);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsToShow]);

  // Get current products to display
  const currentProducts = displayedProducts.slice(0, itemsToShow);
  const hasMoreProducts = itemsToShow < displayedProducts.length;

  // Reset items when switching between all/featured
  useEffect(() => {
    setItemsToShow(getInitialItemsToShow());
  }, [showFeatured]);

  // View more handler
  const handleViewMore = () => {
    const itemsPerLoad = getItemsPerLoad();
    setItemsToShow(prev => Math.min(prev + itemsPerLoad, displayedProducts.length));
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4">
        
        {/* Filter Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/50">
            <button
              onClick={() => setShowFeatured(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showFeatured 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Featured ({featuredProducts.length})
            </button>
            <button
              onClick={() => setShowFeatured(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !showFeatured 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              All Products ({allProduct.length})
            </button>
          </div>
        </div>

        {/* Products Masonry Grid */}
        <div className="mb-8">
          <Card products={currentProducts} addToCart={addToCart} />
        </div>

        {/* View More Button */}
        {hasMoreProducts && (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleViewMore}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">
                View More Products
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Products Counter */}
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
              Showing {currentProducts.length} of {displayedProducts.length} products
            </div>
          </div>
        )}

        {/* No More Products Message */}
        {!hasMoreProducts && displayedProducts.length > 0 && currentProducts.length === displayedProducts.length && (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
              Showing all {displayedProducts.length} products
            </div>
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">🎉 You've seen all the products!</p>
            </div>
          </div>
        )}

        {/* No Products Message */}
        {currentProducts.length === 0 && displayedProducts.length === 0 && (
          <div className="text-center text-gray-600 py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">
                {showFeatured 
                  ? 'No Featured Products' 
                  : 'No Products Available'
                }
              </h3>
              <p className="text-gray-500">
                {showFeatured 
                  ? 'Check back later for featured items' 
                  : 'Products will appear here once added'
                }
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {allProduct.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;