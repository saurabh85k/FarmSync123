import React, { useEffect, useState } from 'react';
import { FaLeaf, FaTractor, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import { cropService } from '../services/cropService';
import { expenseService } from '../services/expenseService';
import { activityService } from '../services/activityService';

const Dashboard = () => {
  const [crops, setCrops] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Derived stats from fetched data
  const totalCrops = crops.length;
  const activeCrops = crops.filter(c => c.status === 'Active' || (c.expectedHarvest && new Date(c.expectedHarvest) > new Date())).length;
  const monthlyExpense = expenses
    .filter(e => {
      const d = new Date(e.date);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + (e.amount || 0), 0);
  const harvestSoon = crops.filter(c => {
    if (!c.expectedHarvest) return false;
    const daysLeft = (new Date(c.expectedHarvest) - new Date()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 7 && daysLeft > 0;
  }).length;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cropsRes, expensesRes, activitiesRes] = await Promise.all([
          cropService.getAll(),
          expenseService.getAll(),
          activityService.getAll()
        ]);
        setCrops(cropsRes.data || []);
        setExpenses(expensesRes.data || []);
        setActivities(activitiesRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load data. Please check if backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stats cards (dynamic)
  const stats = [
    { title: 'Total Crops', value: totalCrops, icon: <FaLeaf />, bg: 'bg-green-100/90', text: 'text-green-800' },
    { title: 'Active Crops', value: activeCrops, icon: <FaTractor />, bg: 'bg-blue-100/90', text: 'text-blue-800' },
    { title: 'Monthly Expense', value: `₹${monthlyExpense.toLocaleString()}`, icon: <FaMoneyBillWave />, bg: 'bg-yellow-100/90', text: 'text-yellow-800' },
    { title: 'Harvest Soon', value: harvestSoon, icon: <FaCalendarAlt />, bg: 'bg-orange-100/90', text: 'text-orange-800' },
  ];

  // Helper to map backend crop to UI display
  const formatCrop = (crop) => ({
    name: crop.cropName,
    area: crop.areaSize ? `${crop.areaSize} acres` : 'N/A',
    date: crop.sowingDate ? new Date(crop.sowingDate).toLocaleDateString() : 'Unknown',
    status: crop.status || (crop.expectedHarvest && new Date(crop.expectedHarvest) < new Date() ? 'Harvested' : 'Growing'),
    progress: crop.progress || (crop.status === 'Growing' ? Math.floor(Math.random() * 50) + 30 : 90)
  });

  const formatActivity = (act) => ({
    time: act.createdAt ? new Date(act.createdAt).toLocaleDateString() : 'Recently',
    activity: act.description || `${act.activityType} - ${act.crop?.cropName}`,
    user: act.user?.name || 'System'
  });

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  const cropsList = crops.map(formatCrop);
  const activitiesList = activities.slice(0, 4).map(formatActivity);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">🌾 Good Morning, Farmer!</h1>
        <p className="text-green-100">Here's what's happening on your farm today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.text} mt-2`}>{stat.value}</p>
              </div>
              <span className={`text-3xl ${stat.text}`}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Summary */}
        <div className="lg:col-span-2 bg-white/90 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌱 Current Crops</h2>
          {cropsList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No crops added yet.</p>
          ) : (
            <div className="space-y-4">
              {cropsList.map((crop, idx) => (
                <div key={idx} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{crop.name}</p>
                      <p className="text-sm text-gray-500">{crop.area} • Planted: {crop.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      crop.status === 'Growing' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {crop.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div className={`h-2 rounded ${crop.status === 'Growing' ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${crop.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Recent Activities</h2>
          {activitiesList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activities.</p>
          ) : (
            <div className="space-y-4">
              {activitiesList.map((act, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm">{act.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{act.time} • by {act.user}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Weather widget – static */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
            <p className="text-sm font-medium">🌤️ Today's Weather</p>
            <p className="text-2xl font-bold">34°C</p>
            <p className="text-sm">Mostly cloudy • Perfect for farming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;