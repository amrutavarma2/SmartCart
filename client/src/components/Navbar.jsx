import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[80] p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/60 backdrop-blur-xl border border-white/20 p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/40">
        
        {/* BRAND LOGO */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo className="h-6" />
        </Link>

        {/* ACTION LINKS */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors hidden md:block"
          >
            Market
          </Link>
          
          <Link 
            to="/compare" 
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100 active:scale-95 flex items-center gap-2"
          >
            <span>Bag</span>
            <div className="bg-white/20 w-4 h-4 rounded-full flex items-center justify-center text-[8px]">
              +
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;