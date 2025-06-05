import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Tag, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PopupModal from './PopupModal';
import CardSkeleton from './Skeleton/CardSkeleton';

const Card = ({ products }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const navigate = useNavigate();

  // Beautiful pastel colors for card backgrounds
  const cardColors = [
    '#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef'
  ];

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

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="container mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product._id}
              className={`
                relative 
                rounded-xl 
                shadow-md 
                overflow-hidden 
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-1 
                hover:shadow-lg 
                ${hoveredProduct === product._id ? 'scale-105' : 'scale-100'}
                border border-white/50
                cursor-pointer
                group
              `}
              style={{ backgroundColor: getCardColor(index) }}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/single_product_details?productId=${product._id}`)}
            >
              {/* Product Image Section */}
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                  src={product.images?.[0]?.url || ''}
                  alt={product.productName || 'Product Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />



                {/* Discount Badge - Top Right */}
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full shadow-md">
                    <span className="text-xs font-bold">-{product.discount}%</span>
                  </div>
                )}

                {/* Heart Button - Appears on Hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.discount === 0 && (
                    <button className="bg-white/90 p-1.5 rounded-full hover:bg-white shadow-md ml-2">
                      <Heart className="text-red-500" size={14} />
                    </button>
                  )}
                </div>

                {/* Customization Badge - Bottom Right Corner */}
                {product.customizationAvailable && (
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-md">
                    <Zap size={12} />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-3">
                {/* Product Name and Rating */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight flex-1 pr-2">
                    {product.productName || 'Product Name'}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} fill="currentColor" className="mr-0.5" />
                    <span className="text-xs font-medium">4.5</span>
                  </div>
                </div>

                {/* Category */}
                {/* Category and Price Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
                  {/* Category */}
                  <p className="text-xs text-gray-600 truncate">
                    {product.category || 'Category'}
                  </p>

                  {/* Price Badge */}
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md w-fit">
                    <span className="text-xs font-bold text-gray-800 flex items-center">
                      <Tag size={12} className="mr-1" />
                      {getSmartPrice(product)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(event) => handleOrderClick(product, event)}
                    className="
                      flex-1 
                      bg-gray-800 
                      text-white 
                      py-1.5 
                      px-2
                      rounded-lg 
                      hover:bg-gray-900 
                      transition-colors 
                      flex 
                      items-center 
                      justify-center
                      text-xs
                      font-medium
                      group/btn
                    "
                  >
                    <ShoppingCart
                      className="mr-1 group-hover/btn:animate-bounce"
                      size={12}
                    />
                    Order
                  </button>
                  <button
                    onClick={(event) => handleOrderClick(product, event)}
                    className="
                      bg-white/80 
                      text-gray-800 
                      py-1.5 
                      px-2
                      rounded-lg 
                      hover:bg-white 
                      transition-colors 
                      border border-gray-200
                      text-xs
                      font-medium
                    "
                  >
                    Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup Modal */}
      {popupVisible && selectedProduct && (
        <PopupModal product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Card;