import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PopupModal from './PopupModal';
import CardSkeleton from './Skeleton/CardSkeleton';

const Card = ({ products }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const navigate = useNavigate();

  const handleOrderClick = (product, event) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProduct(null);
  };

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice * (1 - (discount || 0) / 100);
  };

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div
              className="
        container 
        mx-auto 
        px-4 
        py-8 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
      "
            >
              {/* Render 4 Skeleton Cards */}
              {Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className={`
                relative 
                bg-white 
                rounded-2xl 
                shadow-lg 
                overflow-hidden 
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-2 
                hover:shadow-2xl 
                ${hoveredProduct === product._id ? 'scale-105' : 'scale-100'}
                border-2 border-transparent 
                hover:border-purple-200
              `}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/single_product_details?productId=${product._id}`)}
            >
              {/* Product Image Section */}
              <div className="relative h-80 overflow-hidden group">
                <img
                  src={product.images?.[0]?.url || ''}
                  alt={product.productName || 'Product Image'}
                  className="
                    w-full 
                    h-full
                    object-fill
                    group-hover:scale-110 
                    transition-transform 
                    duration-300
                  "
                />

                {/* Overlay Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/80 p-2.5 rounded-full hover:bg-white shadow-md">
                    <Heart className="text-red-500" size={20} />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800 truncate pr-2">
                    {product.productName || 'Product Name'}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} fill="currentColor" className="mr-1" />
                    <span className="text-sm font-semibold">4.5</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 italic truncate">
                  {product.category || 'Category'}
                </p>

                <div className="space-y-2">
                  {/* Pricing Section */}
                  <div className="flex  justify-between items-center">
                    <div >
                      <span className="text-gray-600 text-sm">ReadyMade</span>
                      <div className="flex items-center">
                        <span className="text-xs text-red-500 line-through mr-2">
                          ₹{(product.readyMadePrice || 0).toFixed(2)}
                        </span>
                        <span className="text-base font-bold text-green-600">
                          ₹{calculateDiscountedPrice(product.readyMadePrice, product.discount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Tailor Made</span>
                      <div className="flex items-center">
                        <span className="text-xs text-red-500 line-through mr-2">
                          ₹{(product.tailorPrice || 0).toFixed(2)}
                        </span>
                        <span className="text-base font-bold text-green-600">
                          ₹{calculateDiscountedPrice(product.tailorPrice, product.discount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customization and Actions */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-green-600">
                      <ShoppingCart className="mr-2" size={18} />
                      {product.customizationAvailable ? 'Customizable' : 'Standard'}
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={(event) => handleOrderClick(product, event)}
                      className="
                        flex-1 
                        bg-purple-600 
                        text-white 
                        py-2.5 
                        rounded-lg 
                        hover:bg-purple-700 
                        transition-colors 
                        flex 
                        items-center 
                        justify-center
                        group
                      "
                    >
                      <ShoppingCart
                        className="mr-2 group-hover:animate-bounce"
                        size={18}
                      />
                      Order
                    </button>
                    <button
                      onClick={(event) => handleOrderClick(product, event)}
                      className="
                        flex-1 
                        bg-gray-100 
                        text-gray-800 
                        py-2.5 
                        rounded-lg 
                        hover:bg-gray-200 
                        transition-colors 
                        flex 
                        items-center 
                        justify-center
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
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