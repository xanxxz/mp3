import styles from './RegisterPage.module.css';
import { RegisterForm } from './RegisterForm';
import { LoginPromo } from './LoginPromo';

export const RegisterPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>

      <div className={styles.card}>
        <RegisterForm />
        <div className={styles.right}>
          <LoginPromo />
        </div>
      </div>
    </div>
  );
};
