import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchCartCount } = useCart();

    const fetchCartItems = async () => {
        try {
            const response = await api.get('/cart');
            // Ensure we have valid product data for each item
            const validCart = response.data.cart;
            if (validCart && validCart.items) {
                // Filter out any items with null/undefined products
                validCart.items = validCart.items.filter(item => item.product != null);
            }
            setCart(validCart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await api.delete(`/cart/remove/${itemId}`);
            await fetchCartItems(); // Refresh cart data
            fetchCartCount(); // Update cart count in navbar
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove item');
        }
    };

    const calculateSubtotal = () => {
        if (!cart?.items?.length) return 0;
        return cart.items.reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="bg-purple-600 text-white font-bold py-3 px-6 rounded hover:bg-purple-700 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cart.items.map(item => (
                        item.product && (  // Only render if product exists
                            <div key={item._id} className="flex items-center border-b py-4">
                                <img 
                                    src={item.product.imageUrl || 'https://via.placeholder.com/150'} 
                                    alt={item.product.name || 'Product'} 
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-purple-600">${item.product.price * item.quantity}</p>
                                    <button 
                                        onClick={() => handleRemove(item.product._id)}
                                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded mt-4 hover:bg-purple-700 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;