import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl max-w-md w-full">
        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <LogIn className="text-green-600 w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Enter your details to sync your grocery comparisons.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="password" placeholder="Password" required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl outline-none focus:ring-2 ring-green-500 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-100 active:scale-95">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          New here? <Link to="/register" className="text-green-600 font-bold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;