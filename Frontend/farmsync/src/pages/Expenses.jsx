import React, { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FaPlus, FaReceipt, FaRegCalendarAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { addExpenseApi, deleteExpenseApi, getExpenses } from '../api/expensesApi';

const chartColors = ['#4ade80', '#38bdf8', '#fbbf24', '#fb7185', '#a78bfa'];
const currency = (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`;

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [form, setForm] = useState({ title: '', amount: '', date: '', crop: '' });

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addExpense = async (event) => {
    event.preventDefault();
    const newExpense = await addExpenseApi(form);
    setExpenses([newExpense, ...expenses]);
    setForm({ title: '', amount: '', date: '', crop: '' });
  };

  const removeExpense = async (id) => {
    await deleteExpenseApi(id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const matchesSearch =
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.crop.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || expense.crop === categoryFilter;
      const matchesDate =
        dateFilter === 'All' ||
        (dateFilter === 'This Month' &&
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear) ||
        (dateFilter === 'Last 30 Days' && Date.now() - expenseDate.getTime() <= 30 * 24 * 60 * 60 * 1000);

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [categoryFilter, dateFilter, expenses, search]);

  const total = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const monthlyTotal = filteredExpenses
    .filter((expense) => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const highest = filteredExpenses.reduce((max, expense) => Math.max(max, Number(expense.amount)), 0);
  const average = Math.round(total / (filteredExpenses.length || 1));

  const barData = filteredExpenses.map((expense) => ({
    name: expense.title,
    amount: Number(expense.amount),
  }));

  const pieData = Object.values(
    filteredExpenses.reduce((accumulator, expense) => {
      accumulator[expense.crop] = accumulator[expense.crop] || { name: expense.crop, value: 0 };
      accumulator[expense.crop].value += Number(expense.amount);
      return accumulator;
    }, {})
  );

  const categories = ['All', ...new Set(expenses.map((expense) => expense.crop).filter(Boolean))];

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Expense Control</div>
            <h1 className="page-title mt-2">Monitor farm spending with confidence</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              A cleaner finance view with compact summary cards, smart filters, a modern chart area, and a focused expense table.
            </p>
          </div>
          <button className="app-button-primary self-start lg:self-auto">
            <FaPlus />
            Add Expense
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <label className="relative block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or crop"
              className="app-input pl-11"
            />
          </label>
          <label className="relative block">
            <FaRegCalendarAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="app-select pl-11">
              <option>All</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>
          </label>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="app-select">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Total Spend', value: currency(total), tone: 'text-emerald-300' },
          { title: 'This Month', value: currency(monthlyTotal), tone: 'text-sky-300' },
          { title: 'Highest Expense', value: currency(highest), tone: 'text-amber-300' },
          { title: 'Average', value: currency(average), tone: 'text-violet-300' },
        ].map((item) => (
          <article key={item.title} className="app-panel app-card-hover p-5">
            <div className="text-sm text-slate-400">{item.title}</div>
            <div className={`mt-3 text-3xl font-semibold tracking-tight ${item.tone}`}>{item.value}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="app-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Add expense</h2>
              <p className="mt-1 text-sm text-slate-400">Log a new cost without leaving the analytics view.</p>
            </div>
          </div>

          <form onSubmit={addExpense} className="grid gap-3 md:grid-cols-2">
            <input type="text" name="title" placeholder="Expense title" value={form.title} onChange={handleChange} className="app-input md:col-span-2" required />
            <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="app-input" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} className="app-input" required />
            <select name="crop" value={form.crop} onChange={handleChange} className="app-select md:col-span-2" required>
              <option value="">Select crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Sugarcane">Sugarcane</option>
            </select>
            <div className="md:col-span-2">
              <button className="app-button-primary" type="submit">
                <FaPlus />
                Save Expense
              </button>
            </div>
          </form>
        </article>

        <article className="app-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Expense insights</h2>
              <p className="mt-1 text-sm text-slate-400">Bar and category distribution with a polished dark UI.</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="app-panel-soft p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
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
                  <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="app-panel-soft flex items-center justify-center p-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
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
            </div>
          </div>
        </article>
      </section>

      <section className="app-panel p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Expense table</h2>
            <p className="mt-1 text-sm text-slate-400">Clean, compact table for fast scanning and quick actions.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-sm text-slate-400">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Crop</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-white/5 text-sm text-slate-200">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-500/12 p-2.5 text-emerald-300">
                        <FaReceipt />
                      </div>
                      <span>{expense.title}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-400">{expense.crop}</td>
                  <td className="py-4 text-slate-400">{expense.date}</td>
                  <td className="py-4 font-medium text-white">{currency(expense.amount)}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => removeExpense(expense.id)}
                      className="rounded-xl border border-white/8 px-3 py-2 text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/8 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
