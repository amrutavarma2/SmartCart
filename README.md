# SmartCart 🛒 — Unified Grocery Price Comparison Platform

SmartCart is a full-stack **MERN application** that helps users compare the cost of a single grocery cart across multiple quick-commerce platforms such as **Blinkit, Zepto, BigBasket, and Swiggy Instamart**.

Instead of checking the same grocery items manually across different applications, users can create one unified cart and evaluate the best-value platform based on pricing, estimated delivery time, and delivery fees.

---

## 🚀 Overview

Quick-commerce platforms often show different prices, delivery fees, and estimated delivery times for the same grocery basket.

SmartCart simplifies this process by offering:

* 🛒 One unified grocery cart
* 💰 Multi-platform price comparison
* ⏱️ ETA-based comparison
* 🚚 Delivery fee consideration
* 🏆 Best-value platform recommendation
* 🔄 Simulated real-time price updates
* 📱 Responsive user interface

The goal is to make grocery price comparison faster, simpler, and more transparent.

---

## ✨ Key Features

### 🛒 Unified Cart

Users add grocery items only once and SmartCart evaluates the same cart across multiple platforms.

Supported comparison platforms include:

* Blinkit
* Zepto
* BigBasket
* Swiggy Instamart

---

### 💰 Multi-Platform Price Comparison

The application calculates and compares the overall cart value across supported grocery platforms.

The comparison considers factors such as:

* Product prices
* Cart quantity
* Delivery fees
* Estimated delivery time

This allows users to compare the complete basket rather than individual products.

---

### 🏆 Best Value Algorithm

SmartCart includes a weighted recommendation algorithm that evaluates each platform using three primary factors:

```text
Price        → 70%
ETA          → 20%
Delivery Fee → 10%
```

The platform with the most favorable combined score is recommended as the **Best Value** option.

This approach ensures that the recommendation is not based only on the lowest price, but also considers delivery convenience.

---

## 🔄 Price Refresh Engine

SmartCart uses **Node-cron** jobs to simulate changing grocery prices.

The scheduled background process introduces controlled price variations to replicate how prices may fluctuate across quick-commerce platforms.

This helps demonstrate:

* Dynamic pricing behavior
* Scheduled background jobs
* Real-time-style marketplace updates
* Automatic backend data refresh

---

## ⚡ Dynamic Cart State Synchronization

Cart operations are synchronized between the React frontend, Express backend, and MongoDB database.

Users can:

* Add products
* Increase quantity
* Decrease quantity
* Update cart items
* Compare prices dynamically

The frontend communicates asynchronously with the backend so updates occur without unnecessary browser refreshes.

---

## 📱 Responsive Interface

The user interface is built using **React.js and Tailwind CSS**.

The application is designed to provide a smooth experience across:

* Desktop browsers
* Tablets
* Mobile devices

Tailwind CSS enables responsive layouts and reusable utility-based styling.

---

# 🏗️ System Architecture

SmartCart follows a decoupled **Client–Server Architecture**.

```text
┌──────────────────────────┐
│      React Frontend      │
│   Tailwind CSS + Axios   │
└────────────┬─────────────┘
             │
             │ HTTP / JSON
             ▼
┌──────────────────────────┐
│   Node.js + Express.js   │
│       REST APIs          │
└────────────┬─────────────┘
             │
             │ Mongoose ODM
             ▼
┌──────────────────────────┐
│      MongoDB Atlas       │
│ Products / Cart / Prices │
└──────────────────────────┘
```

---

# 🔄 Application Data Flow

```text
User Opens SmartCart
        ↓
Searches Grocery Products
        ↓
Adds Items to Unified Cart
        ↓
React Updates Local State
        ↓
Axios Sends API Request
        ↓
Express Backend Processes Request
        ↓
MongoDB Stores / Retrieves Data
        ↓
User Starts Comparison
        ↓
Price Comparison Engine Runs
        ↓
Platform Scores Are Calculated
        ↓
Best Value Platform Identified
        ↓
Results Displayed in React UI
```

---

# 🧰 Technology Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript
* HTML5
* CSS3
* Axios

---

## Backend

* Node.js
* Express.js
* REST API Architecture
* Node-cron

---

## Database

* MongoDB Atlas
* Mongoose ODM

---

## Development Tools & Concepts

* Git
* GitHub
* REST APIs
* CRUD Operations
* Client–Server Architecture
* Asynchronous Programming
* React State Management
* Scheduled Background Jobs
* Price Comparison Algorithms
* Database Schema Design
* Responsive Web Development

---

# 📁 Project Structure

