import React from 'react';
import styles from './сartSummary.module.css';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Итого</h2>
      <div className={styles.total}>
        <span>Сумма:</span>
        <span className={styles.totalSpan}>{total.toLocaleString()} ₽</span>
      </div>
      <button
        className={styles.checkoutBtn}
        onClick={() => navigate('/checkout')}
        disabled={total === 0}
      >
        Перейти к оформлению
      </button>
    </div>
  );
};
