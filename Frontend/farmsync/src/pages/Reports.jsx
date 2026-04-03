import React, { useState } from 'react';
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FaArrowUp, FaChartLine, FaDownload, FaSeedling } from 'react-icons/fa';

const trendData = [
  { name: 'Jan', yield: 34, profit: 18 },
  { name: 'Feb', yield: 42, profit: 24 },
  { name: 'Mar', yield: 46, profit: 29 },
  { name: 'Apr', yield: 53, profit: 33 },
  { name: 'May', yield: 58, profit: 38 },
  { name: 'Jun', yield: 62, profit: 44 },
];

const cropMix = [
  { name: 'Wheat', value: 38 },
  { name: 'Rice', value: 26 },
  { name: 'Corn', value: 18 },
  { name: 'Sugarcane', value: 18 },
];

const reportsColors = ['#4ade80', '#38bdf8', '#fbbf24', '#a78bfa'];

const Reports = () => {
  const [filter, setFilter] = useState('Monthly');

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Farm Analytics</div>
            <h1 className="page-title mt-2">Actionable reports in a cleaner premium layout</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              Keep trends, crop mix, and insight cards in one compact analytics dashboard without changing the core app layout.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="app-select min-w-[150px]">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
            <button className="app-button-primary">
              <FaDownload />
              Export Report
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Yield Growth', value: '+18.4%', tone: 'text-emerald-300' },
          { title: 'Net Margin', value: '+12.1%', tone: 'text-sky-300' },
          { title: 'Best Crop', value: 'Wheat', tone: 'text-amber-300' },
        ].map((item) => (
          <article key={item.title} className="app-panel app-card-hover p-5">
            <div className="text-sm text-slate-400">{item.title}</div>
            <div className={`mt-3 text-3xl font-semibold tracking-tight ${item.tone}`}>{item.value}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaChartLine className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Performance trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData}>
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f1720',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
              <Line type="monotone" dataKey="yield" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="profit" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaSeedling className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Crop mix</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={cropMix} dataKey="value" nameKey="name" innerRadius={56} outerRadius={88} paddingAngle={4}>
                {cropMix.map((entry, index) => (
                  <Cell key={entry.name} fill={reportsColors[index % reportsColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0f1720',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-5 space-y-3">
            {cropMix.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: reportsColors[index] }} />
                  {item.name}
                </div>
                <span className="text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          'Wheat continues to outperform the seasonal average with stronger mid-cycle growth.',
          'Profitability improved after irrigation costs were reduced over the last six weeks.',
          'Corn inventory suggests an opportunity to shift more budget toward fertilizer efficiency.',
        ].map((insight, index) => (
          <article key={insight} className="app-panel app-card-hover p-5">
            <div className="mb-4 inline-flex rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-300">
              Insight {index + 1}
            </div>
            <p className="text-sm leading-7 text-slate-300">{insight}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <FaArrowUp />
              Trending positive
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Reports;
