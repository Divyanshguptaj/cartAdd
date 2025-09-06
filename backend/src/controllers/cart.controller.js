const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Item = require('../models/item.model'); // Import the Item model
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // From authMiddleware
    const numericQuantity = parseInt(quantity, 10);

    if (!productId || isNaN(numericQuantity) || numericQuantity <= 0) {
        return res.status(400).json({ message: 'ProductId and a valid positive quantity are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid Product ID format.' });
    }

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        // If no cart exists for the user, create a new one
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the item is already in the cart
        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            // Item exists in the cart, update the quantity
            cart.items[itemIndex].quantity += numericQuantity;
        } else {
            // Item does not exist in cart, add as a new item
            cart.items.push({ product: productId, quantity: numericQuantity });
        }

        await cart.save();
        
        res.status(200).json({ message: 'Item added to cart successfully', cart });

    } catch (error) {
        console.error('Error in addToCart:', error); // Log the actual error on the server
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { itemId } = req.params; // Assuming itemId is the _id of the item in the cart.items array
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialItemCount = cart.items.length;
        cart.items = cart.items.filter(item => item.product.toString() !== itemId);
        if (cart.items.length === initialItemCount) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        await cart.save();
        
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(200).json({ cart: null }); // No cart found for user
        }

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};

exports.getCartItemCount = async (req, res) => {
    try {
        // The user's ID is attached to the request by the auth middleware
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(200).json({ count: 0 });
        }

        // Example: summing up quantities of all items in the cart
        const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart count', error: error.message });
    }
};