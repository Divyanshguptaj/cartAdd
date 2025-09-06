import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/items/categories');
                setCategories(response.data);
            } catch (error) {
                toast.error('Could not load categories.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <div className="text-center py-10">Loading Categories...</div>;

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Product Categories</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories.map(category => (
                        <Link key={category} to={`/products/category/${category}`}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-8 transform hover:scale-105 transition duration-300">
                                <h2 className="text-xl font-bold text-purple-700">{category}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;