import styles from './AuthPage.module.css';
import { Link } from 'react-router-dom';

export const RegisterPromo = () => {
  return (
    <div className={styles.promo}>
      <h2>Еще нет аккаунта?</h2>

      <p>
        Регистрация на сайте позволяет получить доступ к статусу и истории
        вашего заказа. Просто заполните поля ниже, и вы получите учетную запись.
      </p>

      <p>
        Мы запрашиваем у вас только информацию, необходимую для того,
        чтобы сделать процесс покупки более быстрым и легким.
      </p>

      <Link to="/register" className={styles.darkBtn}>
        ЗАРЕГИСТРИРОВАТЬСЯ
      </Link>
    </div>
  );
};
