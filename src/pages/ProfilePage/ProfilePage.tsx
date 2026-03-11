import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProfilePage.module.css';
import { fetchOrders } from 'shared/api';

interface User {
  id: number;
  email: string;
  name: string;
  region: string;
}

interface Order {
  orderId: string;
  code: string;
  total: number;
  created_at: string;
}

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Не удалось получить данные пользователя');
        const data = await res.json();
        setUser(data);

        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Личный кабинет</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'orders' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          История заказов
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className={styles.tabContent}>
          <div className={styles.card}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ФИО:</strong> {user.name}</p>
            <p><strong>Регион:</strong> {user.region}</p>

            <button
              className={styles.logoutBtn}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className={styles.tabContent}>
          {orders.length === 0 ? (
            <p className={styles.noOrders}>Вы пока не делали заказов</p>
          ) : (
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Код заказа</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.code}</td>
                    <td>{order.total} ₽</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
