import React from 'react';
import { ShoppingCart, Zap, TrendingDown, BarChart3 } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Stop Overpaying for Groceries</h1>
          <p className="text-xl mb-10 opacity-90">Compare Blinkit, Zepto, BigBasket, and Instamart in one single cart.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Get Started</button>
            <button className="border border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition">How it Works</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Real-time Comparison"
            desc="We sync prices across all major platforms every 15 minutes."
          />
          <FeatureCard 
            icon={<TrendingDown className="w-8 h-8 text-green-500" />}
            title="Smart Savings"
            desc="Our engine calculates delivery fees and discounts to find the true cheapest option."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
            title="Price History"
            desc="Track if prices are rising or falling before you hit buy."
          />
        </div>
      </section>

      {/* Comparison Preview Table */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b font-bold text-lg">Your Potential Savings</div>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Platform</th>
                <th className="p-4">Cart Total</th>
                <th className="p-4">Delivery</th>
                <th className="p-4">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium text-green-600">Zepto</td>
                <td className="p-4">₹842</td>
                <td className="p-4">₹25</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Cheapest</span></td>
              </tr>
              <tr className="border-t opacity-60">
                <td className="p-4 font-medium">Instamart</td>
                <td className="p-4">₹910</td>
                <td className="p-4">₹30</td>
                <td className="p-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="text-center p-6 border rounded-2xl hover:shadow-lg transition">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default Home;