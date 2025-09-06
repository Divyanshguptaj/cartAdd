import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast'; // Import toast

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password) {
            toast.error("All fields are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Email address is invalid.");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }
        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const loadingToast = toast.loading('Creating your account...');
        try {
            await api.post('/auth/signup', { username, email, password });
            toast.dismiss(loadingToast);
            toast.success('Account created successfully! Please log in.');
            navigate('/login');
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Create Your Account</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-purple-600 hover:underline font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;