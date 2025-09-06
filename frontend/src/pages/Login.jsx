import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from 'react-hot-toast'; // Import toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
        toast.error("Email and password are required.");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Please enter a valid email address.");
        return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading('Logging in...');
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      toast.dismiss(loadingToast);
      toast.success(`Welcome back, ${response.data.user.username}!`);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-purple-700">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Login to continue to your account
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
