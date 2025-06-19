import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingCart, Star, Tag, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PopupModal from './PopupModal';
import CardSkeleton from './Skeleton/CardSkeleton';

const Card = ({ products }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageHeights, setImageHeights] = useState({});
  const containerRef = useRef(null);

  const navigate = useNavigate();

  // Beautiful pastel colors for card backgrounds
  const cardColors = [
    '#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef'
  ];

  // Get responsive image heights
  const getDynamicImageHeight = (index) => {
    const width = window.innerWidth;
    
    if (width >= 1024) {
      // Desktop: varied heights for masonry effect
      const desktopHeights = [280, 320, 240, 300, 260, 340, 220, 360, 290, 250];
      return desktopHeights[index % desktopHeights.length];
    } else if (width >= 768) {
      // Tablet: medium varied heights
      const tabletHeights = [240, 280, 220, 260, 250, 300];
      return tabletHeights[index % tabletHeights.length];
    } else {
      // Mobile: smaller varied heights
      const mobileHeights = [200, 240, 180, 220, 210, 250];
      return mobileHeights[index % mobileHeights.length];
    }
  };

  // Initialize masonry layout with better responsive handling
  useEffect(() => {
    const initMasonry = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const items = container.children;
      
      // Responsive gap and columns
      const getResponsiveSettings = () => {
        const width = window.innerWidth;
        if (width >= 1024) return { columns: 5, gap: 16 }; // Desktop: 6 columns, 16px gap
        if (width >= 768) return { columns: 3, gap: 12 };  // Tablet: 4 columns, 12px gap
        return { columns: 2, gap: 8 }; // Mobile: 2 columns, 8px gap
      };

      const { columns, gap } = getResponsiveSettings();
      const columnHeights = new Array(columns).fill(0);
      const containerWidth = container.offsetWidth;
      const itemWidth = (containerWidth - (gap * (columns - 1))) / columns;

      // Reset container styles
      container.style.position = 'relative';
      
      Array.from(items).forEach((item, index) => {
        // Ensure item has loaded content before positioning
        if (item.offsetHeight === 0) {
          setTimeout(() => initMasonry(), 50);
          return;
        }

        // Find column with minimum height
        const minHeight = Math.min(...columnHeights);
        const minIndex = columnHeights.indexOf(minHeight);

        // Position item
        item.style.position = 'absolute';
        item.style.width = `${itemWidth}px`;
        item.style.left = `${minIndex * (itemWidth + gap)}px`;
        item.style.top = `${minHeight}px`;
        item.style.transition = 'all 0.3s ease';

        // Update column height
        columnHeights[minIndex] += item.offsetHeight + gap;
      });

      // Set container height
      const maxHeight = Math.max(...columnHeights);
      container.style.height = `${maxHeight}px`;
    };

    // Multiple initialization attempts for better reliability
    const timers = [
      setTimeout(initMasonry, 50),
      setTimeout(initMasonry, 200),
      setTimeout(initMasonry, 500)
    ];
    
    const handleResize = () => {
      timers.forEach(clearTimeout);
      setTimeout(initMasonry, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [products]);

  const handleOrderClick = (product, event) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProduct(null);
  };

  const getCardColor = (index) => {
    return cardColors[index % cardColors.length];
  };

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice * (1 - (discount || 0) / 100);
  };

  const getSmartPrice = (product) => {
    const readyPrice = calculateDiscountedPrice(product.readyMadePrice, product.discount);
    const tailorPrice = calculateDiscountedPrice(product.tailorPrice, product.discount);
    const minPrice = Math.min(readyPrice, tailorPrice);
    const maxPrice = Math.max(readyPrice, tailorPrice);

    if (minPrice === maxPrice) {
      return `₹${minPrice.toFixed(0)}`;
    }
    return `₹${minPrice.toFixed(0)} - ₹${maxPrice.toFixed(0)}`;
  };

  const handleImageLoad = (productId, height) => {
    setImageHeights(prev => ({
      ...prev,
      [productId]: height
    }));
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="container mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="relative w-full"
          style={{ minHeight: '400px' }}
        >
          {products.map((product, index) => (
            <div
              key={product._id}
              className={`
                rounded-lg sm:rounded-xl 
                shadow-md 
                overflow-hidden 
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-1 
                hover:shadow-xl 
                ${hoveredProduct === product._id ? 'scale-[1.02] sm:scale-105 z-10' : 'scale-100'}
                border border-white/50
                cursor-pointer
                group
                mb-2 sm:mb-4
              `}
              style={{ 
                backgroundColor: getCardColor(index),
                position: 'relative'
              }}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/single_product_details?productId=${product._id}`)}
            >
              {/* Product Image Section - Responsive Dynamic Height */}
              <div 
                className="relative overflow-hidden"
                style={{ height: `${getDynamicImageHeight(index)}px` }}
              >
                <img
                  src={product.images?.[0]?.url || `https://picsum.photos/300/${getDynamicImageHeight(index)}?random=${index}`}
                  alt={product.productName || 'Product Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onLoad={(e) => handleImageLoad(product._id, e.target.offsetHeight)}
                  loading="lazy"
                />

                {/* Discount Badge - Responsive */}
                {product.discount > 0 && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg z-10">
                    <span className="text-xs font-bold">-{product.discount}%</span>
                  </div>
                )}

                {/* Heart Button - Responsive */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <button className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white shadow-lg border border-white/50">
                    <Heart className="text-red-500 hover:fill-current transition-all" size={14} />
                  </button>
                </div>

                {/* Customization Badge - Responsive */}
                {product.customizationAvailable && (
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-green-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg">
                    <Zap size={12} />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Details - Responsive */}
              <div className="p-3 sm:p-4">
                {/* Product Name and Rating - Responsive */}
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight flex-1 pr-2">
                    {product.productName || `Premium Product ${index + 1}`}
                  </h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <Star size={10} fill="currentColor" className="mr-0.5 sm:mr-1" />
                    <span className="text-xs font-medium">4.{Math.floor(Math.random() * 5) + 5}</span>
                  </div>
                </div>

                {/* Category and Price Section - Responsive */}
                <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {/* Category and Featured Badge */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full truncate max-w-[60%]">
                      {product.category || 'Fashion'}
                    </p>
                    {/* Featured Badge */}
                    {product.featuredProduct && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Price Badge - Responsive */}
                  <div className="bg-white/95 backdrop-blur-sm px-1 sm:px-4 py-1 sm:py-2 rounded-full shadow-md border border-white/50">
                    <span className="text-xs sm:text-sm font-bold text-gray-800 flex items-center justify-center">
                      {getSmartPrice(product)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex space-x-2">
                  <button
                    onClick={(event) => handleOrderClick(product, event)}
                    className="
                      flex-1 
                      bg-gradient-to-r from-gray-800 to-gray-900
                      text-white 
                      py-2 sm:py-2.5 
                      px-2 sm:px-3
                      rounded-lg 
                      hover:from-gray-900 hover:to-black
                      transition-all duration-200
                      flex 
                      items-center 
                      justify-center
                      text-xs sm:text-sm
                      font-medium
                      group/btn
                      shadow-md
                      hover:shadow-lg
                    "
                  >
                    <ShoppingCart
                      className="mr-1 sm:mr-2 group-hover/btn:animate-bounce"
                      size={12}
                    />
                    <span className="hidden xs:inline">Order Now</span>
                    <span className="xs:hidden">Order</span>
                  </button>
                  <button
                    onClick={(event) => handleOrderClick(product, event)}
                    className="
                      bg-white/90 
                      backdrop-blur-sm
                      text-gray-800 
                      py-2 sm:py-2.5 
                      px-2 sm:px-3
                      rounded-lg 
                      hover:bg-white 
                      transition-all duration-200
                      border border-gray-200
                      text-xs sm:text-sm
                      font-medium
                      shadow-md
                      hover:shadow-lg
                      hover:border-gray-300
                    "
                  >
                    Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {popupVisible && selectedProduct && (
        <PopupModal product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Card;