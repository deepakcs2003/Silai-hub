import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Card from './Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AllProducts = () => {
  const { allProduct, getAllProduct, addToCart } = useContext(AppContext);
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    getAllProduct();
  }, []);

  // Filter for featured products
  const featuredProducts = allProduct.filter((product) => product.featuredProduct);
  const displayedProducts = showFeatured ? featuredProducts : allProduct;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage(prevPage => 
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const prevPage = () => {
    setCurrentPage(prevPage => 
      prevPage > 1 ? prevPage - 1 : prevPage
    );
  };

  // Reset to first page when switching between all/featured
  useEffect(() => {
    setCurrentPage(1);
  }, [showFeatured]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Products Grid */}
        <Card products={currentProducts} addToCart={addToCart} />

        {/* Pagination Controls */}
        {displayedProducts.length > productsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`
                p-2 rounded-full 
                ${currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                }
              `}
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`
                p-2 rounded-full 
                ${currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                }
              `}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* No Products Message */}
        {currentProducts.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-2xl">
              {showFeatured 
                ? 'No featured products available' 
                : 'No products found'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;