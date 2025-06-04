import './App.css';
import { createContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Outlet } from 'react-router-dom';
import summaryApi from './Common';
import axios from 'axios';
import CartIcon from './Components/CartIcon';

export const AppContext = createContext({
  cartData: null,
  loading: false,
  error: null,
  fetchCartData: () => {},
});

function App() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allProduct, setAllProduct] = useState([]);

  // Function to fetch cart data
  const fetchCartData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in to view your cart');
      setLoading(false);
      return null;
    }

    try {
      setLoading(true);
      const response = await fetch(summaryApi.get_all_cart.url, {
        method: summaryApi.get_all_cart.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const updatedCartData = {
        ...data,
        cartItems: Array.isArray(data.cartItems) ? data.cartItems : [],
      };

      setCartData(updatedCartData);
      setLoading(false);
      return updatedCartData;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setError('Failed to load cart. Please try again.');
      setLoading(false);
      return null;
    }
  };

  // Function to fetch all products
  const getAllProduct = async () => {
    try {
      const response = await axios({
        url: summaryApi.gel_all_product.url,
        method: 'get',
      });
      setAllProduct(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const [allFeedback,setAllFeedback]=useState([])
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const response = await fetch(summaryApi.get_feedback.url,{
            method: summaryApi.get_feedback.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data = await response.json();
        setAllFeedback(data.feedback || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  // Fetch cart data and products on component mount
  useEffect(() => {
    fetchCartData();
    getAllProduct();
    fetchFeedback();
  }, []);
  return (
    <AppContext.Provider
      value={{
        cartData,
        setCartData,
        loading,
        setLoading,
        error,
        setError,
        allProduct,
        getAllProduct,
        fetchCartData,
        allFeedback,
        setAllFeedback,
        fetchFeedback,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <Header />
        <main className="flex-grow overflow-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;