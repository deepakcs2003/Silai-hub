import React, { useState, useEffect } from 'react';
import { Home, Shirt, Scissors, Contact, User, Shield, ShoppingCart } from 'lucide-react';
import logo from '../Assist/logo.png';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: <Home />, link: '/' },
    { name: 'About Us', icon: <User />, link: '/about' },
    { name: 'Designs', icon: <Shirt />, link: '/gallery' },
    { name: 'Order Now', icon: <Scissors />, link: '/order/null/custom' },
    { name: 'Contact Us', icon: <Contact />, link: '/contact' },
  ];

  useEffect(() => {
    // Check user and cart items
    const loggedInUser = {
      name: localStorage.getItem('name'),
      profilePicture: localStorage.getItem('profilePicture'),
      role: localStorage.getItem('role'),
    };
    if (loggedInUser.name) {
      setUser(loggedInUser);
      setIsAdmin(loggedInUser.role === 'admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAdmin(false);
    window.location.reload();
  };

  const handleProfileClick = () => {
    if (!user) {
      navigate('/login-signup');
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-off-white text-deep-burgundy shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Guddi Silai Logo" className="h-10 w-auto" />
          <div className="text-2xl font-bold text-deep-burgundy">GuddiSilai</div>
        </div>
        </Link>
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="flex items-center space-x-2 text-deep-burgundy hover:text-gold transition"
              aria-label={item.name}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative flex items-center justify-center hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <div className="relative">
              <ShoppingCart 
                className="text-deep-burgundy hover:text-gold" 
                size={24} 
              />
            </div>
          </Link>

          {/* Conditional Admin Button */}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center space-x-2 text-deep-burgundy hover:text-gold transition"
            >
              <Shield size={16} />
              <span>Admin</span>
            </Link>
          )}

          {/* Conditional Login/Profile Display */}
          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}`}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-deep-burgundy">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login-signup" onClick={handleMenuItemClick}>
              <button className="bg-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon for Mobile */}
          <Link 
            to="/cart" 
            className="relative flex items-center justify-center hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <div className="relative">
              <ShoppingCart 
                className="text-deep-burgundy hover:text-gold" 
                size={24} 
              />
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                  rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>

          {/* Profile in mobile view */}
          <div className="" onClick={handleProfileClick}>
            {user ? (
              <img
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}`}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <button className="bg-gold text-white p-2 rounded-full hover:bg-opacity-90 transition">
                <User size={24} />
              </button>
            )}
          </div>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-deep-burgundy focus:outline-none text-2xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-deep-burgundy m-3 text-white shadow-lg rounded-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={handleMenuItemClick}
              className="block p-4 border-b border-gold flex items-center space-x-2 hover:bg-gold hover:text-deep-burgundy transition"
              aria-label={item.name}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Cart in Mobile Menu */}
          <Link
            to="/cart"
            onClick={handleMenuItemClick}
            className="block p-4 border-b border-gold flex items-center space-x-2 hover:bg-gold hover:text-deep-burgundy transition"
          >
            <ShoppingCart size={16} />
            <span>Cart {cartItemCount > 0 && `(${cartItemCount})`}</span>
          </Link>

          {/* Admin Button in Mobile */}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={handleMenuItemClick}
              className="block p-4 border-b border-gold flex items-center space-x-2 hover:bg-gold hover:text-deep-burgundy transition"
            >
              <Shield size={16} />
              <span>Admin</span>
            </Link>
          )}

          {/* Profile and Logout in mobile view */}
          {user ? (
            <div className="flex flex-col items-center p-4">
              <img
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}`}
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
              <span className="text-white mt-2">{user.name}</span>
              <button
                onClick={handleLogout}
                className="w-full bg-gold text-deep-burgundy p-4 rounded-b-lg hover:bg-opacity-90 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login-signup" onClick={handleMenuItemClick}>
              <button className="w-full bg-gold text-deep-burgundy p-4 rounded-b-lg hover:bg-opacity-90 transition">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};