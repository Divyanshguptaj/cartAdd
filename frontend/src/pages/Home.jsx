import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the api service
import toast from 'react-hot-toast'; // Import toast for notifications

const Home = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/items'); // Fetch from the new endpoint
                // Let's just show the first 3 as "featured"
                setFeaturedProducts(response.data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch products:", error);
                toast.error("Could not load featured products.");
            }
        };
        fetchProducts();
    }, []); // Empty dependency array means this runs once on mount

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to add items to your cart.');
            navigate('/login');
            return;
        }

        const loadingToast = toast.loading('Adding to cart...');
        try {
            // The productId is now the correct `_id` from the database
            await api.post('/cart/add', { productId, quantity: 1 });
            toast.dismiss(loadingToast);
            toast.success('Item added to cart!');
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.message || 'Failed to add item.');
        }
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-20 lg:py-40">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Discover Your Style</h1>
                    <p className="mt-4 text-lg md:text-xl text-purple-200">The best products, for the best people.</p>
                    <Link to="/products">
                        <button className="mt-8 bg-white text-purple-700 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="mt-2 text-gray-600">${product.price}</p>
                                <button 
                                    onClick={() => handleAddToCart(product._id)}
                                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;