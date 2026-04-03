import React from 'react';
import { FaCloudSun, FaTint, FaWind } from 'react-icons/fa';

const hourly = [
  { time: '08 AM', temp: '28°', state: 'Cloudy' },
  { time: '11 AM', temp: '31°', state: 'Sunny' },
  { time: '02 PM', temp: '34°', state: 'Warm' },
  { time: '05 PM', temp: '30°', state: 'Breeze' },
];

const weekly = [
  { day: 'Mon', temp: '32°', rain: '10%' },
  { day: 'Tue', temp: '34°', rain: '18%' },
  { day: 'Wed', temp: '31°', rain: '22%' },
  { day: 'Thu', temp: '29°', rain: '35%' },
  { day: 'Fri', temp: '30°', rain: '14%' },
];

const Weather = () => {
  return (
    <div className="space-y-5">
      <section className="dashboard-hero relative overflow-hidden rounded-[28px] border border-white/6 p-6 md:p-7" style={{ backgroundImage: "url('/background.png')" }}>
        <div className="dashboard-hero-overlay absolute inset-0" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Weather Center</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white md:text-5xl">Conditions built for field planning</h1>
            <p className="page-subtitle mt-3 max-w-2xl text-slate-200/85">
              A large forecast card with the same premium dashboard feel, tuned for quick decisions before heading to the field.
            </p>
          </div>

          <div className="app-panel-soft min-w-[280px] p-5">
            <div className="text-sm text-slate-400">Current Conditions</div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-5xl font-semibold text-white">34°C</div>
                <div className="mt-2 text-sm text-slate-300">Mostly cloudy and field-friendly</div>
              </div>
              <FaCloudSun className="text-5xl text-amber-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Humidity', value: '64%', icon: <FaTint />, tone: 'text-sky-300' },
          { label: 'Wind', value: '12 km/h', icon: <FaWind />, tone: 'text-emerald-300' },
          { label: 'Feels Like', value: '36°C', icon: <FaCloudSun />, tone: 'text-amber-300' },
        ].map((item) => (
          <article key={item.label} className="app-panel app-card-hover p-5">
            <div className={`text-2xl ${item.tone}`}>{item.icon}</div>
            <div className="mt-4 text-sm text-slate-400">{item.label}</div>
            <div className="mt-2 text-3xl font-semibold text-white">{item.value}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="app-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Hourly Forecast</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {hourly.map((item) => (
              <div key={item.time} className="app-panel-soft app-card-hover p-4">
                <div className="text-sm text-slate-400">{item.time}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{item.temp}</div>
                <div className="mt-1 text-sm text-slate-300">{item.state}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="app-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Weekly Forecast</h2>
          <div className="mt-5 space-y-3">
            {weekly.map((item) => (
              <div key={item.day} className="app-panel-soft flex items-center justify-between p-4 text-sm">
                <span className="font-medium text-white">{item.day}</span>
                <span className="text-slate-400">{item.temp}</span>
                <span className="text-emerald-300">Rain {item.rain}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Weather;
