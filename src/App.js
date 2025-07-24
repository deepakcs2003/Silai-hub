import './App.css';
import { createContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Outlet } from 'react-router-dom';
import summaryApi from './Common';
import axios from 'axios';
import ScrollToTop from './Components/scrollToTop'; //imported the scroll to top component
export const AppContext = createContext({
  cartData: null,
  loading: false,
  error: null,
  fetchCartData: () => {},
});

const CACHE_KEYS = {
  cart: 'app_cart_data',
  products: 'app_all_products',
  feedback: 'app_all_feedback',
};

function App() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);

  // Utility to load cached data
  const loadCache = (key) => {
    try {
      const cached = localStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };

  // Utility to save cached data
  const saveCache = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // fail silently if storage is full or disabled
    }
  };

  // Utility to sort products by latest date
  const sortProductsByLatestDate = (products) => {
    if (!Array.isArray(products)) return [];
    
    return [...products].sort((a, b) => {
      // Try different possible date fields
      const getDate = (product) => {
        // Common date field names in products
        const dateFields = ['createdAt', 'created_at', 'dateAdded', 'date_added', 'updatedAt', 'updated_at', 'timestamp'];
        
        for (const field of dateFields) {
          if (product[field]) {
            return new Date(product[field]);
          }
        }
        
        // If no date field found, return a very old date to put it at the end
        return new Date('1970-01-01');
      };
      
      const dateA = getDate(a);
      const dateB = getDate(b);
      
      // Sort in descending order (latest first)
      return dateB - dateA;
    });
  };

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
      saveCache(CACHE_KEYS.cart, updatedCartData);
      setLoading(false);
      return updatedCartData;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setError('Failed to load cart. Please try again.');
      setLoading(false);
      return null;
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios({
        url: summaryApi.gel_all_product.url,
        method: 'get',
      });
      
      // Sort products by latest date
      const sortedProducts = sortProductsByLatestDate(response.data);
      setAllProduct(sortedProducts);
      saveCache(CACHE_KEYS.products, sortedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.get_feedback.url, {
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
      saveCache(CACHE_KEYS.feedback, data.feedback || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load cache first, then fetch fresh data in background
  useEffect(() => {
    // Load cached cart
    const cachedCart = loadCache(CACHE_KEYS.cart);
    if (cachedCart) setCartData(cachedCart);

    // Load cached products and sort them
    const cachedProducts = loadCache(CACHE_KEYS.products);
    if (cachedProducts) {
      const sortedCachedProducts = sortProductsByLatestDate(cachedProducts);
      setAllProduct(sortedCachedProducts);
    }

    // Load cached feedback
    const cachedFeedback = loadCache(CACHE_KEYS.feedback);
    if (cachedFeedback) setAllFeedback(cachedFeedback);

    // Now fetch fresh data
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
        sortProductsByLatestDate, // Adding this to context in case other components need it
      }}
    >
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <Header />
        <main className="flex-grow overflow-hidden">
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;