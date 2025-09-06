import { createContext, useContext } from 'react';
import api from '../services/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('/cart/count');
                setCartCount(response.data.count);
            } catch (error) {
                console.error('Failed to fetch cart count:', error);
                setCartCount(0); // Reset on error
            }
        } else {
            setCartCount(0); // Reset if no token
        }
    };

    // Fetch initial count on component mount
    useEffect(() => {
        fetchCartCount();
    }, []);

    // This effect listens for login/logout events across tabs
    useEffect(() => {
        const handleStorageChange = () => {
            fetchCartCount();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const value = { cartCount, fetchCartCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartCount, fetchCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    fetchCartCount(); // Reset cart count to 0 on logout
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          E-Shop
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-purple-600">All Products</Link>
          <Link to="/categories" className="text-gray-600 hover:text-purple-600">Categories</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-purple-600"><Search size={20} /></button>
          
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-600 hover:text-purple-600">
                <User size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserCircle size={16} className="mr-2" /> Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-purple-600">
              <User size={20} />
            </Link>
          )}

          <Link to="/cart" className="text-gray-600 hover:text-purple-600 relative">
            <ShoppingBag size={20} />
            {isLoggedIn && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;