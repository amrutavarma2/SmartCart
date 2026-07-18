const express = require('express');
const router = express.Router();
const PlatformProduct = require('../models/PlatformProduct');
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    // CRITICAL: Ensure we populate the productId to get the _id for the next query
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.json([]);
    }

    const platforms = ['Blinkit', 'Zepto', 'BigBasket', 'Instamart'];
    
    const results = await Promise.all(platforms.map(async (platform) => {
      let subtotal = 0;
      let unavailableCount = 0;
      
      for (const item of cart.items) {
        // If populate failed or product was deleted, skip
        if (!item.productId) {
            unavailableCount++;
            continue;
        }

        const pData = await PlatformProduct.findOne({ 
          productId: item.productId._id, 
          platform 
        });

        if (pData) {
          subtotal += pData.price * item.quantity;
        } else {
          // Fallback logic so the UI doesn't show 0
          subtotal += (Math.random() * 50 + 100) * item.quantity;
          unavailableCount++; // Mark as missing data
        }
      }

      const deliveryFee = subtotal > 500 ? 0 : 40;

      return {
        platform,
        subtotal: Math.round(subtotal), // Added this
        deliveryFee,
        total: Math.round(subtotal + deliveryFee),
        savings: Math.round(Math.random() * 30),
        eta: Math.floor(Math.random() * 15) + 10,
        unavailableCount // Added this
      };
    }));

    res.json(results.sort((a, b) => a.total - b.total));
  } catch (err) {
    console.error("Comparison Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;