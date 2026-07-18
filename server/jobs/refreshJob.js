const cron = require('node-cron');
const PlatformProduct = require('../models/PlatformProduct');

// Simulate price fluctuations every 15 mins
cron.schedule('*/15 * * * *', async () => {
  console.log('Running Price Refresh Job...');
  const products = await PlatformProduct.find();
  
  for (const product of products) {
    // Random price fluctuation +/- 5%
    const change = 1 + (Math.random() * 0.1 - 0.05);
    product.price = Math.round(product.price * change);
    product.lastUpdated = new Date();
    await product.save();
  }
  console.log('Prices updated successfully.');
});