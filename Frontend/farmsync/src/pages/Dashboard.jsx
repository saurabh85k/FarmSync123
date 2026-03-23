import React from 'react';
import {
  FaCalendarAlt,
  FaCloudSun,
  FaLeaf,
  FaMoneyBillWave,
  FaSeedling,
  FaTractor,
} from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { title: 'Total Crops', value: '12', icon: <FaLeaf />, bg: 'bg-green-100/90', text: 'text-green-800' },
    { title: 'Active Crops', value: '8', icon: <FaTractor />, bg: 'bg-blue-100/90', text: 'text-blue-800' },
    { title: 'Monthly Expense', value: 'Rs 5,250', icon: <FaMoneyBillWave />, bg: 'bg-yellow-100/90', text: 'text-yellow-800' },
    { title: 'Harvest Soon', value: '3', icon: <FaCalendarAlt />, bg: 'bg-orange-100/90', text: 'text-orange-800' },
  ];

  const crops = [
    { name: 'Wheat', area: '5 acres', date: '15 Mar 2024', status: 'Growing', progress: 60 },
    { name: 'Rice', area: '3 acres', date: '20 Mar 2024', status: 'Growing', progress: 45 },
    { name: 'Corn', area: '4 acres', date: '10 Mar 2024', status: 'Harvesting', progress: 90 },
    { name: 'Sugarcane', area: '6 acres', date: '5 Mar 2024', status: 'Growing', progress: 30 },
  ];

  const activities = [
    { time: '2 hours ago', activity: 'Watering - Wheat field', user: 'Raj' },
    { time: '5 hours ago', activity: 'Fertilizer applied - Rice field', user: 'John' },
    { time: 'Yesterday', activity: 'Pesticide spray - Corn field', user: 'Raj' },
    { time: 'Yesterday', activity: 'Harvesting - Vegetables', user: 'Farm Hand' },
  ];

  return (
    <div className="dashboard-shell space-y-6">
      <div className="hero-banner animate-fade-in-up relative overflow-hidden rounded-[28px] p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,209,102,0.18),transparent_26%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-green-50 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
              Farm status is looking strong today
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Good Morning, Farmer!</h1>
            <p className="mt-3 max-w-xl text-base text-green-50/90 md:text-lg">
              Here&apos;s what&apos;s happening on your farm today, with a quick view of crops, expenses, and field activity.
            </p>
          </div>

          <div className="glass-panel w-full max-w-sm rounded-3xl p-5 text-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-800/80">Today&apos;s Weather</p>
                <p className="mt-2 text-4xl font-bold text-slate-900">34.0 C</p>
                <p className="mt-1 text-sm text-slate-600">Mostly cloudy and ideal for field work</p>
              </div>
              <div className="weather-icon-wrap">
                <FaCloudSun className="text-4xl text-amber-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`${stat.bg} stat-card animate-fade-in-up rounded-2xl border border-white/30 p-6 shadow-lg backdrop-blur-sm`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className={`mt-2 text-3xl font-bold ${stat.text}`}>{stat.value}</p>
              </div>
              <span className={`stat-icon text-3xl ${stat.text}`}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-panel animate-fade-in-up rounded-[26px] p-6 shadow-xl lg:col-span-2" style={{ animationDelay: '180ms' }}>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <FaSeedling className="text-2xl text-green-600" />
            Current Crops
          </h2>
          <div className="space-y-4">
            {crops.map((crop, index) => (
              <div
                key={crop.name}
                className="rounded-2xl border-b border-gray-200/80 pb-4 transition-all duration-300 hover:bg-green-50/40 hover:px-3 last:border-0"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{crop.name}</p>
                    <p className="text-sm text-gray-500">{crop.area} | Planted: {crop.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      crop.status === 'Growing' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`crop-progress-fill h-2 rounded-full ${
                      crop.status === 'Growing' ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{
                      width: `${crop.progress}%`,
                      animationDelay: `${300 + index * 140}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel animate-fade-in-up rounded-[26px] p-6 shadow-xl" style={{ animationDelay: '260ms' }}>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <FaCalendarAlt className="text-2xl text-green-700" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={`${activity.activity}-${activity.time}`}
                className="activity-item flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
                style={{ animationDelay: `${240 + index * 120}ms` }}
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
                <div>
                  <p className="text-sm text-gray-800">{activity.activity}</p>
                  <p className="mt-1 text-xs text-gray-500">{activity.time} | by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 p-4 shadow-inner ring-1 ring-white/80">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaCloudSun className="text-amber-500" />
              Today&apos;s Weather
            </p>
            <p className="text-2xl font-bold text-gray-800">34.0 C</p>
            <p className="text-sm text-gray-600">Mostly cloudy | Perfect for farming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
