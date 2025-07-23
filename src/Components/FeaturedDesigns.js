import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Card from './Card';

const AllProducts = () => {
  const { allProduct, getAllProduct, addToCart } = useContext(AppContext);
  const [showFeatured, setShowFeatured] = useState(true);

  useEffect(() => {
    getAllProduct();
  }, []);

  // Filter for featured products
  const featuredProducts = allProduct.filter((product) => product.featuredProduct);
  const displayedProducts = showFeatured ? featuredProducts : allProduct;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
        
        {/* Filter Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/50">
            <button
              onClick={() => setShowFeatured(true)}
              className={`px-4 py-2 rounded-full text-fs-7 font-heading transition-all ${
                showFeatured 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Featured ({featuredProducts.length})
            </button>
            <button
              onClick={() => setShowFeatured(false)}
              className={`px-4 py-2 rounded-full text-fs-7 font-heading transition-all ${
                !showFeatured 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              All Products ({allProduct.length})
            </button>
          </div>
        </div>

        {/* Products Grid Container with proper spacing */}
        <div className="mb-8">
          <Card products={displayedProducts} addToCart={addToCart} />
        </div>

        {/* Products Counter */}
        {displayedProducts.length > 0 && (
          <div className="flex justify-center mt-8 pt-4">
            <div className="text-fs-7 text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm font-body">
              Showing all {displayedProducts.length} products
            </div>
          </div>
        )}

        {/* No Products Message */}
        {displayedProducts.length === 0 && allProduct.length > 0 && (
          <div className="text-center text-gray-600 py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-fs-3 font-heading mb-2">
                No Featured Products
              </h3>
              <p className="text-fs-6 text-gray-500">
                Check back later for featured items
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {allProduct.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-fs-6">Loading products...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;