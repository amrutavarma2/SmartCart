/**
 * Formula for 'Best Value':
 * Value = (Sum of Prices * 0.7) + (Avg ETA * 0.2) + (Delivery Fees * 0.1)
 * Lower score wins.
 */
const calculateComparison = (cartItems, platformData) => {
  const results = ['Blinkit', 'Zepto', 'BigBasket', 'Instamart'].map(platform => {
    let subtotal = 0;
    let savings = 0;
    let unavailableCount = 0;
    const items = [];

    cartItems.forEach(cartItem => {
      const pData = platformData.find(p => 
        p.productId.toString() === cartItem.productId._id.toString() && 
        p.platform === platform
      );

      if (pData && pData.availability) {
        const cost = pData.price * cartItem.quantity;
        subtotal += cost;
        savings += (pData.mrp - pData.price) * cartItem.quantity;
        items.push({ ...pData.toObject(), quantity: cartItem.quantity });
      } else {
        unavailableCount++;
      }
    });

    const deliveryFee = subtotal > 500 ? 0 : 40;
    const eta = platform === 'BigBasket' ? 120 : 15; // Mock logic

    return {
      platform,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      savings,
      unavailableCount,
      eta,
      items
    };
  });

  return results.sort((a, b) => a.total - b.total);
};

module.exports = { calculateComparison };