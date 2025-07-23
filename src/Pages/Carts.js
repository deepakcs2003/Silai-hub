import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import summaryApi from '../Common';
import CommonContactCart from '../Components/CommonContactCart';
import CartItemSkeleton from '../Components/Skeleton/CartItemSkeleton';
import { Heart, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
 
const CartMessage = ({ type }) => {
  const config = {
    empty: { bg: '#d6e6ff', text: '#1e40af', msg: 'Ready to transform your space? Add some items to your cart!' },
    success: { bg: '#d7f9f8', text: '#047857', msg: 'Cart updated successfully!' },
    error: { bg: '#fbe0e0', text: '#dc2626', msg: 'Oops! Something went wrong with your cart.' }
  };

  const { bg, text, msg } = config[type];
  return (
    <div className="p-4 font-body rounded-2xl text-center mb-6 font-semibold shadow-lg" style={{ backgroundColor: bg, color: text }}>
      {msg}
    </div>
  );
};

const OrderButton = ({ item }) => {
  const navigate = useNavigate();
  const handleOrderNow = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/order/${item.productId}/${item.productType}`);
  };

  return (
    <button
      onClick={handleOrderNow}
      className="mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-2xl font-body font-semibold hover:bg-purple-600 transition-all duration-300 hover:scale-105 shadow-lg"
    >
      {item.productType === 'tailor' ? 'Add Measurement' : 'Order Now'}
    </button>
  );
};

const CartItemCard = ({ item, onUpdateCart, onDeleteItem }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/single_product_details?productId=${item.productId}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsLiked(!isLiked);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onDeleteItem(item.productId, item.productType);
  };

  const handleQuantityChange = (e, action) => {
    e.stopPropagation(); // Prevent event bubbling
    onUpdateCart(item.productId, item.productType, action);
  };

  
  return (
    <div className="bg-white font-body rounded-3xl p-6 mb-6 shadow-xl border-2 border-opacity-20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300" style={{ borderColor: '#e5d4ef' }}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image section - clickable */}
        <div className="relative lg:w-48" onClick={handleCardClick}>
          <img
            src={item.image}
            alt={item.productName}
            className="w-full lg:w-48 h-48 object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-lg"
          />
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full text-fs-6 font-body shadow-lg transition-colors"
            style={{ color: isLiked ? '#dc2626' : '#6b7280' }}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          {item.discount > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-green-600 text-white rounded-fulltext-fs-6 font-body text-sm font-bold">
              {item.discount}% OFF
            </div>
          )}
        </div>

        <div className="flex-grow font-body">
          <div className="flex justify-between items-start mb-4">
            {/* Title section - clickable */}
            <div onClick={handleCardClick} className="cursor-pointer flex-grow">
              <h3 className="text-2xl text-fs-4 font-body font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{item.ProductName}</h3>
              <span className="inline-block text-fs-4 font-body  px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: item.productType === 'tailor' ? '#e5d4ef' : '#d7f9f8',
                  color: item.productType === 'tailor' ? '#8b5cf6' : '#047857'
                }}>
                {item.productType === 'tailor' ? 'Custom Tailoring' : 'Ready Made'}
              </span>
            </div>
            <button 
              onClick={handleDeleteClick}
              className="text-fs-6 font-body p-2 hover:bg-red-50 rounded-full text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Price details section - clickable */}
          <div className=" font-body rounded-2xl p-4 mb-4 cursor-pointer hover:bg-opacity-80 transition-colors" 
               style={{ backgroundColor: '#ffffea' }}
               onClick={handleCardClick}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Category:</span> <span className="font-semibold">{item.category || 'N/A'}</span></div>
              <div><span className="text-gray-600">Price:</span> <span className="font-semibold">₹{item.price.toFixed(2)}</span></div>
              {item.discount > 0 && (
                <div><span className="text-gray-600">Discount:</span> <span className="font-semibold text-green-600">{item.discount}%</span></div>
              )}
              <div><span className="text-gray-600">Total:</span> <span className="font-bold text-lg">₹{item.totalPrice.toFixed(2)}</span></div>
            </div>
          </div>

          {/* Quantity controls - not clickable for navigation */}
          <div className=" font-body flex items-center gap-4 mb-4">
            <span className="text-lg font-semibold">Qty:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleQuantityChange(e, 'decrease')}
                className=" text-fs-6 font-body w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold px-4 py-2 rounded-xl bg-gray-100 min-w-[3rem] text-center">{item.quantity}</span>
              <button
                onClick={(e) => handleQuantityChange(e, 'increase')}
                className="w-12 h-12 text-fs-6 font-body bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          {/* Order button - separate action */}
          <OrderButton item={item} />
        </div>
      </div>
    </div>
  );
};

const Carts = () => {
  const { cartData, loading, error, fetchCartData } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const updateCart = async (productId, productType, action) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('error');
      return;
    }

    try {
      const item = cartData.cartItems.find(
        (cartItem) => cartItem.productId === productId && cartItem.productType === productType
      );

      if (!item) {
        setMessage('error');
        return;
      }

      if (action === 'decrease' && item.quantity === 1) {
        await deleteCartItem(productId, productType);
        return;
      }

      const response = await fetch(summaryApi.updateCartQuantity.url, {
        method: summaryApi.updateCartQuantity.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          productId,
          productType,
          action,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await fetchCartData();
      setMessage('success');
    } catch (error) {
      console.error('Error updating cart:', error);
      setMessage('error');
    }
  };

  const deleteCartItem = async (productId, productType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('error');
      return;
    }

    try {
      const response = await fetch(summaryApi.delete_add_to_cart.url, {
        method: summaryApi.delete_add_to_cart.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, productType }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await fetchCartData();
      setMessage('success');
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      setMessage('error');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#fbe0e0' }}>
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => fetchCartData()}
            className="bg-blue-500 text-fs-6 font-body text-white px-6 py-2 rounded-2xl hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cartData || !cartData.cartItems) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#d6e6ff' }}>
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No cart data available</p>
          <button
            onClick={() => fetchCartData()}
            className="bg-blue-500 text-fs-6 font-body text-white px-6 py-2 rounded-2xl hover:bg-blue-600 transition-colors"
          >
            Refresh Cart
          </button>
        </div>
      </div>
    );
  }

  const readymadeItems = cartData.cartItems.filter(item => item.productType === 'readymade');
  const tailorItems = cartData.cartItems.filter(item => item.productType === 'tailor');

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        <CommonContactCart />
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">My Shopping Cart</h1>

        {message && <CartMessage type={message} />}

        {cartData.cartItems.length === 0 ? (
          <div className="text-center py-16 rounded-3xl shadow-lg" style={{ backgroundColor: '#d6e6ff' }}>
            <ShoppingBag size={80} className="mx-auto mb-6 text-gray-500" />
            <p className="text-xl text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {readymadeItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-green-700">Ready Made Items</h2>
                  {readymadeItems.map(item => (
                    <CartItemCard
                      key={item.productId}
                      item={item}
                      onUpdateCart={updateCart}
                      onDeleteItem={deleteCartItem}
                    />
                  ))}
                </div>
              )}

              {tailorItems.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-purple-700">Tailor Items</h2>
                  {tailorItems.map(item => (
                    <CartItemCard
                      key={item.productId}
                      item={item}
                      onUpdateCart={updateCart}
                      onDeleteItem={deleteCartItem}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-3xl p-8 shadow-xl" style={{ backgroundColor: '#fff0d4' }}>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cart Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span>Total Cart Value</span>
                    <span className="font-semibold">₹{cartData.totalCartValue?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      {cartData.discount ? `-₹${cartData.discount.toFixed(2)}` : '₹0.00'}
                    </span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Final Total</span>
                    <span className="text-blue-700">₹{cartData.finalTotal?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;