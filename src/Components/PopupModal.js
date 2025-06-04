import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Corrected import
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify
import summaryApi from '../Common';

const PopupModal = ({ product, onClose }) => {
  const [cartData, setCartData] = useState({
    userId: localStorage.getItem("userId") || "",
    productId: product._id,
    quantity: 1,
    productType: "",
    action: "add"
  });

  const navigate = useNavigate();

  // Add to cart handler
  const handleAddToCart = async (type) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      toast.error('Please login first!'); // Show error toast if no token
      navigate('/login'); // Redirect to the login page if no token
      return;
    }

    // Update cart data with the selected type
    const updatedCartData = {
      ...cartData,
      productType: type.toLowerCase(),
    };


    try {
      // Send cart data to backend using fetch with token in the headers
      const response = await fetch(summaryApi.cart.url, {
        method: summaryApi.cart.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Sending token in Authorization header
        },
        body: JSON.stringify(updatedCartData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
      const data = await response.json();
      localStorage.setItem("items", data.cart.length);
      
      // Show success toast
      toast.success(`${type} option for ${product.productName} added to cart!`);
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {product.productName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-4">Choose your preferred option:</p>
        <div className="space-y-4">
          <button
            onClick={() => handleAddToCart('readymade')}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" size={20} />
            Readymade
          </button>
          <button
            onClick={() => handleAddToCart('tailor')}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
          >
            Tailor Made
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
