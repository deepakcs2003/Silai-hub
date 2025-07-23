import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";
import CardSkeleton from "./Skeleton/CardSkeleton";

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

              {/* Details */}
              <div className="flex flex-col justify-between flex-1 p-4">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                  {product.productName || `Design ${index + 1}`}
                </h3>

                <div className="text-base font-bold text-gray-900 mb-2">
                  {getSmartPrice(product)}
                </div>

                <button
                  onClick={(event) => handleOrderClick(product, event)}
                  className="mt-auto bg-pink-600 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-pink-700 transition w-full"
                >
                  View Design
                </button>
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
