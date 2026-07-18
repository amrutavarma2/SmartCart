# SmartCart: Unified Grocery Comparison Website

A full-stack MERN application that allows users to compare a single cart across Blinkit, Zepto, BigBasket, and Instamart.

## Features
- **Unified Cart:** Add products once, check prices everywhere.
- **Price Refresh Engine:** Node-cron jobs simulate real-time price volatility.
- **Best Value Algorithm:** Weighted calculation using Price (70%), ETA (20%), and Delivery Fee (10%).
- **Mobile Responsive:** Built with Tailwind CSS for a seamless desktop and mobile browser experience.

## Installation

### 1. Server
```bash
cd server
npm install
cp .env.example .env
# Start the server
npm run dev
# Seed mock data (Required for first run)
npm run seed