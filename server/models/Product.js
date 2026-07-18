const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  brand: String,
  category: String,
  baseUnit: String, // e.g., '1kg', '500ml'
  imageUrl: String,
  tags: [String],
  normalizedName: { type: String, lowercase: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);