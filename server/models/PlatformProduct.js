const mongoose = require('mongoose');

const platformProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  platform: { type: String, enum: ['Blinkit', 'Zepto', 'BigBasket', 'Instamart'] },
  externalId: String,
  price: Number,
  mrp: Number,
  discount: Number,
  availability: Boolean,
  eta: Number, // in minutes
  deliveryFee: Number,
  lastUpdated: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('PlatformProduct', platformProductSchema);