const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true }, // Add this line
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);