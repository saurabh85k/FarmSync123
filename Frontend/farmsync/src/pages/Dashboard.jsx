import React from 'react';
import { FaLeaf, FaTractor, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { title: 'Total Crops', value: '12', icon: <FaLeaf />, bg: 'bg-green-100/90', text: 'text-green-800' },
    { title: 'Active Crops', value: '8', icon: <FaTractor />, bg: 'bg-blue-100/90', text: 'text-blue-800' },
    { title: 'Monthly Expense', value: '₹5,250', icon: <FaMoneyBillWave />, bg: 'bg-yellow-100/90', text: 'text-yellow-800' },
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">🌾 Good Morning, Farmer!</h1>
        <p className="text-green-100">Here's what's happening on your farm today.</p>
      </div>

      {/* Stats Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}

      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}

      className={`bg-gradient-to-r ${stat.bg} text-white rounded-2xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        
        <div>
          <p className="text-sm opacity-80">{stat.title}</p>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </div>

        <motion.div 
          whileHover={{ rotate: 10 }}
          className="bg-white/20 p-4 rounded-full text-2xl"
        >
          {stat.icon}
        </motion.div>

      </div>
    </motion.div>
  ))}
</div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Summary - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🌱</span> Current Crops
          </h2>
          <div className="space-y-4">
          {crops.map((crop, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="border-b border-gray-200 pb-4 last:border-0"
  >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{crop.name}</p>
                    <p className="text-sm text-gray-500">{crop.area} • Planted: {crop.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    crop.status === 'Growing' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {crop.status}
                  </span>
                </div>
                <div className="h-2 bg-gray-300 rounded">
  <motion.div
    className="h-2 bg-green-500 rounded"
    initial={{ width: 0 }}
    animate={{ width: `${crop.progress}%` }}
    transition={{ duration: 1 }}
  ></motion.div>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities - Takes 1 column */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Recent Activities
          </h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm text-gray-800">{activity.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time} • by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Weather Widget */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">🌤️ Today's Weather</p>
            <p className="text-2xl font-bold text-gray-800">34°C</p>
            <p className="text-sm text-gray-600">Mostly cloudy • Perfect for farming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
