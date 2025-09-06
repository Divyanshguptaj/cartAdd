import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProductCategory = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/items/category/${categoryName}`);
                setProducts(response.data);
            } catch (error) {
                toast.error(`Could not load products for ${categoryName}.`);
            } finally {
                setLoading(false);
            }
        };
        fetchProductsByCategory();
    }, [categoryName]);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to add items to your cart.');
            navigate('/login');
            return;
        }
        try {
            await api.post('/cart/add', { productId, quantity: 1 });
            toast.success('Item added to cart!');
        } catch (error) {
            toast.error('Failed to add item to cart.');
        }
    };

    if (loading) return <div className="text-center py-10">Loading Products...</div>;

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Category: <span className="text-purple-600">{categoryName}</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-56 object-cover" />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                                <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
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

export default ProductCategory;