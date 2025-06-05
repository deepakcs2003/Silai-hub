import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Card from './Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AllProducts = () => {
  const { allProduct, getAllProduct, addToCart } = useContext(AppContext);
  const [showFeatured, setShowFeatured] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Responsive products per page
  const getProductsPerPage = () => {
    if (window.innerWidth >= 1024) return 12; // Desktop: 2 rows of 6
    if (window.innerWidth >= 768) return 8;   // Tablet: 2 rows of 4
    return 6; // Mobile: 3 rows of 2
  };

  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  useEffect(() => {
    getAllProduct();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = getProductsPerPage();
      setProductsPerPage(newProductsPerPage);
      // Adjust current page if necessary
      const newTotalPages = Math.ceil(displayedProducts.length / newProductsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage(prevPage => {
      const newPage = prevPage < totalPages ? prevPage + 1 : prevPage;
      if (newPage !== prevPage) {
        scrollToTop();
      }
      return newPage;
    });
  };

  const prevPage = () => {
    setCurrentPage(prevPage => {
      const newPage = prevPage > 1 ? prevPage - 1 : prevPage;
      if (newPage !== prevPage) {
        scrollToTop();
      }
      return newPage;
    });
  };

  // Reset to first page when switching between all/featured
  useEffect(() => {
    setCurrentPage(1);
    scrollToTop();
  }, [showFeatured]);

  // Go to specific page
  const goToPage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className=" min-h-screen" style={{
      // background: 'linear-gradient(135deg, #d6e6ff 0%, #d7f9f8 20%, #ffffea 40%, #fff0d4 60%, #fbe0e0 80%, #e5d4ef 100%)'
    }}>
      <div className="w-full max-w-7xl mx-auto px-2  sm:px-4 py-4">
        
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

        {/* Products Grid */}
        <div className="mb-1">
          <Card products={currentProducts} addToCart={addToCart} />
        </div>

        {/* Enhanced Pagination Controls */}
        {displayedProducts.length > productsPerPage && (
          <div className="flex flex-col items-center space-y-4">
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`
                  p-2 rounded-lg transition-all
                  ${currentPage === 1 
                    ? 'bg-gray-200/80 text-gray-400 cursor-not-allowed' 
                    : 'bg-white/90 text-purple-600 hover:bg-purple-50 shadow-md border border-white/50'
                  }
                `}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 py-1 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(page)}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${currentPage === page 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                            : 'bg-white/90 text-gray-700 hover:bg-purple-50 shadow-sm border border-white/50'
                          }
                        `}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`
                  p-2 rounded-lg transition-all
                  ${currentPage === totalPages 
                    ? 'bg-gray-200/80 text-gray-400 cursor-not-allowed' 
                    : 'bg-white/90 text-purple-600 hover:bg-purple-50 shadow-md border border-white/50'
                  }
                `}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Page Information */}
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, displayedProducts.length)} of {displayedProducts.length} products
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