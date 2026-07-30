import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../api/client.js';

export default function RequireAdminAuth() {
  const [state, setState] = useState('checking');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setState('unauthenticated');
      return;
    }
    api
      .get('/api/auth/me')
      .then(() => setState('authenticated'))
      .catch(() => {
        localStorage.removeItem('authToken');
        setState('unauthenticated');
      });
  }, []);

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-on-surface-variant">
        Loading...
      </div>
    );
  }

  if (state === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