```text
SmartCart/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> The internal folder structure may evolve as new features are added.

---

# 🧠 Best Value Recommendation Logic

SmartCart does not simply choose the platform with the cheapest product subtotal.

Instead, it calculates a weighted value score using:

```text
Final Score =
(Price Score × 0.70)
+
(ETA Score × 0.20)
+
(Delivery Fee Score × 0.10)
```

### Weight Distribution

| Factor                  | Weight |
| ----------------------- | -----: |
| Product / Cart Price    |    70% |
| Estimated Delivery Time |    20% |
| Delivery Fee            |    10% |

The final recommendation balances affordability with delivery convenience.

---

# 🛍️ Example Use Case

Suppose the user adds:

```text
2 × Milk
1 × Bread
1 × Eggs
2 × Instant Noodles
```

SmartCart evaluates the same cart across multiple platforms.

Example comparison:

```text
Blinkit           ₹540   ETA: 12 min
Zepto             ₹515   ETA: 15 min
BigBasket         ₹560   ETA: 30 min
Swiggy Instamart  ₹525   ETA: 18 min
```

The recommendation algorithm evaluates:

```text
70% → Price
20% → ETA
10% → Delivery Fee
```

Then SmartCart displays the platform offering the best overall value.

```text
🏆 Recommended Platform: Zepto
```

---

# ⏱️ Scheduled Price Update Simulation

SmartCart uses **Node-cron** to simulate changing marketplace prices.

Conceptually:

```text
Scheduled Cron Job
        ↓
Select Product Prices
        ↓
Apply Controlled Price Variation
        ↓
Update Database
        ↓
Frontend Receives Updated Values
        ↓
New Comparison Results Generated
```

This feature demonstrates how scheduled backend jobs can support dynamic data-driven applications.

---

# 🗄️ Database Design

The application uses MongoDB for storing product and cart-related information.

---

## Products

A product may contain fields such as:

```json
{
  "_id": "65f12a3b4c5d6e7f8a9b0c1d",
  "name": "Amul Gold Milk",
  "brand": "Amul",
  "category": "Dairy",
  "basePrice": 33,
  "baseUnit": "500 ml"
}
```

---

## Cart

A cart may contain product references and quantities.

```json
{
  "_id": "65f12b9e4c5d6e7f8a9b0c2e",
  "userId": "mock_user_123",
  "items": [
    {
      "productId": "65f12a3b4c5d6e7f8a9b0c1d",
      "quantity": 2
    }
  ]
}
```

Using product references helps maintain organized relationships between cart items and the product inventory.

---

# 🔌 API Architecture

The backend follows a REST-style API structure.

Typical API responsibilities include:

```text
/api/products
    ↓
Fetch available grocery products

/api/cart
    ↓
Create / update shopping cart

/api/compare
    ↓
Run multi-platform comparison logic
```

Example request flow:

```text
React Component
      ↓
Axios Request
      ↓
Express Route
      ↓
Controller / Business Logic
      ↓
Mongoose
      ↓
MongoDB
      ↓
JSON Response
      ↓
React UI Update
```

---

# 🚀 Installation

## Prerequisites

Before running the project locally, install:

* Node.js
* npm
* Git

You will also need access to a MongoDB database.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/amrutavarma2/SmartCart.git
```

Navigate into the project:

```bash
cd SmartCart
```

---

# 🖥️ Server Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the environment file from the provided example:

```bash
cp .env.example .env
```

Update the `.env` file with your required configuration.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Seed Initial Data

For the first run, populate the database with the required mock data:

```bash
npm run seed
```

---

## Start the Server

```bash
npm run dev
```

The backend development server should now be running.

---

# 💻 Client Setup

Open a new terminal.

From the project root, navigate into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The terminal will display the local development URL.

For Vite applications, it is commonly:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

# 🔐 Environment Variables

Create a `.env` file in the `server` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never commit private database credentials to GitHub.

Make sure `.env` is included in `.gitignore`.

```gitignore
.env
node_modules/
```

---

# 🔮 Future Enhancements

SmartCart can be expanded with several advanced features.

### 🔐 Authentication

* User registration
* Secure login
* JWT authentication
* Personalized shopping carts

### 📍 Location-Based Comparison

* Local store availability
* Pincode-based product comparison
* City-specific pricing

### 🔴 Real-Time Platform Integration

Integrate official APIs, where available, for:

* Live product prices
* Real-time availability
* Delivery fees
* Delivery ETAs

### 📊 Historical Price Tracking

Store price changes over time and display:

* Price history graphs
* Lowest recorded price
* Price trends

### 🔔 Smart Notifications

Notify users when:

* A product price drops
* A cart becomes cheaper
* A preferred platform offers a better deal

### 🤖 AI-Based Recommendations

Future versions can include:

* Frequently purchased item recommendations
* Personalized grocery suggestions
* Alternative product recommendations
* Budget-aware cart optimization

### 🧾 Smart Grocery Lists

Users could create recurring grocery lists and compare them automatically.

### 📱 Progressive Web App

SmartCart could be extended into a mobile-friendly PWA for an app-like experience.

---

# ⚠️ Disclaimer

SmartCart is an **academic and portfolio project** created to demonstrate:

* MERN stack development
* REST API integration
* Database management
* Dynamic cart synchronization
* Scheduled background jobs
* Algorithmic price comparison

The names **Blinkit, Zepto, BigBasket, and Swiggy Instamart** are trademarks or brands belonging to their respective owners.

Unless official third-party APIs are integrated, product prices, estimated delivery times, and delivery fees used within SmartCart should be considered **simulated or mock data for demonstration purposes**.

SmartCart is not affiliated with, sponsored by, or endorsed by any of these platforms.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```text
1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request
```

---

<p align="center">
  <b>SmartCart 🛒</b><br>
  Compare Smarter • Shop Better • Save More
</p>
