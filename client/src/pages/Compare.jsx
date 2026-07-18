import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const ComparePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch for demonstration
    const fetchComparison = async () => {
      try {
        const res = await axios.post('/api/compare');
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, []);

  if (loading) return <div className="p-10 text-center">Analysing market prices...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Cart Comparison</h1>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {results.map((res, index) => (
          <div key={res.platform} className={`border-2 rounded-2xl p-6 relative ${index === 0 ? 'border-green-500 bg-green-50/30' : 'border-gray-100'}`}>
            {index === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </span>
            )}
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black">{res.platform}</h2>
              <div className="text-4xl font-bold mt-2">₹{res.total}</div>
              <div className="text-sm text-gray-500 mt-1">incl. ₹{res.deliveryFee} delivery</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" /> <span>Est. Delivery: {res.eta} mins</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" /> <span>Saved ₹{res.savings}</span>
              </div>
              {res.unavailableCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4" /> <span>{res.unavailableCount} items out of stock</span>
                </div>
              )}
            </div>

            <button className={`w-full mt-8 py-3 rounded-xl font-bold transition ${index === 0 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
              Order via {res.platform}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;