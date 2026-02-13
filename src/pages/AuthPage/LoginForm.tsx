import styles from './AuthPage.module.css';
import { Link } from 'react-router';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateLogin, LoginFormValues } from '../../utils/validation';

export const LoginForm = () => {
  const {
    values,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    shouldShowError,
  } = useFormValidation<LoginFormValues>(
    { email: '', password: '', remember: false },
    validateLogin
  );

  return (
    <form
      noValidate
      className={styles.form}
      onSubmit={handleSubmit(data => console.log('LOGIN:', data))}
    >
      <label className={styles.label}>
        Email или логин *
        <input
          type="text"
          value={values.email}
          onChange={e => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={shouldShowError('email') ? styles.inputError : ''}
        />
        {shouldShowError('email') && (
          <span className={styles.error}>{shouldShowError('email')}</span>
        )}
      </label>

      <label className={styles.label}>
        Пароль *
        <input
          type="password"
          value={values.password}
          onChange={e => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          className={shouldShowError('password') ? styles.inputError : ''}
        />
        {shouldShowError('password') && (
          <span className={styles.error}>{shouldShowError('password')}</span>
        )}
      </label>

      <Link to="/reset-password" className={styles.linkBtn}>
        Восстановить пароль
      </Link>

      <button
        type="submit"
        className={styles.primaryBtn}
        disabled={!isValid}
      >
        АВТОРИЗОВАТЬСЯ
      </button>
    </form>
  );
};
