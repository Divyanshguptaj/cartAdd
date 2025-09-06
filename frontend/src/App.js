import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductCategory from './pages/ProductCategory';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider> {/* The provider wraps all components that need cart data */}
        <div className="flex flex-col min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products/category/:categoryName" element={<ProductCategory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider> {/* This closing tag was missing */}
    </Router>
  );
}

export default App;