import React, { useMemo, useState } from 'react';
import { FaPlus, FaSearch, FaSeedling, FaSlidersH, FaTrash } from 'react-icons/fa';

const initialCrops = [
  { id: 1, name: 'Wheat', area: '5 acres', status: 'Growing', progress: 68, season: 'Rabi' },
  { id: 2, name: 'Rice', area: '3 acres', status: 'Growing', progress: 44, season: 'Kharif' },
  { id: 3, name: 'Corn', area: '4 acres', status: 'Ready', progress: 92, season: 'Summer' },
  { id: 4, name: 'Sugarcane', area: '6 acres', status: 'Growing', progress: 31, season: 'Annual' },
];

const Crops = () => {
  const [crops, setCrops] = useState(initialCrops);
  const [form, setForm] = useState({ name: '', area: '' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const addCrop = (event) => {
    event.preventDefault();

    const newCrop = {
      id: Date.now(),
      name: form.name,
      area: form.area,
      status: 'Growing',
      progress: 12,
      season: 'New',
    };

    setCrops([newCrop, ...crops]);
    setForm({ name: '', area: '' });
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  const filteredCrops = useMemo(
    () =>
      crops.filter((crop) => {
        const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' || crop.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [crops, search, statusFilter]
  );

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Crop Management</div>
            <h1 className="page-title mt-2">Manage crop cycles with clarity</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              Track crop area, current growth stage, and progress in one compact workspace built with the same premium FarmSync system.
            </p>
          </div>
          <button className="app-button-primary self-start lg:self-auto">
            <FaPlus />
            Add Crop
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.35fr_0.8fr_auto]">
          <label className="relative block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search crops..."
              className="app-input pl-11"
            />
          </label>
          <label className="relative block">
            <FaSlidersH className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="app-select pl-11"
            >
              <option>All</option>
              <option>Growing</option>
              <option>Ready</option>
            </select>
          </label>
          <form onSubmit={addCrop} className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
            <input
              placeholder="Crop name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="app-input"
              required
            />
            <input
              placeholder="Area"
              value={form.area}
              onChange={(event) => setForm({ ...form, area: event.target.value })}
              className="app-input"
              required
            />
            <button className="app-button-secondary" type="submit">
              <FaPlus />
              Quick Add
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCrops.map((crop) => (
          <article key={crop.id} className="app-panel app-card-hover p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-emerald-500/12 p-3 text-2xl text-emerald-300">
                <FaSeedling />
              </div>
              <button
                onClick={() => deleteCrop(crop.id)}
                className="rounded-xl border border-white/8 bg-white/4 p-2 text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/8 hover:text-red-300"
              >
                <FaTrash />
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">{crop.name}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    crop.status === 'Ready'
                      ? 'bg-amber-400/15 text-amber-300'
                      : 'bg-emerald-400/15 text-emerald-300'
                  }`}
                >
                  {crop.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {crop.area} • {crop.season} season
              </p>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Growth Progress</span>
                <span className="font-medium text-white">{crop.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/8">
                <div
                  className={`h-2 rounded-full ${crop.status === 'Ready' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${crop.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Crops;
