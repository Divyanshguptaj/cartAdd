const User = require('../models/user.model');
const Cart = require('../models/cart.model'); // Import the Cart model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    // Destructure all required fields from the request body
    const { username, email, password } = req.body;
    console.log(username, email, password)
    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    try {
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email or username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user with all the fields
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create an empty cart for the new user
        const newCart = new Cart({ user: newUser._id, items: [] });
        await newCart.save();

        res.status(201).json({ message: 'User and cart created successfully. Please login.' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.login = async (req, res) => {
    // Use email for login as it's unique
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        // Find the user by their email address
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Sign the token with user ID and username for potential use in the frontend
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Correctly send the token and user info back
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};