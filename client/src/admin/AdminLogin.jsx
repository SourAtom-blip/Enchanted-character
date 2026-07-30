import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('authToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center px-margin-mobile">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-surface-container rounded-2xl border border-secondary/20 p-8">
        <h1 className="font-headline-sm text-headline-sm text-secondary mb-1">Lorrie's Enchanted Arts</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">Admin Portal</p>

        <div className="mb-4">
          <label className="font-label-md text-label-md text-on-surface-variant block mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-on-background/20 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="mb-6">
          <label className="font-label-md text-label-md text-on-surface-variant block mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-on-background/20 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
          />
        </div>

        {error && <p className="text-error font-body-md text-body-md mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary text-on-secondary py-3 rounded-full font-label-md text-label-md uppercase tracking-wider hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
