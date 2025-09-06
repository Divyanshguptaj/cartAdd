import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

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
                setCartCount(0);
            }
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();
        window.addEventListener('storage', fetchCartCount);
        return () => {
            window.removeEventListener('storage', fetchCartCount);
        };
    }, []);

    const value = { cartCount, fetchCartCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};