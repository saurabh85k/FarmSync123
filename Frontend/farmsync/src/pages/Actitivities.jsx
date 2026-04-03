import React, { useMemo, useState } from 'react';
import { FaCalendarAlt, FaPlus, FaSprayCan, FaTint, FaTractor } from 'react-icons/fa';
import { GiFertilizerBag } from 'react-icons/gi';

const iconMap = {
  Watering: { icon: <FaTint />, tone: 'bg-sky-400/15 text-sky-300' },
  Fertilizer: { icon: <GiFertilizerBag />, tone: 'bg-emerald-400/15 text-emerald-300' },
  Harvest: { icon: <FaTractor />, tone: 'bg-amber-400/15 text-amber-300' },
  Pesticide: { icon: <FaSprayCan />, tone: 'bg-violet-400/15 text-violet-300' },
};

const seededActivities = [
  { id: 1, type: 'Watering', crop: 'Wheat', note: 'North field irrigation cycle completed.', date: 'Today, 08:30 AM', user: 'Raj' },
  { id: 2, type: 'Fertilizer', crop: 'Rice', note: 'Applied nutrient mix before afternoon rain.', date: 'Today, 11:15 AM', user: 'John' },
  { id: 3, type: 'Pesticide', crop: 'Corn', note: 'Preventive spray completed on the west block.', date: 'This Week, Tue', user: 'Amit' },
];

const Activities = () => {
  const [activities, setActivities] = useState(seededActivities);
  const [range, setRange] = useState('Today');
  const [form, setForm] = useState({ type: '', crop: '', note: '' });

  const addActivity = (event) => {
    event.preventDefault();

    const newActivity = {
      id: Date.now(),
      ...form,
      date: range === 'Today' ? 'Today, just now' : 'This Week, just now',
      user: 'You',
    };

    setActivities([newActivity, ...activities]);
    setForm({ type: '', crop: '', note: '' });
  };

  const filteredActivities = useMemo(() => {
    if (range === 'Today') {
      return activities.filter((activity) => activity.date.startsWith('Today'));
    }
    return activities;
  }, [activities, range]);

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Field Timeline</div>
            <h1 className="page-title mt-2">Track daily farm activity in a clean flow</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              A vertical timeline with modern cards, compact controls, and consistent visual treatment with the dashboard.
            </p>
          </div>
          <button className="app-button-primary self-start lg:self-auto">
            <FaPlus />
            Log Activity
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <select value={range} onChange={(event) => setRange(event.target.value)} className="app-select">
            <option>Today</option>
            <option>This Week</option>
          </select>

          <form onSubmit={addActivity} className="grid gap-3 md:grid-cols-4">
            <select
              name="type"
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value })}
              className="app-select"
              required
            >
              <option value="">Activity Type</option>
              <option value="Watering">Watering</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Harvest">Harvest</option>
              <option value="Pesticide">Pesticide</option>
            </select>
            <input name="crop" value={form.crop} onChange={(event) => setForm({ ...form, crop: event.target.value })} placeholder="Crop" className="app-input" required />
            <input name="note" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Quick note" className="app-input" />
            <button className="app-button-secondary" type="submit">
              <FaPlus />
              Add
            </button>
          </form>
        </div>
      </section>

      <section className="app-panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaCalendarAlt className="text-xl text-emerald-300" />
          <h2 className="text-2xl font-semibold text-white">Activity timeline</h2>
        </div>

        <div className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-white/8">
          {filteredActivities.map((activity) => {
            const itemStyle = iconMap[activity.type] || iconMap.Watering;
            return (
              <article key={activity.id} className="relative flex gap-4 pl-12">
                <div className={`absolute left-0 top-2 rounded-2xl p-3 text-lg ${itemStyle.tone}`}>{itemStyle.icon}</div>
                <div className="app-panel-soft app-card-hover w-full p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {activity.type} - {activity.crop}
                      </h3>
                      {activity.note && <p className="mt-2 text-sm leading-7 text-slate-400">{activity.note}</p>}
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">{activity.user}</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">{activity.date}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Activities;
