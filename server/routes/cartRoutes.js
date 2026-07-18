const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Ensure this model exists

// 1. ADD TO CART (POST /api/cart)
router.post('/', async (req, res) => { 
  try {
    const { userId, productId, quantity } = req.body;

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // If it exists, update the quantity
        cart.items[itemIndex].quantity += (quantity || 1);
      } else {
        // If it doesn't, push the new product
        cart.items.push({ productId, quantity: quantity || 1 });
      }
      cart = await cart.save();
    } else {
      // If no cart exists, create a new one
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: quantity || 1 }]
      });
    }

    console.log(`✅ Item ${productId} saved to cart for ${userId}`);
    res.status(201).json(cart);
  } catch (err) {
    console.error("❌ Cart Save Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. GET CART DATA (GET /api/cart/:userId)
// Necessary to verify if data is actually there
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. EMPTY CART (DELETE /api/cart/:userId)
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Instead of deleting the whole document, we just clear the items array
    const cart = await Cart.findOneAndUpdate(
      { userId }, 
      { $set: { items: [] } }, 
      { new: true }
    );
    res.json({ message: "Cart cleared", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;