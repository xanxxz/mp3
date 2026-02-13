import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

export const LoginPromo = () => {
  return (
    <div className={styles.promoBox}>
      <h2>Уже есть аккаунт?</h2>
      <p>Перейдите к авторизации если у вас уже есть зарегистрированный аккаунт.</p>
      <Link to="/login" className={styles.darkBtn}>
        АВТОРИЗОВАТЬСЯ
      </Link>
    </div>
  );
};
