const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Apply the authentication middleware to ALL routes in this file
router.use(authMiddleware);

// Route to add an item to the cart (now protected)
router.post('/add', cartController.addToCart);

// Route to remove an item from the cart (now protected)
router.delete('/remove/:itemId', cartController.removeFromCart);

// Route to get the current user's cart (now protected)
router.get('/', cartController.getCart);

// Get cart item count (already protected, but this is cleaner)
router.get('/count', cartController.getCartItemCount);

module.exports = router;