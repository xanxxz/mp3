import styles from './AuthPage.module.css';
import { LoginForm } from './LoginForm';
import { RegisterPromo } from './RegisterPromo';

export const AuthPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Авторизация</h1>

      <div className={styles.card}>
        <LoginForm />
        <div className={styles.divider} />
        <RegisterPromo />
      </div>
    </div>
  );
};
