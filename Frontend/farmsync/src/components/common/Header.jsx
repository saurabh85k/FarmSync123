import React from 'react';
import { FaSeedling, FaUserCircle } from 'react-icons/fa';

// Header shows app branding and the current-user area above page content.
const Header = () => {
  return (
    <header className="relative overflow-hidden bg-green-900/90 p-4 text-white shadow-lg backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,231,183,0.18),transparent_24%),linear-gradient(120deg,rgba(22,101,52,0.92),rgba(22,101,52,0.65))]" />
      <div className="container relative mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
            <FaSeedling className="header-logo text-2xl text-emerald-200" />
          </span>
          <h1 className="text-2xl font-bold">FarmSync</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-green-100 md:inline">Welcome, Farmer</span>
          <FaUserCircle className="text-3xl text-green-300 transition-transform duration-300 hover:scale-110" />
        </div>
      </div>
    </header>
  );
};

export default Header;
