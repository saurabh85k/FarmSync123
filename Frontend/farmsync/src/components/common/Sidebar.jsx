import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartBar,
  FaClipboardList,
  FaCloudSun,
  FaMoneyBillWave,
  FaSeedling,
  FaTachometerAlt,
  FaTractor,
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { path: '/crops', icon: <FaSeedling />, text: 'Crops' },
    { path: '/expenses', icon: <FaMoneyBillWave />, text: 'Expenses' },
    { path: '/activities', icon: <FaClipboardList />, text: 'Activities' },
    { path: '/reports', icon: <FaChartBar />, text: 'Reports' },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 border-r border-green-800 bg-gray-900/90 text-white backdrop-blur-sm">
      <div className="p-4">
        <div className="mb-6 flex items-center gap-3 border-b border-green-800 px-4 py-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 ring-1 ring-green-400/20">
            <FaTractor className="text-2xl text-green-300" />
          </span>
          <span className="text-xl font-bold text-green-400">FarmSync</span>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-600/40 to-emerald-500/10 text-white shadow-lg shadow-green-900/20'
                        : 'hover:bg-green-700/40 hover:pl-6'
                    }`
                  }
                >
                  <span className="text-xl text-green-400">{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-green-700 bg-green-800/30 p-4 shadow-lg shadow-green-950/30">
          <p className="mb-2 flex items-center gap-2 text-sm text-green-300">
            <FaCloudSun className="text-amber-300" />
            Farm Status
          </p>
          <p className="text-xs text-green-200">All crops healthy</p>
          <div className="mt-2 h-1 w-full rounded bg-gray-700">
            <div className="status-progress h-1 w-3/4 rounded bg-green-500" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
