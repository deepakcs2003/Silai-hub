import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";
import CardSkeleton from "./Skeleton/CardSkeleton";
import { ShoppingCart, Star } from "lucide-react"; // ✅ Add this import

const Card = ({ products }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const getSmartPrice = (product) => {
    const readyPrice = calculateDiscountedPrice(product.readyMadePrice, product.discount);
    const tailorPrice = calculateDiscountedPrice(product.tailorPrice, product.discount);
    const minPrice = Math.min(readyPrice, tailorPrice);
    const maxPrice = Math.max(readyPrice, tailorPrice);
    return minPrice === maxPrice
      ? `₹${minPrice.toFixed(0)}`
      : `₹${minPrice.toFixed(0)} - ₹${maxPrice.toFixed(0)}`;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={
                    product.stitchedImage ||
                    product.images?.[0]?.url ||
                    `https://picsum.photos/300/300?random=${index}`
                  }
                  alt={product.productName || "Product Image"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="font-heading text-fs-6 sm:text-fs-5 text-gray-800 line-clamp-2 leading-tight flex-1 pr-2">
                    {product.productName || `Premium Product ${index + 1}`}
                  </h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <Star size={10} fill="currentColor" className="mr-0.5 sm:mr-1" />
                    <span className="font-body text-fs-7">
                      4.{Math.floor(Math.random() * 5) + 5}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-body text-fs-7 text-gray-600 bg-gray-100 px-2 py-1 rounded-full truncate max-w-[60%]">
                      {product.category || "Fashion"}
                    </p>
                    {product.featuredProduct && (
                      <span className="font-heading text-fs-7 bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm px-1 sm:px-4 py-1 sm:py-2 rounded-full shadow-md border border-white/50">
                    <span className="font-heading text-fs-6 sm:text-fs-5 font-bold text-gray-800 flex items-center justify-center">
                      {getSmartPrice(product)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-auto">
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
                      text-fs-6 sm:text-fs-5
                      font-heading
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
                      text-fs-6 sm:text-fs-5
                      font-heading
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

      {popupVisible && selectedProduct && (
        <PopupModal product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Card;
