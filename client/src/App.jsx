import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductSearch from './pages/ProductSearch';
import CompareResults from './pages/CompareResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Simple Header */}
        <header className="p-4 border-b flex justify-between items-center bg-gray-50">
          <Link to="/" className="text-xl font-bold text-green-600">SmartCart</Link>
          <Link to="/compare" className="text-sm font-medium">View Cart</Link>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProductSearch />} />
          <Route path="/compare" element={<CompareResults />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;