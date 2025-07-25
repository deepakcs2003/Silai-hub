import React, { useState, useEffect, lazy, Suspense } from 'react';
import summaryApi from '../../Common';
import { useNavigate } from 'react-router-dom';

const IconComponents = lazy(() => import('lucide-react').then(mod => ({
  default: {
    Edit: mod.Edit,
    Trash2: mod.Trash2,
    Eye: mod.Eye
  }
})));

const ViewProduct = () => {
  const [responseData, setResponseData] = useState([]);
  const [token, setToken] = useState('');

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('No token found in localStorage');
        return;
      }
      setToken(storedToken);

      const response = await axios.get(summaryApi.get_product.url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setResponseData(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };
  const navigate=useNavigate();

  const deleteProduct = async (productId) => {
    try {
      // Show confirmation popup
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      );
      if (!confirmDelete) return;

      // Retrieve the token from localStorage
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('No token found in localStorage');
        return;
      }

      // Make the DELETE request using fetch
      const response = await fetch(`${summaryApi.delete_product.url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ productId }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      // Update the state to remove the deleted product
      setResponseData((prevData) =>
        prevData.filter((product) => product._id !== productId)
      );
      alert('Product deleted successfully.');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete the product. Please try again.');
    }
  };

  const productDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const updateProduct = (productId) => {
    navigate(`/product/${productId}/update`);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
        Our Product Catalog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {responseData.map((product) => (
          <div
            key={product._id}
            className="relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-blue-300 relative">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product.images[0]?.url || 'https://via.placeholder.com/350'}
                  alt={product.productName}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description || 'No description available.'}
                </p>

                {/* Price Section */}
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">tailor Price</span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{product.tailorPrice || 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Ready-made Price</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{product.readyMadePrice || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    className="flex-1 flex items-center justify-center bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition"
                    onClick={() => productDetails(product._id)}
                  >
                    <Suspense fallback={<div className="w-4 h-4"/>}>
                      <IconComponents.Eye size={18} className="mr-2" />
                    </Suspense>
                    View
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 transition"
                    onClick={() => updateProduct(product._id)}
                  >
                    <Suspense fallback={<div className="w-4 h-4"/>}>
                      <IconComponents.Edit size={18} className="mr-2" />
                    </Suspense>
                    Edit
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Suspense fallback={<div className="w-4 h-4"/>}>
                      <IconComponents.Trash2 size={18} className="mr-2" />
                    </Suspense>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
