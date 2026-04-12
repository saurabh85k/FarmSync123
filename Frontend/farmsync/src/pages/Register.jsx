import React, { useState } from 'react';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
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
      const data = await registerApi(form.name, form.email, form.password, form.phone);
      login(data);     // auto-login after register
      navigate('/');   // go straight to dashboard
    } catch (err) {
      setError(err.message);
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
          <h2 className="page-title mt-3">Create Account</h2>
          <p className="page-subtitle mt-1">Start managing your farm 🚜</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="micro-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="app-input mt-1"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

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

          <div>
            <label className="micro-label">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              className="app-input mt-1"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="relative">
            <label className="micro-label">Password</label>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Create password (min 6 characters)"
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
            {loading ? 'Creating account...' : 'Register'}
          </button>

        </form>

        <p className="text-center text-sm text-slate-400 mt-5">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;