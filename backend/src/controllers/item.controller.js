const Item = require('../models/item.model');

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
};

// Get all unique categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Item.find().distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Get items by category
exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        // Use a case-insensitive regex for matching the category
        const items = await Item.find({ category: new RegExp(`^${categoryName}$`, 'i') });
        if (!items.length) {
            return res.status(404).json({ message: 'No items found in this category' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items by category', error: error.message });
    }
};

// Get items with filters
exports.getItems = async (req, res) => {
    try {
        const { price, category } = req.query;
        const filter = {};
        if (price) {
            filter.price = { $lte: price };
        }
        if (category) {
            filter.category = category;
        }
        const items = await Item.find(filter);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};