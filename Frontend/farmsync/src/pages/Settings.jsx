import React, { useState } from 'react';
import { FaBell, FaMoon, FaUser } from 'react-icons/fa';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    weather: true,
    activity: true,
    finance: false,
  });

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="micro-label">Preferences</div>
        <h1 className="page-title mt-2">Settings built with the same compact system</h1>
        <p className="page-subtitle mt-3 max-w-2xl">
          Clean controls, modern toggles, and consistent spacing for profile, notifications, and theme preferences.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaUser className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Profile</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input className="app-input" defaultValue="Farmer" placeholder="Display name" />
            <input className="app-input" defaultValue="farmer@farmsync.com" placeholder="Email" />
            <input className="app-input md:col-span-2" defaultValue="Main Farm - North Valley" placeholder="Farm name" />
          </div>
        </article>

        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaBell className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: 'weather', label: 'Weather alerts' },
              { key: 'activity', label: 'Field activity reminders' },
              { key: 'finance', label: 'Expense summary emails' },
            ].map((item) => (
              <div key={item.key} className="app-panel-soft flex items-center justify-between p-4">
                <span className="text-sm text-slate-200">{item.label}</span>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                  className={`relative h-7 w-12 rounded-full transition ${
                    notifications[item.key] ? 'bg-emerald-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      notifications[item.key] ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="app-panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaMoon className="text-emerald-300" />
          <h2 className="text-2xl font-semibold text-white">Theme</h2>
        </div>
        <div className="app-panel-soft flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-medium text-white">Dark mode</div>
            <div className="mt-1 text-sm text-slate-400">Keep the premium dark FarmSync experience enabled.</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-7 w-12 rounded-full transition ${darkMode ? 'bg-emerald-500' : 'bg-white/10'}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${darkMode ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
