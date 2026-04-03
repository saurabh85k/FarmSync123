import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

// Shared dashboard layout for pages that use the app navigation chrome.
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_22%)]" />
      <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="main-content px-4 pb-6 md:px-6 xl:px-7">
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  );
};

export default MainLayout;
