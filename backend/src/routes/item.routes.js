const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Create a new item
router.post('/', itemController.createItem);

// GET all items
router.get('/', itemController.getAllItems);

// GET all unique categories
router.get('/categories', itemController.getAllCategories);

// GET items by category name
router.get('/category/:categoryName', itemController.getItemsByCategory);

// Update an existing item
router.put('/:id', itemController.updateItem);

// Delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;