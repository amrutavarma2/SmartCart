const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, isUpdate } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already exists in bag
    const itemIndex = cart.items.findIndex((item) => 
      item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // If coming from Compare page (+/- buttons), overwrite the quantity
      if (isUpdate) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // If coming from Search page, increment the quantity
        cart.items[itemIndex].quantity += quantity;
      }
    } else {
      // New item addition
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Cart update failed", error });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};