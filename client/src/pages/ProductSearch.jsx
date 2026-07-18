import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, CheckCircle, Search, Sparkles, ImageOff } from 'lucide-react';

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Dairy', 'Produce', 'Atta & Rice', 'Snacks', 'Beverages'];

  const getCategoryEmoji = (cat) => {
    const map = { 'Dairy': '🥛', 'Produce': '🍎', 'Atta & Rice': '🌾', 'Snacks': '🍿', 'Beverages': '🥤' };
    return map[cat] || '📦';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const addToBag = async (productId, name) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { userId: 'mock_user_123', productId, quantity: 1, isUpdate: false });
      setToast({ show: true, message: `W! ${name} bagged` });
      setTimeout(() => setToast({ show: false }), 2000);
    } catch (err) { console.error(err); }
  };

  const filtered = products.filter(p => (selectedCategory === 'All' || p.category === selectedCategory) && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Loading Market...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {toast.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4">
            <CheckCircle className="text-green-500" size={18} />
            <span className="font-bold">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="mb-16">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">Shop <br /><span className="text-green-500 italic">Smarter.</span></h1>
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
          <input 
            type="text" placeholder="Find your vibe..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-[450px] pl-16 pr-6 py-6 bg-white rounded-[2.5rem] shadow-xl outline-none focus:ring-2 ring-green-500/20 transition-all font-medium text-lg"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white scale-110 shadow-xl' : 'bg-white text-slate-500'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map(p => (
          <div key={p._id} className="group bg-white rounded-[3rem] p-6 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-slate-100">
            <div className="relative w-full h-32 bg-slate-50 rounded-[2.5rem] mb-6 flex items-center justify-center text-5xl group-hover:bg-green-50 transition-colors">
              <span>{getCategoryEmoji(p.category)}</span>
            </div>
            <div className="mb-8">
              <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">{p.category}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter line-clamp-1">{p.name}</h3>
              <p className="text-slate-400 font-bold text-xs uppercase">{p.baseUnit}</p>
            </div>
            <button onClick={() => addToBag(p._id, p.name)} className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all active:scale-95 shadow-xl shadow-slate-100 uppercase text-[10px] tracking-widest">
              <ShoppingCart size={18} fill="currentColor" /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;