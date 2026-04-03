import React, { useMemo, useState } from 'react';
import { FaBell, FaChevronDown, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const searchItems = [
  { label: 'Dashboard', keywords: ['dashboard', 'home', 'overview'], route: '/' },
  { label: 'Crop Overview', keywords: ['crop overview', 'chart', 'growth'], route: '/', hash: '#crop-overview' },
  { label: 'Recent Activities', keywords: ['recent activities', 'activity', 'timeline'], route: '/', hash: '#recent-activities' },
  { label: 'AI Farm Assistant', keywords: ['ai', 'assistant', 'suggestion'], route: '/', hash: '#ai-assistant' },
  { label: 'Crops', keywords: ['crops', 'crop', 'field'], route: '/crops' },
  { label: 'Expenses', keywords: ['expenses', 'expense', 'spending', 'finance'], route: '/expenses' },
  { label: 'Activities', keywords: ['activities', 'activity', 'log'], route: '/activities' },
  { label: 'Reports', keywords: ['reports', 'analytics', 'trends'], route: '/reports' },
  { label: 'Weather', keywords: ['weather', 'forecast', 'temperature'], route: '/weather' },
  { label: 'Settings', keywords: ['settings', 'profile', 'notifications'], route: '/settings' },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchItems.slice(0, 5);
    }

    return searchItems.filter((item) => {
      const haystack = `${item.label} ${item.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const goToItem = (item) => {
    setQuery(item.label);
    setShowResults(false);

    if (location.pathname === item.route) {
      if (item.hash) {
        const target = document.querySelector(item.hash);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    navigate(`${item.route}${item.hash || ''}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const match = results[0];
    if (match) {
      goToItem(match);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between bg-transparent px-4 py-4 backdrop-blur-sm md:px-6 xl:px-7">
      <div className="relative w-full max-w-[420px]">
        <form
          onSubmit={onSubmit}
          className="flex w-full items-center rounded-2xl border border-farm-border/50 bg-farm-card/60 px-4 py-2.5 text-sm transition-colors focus-within:border-farm-accent/50"
        >
          <FaSearch className="mr-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onBlur={() => {
              window.setTimeout(() => setShowResults(false), 120);
            }}
            placeholder="Search anything..."
            className="w-full bg-transparent text-gray-300 placeholder-gray-500 outline-none"
          />
        </form>

        {showResults && results.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-white/8 bg-[#101814]/95 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            {results.slice(0, 6).map((item) => (
              <button
                key={`${item.route}-${item.label}`}
                type="button"
                onMouseDown={() => goToItem(item)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/5"
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-500">{item.route === '/' ? 'Dashboard' : item.route.replace('/', '')}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-4 flex items-center gap-5 text-gray-300">
        <button type="button" className="relative rounded-2xl border border-white/8 bg-white/4 p-3 transition-colors hover:text-white">
          <FaBell className="text-lg" />
          <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-farm-accent ring-2 ring-farm-bg" />
        </button>

        <button type="button" className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-farm-border bg-gray-800">
            <img src="https://i.pravatar.cc/150?img=11" alt="Farmer Profile" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 group-hover:text-gray-300">Welcome back,</span>
            <span className="text-sm font-semibold text-white">Farmer</span>
          </div>
          <FaChevronDown className="ml-1 text-xs text-gray-500 group-hover:text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
