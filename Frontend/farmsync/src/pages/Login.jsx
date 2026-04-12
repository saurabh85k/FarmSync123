import React, { useState } from 'react';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginApi(form.email, form.password);
      login(data);           // saves token + user into context & sessionStorage
      navigate('/');         // redirect to dashboard
    } catch (err) {
      setError(err.message); // show backend error message e.g. "Invalid email or password"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="main-content flex justify-center items-center px-4 dashboard-hero"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="app-panel w-full max-w-md p-8">

        <div className="text-center mb-6">
          <div className="mx-auto w-fit p-4 rounded-full bg-emerald-500/10 text-emerald-400 text-3xl">
            <FaLeaf />
          </div>
          <h2 className="page-title mt-3">Welcome Back</h2>
          <p className="page-subtitle mt-1">Login to manage your farm 🌱</p>
        </div>

        {/* Error message from backend */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="micro-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="app-input mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label className="micro-label">Password</label>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              className="app-input mt-1 pr-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer text-slate-400 hover:text-white"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="app-button-primary w-full mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="text-center text-sm text-slate-400 mt-5">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;