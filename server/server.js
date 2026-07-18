const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// 1. Load Environment Variables first
dotenv.config();

// 2. Import Route Files
const cartRoutes = require('./routes/cartRoutes');
const compareRoutes = require('./routes/compareRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// 3. Initialize Express (This MUST happen before app.use)
const app = express();

// 4. Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// 5. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB Connected Successfully'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// 6. Register API Routes
app.use('/api/auth', authRoutes); // Moved here after app initialization
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/compare', compareRoutes);

// Health Check Route
app.get('/api/system/health', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

// 7. Start Background Cron Jobs
try {
  require('./jobs/refreshJob');
  console.log('⏰ Cron Jobs Initialized');
} catch (err) {
  console.error('⚠️ Cron Job failed to start:', err.message);
}

// 8. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 