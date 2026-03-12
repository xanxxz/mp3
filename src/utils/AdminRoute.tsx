import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRole('guest');
      setLoading(false);
      return;
    }

    fetch('http://localhost:3001/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setRole(data.role)) // 'user' | 'admin'
      .catch(() => setRole('guest'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;

  if (role !== 'admin') return <Navigate to="/login" replace />;

  return children;
};
