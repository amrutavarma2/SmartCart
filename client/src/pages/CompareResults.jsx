import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Truck, Zap, CheckCircle, ArrowLeft, X, Trash2, ShoppingBag, Plus, Minus, Loader2 } from 'lucide-react';

const CompareResults = () => {
  const [comparisons, setComparisons] = useState([]);
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const userId = 'mock_user_123';

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Dairy': return '🥛';
      case 'Produce': return '🍎';
      case 'Atta & Rice': return '🌾';
      case 'Snacks': return '🍿';
      case 'Beverages': return '🥤';
      default: return '📦';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [compareRes, cartRes] = await Promise.all([
        axios.post('http://localhost:5000/api/compare', { userId }),
        axios.get(`http://localhost:5000/api/cart/${userId}`)
      ]);
      setComparisons(compareRes.data);
      setCartItems(cartRes.data.items || cartRes.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Function to handle + and - buttons
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/cart', { 
        userId, 
        productId, 
        quantity: newQuantity,
        isUpdate: true // Tell backend to overwrite qty rather than add to it
      });
      fetchData(); // Refresh totals and list
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const clearCart = async () => {
    if (window.confirm("Empty your bag?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/${userId}`);
        setComparisons([]);
        setCartItems([]);
      } catch (err) { console.error(err); }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin h-12 w-12 text-green-600 mb-4" />
      <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Updating Bag...</p>
    </div>
  );

  if (!cartItems || cartItems.length === 0) return (
    <div className="max-w-xl mx-auto mt-20 text-center p-12 bg-white border rounded-[3rem] shadow-sm">
      <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛒</div>
      <h2 className="text-2xl font-black text-gray-800 tracking-tighter italic">Bag is empty</h2>
      <Link to="/" className="inline-block mt-6 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition shadow-lg">
        Go to Market
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 relative animate-in fade-in duration-500">
      
      {/* SUCCESS MODAL (RESTORED TO ORIGINAL UI) */}
      {selectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl transform transition-all animate-in zoom-in duration-300">
            <div className="flex justify-end">
              <button onClick={() => setSelectedPlatform(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-green-600 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Order Initialized!</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Redirecting you to <span className="font-bold text-green-600">{selectedPlatform.platform}</span> for <span className="font-bold text-gray-900">₹{selectedPlatform.total}</span>.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Platform</span>
                  <span className="text-gray-900">{selectedPlatform.platform}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Est. Delivery</span>
                  <span className="text-blue-600">{selectedPlatform.eta} mins</span>
                </div>
                <div className="flex justify-between text-base pt-3 border-t font-black">
                  <span>Final Total</span>
                  <span className="text-green-600">₹{selectedPlatform.total}</span>
                </div>
              </div>

              <button 
                onClick={() => { alert('Redirecting...'); setSelectedPlatform(null); }}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition active:scale-95 shadow-lg shadow-green-100"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-green-600 font-bold mb-4 hover:text-green-700 transition w-fit group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Search</span>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic leading-none">The Verdict.</h1>
        </div>
        <button onClick={clearCart} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-100 transition shadow-sm active:scale-95"><Trash2 size={18} /><span>Empty Cart</span></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: INTERACTIVE VERTICAL LIST */}
        <div className="lg:col-span-5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-2">Order Details</h2>
          <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm sticky top-32">
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
              {cartItems.map((item) => {
                const p = item.product || item;
                return (
                  <div key={item._id} className="flex items-center gap-5 group">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-3xl shrink-0 group-hover:bg-green-50 transition-colors">
                      {getCategoryEmoji(p.category)}
                    </div>
                    
                    <div className="flex-grow pt-1">
                      <h4 className="text-sm font-black text-slate-900 tracking-tight leading-tight mb-1">
                        {p.name || "Loading..."}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {p.brand} • {p.baseUnit}
                      </p>
                    </div>

                    <div className="text-right pt-1 shrink-0 flex flex-col items-end">
                      {/* INTERACTIVE COUNTER (ZEPTO STYLE) */}
                      <div className="flex items-center bg-pink-50 text-pink-600 rounded-xl px-2 py-1 gap-3 mb-2 border border-pink-100">
                        <button onClick={() => updateQuantity(p._id, item.quantity - 1)} className="hover:bg-pink-100 p-0.5 rounded-md transition-colors">
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(p._id, item.quantity + 1)} className="hover:bg-pink-100 p-0.5 rounded-md transition-colors">
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <p className="text-sm font-black text-slate-900 italic tracking-tighter">
                        ₹{(p.basePrice || 0) * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COMPARISON GRID */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-2">Market Verdict</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((res, index) => (
              <div key={res.platform} className={`relative bg-white border-2 rounded-[2.8rem] p-8 transition-all duration-300 ${index === 0 ? 'border-green-500 shadow-2xl scale-105 z-10' : 'border-gray-100 hover:border-gray-300'}`}>
                {index === 0 && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">🏆 Best Value</div>)}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-gray-800 tracking-tighter">{res.platform}</h2>
                  <div className="mt-4">
                    <span className="text-4xl font-black text-gray-900 italic tracking-tighter italic">₹{res.total}</span>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase italic tracking-tight">₹{res.subtotal} + ₹{res.deliveryFee} shipping</p>
                  </div>
                </div>
                <div className="space-y-4 py-6 border-t border-gray-50">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-[10px] text-gray-400">
                    <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-500" /> Time</span>
                    <span className="text-gray-900 tracking-tighter italic">{res.eta} mins</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-[10px] text-gray-400">
                    <span className="flex items-center gap-2"><Truck size={14} className="text-blue-500" /> Fee</span>
                    <span className={res.deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}>{res.deliveryFee === 0 ? 'Free' : `₹${res.deliveryFee}`}</span>
                  </div>
                  <div className="bg-green-50 text-green-700 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <CheckCircle size={14} /> Saved ₹{res.savings}
                  </div>
                </div>
                <button onClick={() => setSelectedPlatform(res)} className={`w-full mt-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${index === 0 ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}>Order on {res.platform}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareResults;