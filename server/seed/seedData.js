const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const PlatformProduct = require('../models/PlatformProduct');

dotenv.config({ path: './.env' });

const categories = ['Dairy', 'Produce', 'Atta & Rice', 'Snacks', 'Beverages'];
const platforms = ['Blinkit', 'Zepto', 'BigBasket', 'Instamart'];

const baseProducts = [
  // DAIRY & BAKERY
  { name: 'Amul Taaza Milk', brand: 'Amul', baseUnit: '1L', category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9108b9355ce?w=400' },
  { name: 'Harvest Gold Bread', brand: 'Harvest', baseUnit: '400g', category: 'Dairy', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { name: 'Amul Butter', brand: 'Amul', baseUnit: '100g', category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { name: 'Greek Yogurt', brand: 'Epigamia', baseUnit: '200g', category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },

  // PRODUCE (Fruits & Veggies)
  { name: 'Organic Bananas', brand: 'Fresh', baseUnit: '500g', category: 'Produce', image: 'https://images.unsplash.com/photo-1571771894821-ad9958a35c47?w=400' },
  { name: 'Red Apples', brand: 'Royal', baseUnit: '1kg', category: 'Produce', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
  { name: 'Potato', brand: 'Local', baseUnit: '1kg', category: 'Produce', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
  { name: 'Tomato', brand: 'Local', baseUnit: '500g', category: 'Produce', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },

  // ATTA & RICE
  { name: 'Aashirvaad Atta', brand: 'ITC', baseUnit: '5kg', category: 'Atta & Rice', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { name: 'Basmati Rice', brand: 'India Gate', baseUnit: '1kg', category: 'Atta & Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Toor Dal', brand: 'Tata Sampann', baseUnit: '1kg', category: 'Atta & Rice', image: 'https://images.unsplash.com/photo-1585994192730-981ef2255e74?w=400' },

  // SNACKS & MUNCHIES
  { name: 'Maggi Noodles', brand: 'Nestle', baseUnit: '420g', category: 'Snacks', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400' },
  { name: 'Lay\'s Classic', brand: 'Pepsico', baseUnit: '50g', category: 'Snacks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
  { name: 'Oreo Biscuits', brand: 'Cadbury', baseUnit: '120g', category: 'Snacks', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },

  // BEVERAGES
  { name: 'Coca Cola', brand: 'Coke', baseUnit: '750ml', category: 'Beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
  { name: 'Instant Coffee', brand: 'Nescafe', baseUnit: '100g', category: 'Beverages', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400' },
  { name: 'Green Tea', brand: 'Lipton', baseUnit: '25 bags', category: 'Beverages', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400' },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Clear existing data
  await Product.deleteMany({});
  await PlatformProduct.deleteMany({});

  for (const item of baseProducts) {
    const product = await Product.create({
      ...item,
      normalizedName: item.name.toLowerCase()
    });

    // Create platform-specific versions with different prices
    for (const platform of platforms) {
      const basePrice = Math.floor(Math.random() * (500 - 30) + 30);
      await PlatformProduct.create({
        productId: product._id,
        platform,
        externalId: `ext_${Math.random().toString(36).substr(2, 9)}`,
        price: Math.round(basePrice * (0.9 + Math.random() * 0.2)), // Variation
        mrp: basePrice + 10,
        availability: Math.random() > 0.1, // 10% chance out of stock
        eta: platform === 'BigBasket' ? 120 : 15,
        deliveryFee: Math.random() > 0.5 ? 0 : 40,
        lastUpdated: new Date()
      });
    }
  }

  console.log("✅ Database Seeded with 4-platform comparison data!");
  process.exit();
};

seedDB();